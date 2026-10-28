// Server-only durable store for the private admin: JSON documents and append-only JSONL logs
// under ADMIN_DATA_DIR (default `.admin-data/` in the working directory, git-ignored).
//
// Writes go through `update`, which holds a per-document lock (in-process queue plus a lock
// directory for other processes on the same disk) and replaces the file atomically. This is real
// persistence on a long-running `next start` server. A host with an ephemeral or per-instance disk
// needs ADMIN_DATA_DIR on a shared volume; see docs/OPEN_QUESTIONS.md (Q-019).
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const LOCK_STALE_MS = 30_000;
const LOCK_WAIT_MS = 10_000;
const queues = new Map();

export function dataDir() {
    return path.resolve(process.env.ADMIN_DATA_DIR || path.join(process.cwd(), '.admin-data'));
}

function docPath(name) {
    if (!/^[\w./-]+$/.test(name) || name.includes('..')) throw new Error(`Invalid store name: ${name}`);
    return path.join(dataDir(), `${name}.json`);
}

export async function read(name, fallback) {
    try {
        return JSON.parse(await fs.readFile(docPath(name), 'utf8'));
    } catch (error) {
        if (error.code === 'ENOENT') return structuredClone(fallback);
        throw error;
    }
}

async function acquireFileLock(lockDir) {
    const started = Date.now();
    for (;;) {
        try {
            await fs.mkdir(lockDir);
            return;
        } catch (error) {
            if (error.code !== 'EEXIST') throw error;
            const stat = await fs.stat(lockDir).catch(() => null);
            if (stat && Date.now() - stat.mtimeMs > LOCK_STALE_MS) {
                await fs.rm(lockDir, { recursive: true, force: true });
                continue;
            }
            if (Date.now() - started > LOCK_WAIT_MS) throw new Error(`Timed out waiting for lock ${lockDir}`);
            await new Promise((resolve) => setTimeout(resolve, 25));
        }
    }
}

async function writeAtomic(file, value) {
    await fs.mkdir(path.dirname(file), { recursive: true });
    const tmp = `${file}.${process.pid}.${crypto.randomBytes(4).toString('hex')}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(value, null, 2));
    await fs.rename(tmp, file);
}

// Runs `fn` while holding the named lock. Use it for any read-check-write sequence.
export async function withLock(name, fn) {
    const previous = queues.get(name) || Promise.resolve();
    let release;
    const current = new Promise((resolve) => (release = resolve));
    const chained = previous.then(() => current);
    queues.set(name, chained);
    await previous;
    const lockDir = `${docPath(name)}.lock`;
    await fs.mkdir(path.dirname(lockDir), { recursive: true });
    try {
        await acquireFileLock(lockDir);
        try {
            return await fn();
        } finally {
            await fs.rm(lockDir, { recursive: true, force: true });
        }
    } finally {
        release();
        if (queues.get(name) === chained) queues.delete(name);
    }
}

// Reads the document, lets `mutator` change a copy (or return a replacement), and saves it.
export async function update(name, fallback, mutator) {
    return withLock(name, async () => {
        const current = await read(name, fallback);
        const result = await mutator(current);
        const next = result === undefined ? current : result;
        await writeAtomic(docPath(name), next);
        return next;
    });
}

function logPath(name) {
    if (!/^[\w./-]+$/.test(name) || name.includes('..')) throw new Error(`Invalid log name: ${name}`);
    return path.join(dataDir(), `${name}.jsonl`);
}

// Appends one record to a JSONL log. Readers must tolerate duplicates; see readLog callers.
export async function appendLog(name, record) {
    const file = logPath(name);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.appendFile(file, `${JSON.stringify(record)}\n`);
}

export async function readLog(name) {
    try {
        const text = await fs.readFile(logPath(name), 'utf8');
        return text
            .split('\n')
            .filter(Boolean)
            .flatMap((line) => {
                try {
                    return [JSON.parse(line)];
                } catch {
                    return [];
                }
            });
    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

export function newId(prefix) {
    return `${prefix}_${Date.now().toString(36)}${crypto.randomBytes(3).toString('hex')}`;
}
