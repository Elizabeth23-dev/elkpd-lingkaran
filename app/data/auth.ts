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

const REGISTERED_USERS_KEY = 'elkpd-registered-users';

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
];

/** Ambil akun tambahan yang didaftarkan siswa dari sessionStorage */
export function getRegisteredUsers(): User[] {
  try {
    const raw = sessionStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  } catch {
    return [];
  }
}

/** Simpan akun baru ke sessionStorage */
function saveRegisteredUsers(users: User[]): void {
  sessionStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
}

/** Seluruh akun (default + yang didaftarkan) */
export function getDaftarAkun(): User[] {
  return [...defaultAkun, ...getRegisteredUsers()];
}

/** Untuk kompatibilitas komponen yang sudah pakai `daftarAkun` langsung */
export const daftarAkun: User[] = defaultAkun;

export function authenticate(username: string, password: string, role: UserRole): User | null {
  return getDaftarAkun().find(
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

/** Daftarkan akun siswa baru. Mengembalikan error jika username sudah dipakai. */
export function registerSiswa(payload: RegisterPayload): RegisterResult {
  const all = getDaftarAkun();
  const exists = all.some(
    (u) => u.username.toLowerCase() === payload.username.toLowerCase()
  );
  if (exists) {
    return { ok: false, error: 'Username sudah digunakan. Pilih username lain.' };
  }

  const newUser: User = {
    id: `siswa-${Date.now()}`,
    name: payload.name,
    username: payload.username,
    password: payload.password,
    role: 'siswa',
    kelas: payload.kelas,
  };

  const registered = getRegisteredUsers();
  saveRegisteredUsers([...registered, newUser]);
  return { ok: true, user: newUser };
}
