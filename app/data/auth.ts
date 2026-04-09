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

export const daftarAkun: User[] = [
  {
    id: 'guru-001',
    name: 'Ibu Sari Dewi, S.Pd.',
    username: 'guru',
    password: 'guru123',
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
    id: 'siswa-002',
    name: 'Budi Santoso',
    username: 'budi',
    password: 'siswa123',
    role: 'siswa',
    kelas: 'XI IPA 1',
  },
  {
    id: 'siswa-003',
    name: 'Citra Lestari',
    username: 'citra',
    password: 'siswa123',
    role: 'siswa',
    kelas: 'XI IPA 2',
  },
  {
    id: 'siswa-004',
    name: 'Diana Putri',
    username: 'diana',
    password: 'siswa123',
    role: 'siswa',
    kelas: 'XI IPA 2',
  },
  {
    id: 'siswa-005',
    name: 'Eko Prasetyo',
    username: 'eko',
    password: 'siswa123',
    role: 'siswa',
    kelas: 'XI IPA 3',
  },
];

export function authenticate(username: string, password: string, role: UserRole): User | null {
  return daftarAkun.find(
    (u) => u.username === username && u.password === password && u.role === role
  ) ?? null;
}
