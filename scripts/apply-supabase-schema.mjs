#!/usr/bin/env node
/**
 * Skrip helper untuk menjalankan SQL skema awal ke Supabase.
 *
 * Penggunaan:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
 *     node scripts/apply-supabase-schema.mjs
 *
 * Skrip ini menjalankan SQL via PostgREST RPC `exec_sql`. Kalau RPC tersebut
 * belum ada di project Supabase kamu (default-nya tidak ada), skrip akan
 * mencetak SQL ke stdout supaya bisa di-copy paste manual ke Supabase
 * Dashboard → SQL Editor.
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '0001_init_cloud_users_and_hasil.sql');

const sql = await readFile(sqlPath, 'utf-8');

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.log('[apply-schema] SUPABASE_URL/SERVICE_ROLE_KEY tidak diisi.');
  console.log('[apply-schema] Salin SQL berikut ke Supabase Dashboard → SQL Editor:');
  console.log('---');
  console.log(sql);
  process.exit(0);
}

// Coba via PostgREST RPC `exec_sql` (kalau ada). Kalau tidak ada, cetak SQL
// supaya user copy-paste manual.
const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/exec_sql`;
const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    apikey: SUPABASE_SERVICE_ROLE_KEY,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
  },
  body: JSON.stringify({ sql }),
});

if (res.ok) {
  console.log('[apply-schema] SQL applied via exec_sql RPC.');
  process.exit(0);
}

const body = await res.text().catch(() => '');
console.warn(`[apply-schema] RPC exec_sql gagal (HTTP ${res.status}). Body: ${body}`);
console.log('[apply-schema] Salin SQL berikut ke Supabase Dashboard → SQL Editor:');
console.log('---');
console.log(sql);
