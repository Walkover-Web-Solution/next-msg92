// Line diff (longest common subsequence) for reviewing knowledge changes in the admin.
// Returns [{ type: 'same' | 'add' | 'del', text }]. Inputs above MAX_CELLS fall back to a
// whole-file replacement so a huge file cannot exhaust memory.
const MAX_CELLS = 4_000_000;

export function lineDiff(before = '', after = '') {
    const a = before.split('\n');
    const b = after.split('\n');
    let start = 0;
    while (start < a.length && start < b.length && a[start] === b[start]) start++;
    let endA = a.length - 1;
    let endB = b.length - 1;
    while (endA >= start && endB >= start && a[endA] === b[endB]) {
        endA--;
        endB--;
    }
    const head = a.slice(0, start).map((text) => ({ type: 'same', text }));
    const tail = a.slice(endA + 1).map((text) => ({ type: 'same', text }));
    const midA = a.slice(start, endA + 1);
    const midB = b.slice(start, endB + 1);
    if (midA.length * midB.length > MAX_CELLS) {
        return [
            ...head,
            ...midA.map((text) => ({ type: 'del', text })),
            ...midB.map((text) => ({ type: 'add', text })),
            ...tail,
        ];
    }
    const rows = midA.length + 1;
    const cols = midB.length + 1;
    const table = new Uint32Array(rows * cols);
    for (let i = midA.length - 1; i >= 0; i--) {
        for (let j = midB.length - 1; j >= 0; j--) {
            table[i * cols + j] =
                midA[i] === midB[j]
                    ? table[(i + 1) * cols + j + 1] + 1
                    : Math.max(table[(i + 1) * cols + j], table[i * cols + j + 1]);
        }
    }
    const middle = [];
    let i = 0;
    let j = 0;
    while (i < midA.length && j < midB.length) {
        if (midA[i] === midB[j]) {
            middle.push({ type: 'same', text: midA[i] });
            i++;
            j++;
        } else if (table[(i + 1) * cols + j] >= table[i * cols + j + 1]) {
            middle.push({ type: 'del', text: midA[i++] });
        } else {
            middle.push({ type: 'add', text: midB[j++] });
        }
    }
    while (i < midA.length) middle.push({ type: 'del', text: midA[i++] });
    while (j < midB.length) middle.push({ type: 'add', text: midB[j++] });
    return [...head, ...middle, ...tail];
}

// Collapses unchanged runs to `context` lines around each change for display.
export function compactDiff(diff, context = 3) {
    const keep = diff.map(() => false);
    diff.forEach((line, index) => {
        if (line.type === 'same') return;
        for (let k = Math.max(0, index - context); k <= Math.min(diff.length - 1, index + context); k++) keep[k] = true;
    });
    const out = [];
    let skipped = 0;
    diff.forEach((line, index) => {
        if (keep[index]) {
            if (skipped) out.push({ type: 'skip', text: `… ${skipped} unchanged line(s)` });
            skipped = 0;
            out.push(line);
        } else skipped++;
    });
    if (skipped) out.push({ type: 'skip', text: `… ${skipped} unchanged line(s)` });
    return out;
}
