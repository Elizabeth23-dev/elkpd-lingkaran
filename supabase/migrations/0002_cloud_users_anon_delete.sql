-- Buka DELETE pada cloud_users untuk role anon agar admin (guru) bisa
-- menghapus akun siswa dari panel /admin.
--
-- Trade-off keamanan: dengan policy ini, siapa pun yang punya anon key
-- (yang ikut ter-bundle di JS publik) bisa menghapus row di cloud_users.
-- Ini setara dengan trust model INSERT yang sudah dibuka untuk anon
-- (siswa baru bisa daftar tanpa autentikasi server) dan dengan
-- DELETE/UPDATE pada cloud_hasil yang sudah ada di migrasi awal —
-- aplikasi memang tidak pakai Supabase Auth, hanya sistem login client-side.
--
-- Kalau di kemudian hari mau diperketat, langkah migrasinya:
--   1. Pasang Supabase Auth & beri guru role khusus.
--   2. Ganti `to anon` di policy ini menjadi `to authenticated using
--      (auth.jwt() ->> 'role' = 'guru')` (atau pakai claim custom).

drop policy if exists "cloud_users anon delete" on public.cloud_users;
create policy "cloud_users anon delete"
  on public.cloud_users for delete
  to anon
  using (true);
