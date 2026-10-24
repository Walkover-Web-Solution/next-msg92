// Server-only access to the repository, the source of truth for knowledge docs and page JSON.
//
// Modes (KNOWLEDGE_WRITEBACK):
//   github — read the effective revision from GITHUB_WRITEBACK_BASE (default `web`) and propose
//            changes as a branch + pull request. Needs GITHUB_WRITEBACK_TOKEN and GITHUB_WRITEBACK_REPO.
//   local  — read the working tree at KNOWLEDGE_REPO_DIR (default cwd) and write changes into it for a
//            developer to review and commit. The default outside production.
//   off    — read the working tree; changes can only be saved as drafts. The default in production.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { httpError } from '@/lib/admin/auth';
import { KNOWLEDGE_DOCS } from '@/lib/admin/knowledge/registry';

const run = promisify(execFile);

export function repoConfig() {
    const requested = process.env.KNOWLEDGE_WRITEBACK || (process.env.NODE_ENV === 'production' ? 'off' : 'local');
    const github = {
        repo: process.env.GITHUB_WRITEBACK_REPO || '',
        base: process.env.GITHUB_WRITEBACK_BASE || 'web',
        hasToken: Boolean(process.env.GITHUB_WRITEBACK_TOKEN),
    };
    let mode = requested;
    let problem = null;
    if (mode === 'github' && (!github.repo || !github.hasToken)) {
        problem = 'KNOWLEDGE_WRITEBACK=github needs GITHUB_WRITEBACK_REPO and GITHUB_WRITEBACK_TOKEN.';
        mode = 'off';
    }
    if (!['github', 'local', 'off'].includes(mode)) mode = 'off';
    const label =
        mode === 'github'
            ? `Pull requests into ${github.repo}@${github.base}`
            : mode === 'local'
              ? 'Working tree of this checkout (commit and open a PR to publish)'
              : 'Read-only: changes are kept as drafts';
    return { mode, requested, repo: github.repo, base: github.base, label, problem };
}

function repoRoot() {
    return path.resolve(process.env.KNOWLEDGE_REPO_DIR || process.cwd());
}

const docPaths = new Set(KNOWLEDGE_DOCS.map((doc) => doc.path));

// Only knowledge docs and page JSON may be read or written through the admin.
export function assertAllowedPath(file) {
    const normalized = path.posix.normalize(String(file || ''));
    const isPageJson = /^src\/data\/[\w./-]+\.json$/.test(normalized) && !normalized.includes('..');
    if (!docPaths.has(normalized) && !isPageJson) throw httpError(400, `Path not editable from the admin: ${file}`);
    return normalized;
}

// Git blob id of the content; equals the `sha` GitHub reports for the same file.
export function blobSha(content) {
    const buffer = Buffer.from(content, 'utf8');
    return crypto.createHash('sha1').update(`blob ${buffer.length}\0`).update(buffer).digest('hex');
}

async function git(args) {
    const { stdout } = await run('git', args, { cwd: repoRoot(), maxBuffer: 10 * 1024 * 1024 });
    return stdout;
}

async function gh(method, endpoint, body) {
    const res = await fetch(`https://api.github.com/repos/${process.env.GITHUB_WRITEBACK_REPO}${endpoint}`, {
        method,
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_WRITEBACK_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            ...(body ? { 'Content-Type': 'application/json' } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(15_000),
    });
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;
    if (!res.ok) {
        const error = httpError(
            res.status === 404 ? 404 : 502,
            `GitHub ${method} ${endpoint}: ${res.status} ${data?.message || ''}`.trim()
        );
        error.githubStatus = res.status;
        throw error;
    }
    return data;
}

export async function readRepoFile(file, ref) {
    const target = assertAllowedPath(file);
    const config = repoConfig();
    if (config.mode === 'github') {
        const at = ref || config.base;
        try {
            const data = await gh('GET', `/contents/${target}?ref=${encodeURIComponent(at)}`);
            const content = Buffer.from(data.content, 'base64').toString('utf8');
            return { exists: true, content, sha: data.sha, ref: at, source: `github:${config.repo}@${at}` };
        } catch (error) {
            if (error.githubStatus === 404)
                return { exists: false, content: '', sha: null, ref: at, source: `github:${config.repo}@${at}` };
            throw error;
        }
    }
    if (ref) {
        const content = await git(['show', `${ref}:${target}`]);
        return { exists: true, content, sha: blobSha(content), ref, source: `git:${ref.slice(0, 8)}` };
    }
    try {
        const content = await fs.readFile(path.join(/* turbopackIgnore: true */ repoRoot(), target), 'utf8');
        const [head, status] = await Promise.all([
            git(['rev-parse', '--short', 'HEAD']).catch(() => ''),
            git(['status', '--porcelain', '--', target]).catch(() => ''),
        ]);
        return {
            exists: true,
            content,
            sha: blobSha(content),
            ref: head.trim(),
            dirty: Boolean(status.trim()),
            source: `working tree @ ${head.trim() || 'unknown'}${status.trim() ? ' (uncommitted changes)' : ''}`,
        };
    } catch (error) {
        if (error.code === 'ENOENT')
            return { exists: false, content: '', sha: null, ref: null, source: 'working tree' };
        throw error;
    }
}

export async function fileHistory(file, limit = 20) {
    const target = assertAllowedPath(file);
    const config = repoConfig();
    if (config.mode === 'github') {
        const commits = await gh(
            'GET',
            `/commits?path=${encodeURIComponent(target)}&sha=${encodeURIComponent(config.base)}&per_page=${limit}`
        );
        return commits.map((c) => ({
            sha: c.sha,
            author: c.commit?.author?.name,
            date: c.commit?.author?.date,
            message: c.commit?.message?.split('\n')[0],
            url: c.html_url,
        }));
    }
    const out = await git(['log', `-n${limit}`, '--format=%H%x1f%an%x1f%aI%x1f%s', '--', target]).catch(() => '');
    return out
        .split('\n')
        .filter(Boolean)
        .map((line) => {
            const [sha, author, date, message] = line.split('\x1f');
            return { sha, author, date, message };
        });
}

function slugify(text) {
    return String(text)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 40);
}

// Proposes `content` for `file`, refusing when the file changed since `baseSha` was read.
// Returns { status: 'pending', ... } on success. Throws a 409 `conflict` error otherwise.
export async function proposeChange({ file, baseSha, content, title, body, id }) {
    const target = assertAllowedPath(file);
    const config = repoConfig();
    if (config.mode === 'off')
        throw httpError(409, 'Writeback is off on this server; the change stays a draft.', 'writeback_off');

    const current = await readRepoFile(target);
    if ((current.sha || null) !== (baseSha || null)) {
        throw httpError(
            409,
            'The file changed since this draft was started. Rebase the draft on the current revision.',
            'conflict'
        );
    }

    if (config.mode === 'local') {
        await fs.writeFile(path.join(/* turbopackIgnore: true */ repoRoot(), target), content);
        return {
            status: 'pending',
            mode: 'local',
            proposedSha: blobSha(content),
            note: 'Written to the working tree. Review with `git diff`, commit, and open a PR to publish.',
        };
    }

    const branch = `admin/${slugify(path.basename(target, path.extname(target)))}-${id || Date.now().toString(36)}`;
    const ref = await gh('GET', `/git/ref/heads/${encodeURIComponent(config.base)}`);
    await gh('POST', '/git/refs', { ref: `refs/heads/${branch}`, sha: ref.object.sha });
    await gh('PUT', `/contents/${target}`, {
        message: title,
        content: Buffer.from(content, 'utf8').toString('base64'),
        branch,
        ...(baseSha ? { sha: baseSha } : {}),
    });
    const pr = await gh('POST', '/pulls', { title, head: branch, base: config.base, body: body || '' });
    return {
        status: 'pending',
        mode: 'github',
        proposedSha: blobSha(content),
        branch,
        prNumber: pr.number,
        prUrl: pr.html_url,
    };
}

// Re-checks a pending change against the repository and returns its current status.
export async function refreshChange(change) {
    const config = repoConfig();
    if (change.mode === 'github' && change.prNumber && config.mode === 'github') {
        const pr = await gh('GET', `/pulls/${change.prNumber}`);
        if (pr.merged) return { status: 'effective', mergedAt: pr.merged_at, mergeSha: pr.merge_commit_sha };
        if (pr.state === 'closed') return { status: 'rejected', closedAt: pr.closed_at };
        return { status: 'pending' };
    }
    if (change.mode === 'local') {
        const current = await readRepoFile(change.path);
        if (current.sha !== change.proposedSha)
            return { status: 'superseded', note: 'The working tree no longer contains this change.' };
        return current.dirty
            ? { status: 'pending', note: 'In the working tree, not committed yet.' }
            : { status: 'effective', note: `Committed (HEAD ${current.ref}).` };
    }
    return {};
}
