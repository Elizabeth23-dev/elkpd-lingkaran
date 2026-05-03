#!/usr/bin/env node
/**
 * Skrip migrasi data dari JSONBin.io ke Supabase.
 *
 * Membaca bin JSONBin dengan format `{ users: CloudUser[], hasil: CloudHasil[] }`
 * lalu meng-upsert ke tabel Supabase `cloud_users` dan `cloud_hasil`.
 *
 * Skrip ini dijalankan SEKALI saja (idempotent — aman di-rerun karena pakai upsert).
 *
 * Penggunaan:
 *   JSONBIN_API_KEY=xxx \
 *   JSONBIN_BIN_ID=xxx \
 *   SUPABASE_URL=https://xxx.supabase.co \
 *   SUPABASE_SERVICE_ROLE_KEY=xxx \
 *     node scripts/migrate-jsonbin-to-supabase.mjs [--dry-run]
 *
 * Pakai service_role key (bukan anon key) supaya bypass RLS saat insert.
 * Service role key TIDAK boleh ikut ter-bundle di app — hanya untuk skrip lokal.
 */

import { createClient } from '@supabase/supabase-js';

const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY;
const JSONBIN_BIN_ID = process.env.JSONBIN_BIN_ID;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const DRY_RUN = process.argv.includes('--dry-run');

function fail(msg) {
  console.error(`[migrate] ERROR: ${msg}`);
  process.exit(1);
}

if (!JSONBIN_API_KEY) fail('JSONBIN_API_KEY env var wajib diisi');
if (!JSONBIN_BIN_ID) fail('JSONBIN_BIN_ID env var wajib diisi');
if (!SUPABASE_URL) fail('SUPABASE_URL env var wajib diisi');
if (!SUPABASE_SERVICE_ROLE_KEY) fail('SUPABASE_SERVICE_ROLE_KEY env var wajib diisi');

const JSONBIN_BASE = 'https://api.jsonbin.io/v3';

async function fetchJsonbin() {
  const res = await fetch(`${JSONBIN_BASE}/b/${JSONBIN_BIN_ID}/latest`, {
    headers: {
      'X-Master-Key': JSONBIN_API_KEY,
      'X-Bin-Meta': 'false',
      'Cache-Control': 'no-cache',
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`JSONBin HTTP ${res.status}: ${body}`);
  }
  return res.json();
}

function userToRow(u) {
  return {
    id: u.id,
    name: u.name,
    username: u.username,
    password: u.password,
    kelas: u.kelas,
    created_at: u.createdAt ? new Date(u.createdAt).toISOString() : new Date().toISOString(),
  };
}

function hasilToRow(h) {
  return {
    id: h.id,
    siswa_id: h.siswaId,
    siswa_name: h.siswaName,
    topic_id: h.topicId,
    score: h.score ?? 0,
    total: h.total ?? 0,
    total_skor: h.totalSkor ?? 0,
    skor_diperoleh: h.skorDiperoleh ?? 0,
    time_taken: h.timeTaken ?? 0,
    answers: h.answers ?? {},
    submitted: h.submitted ?? {},
    essay_image_urls: h.essayImageUrls ?? {},
    submitted_at: h.submittedAt ? new Date(h.submittedAt).toISOString() : new Date().toISOString(),
  };
}

async function main() {
  console.log(`[migrate] Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`);
  console.log(`[migrate] Source: JSONBin bin ${JSONBIN_BIN_ID}`);
  console.log(`[migrate] Target: ${SUPABASE_URL}`);

  console.log('[migrate] Fetching dari JSONBin...');
  const bin = await fetchJsonbin();

  const users = Array.isArray(bin.users) ? bin.users : [];
  const hasil = Array.isArray(bin.hasil) ? bin.hasil : [];

  console.log(`[migrate] Ditemukan ${users.length} users dan ${hasil.length} hasil di JSONBin.`);

  if (DRY_RUN) {
    console.log('[migrate] DRY RUN — tidak menulis ke Supabase.');
    console.log('[migrate] Sample user:', users[0] ?? '(tidak ada)');
    console.log('[migrate] Sample hasil:', hasil[0] ?? '(tidak ada)');
    return;
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  if (users.length > 0) {
    const userRows = users.map(userToRow);
    console.log(`[migrate] Upsert ${userRows.length} users ke cloud_users...`);
    const { error: usersErr } = await supabase
      .from('cloud_users')
      .upsert(userRows, { onConflict: 'id' });
    if (usersErr) fail(`Upsert users gagal: ${usersErr.message}`);
    console.log('[migrate] Users selesai.');
  }

  if (hasil.length > 0) {
    const hasilRows = hasil.map(hasilToRow);
    // Batch supaya request body tidak kebesaran kalau hasil banyak
    const BATCH = 100;
    for (let i = 0; i < hasilRows.length; i += BATCH) {
      const slice = hasilRows.slice(i, i + BATCH);
      console.log(`[migrate] Upsert hasil ${i + 1}..${i + slice.length} dari ${hasilRows.length}...`);
      const { error: hasilErr } = await supabase
        .from('cloud_hasil')
        .upsert(slice, { onConflict: 'id' });
      if (hasilErr) fail(`Upsert hasil gagal: ${hasilErr.message}`);
    }
    console.log('[migrate] Hasil selesai.');
  }

  // Verifikasi cepat: hitung row di kedua tabel
  const [{ count: userCount }, { count: hasilCount }] = await Promise.all([
    supabase.from('cloud_users').select('*', { count: 'exact', head: true }),
    supabase.from('cloud_hasil').select('*', { count: 'exact', head: true }),
  ]);
  console.log(`[migrate] Supabase sekarang: cloud_users=${userCount ?? '?'}, cloud_hasil=${hasilCount ?? '?'}`);
  console.log('[migrate] Selesai!');
}

main().catch((err) => {
  console.error('[migrate] Gagal:', err);
  process.exit(1);
});
