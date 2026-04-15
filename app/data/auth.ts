import { fetchCloudUsers, saveCloudUsers, type CloudUser } from './cloud-storage';

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

/** Akun bawaan (tidak bisa diubah) */
const defaultAkun: User[] = [
  {
    id: 'guru-001',
    name: 'M. Muwaffiq AddinilHaq',
    username: 'Sir',
    password: 'Crocodile',
    role: 'guru',
    nip: '198503122010012005',
  },
  {
    id: 'kelompok-001',
    name: 'Kelompok 1',
    username: 'Kelompok 1',
    password: 'vmds71#',
    role: 'siswa',
    kelas: 'XI 1',
  },
  {
    id: 'kelompok-002',
    name: 'Kelompok 2',
    username: 'Kelompok 2',
    password: 'dsvk98#',
    role: 'siswa',
    kelas: 'XI 1',
  },
  {
    id: 'kelompok-003',
    name: 'Kelompok 3',
    username: 'Kelompok 3',
    password: 'zkoq56#',
    role: 'siswa',
    kelas: 'XI 1',
  },
  {
    id: 'kelompok-004',
    name: 'Kelompok 4',
    username: 'Kelompok 4',
    password: 'dsnj20#',
    role: 'siswa',
    kelas: 'XI 1',
  },
  {
    id: 'kelompok-005',
    name: 'Kelompok 5',
    username: 'Kelompok 5',
    password: 'kwml7#',
    role: 'siswa',
    kelas: 'XI 1',
  },
  {
    id: 'kelompok-006',
    name: 'Kelompok 6',
    username: 'Kelompok 6',
    password: 'cnjs81#',
    role: 'siswa',
    kelas: 'XI 1',
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

  await saveCloudUsers([...cloudUsers, newCloudUser]);

  const newUser: User = cloudUserToUser(newCloudUser);
  return { ok: true, user: newUser };
}
