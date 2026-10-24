import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const src = fileURLToPath(new URL('../src/', import.meta.url));

export async function resolve(specifier, context, next) {
    if (specifier.startsWith('@/')) {
        const base = src + specifier.slice(2);
        const file = existsSync(base) ? base : `${base}.js`;
        return next(pathToFileURL(file).href, context);
    }
    return next(specifier, context);
}
