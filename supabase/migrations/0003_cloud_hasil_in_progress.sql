-- Tambah dukungan progres in-progress di cloud_hasil supaya:
-- 1. Siswa yang me-refresh / pindah device tidak harus mengulang dari soal 1.
-- 2. Guru di /admin bisa melihat siswa mana yang sedang mengerjakan
--    (bukan hanya yang sudah selesai).

alter table public.cloud_hasil
  add column if not exists is_in_progress boolean not null default false;

alter table public.cloud_hasil
  add column if not exists current_index integer not null default 0;

alter table public.cloud_hasil
  add column if not exists updated_at timestamptz not null default now();

-- Catatan: kolom essay_image_urls TIDAK dipakai untuk menyimpan base64 saat
-- in-progress. Foto jawaban essay tetap disimpan di localStorage device siswa
-- selama latihan, lalu di-upload ke ImgBB & disimpan URL-nya saat klik
-- "Selesai & Lihat Hasil" (sesuai flow lama). Ini mencegah row Supabase
-- membengkak gara-gara base64 ratusan KB tiap auto-save.
