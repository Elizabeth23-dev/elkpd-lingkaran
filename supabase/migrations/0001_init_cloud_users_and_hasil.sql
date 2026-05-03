-- Skema awal Supabase untuk migrasi dari JSONBin.
-- Dua tabel: cloud_users (akun siswa hasil registrasi) & cloud_hasil (hasil pengerjaan latihan).
-- RLS dibuat permissive untuk anon — setara dengan model keamanan JSONBin saat ini
-- (anon key di-bundle di JS publik, tidak ada Supabase Auth). Bisa diperketat nanti.

-- ============================================================
-- cloud_users
-- ============================================================
create table if not exists public.cloud_users (
  id          text primary key,
  name        text not null,
  username    text not null unique,
  password    text not null,
  kelas       text not null,
  created_at  timestamptz not null default now()
);

create index if not exists cloud_users_username_idx on public.cloud_users (lower(username));

alter table public.cloud_users enable row level security;

drop policy if exists "cloud_users anon select" on public.cloud_users;
create policy "cloud_users anon select"
  on public.cloud_users for select
  to anon
  using (true);

drop policy if exists "cloud_users anon insert" on public.cloud_users;
create policy "cloud_users anon insert"
  on public.cloud_users for insert
  to anon
  with check (true);

-- UPDATE/DELETE sengaja tidak dibuka untuk anon — akun siswa imutable dari client.

-- ============================================================
-- cloud_hasil
-- ============================================================
create table if not exists public.cloud_hasil (
  id                text primary key,
  siswa_id          text not null,
  siswa_name        text not null,
  topic_id          text not null,
  score             integer not null default 0,
  total             integer not null default 0,
  total_skor        integer not null default 0,
  skor_diperoleh    integer not null default 0,
  time_taken        integer not null default 0,
  answers           jsonb  not null default '{}'::jsonb,
  submitted         jsonb  not null default '{}'::jsonb,
  essay_image_urls  jsonb  not null default '{}'::jsonb,
  submitted_at      timestamptz not null default now()
);

create index if not exists cloud_hasil_siswa_idx on public.cloud_hasil (siswa_id);
create index if not exists cloud_hasil_topic_idx on public.cloud_hasil (topic_id);

alter table public.cloud_hasil enable row level security;

drop policy if exists "cloud_hasil anon select" on public.cloud_hasil;
create policy "cloud_hasil anon select"
  on public.cloud_hasil for select
  to anon
  using (true);

drop policy if exists "cloud_hasil anon insert" on public.cloud_hasil;
create policy "cloud_hasil anon insert"
  on public.cloud_hasil for insert
  to anon
  with check (true);

drop policy if exists "cloud_hasil anon update" on public.cloud_hasil;
create policy "cloud_hasil anon update"
  on public.cloud_hasil for update
  to anon
  using (true)
  with check (true);

drop policy if exists "cloud_hasil anon delete" on public.cloud_hasil;
create policy "cloud_hasil anon delete"
  on public.cloud_hasil for delete
  to anon
  using (true);
