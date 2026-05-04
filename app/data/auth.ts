import { fetchCloudUsers, saveCloudUsers, deleteCloudUser, type CloudUser } from './cloud-storage';

export type UserRole = 'guru' | 'siswa';

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  role: UserRole;
  kelas?: string;
  nip?: string;
}

/**
 * Akun bawaan (tidak bisa diubah / dihapus dari client).
 *
 * Hanya akun guru yang di-bundle. Akun siswa Kelompok 1..8 sebelumnya
 * juga di sini, tapi sudah dihapus — siswa sekarang membuat akun
 * sendiri lewat halaman registrasi (tersimpan di tabel `cloud_users`).
 */
const defaultAkun: User[] = [
  {
    id: 'guru-001',
    name: 'M. Muwaffiq AddinilHaq',
    username: 'Sir',
    password: 'Crocodile',
    role: 'guru',
    nip: '198503122010012005',
  },
];

/** Untuk kompatibilitas komponen yang sudah pakai `daftarAkun` langsung */
export const daftarAkun: User[] = defaultAkun;

function cloudUserToUser(cu: CloudUser): User {
  return {
    id: cu.id,
    name: cu.name,
    username: cu.username,
    password: cu.password,
    role: 'siswa',
    kelas: cu.kelas,
  };
}

/** Seluruh akun (default + yang didaftarkan dari cloud) */
export async function getDaftarAkunAsync(bypassCache = false): Promise<User[]> {
  const cloudUsers = await fetchCloudUsers(bypassCache);
  return [...defaultAkun, ...cloudUsers.map(cloudUserToUser)];
}

/** Versi sync — hanya default + localStorage fallback (untuk kompatibilitas) */
export function getDaftarAkun(): User[] {
  try {
    const raw = localStorage.getItem('elkpd-registered-users');
    const cloudUsers: CloudUser[] = raw ? (JSON.parse(raw) as CloudUser[]) : [];
    return [...defaultAkun, ...cloudUsers.map(cloudUserToUser)];
  } catch {
    return [...defaultAkun];
  }
}

export async function authenticate(
  username: string,
  password: string,
  role: UserRole
): Promise<User | null> {
  const all = await getDaftarAkunAsync();
  return all.find(
    (u) => u.username === username && u.password === password && u.role === role
  ) ?? null;
}

export interface RegisterPayload {
  name: string;
  username: string;
  password: string;
  kelas: string;
}

export type RegisterResult =
  | { ok: true; user: User }
  | { ok: false; error: string };

/** Daftarkan akun siswa baru ke cloud. */
export async function registerSiswa(payload: RegisterPayload): Promise<RegisterResult> {
  // Selalu bypass cache saat register agar cek username duplikat pakai data terbaru
  const cloudUsers = await fetchCloudUsers(true);
  const allDefault = defaultAkun;

  const existsInDefault = allDefault.some(
    (u) => u.username.toLowerCase() === payload.username.toLowerCase()
  );
  const existsInCloud = cloudUsers.some(
    (u) => u.username.toLowerCase() === payload.username.toLowerCase()
  );

  if (existsInDefault || existsInCloud) {
    return { ok: false, error: 'Username sudah digunakan. Pilih username lain.' };
  }

  const newCloudUser: CloudUser = {
    id: `siswa-${Date.now()}`,
    name: payload.name,
    username: payload.username,
    password: payload.password,
    kelas: payload.kelas,
    createdAt: Date.now(),
  };

  try {
    await saveCloudUsers([...cloudUsers, newCloudUser]);
  } catch (err) {
    console.warn('[auth] registerSiswa: gagal simpan ke cloud', err);
    return {
      ok: false,
      error: 'Gagal menyimpan akun ke server. Periksa koneksi internet, lalu coba lagi.',
    };
  }

  const newUser: User = cloudUserToUser(newCloudUser);
  return { ok: true, user: newUser };
}

export type DeleteSiswaResult = { ok: true } | { ok: false; error: string };

/**
 * Hapus akun siswa hasil registrasi dari cloud. Akun bawaan (`defaultAkun`
 * — saat ini hanya akun guru) tidak bisa dihapus karena hardcoded di
 * bundle; fungsi ini menolak dengan error eksplisit kalau ada usaha
 * menghapusnya.
 */
export async function deleteSiswaAkun(siswaId: string): Promise<DeleteSiswaResult> {
  const isDefault = defaultAkun.some((u) => u.id === siswaId);
  if (isDefault) {
    return {
      ok: false,
      error: 'Akun bawaan tidak bisa dihapus. Hanya akun siswa hasil registrasi (Daftar Akun) yang bisa dihapus.',
    };
  }

  try {
    await deleteCloudUser(siswaId);
    return { ok: true };
  } catch (err) {
    console.warn('[auth] deleteSiswaAkun: gagal hapus dari cloud', err);
    return {
      ok: false,
      error: 'Gagal menghapus akun dari server. Periksa koneksi internet, lalu coba lagi.',
    };
  }
}
