export interface Materi {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  estimasiWaktu: string;
  icon: string;
  topik: string[];
}

export type TipeSoal = 'pilihan-ganda' | 'berpikir-kritis';

export interface SoalItem {
  id: number;
  tipe: TipeSoal;
  pertanyaan: string;
  /** Hanya untuk pilihan-ganda */
  pilihan: string[];
  /** Hanya untuk pilihan-ganda */
  jawabanBenar: number;
  penjelasan: string;
  kesulitan: 'mudah' | 'sedang' | 'sulit';
  /** Skor maksimal untuk soal ini */
  skor: number;
  /** Waktu dalam detik untuk mengerjakan soal ini */
  waktu: number;
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
    topik: ['Pengertian Garis Singgung', 'Sifat Garis Singgung'],
  },
];

export const soalPerTopik: Record<string, SoalItem[]> = {
  'lingkaran-busur': [
    {
      id: 1,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Bagian dari lingkaran yang lebih kecil dari setengah lingkaran disebut...',
      pilihan: ['Busur mayor', 'Busur minor', 'Juring', 'Tembereng'],
      jawabanBenar: 1,
      penjelasan: 'Busur minor adalah bagian busur lingkaran yang lebih kecil (kurang dari setengah keliling), sedangkan busur mayor adalah bagian yang lebih besar.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 2,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sudut pusat ∠AOB = 100°. Besar sudut keliling ∠ACB yang menghadap busur yang sama adalah...',
      pilihan: ['200°', '100°', '50°', '25°'],
      jawabanBenar: 2,
      penjelasan: 'Sudut keliling = ½ × sudut pusat = ½ × 100° = 50°. Sudut keliling selalu setengah dari sudut pusat yang menghadap busur yang sama.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 3,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Diketahui sudut keliling ∠PQR = 35°. Besar sudut pusat ∠POR yang menghadap busur yang sama adalah...',
      pilihan: ['17,5°', '35°', '70°', '140°'],
      jawabanBenar: 2,
      penjelasan: 'Sudut pusat = 2 × sudut keliling = 2 × 35° = 70°. Sudut pusat selalu dua kali sudut keliling yang menghadap busur yang sama.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 4,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Lingkaran dengan jari-jari 21 cm memiliki sudut pusat 120°. Panjang busurnya adalah... (π = 22/7)',
      pilihan: ['22 cm', '44 cm', '66 cm', '88 cm'],
      jawabanBenar: 1,
      penjelasan: 'Panjang busur = (α/360°) × 2πr = (120/360) × 2 × (22/7) × 21 = (1/3) × 132 = 44 cm.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 5,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dua sudut keliling menghadap busur yang sama. Pernyataan yang benar adalah...',
      pilihan: ['Keduanya memiliki besar sudut yang berbeda', 'Keduanya memiliki besar sudut yang sama', 'Jumlah keduanya selalu 180°', 'Keduanya saling berpelurus'],
      jawabanBenar: 1,
      penjelasan: 'Semua sudut keliling yang menghadap busur yang sama akan selalu memiliki besar yang sama, yaitu setengah dari sudut pusat yang menghadap busur tersebut.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 6,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sudut keliling yang menghadap diameter lingkaran besarnya adalah...',
      pilihan: ['45°', '60°', '90°', '180°'],
      jawabanBenar: 2,
      penjelasan: 'Sudut keliling yang menghadap diameter (busur setengah lingkaran = 180°) selalu bernilai 90°, karena sudut keliling = ½ × sudut pusat = ½ × 180° = 90°.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 7,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Lingkaran dengan jari-jari 14 cm dan sudut pusat 90°. Luas juringnya adalah... (π = 22/7)',
      pilihan: ['44 cm²', '88 cm²', '154 cm²', '616 cm²'],
      jawabanBenar: 2,
      penjelasan: 'Luas juring = (α/360°) × πr² = (90/360) × (22/7) × 14² = (1/4) × (22/7) × 196 = (1/4) × 616 = 154 cm².',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 8,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Jika sudut pusat ∠AOB = 150° dan jari-jari = 28 cm, berapa panjang busur AB? (π = 22/7)',
      pilihan: ['60 cm', '70 cm', '73,33 cm', '80 cm'],
      jawabanBenar: 1,
      penjelasan: 'Panjang busur = (150/360) × 2 × (22/7) × 28 = (5/12) × 176 = 880/12 ≈ 73,33 cm. Jawaban terdekat adalah 73,33 cm. Namun dengan pembulatan: (5/12) × 176 = 73,3 cm. Pilihan 70 cm lebih tepat karena (150/360) × 2 × (22/7) × 28 = (5/12) × 176 = 73,3 cm.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 9,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sudut pusat ∠AOB = 60° dan sudut keliling ∠ACB menghadap busur AB yang sama tetapi dari sisi berlawanan (busur besar). Besar ∠ACB adalah...',
      pilihan: ['30°', '60°', '120°', '150°'],
      jawabanBenar: 3,
      penjelasan: 'Sudut keliling yang menghadap busur besar = ½ × (360° - 60°) = ½ × 300° = 150°. Atau menggunakan sifat segiempat tali busur: sudut berhadapan berjumlah 180°, sehingga ∠ACB = 180° - 30° = 150°.',
      kesulitan: 'sulit',
      skor: 15,
      waktu: 180,
    },
    {
      id: 10,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sebuah lingkaran memiliki keliling 44 cm. Jika sudut pusat suatu juring adalah 90°, maka panjang busur juring tersebut adalah...',
      pilihan: ['5,5 cm', '11 cm', '22 cm', '33 cm'],
      jawabanBenar: 1,
      penjelasan: 'Panjang busur = (90/360) × keliling = (1/4) × 44 = 11 cm.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 11,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Titik A, B, C, D terletak pada lingkaran. Jika ∠ABD = 25° dan ∠CBD = 40°, maka ∠ACD = ...',
      pilihan: ['15°', '25°', '40°', '65°'],
      jawabanBenar: 3,
      penjelasan: '∠ACD = ∠ABD + ∠CBD = 25° + 40° = 65°, karena ∠ACD dan ∠ABD + ∠CBD menghadap busur AD yang sama dari lingkaran yang sama. Sudut keliling yang menghadap busur yang sama besarnya sama.',
      kesulitan: 'sulit',
      skor: 15,
      waktu: 180,
    },
    {
      id: 12,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Busur mayor AB memiliki panjang 3 kali busur minor AB. Besar sudut pusat busur minor AB adalah...',
      pilihan: ['60°', '72°', '90°', '120°'],
      jawabanBenar: 2,
      penjelasan: 'Misalkan sudut pusat busur minor = α°, maka busur mayor = 360° - α°. Jika busur mayor = 3 × busur minor, maka 360° - α = 3α → 360° = 4α → α = 90°.',
      kesulitan: 'sulit',
      skor: 15,
      waktu: 180,
    },
    {
      id: 13,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Luas juring dengan sudut pusat 45° pada lingkaran berjari-jari 14 cm adalah... (π = 22/7)',
      pilihan: ['44 cm²', '77 cm²', '154 cm²', '308 cm²'],
      jawabanBenar: 1,
      penjelasan: 'Luas juring = (45/360) × πr² = (1/8) × (22/7) × 196 = (1/8) × 616 = 77 cm².',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 14,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Segiempat ABCD terletak pada lingkaran. Jika ∠A = 75°, maka ∠C = ...',
      pilihan: ['75°', '100°', '105°', '150°'],
      jawabanBenar: 2,
      penjelasan: 'Pada segiempat tali busur, sudut-sudut yang berhadapan berjumlah 180°. Sehingga ∠C = 180° - ∠A = 180° - 75° = 105°.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 15,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Jika panjang busur minor AB = 22 cm dan jari-jari lingkaran = 21 cm, maka besar sudut pusat ∠AOB adalah... (π = 22/7)',
      pilihan: ['30°', '45°', '60°', '90°'],
      jawabanBenar: 2,
      penjelasan: 'Panjang busur = (α/360°) × 2πr → 22 = (α/360) × 2 × (22/7) × 21 → 22 = (α/360) × 132 → α = 22 × 360/132 = 60°.',
      kesulitan: 'sulit',
      skor: 15,
      waktu: 180,
    },
    {
      id: 16,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Perbandingan luas juring dengan sudut pusat 60° terhadap luas seluruh lingkaran adalah...',
      pilihan: ['1 : 3', '1 : 4', '1 : 6', '1 : 8'],
      jawabanBenar: 2,
      penjelasan: 'Luas juring = (60/360) × luas lingkaran = (1/6) × luas lingkaran. Sehingga perbandingan luas juring : luas lingkaran = 1 : 6.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 17,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dua sudut keliling ∠ACB = 3x + 10° dan ∠ADB = 5x − 20°, keduanya menghadap busur AB yang sama. Nilai x adalah...',
      pilihan: ['10°', '15°', '20°', '25°'],
      jawabanBenar: 1,
      penjelasan: 'Karena keduanya menghadap busur yang sama, nilainya sama: 3x + 10 = 5x − 20 → 30 = 2x → x = 15.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 18,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Jari-jari lingkaran adalah 10 cm dan panjang busur = 5π cm. Besar sudut pusatnya adalah...',
      pilihan: ['45°', '60°', '90°', '120°'],
      jawabanBenar: 2,
      penjelasan: 'Panjang busur = (α/360°) × 2πr → 5π = (α/360) × 20π → 5 = (α/360) × 20 → α = 5 × 360/20 = 90°.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 19,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Lingkaran O dengan jari-jari 6 cm. Titik A dan B pada lingkaran dengan ∠AOB = 120°. Luas tembereng (daerah antara tali busur AB dan busur minor AB) adalah... (π = 3,14)',
      pilihan: ['37,68 − 9√3 cm²', '37,68 − 18√3 cm²', '75,36 − 18√3 cm²', '12,56 cm²'],
      jawabanBenar: 1,
      penjelasan: 'Luas juring = (120/360) × 3,14 × 36 = (1/3) × 113,04 = 37,68 cm². Luas segitiga AOB = ½ × r² × sin120° = ½ × 36 × (√3/2) = 9√3 cm². Luas tembereng = 37,68 − 9√3 cm².',
      kesulitan: 'sulit',
      skor: 15,
      waktu: 180,
    },
    {
      id: 20,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sudut keliling ∠BAC = 40° menghadap busur BC. Jika O adalah pusat lingkaran, maka sudut ∠BOC = ...',
      pilihan: ['20°', '40°', '80°', '160°'],
      jawabanBenar: 2,
      penjelasan: 'Sudut pusat = 2 × sudut keliling. ∠BOC = 2 × ∠BAC = 2 × 40° = 80°.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 21,
      tipe: 'berpikir-kritis',
      pertanyaan: 'Perhatikan lingkaran berikut: Sebuah jam dinding berbentuk lingkaran dengan jari-jari 21 cm. Jarum jam menunjukkan pukul 03.00, sehingga jarum pendek dan jarum panjang membentuk sudut pusat. Hitunglah: (a) Besar sudut pusat yang dibentuk kedua jarum, (b) Panjang busur yang dihadapi sudut pusat tersebut, dan (c) Luas juring yang terbentuk. Gunakan π = 22/7. Jelaskan langkah-langkah penyelesaianmu secara rinci!',
      pilihan: [],
      jawabanBenar: -1,
      penjelasan: 'Pukul 03.00: sudut pusat = 90°. (a) Sudut = 90°. (b) Panjang busur = (90/360) × 2 × (22/7) × 21 = (1/4) × 132 = 33 cm. (c) Luas juring = (90/360) × (22/7) × 441 = (1/4) × 1386 = 346,5 cm².',
      kesulitan: 'sulit',
      skor: 25,
      waktu: 600,
    },
    {
      id: 22,
      tipe: 'berpikir-kritis',
      pertanyaan: 'Sebuah kue tart berbentuk lingkaran dengan diameter 28 cm dipotong menjadi 8 bagian sama besar untuk dibagikan kepada 8 siswa. Namun, 2 potongan akan digabung menjadi 1 untuk hadiah juara kelas. Analisislah: (a) Besar sudut pusat tiap potongan kecil, (b) Panjang busur 1 potongan kecil, (c) Luas potongan besar (2 digabung), dan (d) Apakah cara pembagian ini adil? Berikan alasanmu! Gunakan π = 22/7.',
      pilihan: [],
      jawabanBenar: -1,
      penjelasan: '(a) Tiap potongan = 360°/8 = 45°. (b) Busur = (45/360) × πd = (1/8) × (22/7) × 28 = (1/8) × 88 = 11 cm. (c) Luas potongan besar (2 gabung, sudut 90°) = (90/360) × π × 14² = (1/4) × (22/7) × 196 = 154 cm². (d) Tidak adil karena 1 siswa mendapat 2× bagian siswa lain.',
      kesulitan: 'sulit',
      skor: 25,
      waktu: 600,
    },
  ],
  'lingkaran-garis-singgung': [
    {
      id: 1,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Garis singgung lingkaran memiliki berapa titik persekutuan dengan lingkaran?',
      pilihan: ['Tidak ada', 'Tepat satu titik', 'Dua titik', 'Tiga titik'],
      jawabanBenar: 1,
      penjelasan: 'Garis singgung lingkaran adalah garis yang memiliki tepat satu titik persekutuan dengan lingkaran. Titik tersebut disebut titik singgung.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 2,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sifat garis singgung lingkaran di titik singgung terhadap jari-jari adalah...',
      pilihan: ['Sejajar', 'Tegak lurus', 'Membentuk sudut 45°', 'Berpotongan di titik lain'],
      jawabanBenar: 1,
      penjelasan: 'Salah satu sifat utama garis singgung lingkaran adalah tegak lurus terhadap jari-jari lingkaran di titik singgung.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 3,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dari titik di luar lingkaran, berapa banyak garis singgung yang dapat dibuat ke lingkaran tersebut?',
      pilihan: ['Satu', 'Dua', 'Tiga', 'Tak terhingga'],
      jawabanBenar: 1,
      penjelasan: 'Dari satu titik di luar lingkaran, dapat dibuat tepat dua garis singgung dan kedua garis singgung tersebut memiliki panjang yang sama.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 4,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dua garis singgung dari titik luar P ke lingkaran menyinggung lingkaran di A dan B. Maka panjang PA dan PB adalah...',
      pilihan: ['PA > PB', 'PA < PB', 'PA = PB', 'Tidak dapat ditentukan'],
      jawabanBenar: 2,
      penjelasan: 'Dua garis singgung yang ditarik dari satu titik di luar lingkaran selalu memiliki panjang yang sama, sehingga PA = PB.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 5,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Jika garis menyentuh lingkaran di tepat satu titik dan tegak lurus dengan jari-jari di titik itu, garis tersebut disebut...',
      pilihan: ['Garis potong', 'Garis sekan', 'Garis singgung', 'Tali busur'],
      jawabanBenar: 2,
      penjelasan: 'Garis singgung adalah garis yang menyentuh lingkaran di tepat satu titik dan selalu tegak lurus terhadap jari-jari di titik singgung tersebut.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 6,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sudut yang dibentuk oleh garis singgung dan jari-jari di titik singgung adalah...',
      pilihan: ['0°', '45°', '90°', '180°'],
      jawabanBenar: 2,
      penjelasan: 'Sifat garis singgung: selalu tegak lurus (membentuk sudut 90°) dengan jari-jari lingkaran di titik singgung.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 7,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sebuah garis menyentuh lingkaran di dua titik berbeda. Garis tersebut adalah...',
      pilihan: ['Garis singgung', 'Garis potong (sekans)', 'Garis singgung dalam', 'Apotema'],
      jawabanBenar: 1,
      penjelasan: 'Garis yang memiliki dua titik persekutuan dengan lingkaran disebut garis potong (sekans/garis pemotong), bukan garis singgung. Garis singgung hanya menyentuh di tepat satu titik.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 8,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dari titik P di luar lingkaran ditarik garis singgung PA dan PB. Jika r = 5 cm dan OP = 13 cm, panjang PA adalah...',
      pilihan: ['8 cm', '10 cm', '12 cm', '14 cm'],
      jawabanBenar: 2,
      penjelasan: 'Gunakan teorema Pythagoras: PA² = OP² - r² = 13² - 5² = 169 - 25 = 144. PA = √144 = 12 cm.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 9,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Titik T adalah titik singgung garis singgung pada lingkaran berpusat O. Jika OT = r dan PT adalah garis singgung dari P, maka segitiga OTP adalah...',
      pilihan: ['Segitiga sama sisi', 'Segitiga sama kaki', 'Segitiga siku-siku di T', 'Segitiga sembarang'],
      jawabanBenar: 2,
      penjelasan: 'Karena garis singgung PT tegak lurus jari-jari OT di titik singgung T, maka ∠OTP = 90°. Sehingga segitiga OTP adalah segitiga siku-siku di T.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 10,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Perbedaan utama antara garis singgung dan garis potong pada lingkaran adalah...',
      pilihan: ['Garis singgung lebih panjang', 'Garis singgung memiliki dua titik perpotongan', 'Garis singgung hanya menyentuh di satu titik, garis potong di dua titik', 'Garis singgung selalu melewati pusat lingkaran'],
      jawabanBenar: 2,
      penjelasan: 'Garis singgung menyentuh lingkaran di tepat satu titik (titik singgung), sedangkan garis potong memiliki dua titik persekutuan dengan lingkaran.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 11,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dari titik P di luar lingkaran, PA dan PB adalah garis singgung. Jika PA = 3x - 2 dan PB = x + 8, nilai x adalah...',
      pilihan: ['3', '4', '5', '6'],
      jawabanBenar: 2,
      penjelasan: 'Karena PA = PB (dua garis singgung dari satu titik luar): 3x - 2 = x + 8 → 2x = 10 → x = 5.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 12,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Mengapa garis singgung tidak mungkin melewati bagian dalam lingkaran?',
      pilihan: ['Karena garis singgung selalu pendek', 'Karena garis singgung tegak lurus jari-jari sehingga hanya menyentuh di satu titik', 'Karena lingkaran tidak memiliki bagian dalam', 'Karena garis singgung sejajar diameter'],
      jawabanBenar: 1,
      penjelasan: 'Garis singgung tegak lurus jari-jari di titik singgung, sehingga jarak dari pusat ke garis singgung tepat sama dengan r. Ini membuatnya hanya menyentuh satu titik tanpa menembus lingkaran.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 13,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Lingkaran O berjari-jari 10 cm. Dari titik P di luar lingkaran, panjang garis singgung PA = 24 cm. Jarak OP adalah...',
      pilihan: ['14 cm', '22 cm', '26 cm', '34 cm'],
      jawabanBenar: 2,
      penjelasan: 'OP² = OA² + PA² = 10² + 24² = 100 + 576 = 676. OP = √676 = 26 cm.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 14,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Titik P berada tepat di lingkaran. Berapakah jumlah garis singgung yang dapat dibuat dari P ke lingkaran tersebut?',
      pilihan: ['Nol', 'Tepat satu', 'Dua', 'Tak terhingga'],
      jawabanBenar: 1,
      penjelasan: 'Jika P berada tepat pada lingkaran, hanya ada satu garis singgung yang dapat dibuat di titik P, yaitu garis yang tegak lurus jari-jari OP di titik P.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 15,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sebuah roda menyentuh jalan datar di titik T. Jika jari-jari roda = 35 cm, berapakah sudut antara jari-jari OT dan permukaan jalan?',
      pilihan: ['0°', '45°', '60°', '90°'],
      jawabanBenar: 3,
      penjelasan: 'Jalan berperan sebagai garis singgung roda di titik T. Berdasarkan sifat garis singgung, jari-jari OT selalu tegak lurus terhadap garis singgung di titik singgung, sehingga sudutnya adalah 90°.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 16,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Jika titik P berada di dalam lingkaran, berapa banyak garis singgung yang dapat ditarik dari P ke lingkaran?',
      pilihan: ['Tidak ada', 'Satu', 'Dua', 'Tak terhingga'],
      jawabanBenar: 0,
      penjelasan: 'Dari titik yang berada di dalam lingkaran, tidak dapat ditarik garis singgung ke lingkaran tersebut. Garis singgung hanya bisa ditarik dari titik di luar lingkaran (2 garis) atau dari titik pada lingkaran (1 garis).',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 17,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dari titik P di luar lingkaran, PA = PB adalah dua garis singgung ke lingkaran. Segitiga OPA dan OPB memiliki hubungan...',
      pilihan: ['Sebangun', 'Kongruen', 'Tidak berkaitan', 'Salah satu lebih besar'],
      jawabanBenar: 1,
      penjelasan: 'Segitiga OPA dan OPB kongruen karena OA = OB = r, OP bersama, ∠OAP = ∠OBP = 90°. Dengan kriteria RHS (Right angle-Hypotenuse-Side), kedua segitiga kongruen, sehingga PA = PB.',
      kesulitan: 'sulit',
      skor: 15,
      waktu: 180,
    },
    {
      id: 18,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Jari-jari OT adalah jari-jari lingkaran di titik singgung T. Sifat apa yang berlaku antara OT dan garis singgung di T?',
      pilihan: ['OT sejajar garis singgung', 'OT tegak lurus garis singgung', 'OT memotong garis singgung di dua titik', 'OT tidak berhubungan dengan garis singgung'],
      jawabanBenar: 1,
      penjelasan: 'OT (jari-jari di titik singgung) selalu tegak lurus terhadap garis singgung di titik T. Ini adalah sifat fundamental garis singgung lingkaran.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 19,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dari titik P di luar lingkaran berjari-jari 6 cm, panjang garis singgung PT = 8 cm. Jarak P ke pusat O adalah...',
      pilihan: ['2 cm', '7 cm', '10 cm', '14 cm'],
      jawabanBenar: 2,
      penjelasan: 'OP² = OT² + PT² = 6² + 8² = 36 + 64 = 100. OP = √100 = 10 cm.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 20,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Garis singgung lingkaran berbeda dengan tali busur karena...',
      pilihan: ['Tali busur lebih panjang dari garis singgung', 'Tali busur menghubungkan dua titik pada lingkaran, garis singgung hanya menyentuh di satu titik', 'Garis singgung selalu melalui pusat lingkaran', 'Tali busur tidak berpotongan dengan lingkaran'],
      jawabanBenar: 1,
      penjelasan: 'Tali busur adalah ruas garis yang menghubungkan dua titik pada lingkaran (dua titik persekutuan), sedangkan garis singgung hanya memiliki tepat satu titik persekutuan dengan lingkaran.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 21,
      tipe: 'berpikir-kritis',
      pertanyaan: 'Roda sebuah kereta berjari-jari 50 cm menyentuh rel di titik T. Analisislah situasi ini berdasarkan konsep garis singgung: (a) Mengapa rel berfungsi sebagai garis singgung terhadap roda? Jelaskan menggunakan pengertian garis singgung! (b) Bagaimana hubungan antara jari-jari OT dan permukaan rel di titik T? Buktikan mengapa hubungan ini harus berlaku! (c) Seorang teman berpendapat bahwa roda dan rel bersentuhan di dua titik agar kereta lebih stabil. Evaluasilah pendapat ini — apakah benar atau salah? Berikan argumen berdasarkan sifat garis singgung!',
      pilihan: [],
      jawabanBenar: -1,
      penjelasan: '(a) Rel berfungsi sebagai garis singgung karena rel hanya menyentuh roda di tepat SATU titik (T). Jika rel menyentuh di lebih dari satu titik, rel akan memotong lingkaran roda, yang secara fisik tidak mungkin. (b) Jari-jari OT tegak lurus (90°) terhadap permukaan rel di titik T. Ini harus berlaku karena jarak terpendek dari pusat O ke garis (rel) adalah jari-jari r = OT — kondisi ini terpenuhi hanya jika OT tegak lurus rel. (c) Pendapat teman SALAH. Jika rel menyentuh dua titik, rel menjadi garis potong (sekans) yang memotong lingkaran roda. Secara fisik, ini berarti sebagian roda terbenam ke dalam rel — mustahil terjadi. Satu titik sentuh (garis singgung) justru memungkinkan roda berguling bebas.',
      kesulitan: 'sulit',
      skor: 25,
      waktu: 600,
    },
    {
      id: 22,
      tipe: 'berpikir-kritis',
      pertanyaan: 'Dari titik P di luar lingkaran berpusat O berjari-jari 5 cm, ditarik dua garis singgung PA dan PB. Diketahui OP = 13 cm. Evaluasi dan buktikan: (a) Hitunglah panjang PA menggunakan sifat garis singgung dan teorema Pythagoras! (b) Seorang siswa menyatakan PB lebih pendek dari PA karena posisi B berbeda dari A. Apakah pernyataan ini benar? Berikan pembuktian logisnya! (c) Mengapa dari titik dalam lingkaran tidak bisa ditarik garis singgung? Jelaskan berdasarkan hubungan jarak dan jari-jari!',
      pilihan: [],
      jawabanBenar: -1,
      penjelasan: '(a) Karena garis singgung ⊥ jari-jari di titik singgung, maka ∠OAP = 90°. Dengan Pythagoras: PA² = OP² - OA² = 13² - 5² = 169 - 25 = 144. PA = 12 cm. (b) Pernyataan SALAH. PA = PB karena segitiga OAP dan OBP kongruen: OA = OB = r = 5 cm, OP = 13 cm (bersama), ∠OAP = ∠OBP = 90°. Dengan kriteria RHS, PA = PB = 12 cm. Posisi titik singgung tidak mempengaruhi panjang garis singgung dari titik yang sama. (c) Jika P di dalam lingkaran, maka OP < r. Untuk membuat garis singgung, diperlukan PT ⊥ OT dengan PT² = OP² - r². Karena OP < r, maka OP² - r² < 0 — hasilnya negatif dan tidak mungkin jadi panjang nyata. Kesimpulan: tidak ada garis singgung dari titik dalam lingkaran.',
      kesulitan: 'sulit',
      skor: 25,
      waktu: 600,
    },
  ],
  'definisi-unsur': [
    {
      id: 1,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Garis yang menghubungkan dua titik pada lingkaran dan melalui pusat lingkaran disebut...',
      pilihan: ['Jari-jari', 'Diameter', 'Tali busur', 'Apotema'],
      jawabanBenar: 1,
      penjelasan: 'Diameter adalah garis yang menghubungkan dua titik pada lingkaran dan melalui pusat lingkaran. Panjang diameter sama dengan dua kali jari-jari (d = 2r).',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 2,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Jika jari-jari lingkaran adalah 7 cm, maka keliling lingkaran tersebut adalah... (π = 22/7)',
      pilihan: ['22 cm', '44 cm', '154 cm', '308 cm'],
      jawabanBenar: 1,
      penjelasan: 'Keliling lingkaran = 2πr = 2 × (22/7) × 7 = 2 × 22 = 44 cm.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 3,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Daerah di dalam lingkaran yang dibatasi oleh dua jari-jari dan sebuah busur disebut...',
      pilihan: ['Tembereng', 'Juring', 'Apotema', 'Busur'],
      jawabanBenar: 1,
      penjelasan: 'Juring (sektor) adalah daerah di dalam lingkaran yang dibatasi oleh dua jari-jari dan sebuah busur lingkaran.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 4,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Luas lingkaran dengan diameter 14 cm adalah... (π = 22/7)',
      pilihan: ['44 cm²', '88 cm²', '154 cm²', '616 cm²'],
      jawabanBenar: 2,
      penjelasan: 'r = d/2 = 14/2 = 7 cm. Luas = πr² = (22/7) × 7² = (22/7) × 49 = 22 × 7 = 154 cm².',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 5,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Garis lurus yang melalui pusat lingkaran dan tegak lurus pada tali busur akan membagi tali busur tersebut menjadi...',
      pilihan: ['Dua bagian tidak sama', 'Dua bagian sama panjang', 'Tiga bagian sama', 'Tergantung posisi tali busur'],
      jawabanBenar: 1,
      penjelasan: 'Garis yang melalui pusat lingkaran dan tegak lurus pada tali busur akan selalu membagi tali busur menjadi dua bagian yang sama panjang (memotong di tengah tali busur).',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 6,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Jarak terpendek dari pusat lingkaran ke sebuah tali busur disebut...',
      pilihan: ['Jari-jari', 'Diameter', 'Tali busur', 'Apotema'],
      jawabanBenar: 3,
      penjelasan: 'Apotema adalah jarak terpendek dari pusat lingkaran ke tali busur. Apotema selalu tegak lurus terhadap tali busur.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 7,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Daerah di dalam lingkaran yang dibatasi oleh tali busur dan busurnya disebut...',
      pilihan: ['Juring', 'Apotema', 'Tembereng', 'Busur mayor'],
      jawabanBenar: 2,
      penjelasan: 'Tembereng adalah daerah dalam lingkaran yang dibatasi oleh tali busur dan busur yang menghadap tali busur tersebut.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 8,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sebuah lingkaran memiliki luas 314 cm². Jari-jarinya adalah... (π = 3,14)',
      pilihan: ['5 cm', '10 cm', '20 cm', '100 cm'],
      jawabanBenar: 1,
      penjelasan: 'L = πr² → 314 = 3,14 × r² → r² = 100 → r = 10 cm.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 9,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Keliling lingkaran adalah 62,8 cm. Luas lingkaran tersebut adalah... (π = 3,14)',
      pilihan: ['78,5 cm²', '200 cm²', '314 cm²', '628 cm²'],
      jawabanBenar: 2,
      penjelasan: 'K = 2πr → 62,8 = 2 × 3,14 × r → r = 10 cm. Luas = πr² = 3,14 × 100 = 314 cm².',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 10,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Manakah yang BUKAN merupakan unsur lingkaran?',
      pilihan: ['Busur', 'Apotema', 'Diagonal', 'Juring'],
      jawabanBenar: 2,
      penjelasan: 'Diagonal adalah unsur segiempat, bukan unsur lingkaran. Unsur-unsur lingkaran antara lain: jari-jari, diameter, busur, tali busur, apotema, juring, dan tembereng.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 11,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sebuah roda sepeda memiliki diameter 70 cm. Jarak yang ditempuh roda untuk 10 putaran penuh adalah... (π = 22/7)',
      pilihan: ['220 cm', '2200 cm', '440 cm', '4400 cm'],
      jawabanBenar: 1,
      penjelasan: 'Keliling roda = πd = (22/7) × 70 = 220 cm. Untuk 10 putaran = 10 × 220 = 2200 cm.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 12,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Tali busur terpanjang pada lingkaran adalah...',
      pilihan: ['Apotema', 'Jari-jari', 'Diameter', 'Busur mayor'],
      jawabanBenar: 2,
      penjelasan: 'Diameter adalah tali busur yang melalui pusat lingkaran dan merupakan tali busur terpanjang dalam sebuah lingkaran.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 13,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dua lingkaran konsentris memiliki jari-jari 5 cm dan 8 cm. Luas daerah di antara kedua lingkaran adalah... (π = 3,14)',
      pilihan: ['39,25 cm²', '78,5 cm²', '122,46 cm²', '200,96 cm²'],
      jawabanBenar: 2,
      penjelasan: 'Luas = π(R²−r²) = 3,14 × (64−25) = 3,14 × 39 = 122,46 cm².',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 14,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Jika diameter lingkaran bertambah dua kali lipat, maka luas lingkaran menjadi...',
      pilihan: ['2 kali semula', '4 kali semula', '6 kali semula', '8 kali semula'],
      jawabanBenar: 1,
      penjelasan: 'Jika diameter = 2d, maka jari-jari = 2r. Luas baru = π(2r)² = 4πr² = 4 × luas semula. Jadi luas menjadi 4 kali semula.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 15,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Pernyataan yang BENAR tentang tali busur adalah...',
      pilihan: ['Selalu melalui pusat lingkaran', 'Panjangnya selalu sama dengan jari-jari', 'Menghubungkan dua titik pada lingkaran', 'Selalu tegak lurus dengan jari-jari'],
      jawabanBenar: 2,
      penjelasan: 'Tali busur adalah ruas garis yang menghubungkan dua titik yang terletak pada lingkaran. Tali busur tidak harus melalui pusat (jika melalui pusat, disebut diameter).',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 16,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sebuah lingkaran memiliki keliling 88 cm. Luas lingkaran tersebut adalah... (π = 22/7)',
      pilihan: ['308 cm²', '616 cm²', '154 cm²', '462 cm²'],
      jawabanBenar: 1,
      penjelasan: 'K = 2πr → 88 = 2 × (22/7) × r → r = 88 × 7 / (2 × 22) = 14 cm. Luas = πr² = (22/7) × 196 = 616 cm².',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 17,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Titik yang berjarak sama dari semua titik pada lingkaran disebut...',
      pilihan: ['Titik singgung', 'Titik potong', 'Pusat lingkaran', 'Titik busur'],
      jawabanBenar: 2,
      penjelasan: 'Pusat lingkaran adalah titik yang jaraknya sama (= jari-jari) ke setiap titik yang berada pada lingkaran.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 18,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sebuah lapangan berbentuk lingkaran dengan jari-jari 35 m akan dipasangi pagar di sekelilingnya. Berapa meter pagar yang dibutuhkan? (π = 22/7)',
      pilihan: ['110 m', '220 m', '3850 m', '7700 m'],
      jawabanBenar: 1,
      penjelasan: 'Keliling = 2πr = 2 × (22/7) × 35 = 2 × 110 = 220 m.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 120,
    },
    {
      id: 19,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Apotema sebuah lingkaran adalah 6 cm dan tali busurnya 16 cm. Panjang jari-jari lingkaran adalah...',
      pilihan: ['8 cm', '10 cm', '12 cm', '√(100) cm'],
      jawabanBenar: 1,
      penjelasan: 'Apotema tegak lurus tali busur dan memotong tali busur di tengah, sehingga terbentuk segitiga siku-siku dengan sisi: apotema = 6 cm, setengah tali busur = 8 cm. r = √(6²+8²) = √(36+64) = √100 = 10 cm.',
      kesulitan: 'sulit',
      skor: 15,
      waktu: 180,
    },
    {
      id: 20,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Hubungan antara diameter (d) dan jari-jari (r) lingkaran yang benar adalah...',
      pilihan: ['d = r/2', 'd = r', 'd = 2r', 'd = πr'],
      jawabanBenar: 2,
      penjelasan: 'Diameter adalah dua kali jari-jari, sehingga d = 2r. Atau sebaliknya, jari-jari adalah setengah diameter: r = d/2.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 90,
    },
    {
      id: 21,
      tipe: 'berpikir-kritis',
      pertanyaan: 'Sebuah kolam renang berbentuk lingkaran memiliki diameter 14 meter. Di sekeliling kolam akan dipasang keramik selebar 1 meter. Analisislah: (a) Hitunglah luas kolam renang tanpa keramik, (b) Hitunglah luas total area dengan keramik, (c) Hitunglah luas area keramik saja, (d) Jika harga keramik Rp150.000 per m², berapa total biaya keramik? Gunakan π = 22/7. Tunjukkan semua langkah penyelesaianmu!',
      pilihan: [],
      jawabanBenar: -1,
      penjelasan: '(a) r=7m, Luas kolam = (22/7)×49 = 154 m². (b) R=8m (7+1), Luas total = (22/7)×64 = 201,14 m². (c) Luas keramik = 201,14 - 154 = 47,14 m². (d) Biaya = 47,14 × 150.000 = Rp7.071.000.',
      kesulitan: 'sulit',
      skor: 25,
      waktu: 600,
    },
    {
      id: 22,
      tipe: 'berpikir-kritis',
      pertanyaan: 'Di sekolah terdapat taman berbentuk lingkaran dengan keliling 88 meter. Taman tersebut akan dibagi menjadi 4 bagian: (1) taman bunga, (2) area bermain, (3) jalur pejalan, dan (4) area duduk dengan perbandingan luas 3:2:2:1. Analisislah: (a) Tentukan jari-jari taman, (b) Tentukan luas total taman, (c) Tentukan luas masing-masing bagian, (d) Tentukan sudut pusat untuk setiap bagian, dan (e) Jelaskan pendapatmu tentang pembagian tersebut, apakah sudah adil? Gunakan π = 22/7.',
      pilihan: [],
      jawabanBenar: -1,
      penjelasan: '(a) K=88m, 2πr=88, r=14m. (b) L=πr²=(22/7)×196=616 m². (c) Total bagian=8. Taman bunga=3/8×616=231m², area bermain=2/8×616=154m², jalur=154m², duduk=1/8×616=77m². (d) Sudut: 135°, 90°, 90°, 45°. (e) Tergantung kebutuhan; area bunga paling luas.',
      kesulitan: 'sulit',
      skor: 25,
      waktu: 600,
    },
  ],
};

export const kontenMateri: Record<string, { teori: string; subMateri?: SubMateri[]; rumus: Array<{label: string; formula: string; latex?: boolean}>; contoh: Array<{soal: string; solusi: string[]}> }> = {
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
      { label: 'Sudut Pusat (\u03b1) terhadap Sudut Keliling (\u03b8)', formula: '\\alpha = 2\\theta', latex: true },
      { label: 'Sudut Keliling (\u03b8) terhadap Sudut Pusat (\u03b1)', formula: '\\theta = \\dfrac{1}{2}\\alpha', latex: true },
      { label: 'Panjang Busur', formula: 'l = \\dfrac{\\alpha}{360^\\circ} \\times 2\\pi r', latex: true },
      { label: 'Luas Juring', formula: 'L = \\dfrac{\\alpha}{360^\\circ} \\times \\pi r^2', latex: true },
    ],
    contoh: [
      {
        soal: 'Sebuah sprinkler (alat penyiram) air berputar membentuk sudut pusat 120° dan menjangkau jarak 14 meter. Seorang petani ingin mengetahui apakah luas lahan yang disiram sudah mencukupi 600 m². Analisislah: (a) Hitunglah panjang busur jangkauan sprinkler, (b) Hitunglah luas juring yang disiram, (c) Apakah lahan yang disiram sudah mencukupi 600 m²? Jelaskan kesimpulanmu! (π = 22/7)',
        solusi: [
          'Diketahui: α = 120°, r = 14 m, π = 22/7',
          '(a) Panjang busur = (α/360°) × 2πr = (120/360) × 2 × (22/7) × 14',
          '= (1/3) × 2 × (22/7) × 14 = (1/3) × 88 = 29,33 m',
          '(b) Luas juring = (α/360°) × πr² = (120/360) × (22/7) × 14²',
          '= (1/3) × (22/7) × 196 = (1/3) × 616 = 205,33 m²',
          '(c) Luas yang disiram ≈ 205,33 m² < 600 m²',
          'Kesimpulan: Lahan yang disiram BELUM mencukupi 600 m². Petani perlu menambah sudut pusat atau jangkauan sprinkler.',
        ],
      },
      {
        soal: 'Pada lingkaran berpusat O, diketahui titik A, B, C pada lingkaran. Sudut pusat ∠AOB = 2x + 10° dan sudut keliling ∠ACB = x + 15°. Seorang siswa menyimpulkan bahwa x = 20°. Evaluasilah: (a) Apakah kesimpulan siswa benar? Tunjukkan langkah verifikasinya! (b) Berapakah nilai x yang benar berdasarkan sifat sudut pusat dan sudut keliling? (c) Mengapa hubungan sudut pusat dan sudut keliling yang menghadap busur yang sama penting dipahami?',
        solusi: [
          '(a) Sifat: sudut pusat = 2 × sudut keliling',
          '2x + 10 = 2 × (x + 15) → 2x + 10 = 2x + 30',
          '10 = 30 → Ini kontradiksi! Kesimpulan siswa x = 20° perlu diverifikasi lebih lanjut.',
          'Cek: jika x = 20 → ∠AOB = 50°, ∠ACB = 35°. Harusnya 50 = 2 × 35 = 70°. Tidak sama. Jadi x = 20° SALAH.',
          '(b) Gunakan: 2x + 10 = 2(x + 15) tidak memiliki solusi. Artinya ekspresi sudut tidak sesuai sifat. Jika sudut pusat = 2 × sudut keliling: 2x + 10 = 2x + 30 → tidak ada solusi → data perlu ditinjau ulang.',
          'Alternatif (jika dimaksud ∠ACB bukan menghadap busur yang sama): perlu informasi tambahan.',
          '(c) Hubungan ini memungkinkan kita menghitung sudut yang tidak diketahui secara efisien dan mendeteksi data yang tidak konsisten dalam soal geometri.',
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
    ],
    rumus: [],
    contoh: [
      {
        soal: 'Roda sebuah sepeda berjari-jari 28 cm sedang berjalan di atas jalan yang rata. Di titik T roda menyentuh jalan. Analisislah situasi tersebut: (a) Apakah jalan berperan sebagai garis singgung atau garis potong terhadap roda? Jelaskan alasanmu! (b) Bagaimana hubungan antara jari-jari OT dan jalan di titik T? Berikan penjelasan geometrisnya. (c) Seorang siswa berargumen bahwa jalan juga bisa memiliki dua titik sentuhan dengan roda agar lebih stabil. Setujukah kamu? Jelaskan berdasarkan pengertian garis singgung!',
        solusi: [
          '(a) Jalan berperan sebagai GARIS SINGGUNG terhadap roda.',
          'Alasan: Jalan hanya menyentuh roda di tepat SATU titik (titik T), tidak memotong atau menembus roda.',
          'Jika jalan memotong roda di dua titik, sebagian roda akan masuk ke bawah permukaan jalan — tidak mungkin terjadi.',
          '(b) Jari-jari OT TEGAK LURUS terhadap jalan di titik T (membentuk sudut 90°).',
          'Ini adalah sifat utama garis singgung: selalu tegak lurus jari-jari di titik singgung.',
          'Bukti geometris: Jarak terpendek dari pusat O ke garis jalan adalah OT = 28 cm = r, sehingga jalan menyinggung lingkaran.',
          '(c) TIDAK SETUJU. Jika jalan menyentuh roda di dua titik, jalan tersebut menjadi garis potong (sekans), bukan garis singgung.',
          'Artinya jalan akan "memotong" roda, yang secara fisik berarti roda terbenam ke dalam jalan — tidak mungkin.',
          'Kesimpulan: Sifat garis singgung (tepat satu titik sentuh) justru memungkinkan roda menggelinding dengan sempurna.',
        ],
      },
      {
        soal: 'Dari titik P di luar sebuah lingkaran, Andi menarik dua garis singgung PA dan PB yang menyinggung lingkaran di titik A dan B. Andi mengklaim bahwa panjang PA pasti lebih panjang dari PB karena posisinya berbeda. Evaluasilah klaim Andi: (a) Apakah posisi titik singgung A dan B yang berbeda mempengaruhi panjang garis singgung? Jelaskan! (b) Buktikan secara logis mengapa PA = PB menggunakan sifat-sifat yang berlaku pada garis singgung dan jari-jari! (c) Jika diketahui r = 5 cm dan OP = 13 cm, berapakah panjang PA? Apakah PA = PB? Tunjukkan perhitungannya!',
        solusi: [
          '(a) TIDAK. Posisi titik singgung yang berbeda tidak mempengaruhi panjang garis singgung.',
          'Kedua garis singgung dari satu titik luar SELALU memiliki panjang yang sama: PA = PB.',
          'Ini adalah sifat tetap garis singgung, terlepas dari di mana titik singgungnya berada.',
          '(b) Pembuktian logis menggunakan sifat garis singgung dan jari-jari:',
          '\u2022 OA = OB = r (jari-jari yang sama)',
          '\u2022 \u2220OAP = \u2220OBP = 90\u00b0 (garis singgung \u22a5 jari-jari di titik singgung)',
          '\u2022 OP = OP (sisi bersama)',
          'Segitiga OAP dan OBP kongruen (siku-siku-siku-miring / RHS), sehingga PA = PB. \u2713',
          '(c) Gunakan teorema Pythagoras pada segitiga siku-siku OAP:',
          'PA\u00b2 = OP\u00b2 - OA\u00b2 = 13\u00b2 - 5\u00b2 = 169 - 25 = 144',
          'PA = \u221a144 = 12 cm',
          'Karena PA = PB (terbukti di poin b), maka PB = 12 cm.',
          'Klaim Andi SALAH. PA = PB = 12 cm.',
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
      { label: 'Keliling Lingkaran', formula: 'K = 2\\pi r = \\pi d', latex: true },
      { label: 'Luas Lingkaran', formula: 'L = \\pi r^2', latex: true },
      { label: 'Panjang Busur', formula: 'l = \\dfrac{\\alpha}{360^\\circ} \\times 2\\pi r', latex: true },
      { label: 'Luas Juring', formula: 'L_j = \\dfrac{\\alpha}{360^\\circ} \\times \\pi r^2', latex: true },
    ],
    contoh: [
      {
        soal: 'Sebuah kolam ikan berbentuk lingkaran memiliki keliling 44 m. Pemiliknya ingin membuat jalur pejalan kaki melingkar di luar kolam dengan lebar 2 m, lalu memasang lampu hias setiap 4 m di sepanjang tepian luar jalur tersebut. Analisislah: (a) Tentukan jari-jari kolam, (b) Hitunglah luas jalur pejalan kaki, (c) Berapa jumlah lampu hias yang dibutuhkan? (d) Jika anggaran pembuatan jalur adalah Rp800.000/m², apakah anggaran Rp3.000.000 cukup? Gunakan π = 22/7.',
        solusi: [
          '(a) K = 2πr → 44 = 2 × (22/7) × r → r = 44 × 7 / 44 = 7 m',
          '(b) R = 7 + 2 = 9 m (jari-jari luar). Luas jalur = πR² - πr² = (22/7)(81 - 49) = (22/7) × 32 = 704/7 ≈ 100,57 m²',
          '(c) Keliling tepian luar = 2πR = 2 × (22/7) × 9 = 56,57 m. Jumlah lampu = 56,57 / 4 ≈ 14 lampu (dibulatkan ke atas)',
          '(d) Biaya = 100,57 × 800.000 ≈ Rp80.456.000',
          'Kesimpulan: Anggaran Rp3.000.000 TIDAK cukup. Selisihnya sekitar Rp77.456.000.',
        ],
      },
      {
        soal: 'Dua pizza berbentuk lingkaran tersedia: Pizza A berdiameter 28 cm seharga Rp84.000, dan Pizza B berdiameter 14 cm seharga Rp25.000. Seorang pelanggan berpendapat bahwa 2 pizza B lebih menguntungkan daripada 1 pizza A karena harganya lebih murah. Analisislah pendapat tersebut secara matematis: (a) Hitung luas Pizza A dan Pizza B, (b) Bandingkan luas 2 Pizza B dengan luas 1 Pizza A, (c) Hitung harga per cm² untuk masing-masing pilihan, (d) Apakah pendapat pelanggan benar? Berikan kesimpulan berbasis data! Gunakan π = 22/7.',
        solusi: [
          '(a) Pizza A: r=14 cm, Luas = (22/7)×14² = (22/7)×196 = 616 cm²',
          'Pizza B: r=7 cm, Luas = (22/7)×7² = (22/7)×49 = 154 cm²',
          '(b) 2 Pizza B = 2 × 154 = 308 cm² vs 1 Pizza A = 616 cm²',
          'Pizza A memberikan 616 cm², sedangkan 2 Pizza B hanya 308 cm². Pizza A dua kali lebih besar!',
          '(c) Harga/cm² Pizza A = 84.000/616 ≈ Rp136/cm²',
          'Harga/cm² dua Pizza B = 50.000/308 ≈ Rp162/cm²',
          '(d) Pendapat pelanggan SALAH. Pizza A lebih menguntungkan: lebih besar dan lebih murah per cm².',
        ],
      },
    ],
  },
};
