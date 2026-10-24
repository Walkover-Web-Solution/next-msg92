#!/usr/bin/env node
// Prints an ADMIN_USERS entry (`email|role|scrypt:salt:hash`) for the private admin.
// The password is read from the ADMIN_PASSWORD env var or prompted for; it is never stored.
//   node scripts/admin-user.mjs someone@example.com owner
import crypto from 'node:crypto';
import readline from 'node:readline';

const [email, role = 'viewer'] = process.argv.slice(2);
if (!email || !['viewer', 'editor', 'owner'].includes(role)) {
    console.error('Usage: node scripts/admin-user.mjs <email> <viewer|editor|owner>');
    process.exit(2);
}

async function password() {
    if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
    const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
    return new Promise((resolve) =>
        rl.question('Password (min 12 chars): ', (answer) => (rl.close(), resolve(answer)))
    );
}

const value = await password();
if (value.length < 12) {
    console.error('Password must be at least 12 characters.');
    process.exit(2);
}
const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(value, salt, 32);
console.log(`${email.toLowerCase()}|${role}|scrypt:${salt.toString('base64')}:${hash.toString('base64')}`);
