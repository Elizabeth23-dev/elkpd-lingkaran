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
    id: 'lingkaran-busur',
    title: 'Lingkaran dan Busur Lingkaran',
    subtitle: 'Sudut Pusat & Sudut Keliling',
    description: 'Pelajari hubungan antara lingkaran dan busur lingkaran, sudut pusat, sudut keliling, serta panjang busur dan luas juring berdasarkan sudut yang menghadapinya.',
    estimasiWaktu: '45 menit',
    icon: 'git-commit-horizontal',
    topik: ['Busur Minor dan Busur Mayor', 'Sudut Pusat dan Sudut Keliling', 'Hubungan Sudut Pusat dan Sudut Keliling', 'Panjang Busur dan Luas Juring'],
  },
  {
    id: 'lingkaran-garis-singgung',
    title: 'Lingkaran dan Garis Singgung',
    subtitle: 'Geometri Analitik',
    description: 'Pelajari pengertian dan sifat garis singgung lingkaran, serta cara menentukan persamaan garis singgung melalui titik pada lingkaran maupun dari titik di luar lingkaran.',
    estimasiWaktu: '45 menit',
    icon: 'git-branch',
    topik: ['Pengertian Garis Singgung', 'Sifat Garis Singgung', 'Persamaan Garis Singgung di Titik pada Lingkaran', 'Persamaan Garis Singgung dari Titik Luar'],
  },
];

export const soalPerTopik: Record<string, SoalItem[]> = {
  'lingkaran-busur': [
    {
      id: 1,
      pertanyaan: 'Bagian dari lingkaran yang lebih kecil dari setengah lingkaran disebut...',
      pilihan: ['Busur mayor', 'Busur minor', 'Juring', 'Tembereng'],
      jawabanBenar: 1,
      penjelasan: 'Busur minor adalah bagian busur lingkaran yang lebih kecil (kurang dari setengah keliling), sedangkan busur mayor adalah bagian yang lebih besar.',
      kesulitan: 'mudah',
    },
    {
      id: 2,
      pertanyaan: 'Sudut pusat ∠AOB = 100°. Besar sudut keliling ∠ACB yang menghadap busur yang sama adalah...',
      pilihan: ['200°', '100°', '50°', '25°'],
      jawabanBenar: 2,
      penjelasan: 'Sudut keliling = ½ × sudut pusat = ½ × 100° = 50°. Sudut keliling selalu setengah dari sudut pusat yang menghadap busur yang sama.',
      kesulitan: 'mudah',
    },
    {
      id: 3,
      pertanyaan: 'Diketahui sudut keliling ∠PQR = 35°. Besar sudut pusat ∠POR yang menghadap busur yang sama adalah...',
      pilihan: ['17,5°', '35°', '70°', '140°'],
      jawabanBenar: 2,
      penjelasan: 'Sudut pusat = 2 × sudut keliling = 2 × 35° = 70°. Sudut pusat selalu dua kali sudut keliling yang menghadap busur yang sama.',
      kesulitan: 'mudah',
    },
    {
      id: 4,
      pertanyaan: 'Lingkaran dengan jari-jari 21 cm memiliki sudut pusat 120°. Panjang busurnya adalah... (menggunakan π = 22/7)',
      pilihan: ['22 cm', '44 cm', '66 cm', '88 cm'],
      jawabanBenar: 1,
      penjelasan: 'Panjang busur = (α/360°) × 2πr = (120/360) × 2 × (22/7) × 21 = (1/3) × 132 = 44 cm.',
      kesulitan: 'sedang',
    },
    {
      id: 5,
      pertanyaan: 'Dua sudut keliling menghadap busur yang sama. Pernyataan yang benar adalah...',
      pilihan: ['Keduanya memiliki besar sudut yang berbeda', 'Keduanya memiliki besar sudut yang sama', 'Jumlah keduanya selalu 180°', 'Keduanya saling berpelurus'],
      jawabanBenar: 1,
      penjelasan: 'Semua sudut keliling yang menghadap busur yang sama akan selalu memiliki besar yang sama, yaitu setengah dari sudut pusat yang menghadap busur tersebut.',
      kesulitan: 'sedang',
    },
  ],
  'lingkaran-garis-singgung': [
    {
      id: 1,
      pertanyaan: 'Garis singgung lingkaran memiliki berapa titik persekutuan dengan lingkaran?',
      pilihan: ['Tidak ada', 'Tepat satu titik', 'Dua titik', 'Tiga titik'],
      jawabanBenar: 1,
      penjelasan: 'Garis singgung lingkaran adalah garis yang memiliki tepat satu titik persekutuan dengan lingkaran. Titik tersebut disebut titik singgung.',
      kesulitan: 'mudah',
    },
    {
      id: 2,
      pertanyaan: 'Sifat garis singgung lingkaran di titik singgung terhadap jari-jari adalah...',
      pilihan: ['Sejajar', 'Tegak lurus', 'Membentuk sudut 45°', 'Berpotongan di titik lain'],
      jawabanBenar: 1,
      penjelasan: 'Salah satu sifat utama garis singgung lingkaran adalah tegak lurus terhadap jari-jari lingkaran di titik singgung.',
      kesulitan: 'mudah',
    },
    {
      id: 3,
      pertanyaan: 'Persamaan garis singgung lingkaran x²+y²=25 di titik (3,4) adalah...',
      pilihan: ['3x + 4y = 5', '3x + 4y = 25', '4x + 3y = 25', 'x + y = 25'],
      jawabanBenar: 1,
      penjelasan: 'Menggunakan rumus x₁x + y₁y = r²: 3x + 4y = 25.',
      kesulitan: 'sedang',
    },
    {
      id: 4,
      pertanyaan: 'Dari titik di luar lingkaran, berapa banyak garis singgung yang dapat dibuat ke lingkaran tersebut?',
      pilihan: ['Satu', 'Dua', 'Tiga', 'Tak terhingga'],
      jawabanBenar: 1,
      penjelasan: 'Dari satu titik di luar lingkaran, dapat dibuat tepat dua garis singgung dan kedua garis singgung tersebut memiliki panjang yang sama.',
      kesulitan: 'mudah',
    },
    {
      id: 5,
      pertanyaan: 'Dari titik P(7,0) ke lingkaran x²+y²=25, panjang garis singgungnya adalah...',
      pilihan: ['2√3', '2√6', '√74', '4√3'],
      jawabanBenar: 1,
      penjelasan: 'Panjang garis singgung = √(x₀²+y₀²-r²) = √(49+0-25) = √24 = 2√6.',
      kesulitan: 'sulit',
    },
  ],
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

};

export const kontenMateri: Record<string, { teori: string; rumus: Array<{label: string; formula: string}>; contoh: Array<{soal: string; solusi: string[]}> }> = {
  'lingkaran-busur': {
    teori: `Bagian dari lingkaran disebut busur lingkaran. Busur yang lebih kecil disebut busur minor dan bagian yang lebih besar disebut busur mayor. Jika hanya disebutkan kata busur, maka yang dimaksud adalah busur minor.

Sudut Pusat adalah sudut yang titik sudutnya terletak pada pusat lingkaran dan kaki-kaki sudutnya adalah jari-jari lingkaran.
Rumus besar sudut pusat: α = 2θ, artinya besar sudut pusat = 2 × besar sudut keliling yang menghadap busur yang sama.

Sudut Keliling adalah sudut yang titik sudutnya terletak pada lingkaran dan kaki-kaki sudutnya berupa tali busur. Tali busur adalah ruas garis yang menghubungkan dua titik pada lingkaran.
Rumus sudut keliling: θ = ½α, artinya besar sudut keliling = ½ × besar sudut pusat yang menghadap busur yang sama.

Kesimpulan penting:
• Semua sudut keliling yang menghadap busur yang sama memiliki besar yang sama
• Sudut keliling yang menghadap diameter selalu bernilai 90°`,
    rumus: [
      { label: 'Sudut Pusat (α) terhadap Sudut Keliling (θ)', formula: 'α = 2θ' },
      { label: 'Sudut Keliling (θ) terhadap Sudut Pusat (α)', formula: 'θ = ½α' },
      { label: 'Panjang Busur', formula: 'l = (α / 360°) × 2πr' },
      { label: 'Luas Juring', formula: 'L = (α / 360°) × πr²' },
    ],
    contoh: [
      {
        soal: 'Diketahui sudut pusat ∠BOC = 70° pada lingkaran berpusat O dengan jari-jari 21 cm. Hitunglah panjang busur BC dan luas juring BOC! (π = 22/7)',
        solusi: [
          'Diketahui: α = 70°, r = 21 cm, π = 22/7',
          'Panjang busur BC = (α/360°) × 2πr = (70/360) × 2 × (22/7) × 21',
          '= (7/36) × 2 × 22 × 3 = (7/36) × 132 = 924/36 = 25,67 cm',
          'Luas juring BOC = (α/360°) × πr² = (70/360) × (22/7) × 21²',
          '= (7/36) × (22/7) × 441 = (22/36) × 441 = 9702/36 = 269,5 cm²',
        ],
      },
      {
        soal: 'Sudut pusat ∠AOB = 80°. Titik C terletak pada busur besar lingkaran. Tentukan besar sudut keliling ∠ACB!',
        solusi: [
          'Sudut keliling yang menghadap busur yang sama dengan sudut pusat',
          '∠ACB = ½ × ∠AOB',
          '∠ACB = ½ × 80° = 40°',
          'Jadi besar sudut keliling ∠ACB adalah 40°',
        ],
      },
    ],
  },
  'lingkaran-garis-singgung': {
    teori: `Garis singgung lingkaran adalah garis yang memiliki tepat satu titik persekutuan dengan lingkaran yang disebut titik singgung.

Sifat-sifat garis singgung:
• Garis singgung tegak lurus terhadap jari-jari lingkaran di titik singgung
• Dari satu titik di luar lingkaran dapat dibuat dua garis singgung yang memiliki panjang sama

Contoh dalam kehidupan nyata: Roda kereta api yang menyentuh rel di satu titik. Secara matematis, rel berperan sebagai garis singgung roda dan titik sentuhnya disebut titik singgung.

Penurunan persamaan garis singgung:
Misalkan titik P(x₁, y₁) pada lingkaran x²+y²=r². Gradien garis OP adalah mOP = y₁/x₁. Karena garis singgung tegak lurus OP maka m = -x₁/y₁. Dengan substitusi ke persamaan garis, diperoleh persamaan garis singgung: x₁x + y₁y = r²`,
    rumus: [
      { label: 'Garis singgung di titik (x₁,y₁) pada x²+y²=r²', formula: 'x₁x + y₁y = r²' },
      { label: 'Garis singgung di titik (x₁,y₁) pada (x-a)²+(y-b)²=r²', formula: '(x₁-a)(x-a) + (y₁-b)(y-b) = r²' },
      { label: 'Garis singgung di titik (x₁,y₁) pada x²+y²+Ax+By+C=0', formula: 'x₁x + y₁y + ½A(x₁+x) + ½B(y₁+y) + C = 0' },
      { label: 'Panjang garis singgung dari titik (x₀,y₀) ke x²+y²=r²', formula: 'L = √(x₀²+y₀²-r²)' },
    ],
    contoh: [
      {
        soal: 'Tentukan persamaan garis singgung lingkaran x²+y²=25 di titik P(3,4)!',
        solusi: [
          'Diketahui: lingkaran x²+y²=25, titik singgung P(3,4)',
          'Gunakan rumus: x₁x + y₁y = r²',
          'Substitusi x₁=3, y₁=4, r²=25:',
          '3x + 4y = 25',
          'Jadi persamaan garis singgungnya adalah 3x + 4y = 25',
        ],
      },
      {
        soal: 'Tentukan persamaan garis singgung lingkaran (x-2)²+(y+1)²=9 di titik Q(5,-1)!',
        solusi: [
          'Pusat (a,b) = (2,-1), r²=9, titik singgung Q(5,-1)',
          'Gunakan rumus: (x₁-a)(x-a) + (y₁-b)(y-b) = r²',
          '(5-2)(x-2) + (-1-(-1))(y-(-1)) = 9',
          '3(x-2) + 0(y+1) = 9',
          '3x - 6 = 9  →  3x = 15  →  x = 5',
          'Jadi persamaan garis singgungnya adalah x = 5',
        ],
      },
    ],
  },
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
};
