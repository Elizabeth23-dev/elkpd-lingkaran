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
    id: 'siswa-001',
    name: 'Ahmad Fauzi',
    username: 'ahmad',
    password: 'siswa123',
    role: 'siswa',
    kelas: 'XI IPA 1',
  },
  {
    id: 'kelompok-001',
    name: 'Kelompok 1',
    username: 'kelompok1',
    password: 'Kp1x7Rn2',
    role: 'siswa',
    kelas: 'Kelompok 1',
  },
  {
    id: 'kelompok-002',
    name: 'Kelompok 2',
    username: 'kelompok2',
    password: 'Kp2m9Qw4',
    role: 'siswa',
    kelas: 'Kelompok 2',
  },
  {
    id: 'kelompok-003',
    name: 'Kelompok 3',
    username: 'kelompok3',
    password: 'Kp3b5Zt8',
    role: 'siswa',
    kelas: 'Kelompok 3',
  },
  {
    id: 'kelompok-004',
    name: 'Kelompok 4',
    username: 'kelompok4',
    password: 'Kp4v6Hj1',
    role: 'siswa',
    kelas: 'Kelompok 4',
  },
  {
    id: 'kelompok-005',
    name: 'Kelompok 5',
    username: 'kelompok5',
    password: 'Kp5w3Lm7',
    role: 'siswa',
    kelas: 'Kelompok 5',
  },
  {
    id: 'kelompok-006',
    name: 'Kelompok 6',
    username: 'kelompok6',
    password: 'Kp6n8Ys0',
    role: 'siswa',
    kelas: 'Kelompok 6',
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
