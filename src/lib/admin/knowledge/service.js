// Server-only knowledge service: reads the effective revision of each doc from the repository and
// manages proposed changes (drafts → pending → effective). Drafts are proposals, never a second
// copy of the doc: agents and the site only ever read the repository.
import matter from 'gray-matter';
import { micromark } from 'micromark';
import { gfm, gfmHtml } from 'micromark-extension-gfm';
import { KNOWLEDGE_DOCS, findDoc } from '@/lib/admin/knowledge/registry';
import { readRepoFile, fileHistory, proposeChange, refreshChange, repoConfig, blobSha } from '@/lib/admin/repo';
import { read, update, newId } from '@/lib/admin/store';
import { audit } from '@/lib/admin/audit';
import { httpError } from '@/lib/admin/auth';
import { lineDiff, compactDiff } from '@/lib/admin/diff';

const CHANGES = 'knowledge-changes';
const OPEN_STATUSES = ['draft', 'pending', 'conflict', 'sync_failed'];

export function parseMeta(content) {
    try {
        const { data } = matter(content);
        return data || {};
    } catch {
        return {};
    }
}

function ageDays(date) {
    if (!date) return null;
    const time = new Date(date).getTime();
    return Number.isNaN(time) ? null : Math.floor((Date.now() - time) / 86_400_000);
}

export function renderMarkdown(content) {
    const body = content.replace(/^---\n[\s\S]*?\n---\n/, '');
    // micromark escapes raw HTML unless allowDangerousHtml is set, so doc content cannot inject markup.
    return micromark(body, { extensions: [gfm()], htmlExtensions: [gfmHtml()] });
}

export function headings(content) {
    return [...content.matchAll(/^(#{1,3}) (.+)$/gm)].map((m) => ({
        level: m[1].length,
        text: m[2].replace(/[`*]/g, ''),
    }));
}

export async function listChanges(filter) {
    const changes = await read(CHANGES, []);
    return changes.filter((c) => !filter || filter(c)).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function listDocs(freshnessDays = 90) {
    const changes = await listChanges((c) => OPEN_STATUSES.includes(c.status));
    return Promise.all(
        KNOWLEDGE_DOCS.map(async (doc) => {
            try {
                const file = await readRepoFile(doc.path);
                const meta = file.exists ? parseMeta(file.content) : {};
                const raw = meta.verified_on;
                const verifiedOn = raw ? (raw instanceof Date ? raw.toISOString() : String(raw)).slice(0, 10) : null;
                const age = ageDays(verifiedOn);
                return {
                    ...doc,
                    exists: file.exists,
                    sha: file.sha,
                    source: file.source,
                    status: meta.status || null,
                    owner: meta.owner || null,
                    verifiedOn,
                    verifiedAt: meta.verified_at || null,
                    stale: !file.exists || age === null || age > freshnessDays,
                    ageDays: age,
                    openChanges: changes.filter((c) => c.docId === doc.id).map((c) => ({ id: c.id, status: c.status })),
                };
            } catch (error) {
                return { ...doc, exists: false, error: error.message, openChanges: [] };
            }
        })
    );
}

export async function getDoc(id) {
    const doc = findDoc(id);
    if (!doc) throw httpError(404, 'Unknown document.');
    const file = await readRepoFile(doc.path);
    const [history, changes] = await Promise.all([
        fileHistory(doc.path).catch((error) => ({ error: error.message })),
        listChanges((c) => c.docId === id),
    ]);
    return {
        doc,
        file: {
            ...file,
            meta: parseMeta(file.content),
            html: renderMarkdown(file.content),
            headings: headings(file.content),
        },
        history,
        changes,
        writeback: repoConfig(),
    };
}

function publicChange(change) {
    return change;
}

export async function saveDraft(session, { docId, changeId, content, baseSha, summary, expectedUpdatedAt }) {
    const doc = findDoc(docId);
    if (!doc) throw httpError(404, 'Unknown document.');
    if (typeof content !== 'string' || content.length > 500_000) throw httpError(400, 'Content missing or too large.');
    const now = new Date().toISOString();
    let saved;
    await update(CHANGES, [], (changes) => {
        if (changeId) {
            const change = changes.find((c) => c.id === changeId);
            if (!change) throw httpError(404, 'Draft not found.');
            if (!['draft', 'conflict', 'sync_failed'].includes(change.status))
                throw httpError(409, `A ${change.status} change cannot be edited.`);
            if (expectedUpdatedAt && change.updatedAt !== expectedUpdatedAt) {
                throw httpError(
                    409,
                    'Someone else saved this draft since you opened it. Reload to see their version.',
                    'stale_draft'
                );
            }
            Object.assign(change, {
                content,
                summary: summary ?? change.summary,
                updatedAt: now,
                updatedBy: session.email,
            });
            if (baseSha !== undefined) change.baseSha = baseSha;
            if (change.status !== 'draft') change.status = 'draft';
            saved = change;
        } else {
            saved = {
                id: newId('kc'),
                docId,
                path: doc.path,
                baseSha: baseSha ?? null,
                content,
                summary: summary || '',
                status: 'draft',
                createdAt: now,
                createdBy: session.email,
                updatedAt: now,
                updatedBy: session.email,
                events: [{ at: now, by: session.email, status: 'draft' }],
            };
            changes.push(saved);
        }
        return changes;
    });
    await audit(session, 'knowledge.draft.save', doc.path, { changeId: saved.id });
    return publicChange(saved);
}

async function setStatus(changeId, patch, by) {
    let result;
    await update(CHANGES, [], (changes) => {
        const change = changes.find((c) => c.id === changeId);
        if (!change) throw httpError(404, 'Change not found.');
        const now = new Date().toISOString();
        Object.assign(change, patch, { updatedAt: now });
        if (patch.status)
            change.events = [
                ...(change.events || []),
                { at: now, by, status: patch.status, note: patch.note || patch.error || '' },
            ];
        result = change;
        return changes;
    });
    return result;
}

// Submits a draft through the configured writeback path. Never reports success unless the
// repository accepted the change.
export async function submitChange(session, changeId) {
    const changes = await read(CHANGES, []);
    const change = changes.find((c) => c.id === changeId);
    if (!change) throw httpError(404, 'Change not found.');
    if (!['draft', 'sync_failed'].includes(change.status))
        throw httpError(409, `A ${change.status} change cannot be submitted.`);
    const otherPending = changes.find((c) => c.docId === change.docId && c.id !== change.id && c.status === 'pending');
    if (otherPending) {
        throw httpError(
            409,
            'Another change to this document is still pending. Resolve it first so changes do not overwrite each other.',
            'pending_exists'
        );
    }
    const doc = findDoc(change.docId);
    try {
        const result = await proposeChange({
            file: change.path,
            baseSha: change.baseSha,
            content: change.content,
            id: change.id.slice(-8),
            title: `docs(${doc.id}): ${change.summary || 'update from admin'}`,
            body: `Proposed from the website admin by ${session.email}.\n\n${change.summary || ''}\n\nBase blob: ${change.baseSha || 'new file'}`,
        });
        const saved = await setStatus(
            change.id,
            { ...result, submittedAt: new Date().toISOString(), submittedBy: session.email, error: null },
            session.email
        );
        await audit(session, 'knowledge.submit', change.path, { changeId, mode: result.mode, prUrl: result.prUrl });
        return saved;
    } catch (error) {
        if (error.code === 'writeback_off') throw error;
        const status = error.code === 'conflict' ? 'conflict' : 'sync_failed';
        const saved = await setStatus(change.id, { status, error: error.message }, session.email);
        await audit(session, `knowledge.${status}`, change.path, { changeId, error: error.message });
        return saved;
    }
}

export async function refresh(session, changeId) {
    const change = (await read(CHANGES, [])).find((c) => c.id === changeId);
    if (!change) throw httpError(404, 'Change not found.');
    if (change.status !== 'pending') return change;
    const patch = await refreshChange(change);
    if (!patch.status || patch.status === change.status)
        return patch.note ? setStatus(change.id, { note: patch.note }, session.email) : change;
    const saved = await setStatus(change.id, patch, session.email);
    await audit(session, `knowledge.${patch.status}`, change.path, { changeId });
    return saved;
}

// Re-reads every pending change; called by the scheduler and the knowledge list page.
export async function refreshPending(session) {
    const pending = await listChanges((c) => c.status === 'pending');
    const results = [];
    for (const change of pending) {
        try {
            results.push(await refresh(session, change.id));
        } catch (error) {
            results.push({ ...change, refreshError: error.message });
        }
    }
    return results;
}

export async function discard(session, changeId) {
    const change = (await read(CHANGES, [])).find((c) => c.id === changeId);
    if (!change) throw httpError(404, 'Change not found.');
    if (change.status === 'pending' || change.status === 'effective')
        throw httpError(409, `A ${change.status} change cannot be discarded here; close its pull request instead.`);
    const saved = await setStatus(changeId, { status: 'discarded' }, session.email);
    await audit(session, 'knowledge.discard', change.path, { changeId });
    return saved;
}

// Moves a conflicted draft onto the current revision. The operator reviews the diff again.
export async function rebase(session, changeId) {
    const change = (await read(CHANGES, [])).find((c) => c.id === changeId);
    if (!change) throw httpError(404, 'Change not found.');
    const current = await readRepoFile(change.path);
    return saveDraft(session, {
        docId: change.docId,
        changeId,
        content: change.content,
        baseSha: current.sha,
        summary: change.summary,
    });
}

// Starts a draft whose content is an earlier revision of the doc.
export async function restore(session, docId, sha) {
    const doc = findDoc(docId);
    if (!doc) throw httpError(404, 'Unknown document.');
    const [old, current] = await Promise.all([readRepoFile(doc.path, sha), readRepoFile(doc.path)]);
    return saveDraft(session, {
        docId,
        content: old.content,
        baseSha: current.sha,
        summary: `Restore ${doc.path} to ${sha.slice(0, 8)}`,
    });
}

export async function diffChange(changeId) {
    const change = (await read(CHANGES, [])).find((c) => c.id === changeId);
    if (!change) throw httpError(404, 'Change not found.');
    const current = await readRepoFile(change.path);
    return {
        change,
        currentSha: current.sha,
        baseMatches: current.sha === change.baseSha,
        proposedSha: blobSha(change.content),
        diff: compactDiff(lineDiff(current.content, change.content)),
    };
}
