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

export interface SubMateri {
  judul: string;
  isi: string;
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

export const kontenMateri: Record<string, { teori: string; subMateri?: SubMateri[]; rumus: Array<{label: string; formula: string}>; contoh: Array<{soal: string; solusi: string[]}> }> = {
  'lingkaran-busur': {
    teori: '',
    subMateri: [
      {
        judul: 'Busur Minor dan Busur Mayor',
        isi: `Busur lingkaran adalah bagian dari keliling lingkaran yang dibatasi oleh dua titik pada lingkaran tersebut.

Busur Minor adalah bagian busur lingkaran yang lebih kecil dari setengah keliling lingkaran. Busur ini dibatasi oleh dua titik dengan sudut pusat yang kurang dari 180\u00b0.

Busur Mayor adalah bagian busur lingkaran yang lebih besar dari setengah keliling lingkaran. Busur ini dibatasi oleh dua titik dengan sudut pusat yang lebih dari 180\u00b0.

Catatan: Jika hanya disebutkan kata "busur" tanpa keterangan, maka yang dimaksud adalah busur minor.`,
      },
      {
        judul: 'Sudut Pusat dan Sudut Keliling',
        isi: `Sudut Pusat adalah sudut yang titik sudutnya terletak pada pusat lingkaran dan kaki-kaki sudutnya adalah jari-jari lingkaran. Sudut pusat dilambangkan dengan huruf \u03b1 (alfa).

Sudut Keliling adalah sudut yang titik sudutnya terletak pada lingkaran dan kaki-kaki sudutnya berupa tali busur. Tali busur adalah ruas garis yang menghubungkan dua titik pada lingkaran. Sudut keliling dilambangkan dengan huruf \u03b8 (theta).

Kedua jenis sudut ini selalu berkaitan dengan busur lingkaran yang mereka "hadapi" atau lingkupi.`,
      },
      {
        judul: 'Hubungan Sudut Pusat dan Sudut Keliling',
        isi: `Terdapat hubungan penting antara sudut pusat dan sudut keliling yang menghadap busur yang sama:

\u2022 Sudut pusat = 2 \u00d7 sudut keliling: \u03b1 = 2\u03b8
\u2022 Sudut keliling = \u00bd \u00d7 sudut pusat: \u03b8 = \u00bd\u03b1

Sifat-sifat penting:
\u2022 Semua sudut keliling yang menghadap busur yang sama memiliki besar yang sama
\u2022 Sudut keliling yang menghadap diameter (busur setengah lingkaran) selalu bernilai 90\u00b0
\u2022 Dua sudut keliling yang menghadap busur yang sama dari sisi berlawanan berjumlah 180\u00b0 (sudut-sudut dalam segiempat tali busur)`,
      },
      {
        judul: 'Panjang Busur dan Luas Juring',
        isi: `Panjang Busur adalah panjang kurva busur yang dibatasi oleh dua titik pada lingkaran. Panjang busur sebanding dengan besar sudut pusat yang menghadapinya.

Rumus Panjang Busur:
l = (\u03b1 / 360\u00b0) \u00d7 2\u03c0r

Luas Juring adalah luas daerah yang dibatasi oleh dua jari-jari dan sebuah busur lingkaran. Luas juring juga sebanding dengan besar sudut pusat.

Rumus Luas Juring:
L = (\u03b1 / 360\u00b0) \u00d7 \u03c0r\u00b2

di mana \u03b1 adalah besar sudut pusat (dalam derajat) dan r adalah jari-jari lingkaran.`,
      },
    ],
    rumus: [
      { label: 'Sudut Pusat (\u03b1) terhadap Sudut Keliling (\u03b8)', formula: '\u03b1 = 2\u03b8' },
      { label: 'Sudut Keliling (\u03b8) terhadap Sudut Pusat (\u03b1)', formula: '\u03b8 = \u00bd\u03b1' },
      { label: 'Panjang Busur', formula: 'l = (\u03b1 / 360\u00b0) \u00d7 2\u03c0r' },
      { label: 'Luas Juring', formula: 'L = (\u03b1 / 360\u00b0) \u00d7 \u03c0r\u00b2' },
    ],
    contoh: [
      {
        soal: 'Diketahui sudut pusat \u2220BOC = 70\u00b0 pada lingkaran berpusat O dengan jari-jari 21 cm. Hitunglah panjang busur BC dan luas juring BOC! (\u03c0 = 22/7)',
        solusi: [
          'Diketahui: \u03b1 = 70\u00b0, r = 21 cm, \u03c0 = 22/7',
          'Panjang busur BC = (\u03b1/360\u00b0) \u00d7 2\u03c0r = (70/360) \u00d7 2 \u00d7 (22/7) \u00d7 21',
          '= (7/36) \u00d7 2 \u00d7 22 \u00d7 3 = (7/36) \u00d7 132 = 924/36 = 25,67 cm',
          'Luas juring BOC = (\u03b1/360\u00b0) \u00d7 \u03c0r\u00b2 = (70/360) \u00d7 (22/7) \u00d7 21\u00b2',
          '= (7/36) \u00d7 (22/7) \u00d7 441 = (22/36) \u00d7 441 = 9702/36 = 269,5 cm\u00b2',
        ],
      },
      {
        soal: 'Sudut pusat \u2220AOB = 80\u00b0. Titik C terletak pada busur besar lingkaran. Tentukan besar sudut keliling \u2220ACB!',
        solusi: [
          'Sudut keliling yang menghadap busur yang sama dengan sudut pusat',
          '\u2220ACB = \u00bd \u00d7 \u2220AOB',
          '\u2220ACB = \u00bd \u00d7 80\u00b0 = 40\u00b0',
          'Jadi besar sudut keliling \u2220ACB adalah 40\u00b0',
        ],
      },
    ],
  },
  'lingkaran-garis-singgung': {
    teori: '',
    subMateri: [
      {
        judul: 'Pengertian Garis Singgung',
        isi: `Garis singgung lingkaran adalah garis lurus yang memiliki tepat satu titik persekutuan dengan lingkaran. Titik tersebut disebut titik singgung.

Contoh dalam kehidupan nyata: Roda kereta api yang menyentuh rel di satu titik. Secara matematis, rel berperan sebagai garis singgung roda dan titik sentuhnya disebut titik singgung.

Berbeda dengan garis potong (sekans) yang memiliki dua titik persekutuan, garis singgung hanya menyentuh lingkaran di satu titik saja, tanpa memotong atau melewati bagian dalam lingkaran.`,
      },
      {
        judul: 'Sifat Garis Singgung',
        isi: `Garis singgung lingkaran memiliki sifat-sifat penting berikut:

\u2022 Tegak lurus terhadap jari-jari: Garis singgung selalu tegak lurus terhadap jari-jari lingkaran di titik singgung. Artinya, sudut antara garis singgung dan jari-jari di titik singgung adalah 90\u00b0.
\u2022 Dari titik luar lingkaran, dapat dibuat tepat dua garis singgung ke lingkaran tersebut.
\u2022 Dua garis singgung dari titik luar memiliki panjang yang sama: Jika dari titik P di luar lingkaran dibuat dua garis singgung PA dan PB, maka PA = PB.
\u2022 Garis singgung tidak memiliki dua titik yang terletak di dalam lingkaran.`,
      },
      {
        judul: 'Persamaan Garis Singgung di Titik pada Lingkaran',
        isi: `Jika diketahui sebuah titik P(x\u2081, y\u2081) yang terletak pada lingkaran, maka persamaan garis singgung di titik tersebut dapat ditentukan.

Untuk lingkaran x\u00b2 + y\u00b2 = r\u00b2:
Persamaan garis singgung di titik (x\u2081, y\u2081): x\u2081x + y\u2081y = r\u00b2

Untuk lingkaran (x-a)\u00b2 + (y-b)\u00b2 = r\u00b2 dengan pusat (a, b):
Persamaan garis singgung di titik (x\u2081, y\u2081): (x\u2081-a)(x-a) + (y\u2081-b)(y-b) = r\u00b2

Contoh: Garis singgung lingkaran x\u00b2+y\u00b2=25 di titik (3,4) adalah:
3x + 4y = 25`,
      },
      {
        judul: 'Persamaan Garis Singgung dari Titik Luar',
        isi: `Jika titik P(x\u2080, y\u2080) berada di luar lingkaran, maka dapat dibuat dua garis singgung dari titik tersebut ke lingkaran.

Panjang garis singgung dari titik luar P(x\u2080, y\u2080) ke lingkaran x\u00b2 + y\u00b2 = r\u00b2:
L = \u221a(x\u2080\u00b2 + y\u2080\u00b2 - r\u00b2)

Untuk lingkaran x\u00b2+y\u00b2+Ax+By+C=0, panjang garis singgungnya:
L = \u221a(x\u2080\u00b2 + y\u2080\u00b2 + Ax\u2080 + By\u2080 + C)

Titik singgungnya dapat dicari dengan cara:
1. Misalkan titik singgung T(x\u2081, y\u2081) pada lingkaran
2. Tulis persamaan garis singgung di T: x\u2081x + y\u2081y = r\u00b2
3. Karena garis singgung melalui P(x\u2080, y\u2080), substitusi: x\u2081x\u2080 + y\u2081y\u2080 = r\u00b2
4. Gunakan kondisi T pada lingkaran: x\u2081\u00b2 + y\u2081\u00b2 = r\u00b2
5. Selesaikan sistem persamaan untuk memperoleh koordinat T`,
      },
    ],
    rumus: [
      { label: 'Garis singgung di titik (x\u2081,y\u2081) pada x\u00b2+y\u00b2=r\u00b2', formula: 'x\u2081x + y\u2081y = r\u00b2' },
      { label: 'Garis singgung di titik (x\u2081,y\u2081) pada (x-a)\u00b2+(y-b)\u00b2=r\u00b2', formula: '(x\u2081-a)(x-a) + (y\u2081-b)(y-b) = r\u00b2' },
      { label: 'Garis singgung di titik (x\u2081,y\u2081) pada x\u00b2+y\u00b2+Ax+By+C=0', formula: 'x\u2081x + y\u2081y + \u00bdA(x\u2081+x) + \u00bdB(y\u2081+y) + C = 0' },
      { label: 'Panjang garis singgung dari titik (x\u2080,y\u2080) ke x\u00b2+y\u00b2=r\u00b2', formula: 'L = \u221a(x\u2080\u00b2+y\u2080\u00b2-r\u00b2)' },
    ],
    contoh: [
      {
        soal: 'Tentukan persamaan garis singgung lingkaran x\u00b2+y\u00b2=25 di titik P(3,4)!',
        solusi: [
          'Diketahui: lingkaran x\u00b2+y\u00b2=25, titik singgung P(3,4)',
          'Gunakan rumus: x\u2081x + y\u2081y = r\u00b2',
          'Substitusi x\u2081=3, y\u2081=4, r\u00b2=25:',
          '3x + 4y = 25',
          'Jadi persamaan garis singgungnya adalah 3x + 4y = 25',
        ],
      },
      {
        soal: 'Tentukan persamaan garis singgung lingkaran (x-2)\u00b2+(y+1)\u00b2=9 di titik Q(5,-1)!',
        solusi: [
          'Pusat (a,b) = (2,-1), r\u00b2=9, titik singgung Q(5,-1)',
          'Gunakan rumus: (x\u2081-a)(x-a) + (y\u2081-b)(y-b) = r\u00b2',
          '(5-2)(x-2) + (-1-(-1))(y-(-1)) = 9',
          '3(x-2) + 0(y+1) = 9',
          '3x - 6 = 9  \u2192  3x = 15  \u2192  x = 5',
          'Jadi persamaan garis singgungnya adalah x = 5',
        ],
      },
    ],
  },
  'definisi-unsur': {
    teori: '',
    subMateri: [
      {
        judul: 'Pengertian Lingkaran',
        isi: `Lingkaran adalah himpunan semua titik pada bidang datar yang berjarak sama dari suatu titik tertentu. Titik tertentu itu disebut pusat lingkaran dan jarak tersebut disebut jari-jari.

Secara matematis, jika O adalah pusat lingkaran dan r adalah jari-jari, maka lingkaran adalah kumpulan titik P sedemikian sehingga |OP| = r untuk setiap titik P pada lingkaran.

Lingkaran tidak memiliki sudut dan merupakan kurva tertutup yang sempurna. Lingkaran banyak dijumpai dalam kehidupan sehari-hari, seperti roda, jam dinding, dan gelang.`,
      },
      {
        judul: 'Unsur-unsur Lingkaran',
        isi: `Lingkaran memiliki beberapa unsur penting yang perlu dipahami:

\u2022 Pusat (O): Titik yang berjarak sama ke semua titik pada lingkaran
\u2022 Jari-jari (r): Ruas garis dari pusat ke titik pada lingkaran
\u2022 Diameter (d): Tali busur yang melalui pusat lingkaran, d = 2r
\u2022 Tali busur: Ruas garis yang menghubungkan dua titik pada lingkaran
\u2022 Busur: Bagian dari keliling lingkaran
\u2022 Apotema: Jarak terpendek dari pusat ke tali busur (tegak lurus)
\u2022 Juring: Daerah yang dibatasi dua jari-jari dan sebuah busur
\u2022 Tembereng: Daerah yang dibatasi tali busur dan busur`,
      },
      {
        judul: 'Keliling dan Luas Lingkaran',
        isi: `Keliling lingkaran adalah panjang kurva yang membentuk lingkaran tersebut. Keliling dihitung menggunakan konstanta \u03c0 (pi) yang bernilai sekitar 3,14 atau 22/7.

Rumus Keliling: K = 2\u03c0r = \u03c0d
di mana r adalah jari-jari dan d adalah diameter lingkaran.

Luas lingkaran adalah besarnya daerah yang dilingkupi oleh lingkaran tersebut.

Rumus Luas: L = \u03c0r\u00b2

Contoh: Lingkaran dengan jari-jari 7 cm memiliki keliling = 2 \u00d7 (22/7) \u00d7 7 = 44 cm dan luas = (22/7) \u00d7 7\u00b2 = 154 cm\u00b2.`,
      },
    ],
    rumus: [
      { label: 'Keliling Lingkaran', formula: 'K = 2\u03c0r = \u03c0d' },
      { label: 'Luas Lingkaran', formula: 'L = \u03c0r\u00b2' },
      { label: 'Panjang Busur', formula: 'l = (\u03b1/360\u00b0) \u00d7 2\u03c0r' },
      { label: 'Luas Juring', formula: 'L_j = (\u03b1/360\u00b0) \u00d7 \u03c0r\u00b2' },
    ],
    contoh: [
      {
        soal: 'Sebuah lingkaran memiliki jari-jari 10 cm. Hitunglah keliling dan luasnya!',
        solusi: [
          'Diketahui: r = 10 cm, \u03c0 = 3,14',
          'Keliling = 2\u03c0r = 2 \u00d7 3,14 \u00d7 10 = 62,8 cm',
          'Luas = \u03c0r\u00b2 = 3,14 \u00d7 10\u00b2 = 3,14 \u00d7 100 = 314 cm\u00b2',
        ],
      },
    ],
  },
};
