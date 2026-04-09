export interface Materi {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  estimasiWaktu: string;
  icon: string;
  topik: string[];
}

export interface SoalItem {
  id: number;
  pertanyaan: string;
  pilihan: string[];
  jawabanBenar: number;
  penjelasan: string;
  kesulitan: 'mudah' | 'sedang' | 'sulit';
}

export const daftarMateri: Materi[] = [
  {
    id: 'definisi-unsur',
    title: 'Definisi dan Unsur Lingkaran',
    subtitle: 'Konsep Dasar',
    description: 'Pelajari pengertian lingkaran, unsur-unsurnya seperti jari-jari, diameter, busur, tali busur, apotema, dan juring.',
    estimasiWaktu: '30 menit',
    icon: 'circle',
    topik: ['Pengertian Lingkaran', 'Unsur-unsur Lingkaran', 'Keliling dan Luas Lingkaran'],
  },
  {
    id: 'persamaan-lingkaran',
    title: 'Persamaan Lingkaran',
    subtitle: 'Aljabar & Geometri',
    description: 'Pelajari persamaan lingkaran berpusat di titik asal maupun titik sembarang, serta cara menentukan persamaannya.',
    estimasiWaktu: '45 menit',
    icon: 'function-square',
    topik: ['Persamaan Baku Lingkaran', 'Persamaan Umum Lingkaran', 'Menentukan Pusat dan Jari-jari'],
  },
  {
    id: 'garis-singgung',
    title: 'Garis Singgung Lingkaran',
    subtitle: 'Geometri Analitik',
    description: 'Pelajari sifat-sifat garis singgung, cara menentukan persamaan garis singgung di titik pada lingkaran dan dari titik luar lingkaran.',
    estimasiWaktu: '45 menit',
    icon: 'git-commit-horizontal',
    topik: ['Sifat Garis Singgung', 'Garis Singgung di Titik pada Lingkaran', 'Garis Singgung dari Titik Luar'],
  },
  {
    id: 'hubungan-lingkaran',
    title: 'Hubungan Antar Lingkaran',
    subtitle: 'Geometri Lanjutan',
    description: 'Pelajari posisi relatif dua lingkaran, garis singgung persekutuan dalam dan luar, serta menentukan panjang garis singgung persekutuan.',
    estimasiWaktu: '50 menit',
    icon: 'circles',
    topik: ['Posisi Relatif Dua Lingkaran', 'Garis Singgung Persekutuan', 'Panjang Garis Singgung Persekutuan'],
  },
];

export const soalPerTopik: Record<string, SoalItem[]> = {
  'definisi-unsur': [
    {
      id: 1,
      pertanyaan: 'Garis yang menghubungkan dua titik pada lingkaran dan melalui pusat lingkaran disebut...',
      pilihan: ['Jari-jari', 'Diameter', 'Tali busur', 'Apotema'],
      jawabanBenar: 1,
      penjelasan: 'Diameter adalah garis yang menghubungkan dua titik pada lingkaran dan melalui pusat lingkaran. Panjang diameter sama dengan dua kali jari-jari (d = 2r).',
      kesulitan: 'mudah',
    },
    {
      id: 2,
      pertanyaan: 'Jika jari-jari lingkaran adalah 7 cm, maka keliling lingkaran tersebut adalah... (π = 22/7)',
      pilihan: ['22 cm', '44 cm', '154 cm', '308 cm'],
      jawabanBenar: 1,
      penjelasan: 'Keliling lingkaran = 2πr = 2 × (22/7) × 7 = 2 × 22 = 44 cm.',
      kesulitan: 'mudah',
    },
    {
      id: 3,
      pertanyaan: 'Daerah di dalam lingkaran yang dibatasi oleh dua jari-jari dan sebuah busur disebut...',
      pilihan: ['Tembereng', 'Juring', 'Apotema', 'Busur'],
      jawabanBenar: 1,
      penjelasan: 'Juring (sektor) adalah daerah di dalam lingkaran yang dibatasi oleh dua jari-jari dan sebuah busur lingkaran.',
      kesulitan: 'sedang',
    },
    {
      id: 4,
      pertanyaan: 'Luas lingkaran dengan diameter 14 cm adalah... (π = 22/7)',
      pilihan: ['44 cm²', '88 cm²', '154 cm²', '616 cm²'],
      jawabanBenar: 2,
      penjelasan: 'r = d/2 = 14/2 = 7 cm. Luas = πr² = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm².',
      kesulitan: 'mudah',
    },
    {
      id: 5,
      pertanyaan: 'Garis lurus yang melalui pusat lingkaran dan tegak lurus pada tali busur akan membagi tali busur tersebut menjadi...',
      pilihan: ['Dua bagian tidak sama', 'Dua bagian sama panjang', 'Tiga bagian sama', 'Tergantung posisi tali busur'],
      jawabanBenar: 1,
      penjelasan: 'Garis yang melalui pusat lingkaran dan tegak lurus pada tali busur akan selalu membagi tali busur menjadi dua bagian yang sama panjang (memotong di tengah tali busur).',
      kesulitan: 'sedang',
    },
  ],
  'persamaan-lingkaran': [
    {
      id: 1,
      pertanyaan: 'Persamaan lingkaran berpusat di titik asal O(0,0) dengan jari-jari r adalah...',
      pilihan: ['x + y = r', 'x² + y² = r', 'x² + y² = r²', '(x+a)² + (y+b)² = r²'],
      jawabanBenar: 2,
      penjelasan: 'Persamaan baku lingkaran berpusat di titik asal O(0,0) dengan jari-jari r adalah x² + y² = r².',
      kesulitan: 'mudah',
    },
    {
      id: 2,
      pertanyaan: 'Lingkaran (x-3)² + (y+4)² = 25 memiliki pusat dan jari-jari...',
      pilihan: ['Pusat (3,-4), r=25', 'Pusat (-3,4), r=5', 'Pusat (3,-4), r=5', 'Pusat (-3,4), r=25'],
      jawabanBenar: 2,
      penjelasan: 'Dari bentuk (x-a)² + (y-b)² = r², pusat adalah (a,b) = (3,-4) dan r = √25 = 5.',
      kesulitan: 'mudah',
    },
    {
      id: 3,
      pertanyaan: 'Persamaan lingkaran dengan pusat (2,-1) dan jari-jari 4 adalah...',
      pilihan: ['(x-2)² + (y+1)² = 4', '(x+2)² + (y-1)² = 16', '(x-2)² + (y+1)² = 16', '(x-2)² + (y-1)² = 16'],
      jawabanBenar: 2,
      penjelasan: 'Persamaan lingkaran berpusat di (a,b) dengan jari-jari r: (x-a)² + (y-b)² = r². Jadi: (x-2)² + (y-(-1))² = 4² → (x-2)² + (y+1)² = 16.',
      kesulitan: 'mudah',
    },
    {
      id: 4,
      pertanyaan: 'Ubah persamaan x² + y² - 6x + 4y - 12 = 0 ke bentuk baku. Pusat dan jari-jarinya adalah...',
      pilihan: ['Pusat (3,-2), r=5', 'Pusat (-3,2), r=5', 'Pusat (3,-2), r=25', 'Pusat (-6,4), r=12'],
      jawabanBenar: 0,
      penjelasan: 'Melengkapkan kuadrat: (x²-6x+9) + (y²+4y+4) = 12+9+4 → (x-3)² + (y+2)² = 25. Jadi pusat (3,-2) dan r = √25 = 5.',
      kesulitan: 'sulit',
    },
    {
      id: 5,
      pertanyaan: 'Titik A(1,2) berada di dalam, pada, atau di luar lingkaran x² + y² = 10?',
      pilihan: ['Di dalam lingkaran', 'Pada lingkaran', 'Di luar lingkaran', 'Tidak dapat ditentukan'],
      jawabanBenar: 0,
      penjelasan: 'Substitusi x=1, y=2: 1² + 2² = 1+4 = 5. Karena 5 < 10 (= r²), maka titik A(1,2) berada di dalam lingkaran.',
      kesulitan: 'sedang',
    },
  ],
  'garis-singgung': [
    {
      id: 1,
      pertanyaan: 'Garis singgung lingkaran adalah garis yang...',
      pilihan: ['Memotong lingkaran di dua titik', 'Menyinggung lingkaran tepat di satu titik', 'Melalui pusat lingkaran', 'Sejajar dengan jari-jari'],
      jawabanBenar: 1,
      penjelasan: 'Garis singgung lingkaran adalah garis yang menyentuh lingkaran tepat di satu titik, yang disebut titik singgung.',
      kesulitan: 'mudah',
    },
    {
      id: 2,
      pertanyaan: 'Garis singgung lingkaran x² + y² = r² di titik (x₁, y₁) pada lingkaran memiliki persamaan...',
      pilihan: ['xx₁ + yy₁ = r', 'xx₁ + yy₁ = r²', 'x/x₁ + y/y₁ = r²', 'x² + y² = r²'],
      jawabanBenar: 1,
      penjelasan: 'Persamaan garis singgung lingkaran x² + y² = r² di titik (x₁,y₁) adalah xx₁ + yy₁ = r².',
      kesulitan: 'sedang',
    },
    {
      id: 3,
      pertanyaan: 'Persamaan garis singgung lingkaran x² + y² = 25 di titik (3, 4) adalah...',
      pilihan: ['3x + 4y = 5', '3x + 4y = 25', '4x + 3y = 25', '3x - 4y = 25'],
      jawabanBenar: 1,
      penjelasan: 'Menggunakan rumus xx₁ + yy₁ = r²: x(3) + y(4) = 25 → 3x + 4y = 25.',
      kesulitan: 'mudah',
    },
    {
      id: 4,
      pertanyaan: 'Sifat yang berlaku pada garis singgung lingkaran di titik singgung adalah...',
      pilihan: ['Sejajar dengan jari-jari', 'Tegak lurus dengan jari-jari', 'Membentuk sudut 45° dengan jari-jari', 'Sejajar dengan diameter'],
      jawabanBenar: 1,
      penjelasan: 'Sifat penting: garis singgung lingkaran selalu tegak lurus (membentuk sudut 90°) terhadap jari-jari di titik singgung.',
      kesulitan: 'mudah',
    },
    {
      id: 5,
      pertanyaan: 'Dari titik P(7,0) dibuat garis singgung ke lingkaran x² + y² = 25. Panjang garis singgung tersebut adalah...',
      pilihan: ['2√6', '2√3', '√74', '√24'],
      jawabanBenar: 0,
      penjelasan: 'Panjang garis singgung dari titik P(x₀,y₀) ke lingkaran x²+y²=r² adalah √(x₀²+y₀²-r²) = √(49+0-25) = √24 = 2√6.',
      kesulitan: 'sulit',
    },
  ],
  'hubungan-lingkaran': [
    {
      id: 1,
      pertanyaan: 'Dua lingkaran dikatakan bersinggungan luar jika jarak antara kedua pusatnya sama dengan...',
      pilihan: ['r₁ - r₂', 'r₁ + r₂', '|r₁ - r₂|', 'r₁ × r₂'],
      jawabanBenar: 1,
      penjelasan: 'Dua lingkaran bersinggungan luar jika jarak antar pusat (d) = r₁ + r₂. Titik singgungnya berada di antara kedua pusat.',
      kesulitan: 'mudah',
    },
    {
      id: 2,
      pertanyaan: 'Dua lingkaran dengan jari-jari r₁ = 5 dan r₂ = 3 berpusat di titik yang berjarak 8. Posisi kedua lingkaran tersebut adalah...',
      pilihan: ['Berpotongan', 'Bersinggungan luar', 'Bersinggungan dalam', 'Saling lepas'],
      jawabanBenar: 1,
      penjelasan: 'r₁ + r₂ = 5+3 = 8 = jarak pusat. Karena d = r₁+r₂, kedua lingkaran bersinggungan luar.',
      kesulitan: 'sedang',
    },
    {
      id: 3,
      pertanyaan: 'Garis singgung persekutuan luar dari dua lingkaran adalah garis yang...',
      pilihan: ['Menyinggung kedua lingkaran dari sisi yang sama', 'Menyinggung kedua lingkaran dari sisi yang berlawanan', 'Melalui kedua pusat lingkaran', 'Tegak lurus garis pusat'],
      jawabanBenar: 0,
      penjelasan: 'Garis singgung persekutuan luar menyinggung kedua lingkaran dari sisi yang sama (tidak melewati daerah antara kedua pusat).',
      kesulitan: 'sedang',
    },
    {
      id: 4,
      pertanyaan: 'Dua lingkaran dengan jari-jari r₁ = 8 dan r₂ = 3 berpusat pada jarak d = 13. Panjang garis singgung persekutuan luarnya adalah...',
      pilihan: ['10', '12', '√119', '√144'],
      jawabanBenar: 1,
      penjelasan: 'Panjang GS persekutuan luar = √(d² - (r₁-r₂)²) = √(169 - 25) = √144 = 12.',
      kesulitan: 'sulit',
    },
    {
      id: 5,
      pertanyaan: 'Dua lingkaran saling lepas terjadi jika jarak antar pusatnya memenuhi kondisi...',
      pilihan: ['d < |r₁ - r₂|', 'd = r₁ + r₂', 'd > r₁ + r₂', 'd = |r₁ - r₂|'],
      jawabanBenar: 2,
      penjelasan: 'Dua lingkaran saling lepas (tidak berpotongan dan tidak bersinggungan) terjadi jika jarak antar pusat d > r₁ + r₂.',
      kesulitan: 'mudah',
    },
  ],
};

export const kontenMateri: Record<string, { teori: string; rumus: Array<{label: string; formula: string}>; contoh: Array<{soal: string; solusi: string[]}> }> = {
  'definisi-unsur': {
    teori: `Lingkaran adalah himpunan semua titik pada bidang datar yang berjarak sama dari suatu titik tertentu. Titik tertentu itu disebut pusat lingkaran dan jarak tersebut disebut jari-jari.

Unsur-unsur lingkaran meliputi:
• Pusat (O): Titik yang berjarak sama ke semua titik pada lingkaran
• Jari-jari (r): Ruas garis dari pusat ke titik pada lingkaran
• Diameter (d): Tali busur yang melalui pusat lingkaran, d = 2r
• Tali busur: Ruas garis yang menghubungkan dua titik pada lingkaran
• Busur: Bagian dari keliling lingkaran
• Apotema: Jarak terpendek dari pusat ke tali busur (tegak lurus)
• Juring: Daerah yang dibatasi dua jari-jari dan sebuah busur
• Tembereng: Daerah yang dibatasi tali busur dan busur`,
    rumus: [
      { label: 'Keliling Lingkaran', formula: 'K = 2πr = πd' },
      { label: 'Luas Lingkaran', formula: 'L = πr²' },
      { label: 'Panjang Busur', formula: 'l = (α/360°) × 2πr' },
      { label: 'Luas Juring', formula: 'L_j = (α/360°) × πr²' },
    ],
    contoh: [
      {
        soal: 'Sebuah lingkaran memiliki jari-jari 10 cm. Hitunglah keliling dan luasnya!',
        solusi: [
          'Diketahui: r = 10 cm, π = 3,14',
          'Keliling = 2πr = 2 × 3,14 × 10 = 62,8 cm',
          'Luas = πr² = 3,14 × 10² = 3,14 × 100 = 314 cm²',
        ],
      },
    ],
  },
  'persamaan-lingkaran': {
    teori: `Persamaan lingkaran adalah persamaan yang menggambarkan himpunan semua titik yang membentuk lingkaran.

Ada dua bentuk persamaan lingkaran:
1. Bentuk Baku (Standar): (x-a)² + (y-b)² = r²
   • (a,b) adalah pusat lingkaran
   • r adalah jari-jari

2. Bentuk Umum: x² + y² + Dx + Ey + F = 0
   • Pusat: (-D/2, -E/2)
   • Jari-jari: r = √((D/2)² + (E/2)² - F)

Lingkaran berpusat di titik asal O(0,0) memiliki persamaan: x² + y² = r²`,
    rumus: [
      { label: 'Persamaan Baku (pusat sembarang)', formula: '(x-a)² + (y-b)² = r²' },
      { label: 'Persamaan Baku (pusat di O)', formula: 'x² + y² = r²' },
      { label: 'Persamaan Umum', formula: 'x² + y² + Dx + Ey + F = 0' },
      { label: 'Pusat dari Persamaan Umum', formula: 'Pusat = (-D/2, -E/2)' },
      { label: 'Jari-jari dari Persamaan Umum', formula: 'r = √((D/2)² + (E/2)² - F)' },
    ],
    contoh: [
      {
        soal: 'Tentukan persamaan lingkaran dengan pusat (2,3) dan jari-jari 4!',
        solusi: [
          'Pusat (a,b) = (2,3), r = 4',
          'Substitusi ke persamaan baku: (x-a)² + (y-b)² = r²',
          '(x-2)² + (y-3)² = 4²',
          '(x-2)² + (y-3)² = 16',
        ],
      },
    ],
  },
  'garis-singgung': {
    teori: `Garis singgung lingkaran adalah garis yang menyentuh lingkaran tepat di satu titik, yang disebut titik singgung.

Sifat-sifat garis singgung:
• Garis singgung tegak lurus terhadap jari-jari di titik singgung
• Dari satu titik di luar lingkaran dapat dibuat tepat dua garis singgung
• Dua garis singgung dari titik yang sama memiliki panjang yang sama

Persamaan garis singgung:
1. Di titik (x₁,y₁) pada lingkaran x²+y²=r²: xx₁ + yy₁ = r²
2. Di titik (x₁,y₁) pada lingkaran (x-a)²+(y-b)²=r²:
   (x-a)(x₁-a) + (y-b)(y₁-b) = r²`,
    rumus: [
      { label: 'Garis singgung di titik pada x²+y²=r²', formula: 'xx₁ + yy₁ = r²' },
      { label: 'Garis singgung di titik pada (x-a)²+(y-b)²=r²', formula: '(x-a)(x₁-a) + (y-b)(y₁-b) = r²' },
      { label: 'Panjang garis singgung dari titik luar', formula: 'L = √(x₀²+y₀²-r²)' },
    ],
    contoh: [
      {
        soal: 'Tentukan persamaan garis singgung lingkaran x²+y²=13 di titik (2,3)!',
        solusi: [
          'Gunakan rumus: xx₁ + yy₁ = r²',
          'x(2) + y(3) = 13',
          '2x + 3y = 13',
          'Jadi, persamaan garis singgungnya adalah 2x + 3y = 13',
        ],
      },
    ],
  },
  'hubungan-lingkaran': {
    teori: `Dua lingkaran dapat memiliki berbagai posisi relatif berdasarkan jarak antar pusat (d) dan jari-jarinya (r₁ dan r₂).

Posisi Relatif Dua Lingkaran:
• Saling lepas (d > r₁+r₂): tidak ada titik potong
• Bersinggungan luar (d = r₁+r₂): satu titik singgung di luar
• Berpotongan (|r₁-r₂| < d < r₁+r₂): dua titik potong
• Bersinggungan dalam (d = |r₁-r₂|): satu titik singgung di dalam
• Sepusat/konsentris (d < |r₁-r₂|): salah satu di dalam yang lain

Garis Singgung Persekutuan:
• Persekutuan Luar: Menyinggung kedua lingkaran dari sisi yang sama
• Persekutuan Dalam: Menyinggung kedua lingkaran dari sisi berlawanan`,
    rumus: [
      { label: 'Panjang GS Persekutuan Luar', formula: 'L_L = √(d² - (r₁-r₂)²)' },
      { label: 'Panjang GS Persekutuan Dalam', formula: 'L_D = √(d² - (r₁+r₂)²)' },
    ],
    contoh: [
      {
        soal: 'Dua lingkaran berpusat di A(0,0) dengan r₁=5 dan B(13,0) dengan r₂=3. Tentukan panjang garis singgung persekutuan luarnya!',
        solusi: [
          'd = jarak AB = 13',
          'r₁ - r₂ = 5 - 3 = 2',
          'L_L = √(d² - (r₁-r₂)²) = √(13² - 2²)',
          'L_L = √(169 - 4) = √165',
        ],
      },
    ],
  },
};
