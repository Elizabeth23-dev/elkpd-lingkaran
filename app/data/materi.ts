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
    subtitle: 'Garis Singgung',
    description: 'Pelajari pengertian garis singgung lingkaran dan sifat-sifatnya.',
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
      waktu: 60,
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
      waktu: 60,
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
      waktu: 60,
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
      waktu: 90,
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
      waktu: 90,
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
      waktu: 60,
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
      waktu: 90,
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
      waktu: 90,
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
      waktu: 120,
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
      waktu: 90,
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
      waktu: 120,
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
      waktu: 120,
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
      waktu: 90,
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
      waktu: 90,
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
      waktu: 120,
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
      waktu: 60,
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
      waktu: 90,
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
      waktu: 90,
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
      waktu: 120,
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
      waktu: 60,
    },
    {
      id: 21,
      tipe: 'berpikir-kritis',
      pertanyaan: 'Sebuah sprinkler berputar membentuk sudut pusat 90° dan menjangkau 21 meter. Petani ingin tahu apakah luas siramannya cukup 400 m².\n\na. Apa saja yang perlu dihitung untuk menjawab pertanyaan petani?\n\nb. Tuliskan data yang diketahui dari soal.\n\nc. Hitunglah panjang busur dan luas juring sapuan sprinkler! (π = 22/7)\n\nd. Mengapa area yang disiram berbentuk juring? Jelaskan secara geometris.\n\ne. Apakah luas siraman cukup 400 m²? Jika tidak, apa solusinya?',
      pilihan: [],
      jawabanBenar: -1,
      penjelasan: '(a) Yang perlu dihitung: panjang busur dan luas juring sapuan sprinkler, lalu dibandingkan dengan target 400 m².\n(b) Data: sudut pusat α = 90°, jari-jari r = 21 m, target = 400 m², π = 22/7.\n(c) Panjang busur l = (90/360) × 2 × (22/7) × 21 = (1/4) × 132 = 33 m. Luas juring L = (90/360) × (22/7) × 21² = (1/4) × 1386 = 346,5 m².\n(d) Sprinkler berputar dari satu titik (pusat) hanya pada sudut 90°, bukan 360° penuh. Areanya dibatasi dua jari-jari dan satu busur — itulah definisi juring.\n(e) Tidak cukup, karena 346,5 m² < 400 m². Solusi: perpanjang jari-jari (jangkauan), karena luas juring sebanding dengan r² — lebih efektif daripada memperbesar sudut yang hanya berbanding lurus.',
      kesulitan: 'sulit',
      skor: 25,
      waktu: 600,
    },
    {
      id: 22,
      tipe: 'berpikir-kritis',
      pertanyaan: 'Sebuah sprinkler berputar membentuk sudut pusat 60° dan menjangkau 42 meter. Petani ingin tahu apakah luas siramannya cukup 800 m².\n\na. Apa saja yang perlu dihitung untuk menjawab pertanyaan petani?\n\nb. Tuliskan data yang diketahui dari soal.\n\nc. Hitunglah panjang busur dan luas juring sapuan sprinkler! (π = 22/7)\n\nd. Mengapa area yang disiram berbentuk juring? Jelaskan secara geometris.\n\ne. Apakah luas siraman cukup 800 m²? Jika tidak, apa solusinya?',
      pilihan: [],
      jawabanBenar: -1,
      penjelasan: '(a) Yang perlu dihitung: panjang busur dan luas juring sapuan sprinkler, lalu dibandingkan dengan target 800 m².\n(b) Data: sudut pusat α = 60°, jari-jari r = 42 m, target = 800 m², π = 22/7.\n(c) Panjang busur l = (60/360) × 2 × (22/7) × 42 = (1/6) × 264 = 44 m. Luas juring L = (60/360) × (22/7) × 42² = (1/6) × 5544 = 924 m².\n(d) Sprinkler berputar dari satu titik (pusat) hanya pada sudut 60°, bukan 360° penuh. Areanya dibatasi dua jari-jari dan satu busur — itulah definisi juring.\n(e) Sudah cukup, karena 924 m² > 800 m². Tidak perlu tindakan tambahan; namun jika target diperbesar, perpanjang jari-jari karena luas juring sebanding dengan r² — lebih efektif daripada memperbesar sudut.',
      kesulitan: 'sulit',
      skor: 25,
      waktu: 600,
    },
  ],
  'lingkaran-garis-singgung': [
    {
      id: 1,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Garis singgung lingkaran adalah garis yang memiliki tepat berapa titik persekutuan dengan lingkaran?',
      pilihan: ['Tidak ada', 'Tepat satu titik', 'Dua titik', 'Tiga titik'],
      jawabanBenar: 1,
      penjelasan: 'Garis singgung lingkaran adalah garis yang memiliki tepat satu titik persekutuan dengan lingkaran. Titik tersebut disebut titik singgung.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 60,
    },
    {
      id: 2,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Hubungan antara garis singgung lingkaran dan jari-jari di titik singgung adalah...',
      pilihan: ['Sejajar', 'Tegak lurus (membentuk sudut 90°)', 'Membentuk sudut 45°', 'Membentuk sudut 60°'],
      jawabanBenar: 1,
      penjelasan: 'Sifat utama garis singgung lingkaran: selalu tegak lurus terhadap jari-jari di titik singgung, sehingga sudut yang terbentuk antara keduanya adalah 90°.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 60,
    },
    {
      id: 3,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dari titik di luar lingkaran, berapa banyak garis singgung yang dapat ditarik ke lingkaran tersebut?',
      pilihan: ['Tidak ada', 'Tepat satu', 'Tepat dua', 'Tak terhingga'],
      jawabanBenar: 2,
      penjelasan: 'Dari satu titik di luar lingkaran, dapat ditarik tepat dua garis singgung ke lingkaran tersebut, dan kedua garis singgung itu memiliki panjang yang sama.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 60,
    },
    {
      id: 4,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sebuah garis menyentuh lingkaran di dua titik berbeda. Garis tersebut disebut...',
      pilihan: ['Garis singgung', 'Garis potong (sekans)', 'Tali busur', 'Apotema'],
      jawabanBenar: 1,
      penjelasan: 'Garis yang memiliki dua titik persekutuan dengan lingkaran disebut garis potong (sekans), bukan garis singgung. Garis singgung hanya menyentuh lingkaran di tepat satu titik.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 60,
    },
    {
      id: 5,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dua garis singgung PA dan PB ditarik dari titik P di luar lingkaran. Pernyataan yang benar adalah...',
      pilihan: ['PA > PB', 'PA < PB', 'PA = PB', 'PA + PB = diameter'],
      jawabanBenar: 2,
      penjelasan: 'Dua garis singgung yang ditarik dari satu titik di luar lingkaran selalu memiliki panjang yang sama, sehingga PA = PB.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 60,
    },
    {
      id: 6,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Garis singgung berbeda dari tali busur karena...',
      pilihan: ['Garis singgung melalui pusat lingkaran', 'Tali busur hanya menyentuh lingkaran di satu titik', 'Garis singgung hanya menyentuh lingkaran di satu titik, tali busur di dua titik', 'Keduanya tidak berkaitan dengan lingkaran'],
      jawabanBenar: 2,
      penjelasan: 'Tali busur menghubungkan dua titik pada lingkaran (dua titik persekutuan), sedangkan garis singgung hanya menyentuh lingkaran di tepat satu titik (titik singgung).',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 60,
    },
    {
      id: 7,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sebuah roda sepeda bergerak di atas jalan datar. Jalan berperan sebagai apa terhadap roda?',
      pilihan: ['Tali busur', 'Garis potong', 'Garis singgung', 'Jari-jari'],
      jawabanBenar: 2,
      penjelasan: 'Jalan hanya menyentuh roda di tepat satu titik (titik singgung), sehingga jalan berperan sebagai garis singgung terhadap lingkaran roda. Jari-jari roda (OT) juga tegak lurus terhadap permukaan jalan di titik sentuh.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 60,
    },
    {
      id: 11,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dari titik P di luar lingkaran, PA dan PB adalah garis singgung. Jika PA = 4x - 3 dan PB = x + 9, nilai x adalah...',
      pilihan: ['3', '4', '5', '6'],
      jawabanBenar: 1,
      penjelasan: 'Karena PA = PB: 4x - 3 = x + 9 → 3x = 12 → x = 4.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 90,
    },
    {
      id: 12,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Titik T adalah titik singgung pada lingkaran berpusat O, dan PT adalah garis singgung dari P. Jenis segitiga OTP adalah...',
      pilihan: ['Segitiga lancip di T', 'Segitiga tumpul di T', 'Segitiga siku-siku di T', 'Segitiga sama sisi'],
      jawabanBenar: 2,
      penjelasan: 'Garis singgung PT tegak lurus jari-jari OT di titik singgung T, sehingga ∠OTP = 90°. Segitiga OTP adalah segitiga siku-siku di T.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 90,
    },
    {
      id: 14,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Titik P berada tepat pada lingkaran. Berapa banyak garis singgung yang dapat dibuat dari P?',
      pilihan: ['Tidak ada', 'Tepat satu', 'Tepat dua', 'Tak terhingga'],
      jawabanBenar: 1,
      penjelasan: 'Jika P tepat berada pada lingkaran, hanya ada satu garis singgung yang dapat dibuat di P, yaitu garis yang tegak lurus jari-jari OP di titik P.',
      kesulitan: 'sedang',
      skor: 10,
      waktu: 90,
    },
    {
      id: 17,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Jika garis menyentuh lingkaran di tepat satu titik dan tegak lurus dengan jari-jari di titik itu, garis tersebut disebut...',
      pilihan: ['Garis potong', 'Garis sekan', 'Garis singgung', 'Tali busur'],
      jawabanBenar: 2,
      penjelasan: 'Garis singgung adalah garis yang menyentuh lingkaran di tepat satu titik dan selalu tegak lurus terhadap jari-jari di titik singgung.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 60,
    },
    {
      id: 18,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Seutas kawat tegak lurus terhadap jari-jari di titik T pada lingkaran berjari-jari 7 cm. Kawat tersebut adalah...',
      pilihan: ['Diameter lingkaran', 'Garis singgung lingkaran di T', 'Garis yang melalui pusat', 'Busur lingkaran'],
      jawabanBenar: 1,
      penjelasan: 'Kawat yang tegak lurus terhadap jari-jari di suatu titik pada lingkaran merupakan garis singgung lingkaran di titik tersebut.',
      kesulitan: 'mudah',
      skor: 5,
      waktu: 60,
    },
    {
      id: 23,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Sebuah segitiga ABC memiliki lingkaran dalam (lingkaran yang menyinggung ketiga sisi segitiga). Lingkaran ini menyentuh sisi AB di titik P, sisi BC di titik Q, dan sisi CA di titik R. Berdasarkan sifat dua garis singgung dari satu titik luar lingkaran, pernyataan yang BENAR adalah...',
      pilihan: ['AP = AR', 'AP > BP selalu', 'BQ = AR', 'Tidak ada hubungan khusus antara segmen-segmen tersebut'],
      jawabanBenar: 0,
      penjelasan: 'Dari titik A di luar lingkaran dalam, ditarik dua garis singgung: AP (ke titik singgung P pada AB) dan AR (ke titik singgung R pada CA). Karena dua garis singgung dari satu titik luar selalu sama panjang, maka AP = AR. Sifat yang sama berlaku di titik B (BP = BQ) dan titik C (CQ = CR).',
      kesulitan: 'sulit',
      skor: 15,
      waktu: 120,
    },
    {
      id: 24,
      tipe: 'pilihan-ganda',
      pertanyaan: 'Dari titik P di luar lingkaran berpusat O, ditarik dua garis singgung PA dan PB (A dan B adalah titik-titik singgung). Bentuk bangun datar OAPB yang terbentuk adalah...',
      pilihan: ['Persegi panjang', 'Layang-layang', 'Trapesium siku-siku', 'Jajar genjang'],
      jawabanBenar: 1,
      penjelasan: 'Pada bangun OAPB: OA = OB = r (jari-jari sama panjang), dan PA = PB (dua garis singgung dari titik luar memiliki panjang sama). Bangun yang memiliki dua pasang sisi berdekatan sama panjang adalah layang-layang. Selain itu, OA \u22a5 PA dan OB \u22a5 PB karena sifat garis singgung tegak lurus jari-jari di titik singgung.',
      kesulitan: 'sulit',
      skor: 15,
      waktu: 120,
    },
    {
      id: 21,
      tipe: 'berpikir-kritis',
      pertanyaan: 'Roda sebuah motor berjari-jari 35 cm sedang berjalan di atas jalan aspal yang rata. Di titik T roda menyentuh jalan.\n\na. Berapa banyak titik persentuhan antara roda dan jalan? Jelaskan mengapa!\n\nb. Bagaimana hubungan antara jari-jari OT dan permukaan jalan di titik T?\n\nc. Apakah jalan termasuk garis singgung atau garis potong terhadap roda? Berikan alasanmu!\n\nd. Apa perbedaan antara garis singgung dan garis potong (sekans)?\n\ne. Seorang teman berpendapat roda menyentuh jalan di dua titik agar lebih stabil. Apakah benar? Jelaskan alasanmu!',
      pilihan: [],
      jawabanBenar: -1,
      penjelasan: '(a) Hanya 1 titik (titik T). Karena roda berbentuk lingkaran dan jalan adalah garis lurus yang hanya menyentuhnya di satu titik.\n(b) Jari-jari OT tegak lurus (90°) terhadap permukaan jalan di titik T.\n(c) Jalan adalah garis singgung, karena hanya memiliki satu titik persekutuan dengan roda (titik T).\n(d) Garis singgung: tepat 1 titik persekutuan. Garis potong (sekans): 2 titik persekutuan, artinya memotong lingkaran.\n(e) Pendapat SALAH. Dua titik sentuhan berarti jalan memotong roda (jadi garis potong) — roda akan terbenam ke dalam jalan, yang mustahil secara fisik. Satu titik sentuh yang benar memungkinkan roda menggelinding bebas.',
      kesulitan: 'sulit',
      skor: 25,
      waktu: 600,
    },
    {
      id: 22,
      tipe: 'berpikir-kritis',
      pertanyaan: 'Roda sebuah gerobak berjari-jari 42 cm sedang berjalan di atas lantai yang rata. Di titik T roda menyentuh lantai.\n\na. Berapa banyak titik persentuhan antara roda dan lantai? Jelaskan mengapa!\n\nb. Bagaimana hubungan antara jari-jari OT dan permukaan lantai di titik T?\n\nc. Apakah lantai termasuk garis singgung atau garis potong terhadap roda? Berikan alasanmu!\n\nd. Apa perbedaan antara garis singgung dan garis potong (sekans)?\n\ne. Seorang teman berpendapat roda menyentuh lantai di dua titik agar lebih stabil. Apakah benar? Jelaskan alasanmu!',
      pilihan: [],
      jawabanBenar: -1,
      penjelasan: '(a) Hanya 1 titik (titik T). Karena roda berbentuk lingkaran dan lantai adalah garis lurus yang hanya menyentuhnya di satu titik.\n(b) Jari-jari OT tegak lurus (90°) terhadap permukaan lantai di titik T.\n(c) Lantai adalah garis singgung, karena hanya memiliki satu titik persekutuan dengan roda (titik T).\n(d) Garis singgung: tepat 1 titik persekutuan. Garis potong (sekans): 2 titik persekutuan, artinya memotong lingkaran.\n(e) Pendapat SALAH. Dua titik sentuhan berarti lantai memotong roda (jadi garis potong) — roda akan terbenam ke dalam lantai, yang mustahil secara fisik. Satu titik sentuh yang benar memungkinkan roda menggelinding bebas.',
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
      waktu: 60,
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
      waktu: 60,
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
      waktu: 90,
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
      waktu: 60,
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
      waktu: 90,
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
      waktu: 60,
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
      waktu: 60,
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
      waktu: 90,
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
      waktu: 90,
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
      waktu: 60,
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
      waktu: 90,
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
      waktu: 60,
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
      waktu: 90,
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
      waktu: 90,
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
      waktu: 60,
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
      waktu: 90,
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
      waktu: 60,
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
      waktu: 90,
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
      waktu: 120,
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
      waktu: 60,
    },
    {
      id: 21,
      tipe: 'berpikir-kritis',
      pertanyaan: 'Sebuah kolam ikan berbentuk lingkaran memiliki keliling 88 m. Pemiliknya ingin membuat jalur pejalan kaki melingkar di luar kolam dengan lebar 7 m, lalu memasang lampu hias setiap 11 m di sepanjang tepian luar jalur tersebut.\n\na. Identifikasi semua hal yang perlu dihitung dari situasi kolam dan jalur ini. Apa inti permasalahannya?\n\nb. Tuliskan semua data yang tersedia. Fakta mana yang paling menentukan dalam perhitungan luas jalur?\n\nc. Hitunglah: (1) Jari-jari kolam, (2) Luas jalur pejalan kaki, (3) Jumlah lampu hias. Gunakan π = 22/7.\n\nd. Mengapa luas jalur dihitung sebagai selisih dua lingkaran, bukan hanya keliling dikali lebar? Jelaskan asumsi geometris yang mendasarinya!\n\ne. Jika anggaran pembuatan jalur adalah Rp500.000/m², apakah anggaran Rp200.000.000 cukup? Jika tidak, tentukan strategi paling efektif untuk menghemat biaya tanpa menghilangkan fungsi jalur!',
      pilihan: [],
      jawabanBenar: -1,
      penjelasan: '(a) Dari situasi ini, hal-hal yang perlu dihitung meliputi: (1) Jari-jari kolam, karena yang diketahui hanyalah keliling, (2) Luas jalur pejalan kaki yang mengelilingi kolam, dan (3) Jumlah lampu hias yang dibutuhkan di tepian luar jalur. Inti permasalahannya adalah bagaimana menentukan ukuran-ukuran tersebut dari informasi keliling kolam, lebar jalur, dan jarak antar lampu yang diberikan.\n(b) Data: K = 88 m, lebar jalur = 7 m, jarak lampu = 11 m, π = 22/7, harga = Rp500.000/m². Fakta paling menentukan: jari-jari kolam (r) — menjadi dasar semua perhitungan selanjutnya.\n(c) (1) K = 2πr → 88 = 2×(22/7)×r → r = 14 m. (2) R = 14+7 = 21 m. Luas jalur = πR² − πr² = (22/7)(441−196) = (22/7)×245 = 770 m². (3) Keliling luar = 2πR = 2×(22/7)×21 = 132 m. Jumlah lampu = 132/11 = 12 lampu.\n(d) Luas jalur = selisih dua lingkaran konsentris (berjari-jari r dan R), bukan keliling × lebar — karena jalur melingkar bukan persegi panjang. Asumsi: jalur seragam lebarnya di seluruh keliling, sehingga R = r + lebar jalur.\n(e) Biaya = 770 × 500.000 = Rp385.000.000. Anggaran Rp200.000.000 TIDAK cukup. Strategi hemat: (1) Kurangi lebar jalur menjadi 3 m → biaya lebih rendah. (2) Gunakan material lebih murah (paving block). (3) Buat jalur sebagian saja (setengah keliling) → potong biaya 50%.',
      kesulitan: 'sulit',
      skor: 25,
      waktu: 600,
    },
    {
      id: 22,
      tipe: 'berpikir-kritis',
      pertanyaan: 'Sebuah kolam ikan berbentuk lingkaran memiliki keliling 132 m. Pemiliknya ingin membuat jalur pejalan kaki melingkar di luar kolam dengan lebar 14 m, lalu memasang lampu hias setiap 11 m di sepanjang tepian luar jalur tersebut.\n\na. Identifikasi semua hal yang perlu dihitung dari situasi kolam dan jalur ini. Apa inti permasalahannya?\n\nb. Tuliskan semua data yang tersedia. Fakta mana yang paling menentukan dalam perhitungan luas jalur?\n\nc. Hitunglah: (1) Jari-jari kolam, (2) Luas jalur pejalan kaki, (3) Jumlah lampu hias. Gunakan π = 22/7.\n\nd. Mengapa luas jalur dihitung sebagai selisih dua lingkaran, bukan hanya keliling dikali lebar? Jelaskan asumsi geometris yang mendasarinya!\n\ne. Jika anggaran pembuatan jalur adalah Rp600.000/m², apakah anggaran Rp1.000.000.000 cukup? Jika tidak, tentukan strategi paling efektif untuk menghemat biaya tanpa menghilangkan fungsi jalur!',
      pilihan: [],
      jawabanBenar: -1,
      penjelasan: '(a) Dari situasi ini, hal-hal yang perlu dihitung meliputi: (1) Jari-jari kolam, karena yang diketahui hanyalah keliling, (2) Luas jalur pejalan kaki yang mengelilingi kolam, dan (3) Jumlah lampu hias yang dibutuhkan di tepian luar jalur. Inti permasalahannya adalah bagaimana menentukan ukuran-ukuran tersebut dari informasi keliling kolam, lebar jalur, dan jarak antar lampu yang diberikan.\n(b) Data: K = 132 m, lebar jalur = 14 m, jarak lampu = 11 m, π = 22/7, harga = Rp600.000/m². Fakta paling menentukan: jari-jari kolam (r) — menjadi dasar semua perhitungan selanjutnya.\n(c) (1) K = 2πr → 132 = 2×(22/7)×r → r = 21 m. (2) R = 21+14 = 35 m. Luas jalur = πR² − πr² = (22/7)(1225−441) = (22/7)×784 = 2464 m². (3) Keliling luar = 2πR = 2×(22/7)×35 = 220 m. Jumlah lampu = 220/11 = 20 lampu.\n(d) Luas jalur = selisih dua lingkaran konsentris (berjari-jari r dan R), bukan keliling × lebar — karena jalur melingkar bukan persegi panjang. Asumsi: jalur seragam lebarnya di seluruh keliling, sehingga R = r + lebar jalur.\n(e) Biaya = 2464 × 600.000 = Rp1.478.400.000. Anggaran Rp1.000.000.000 TIDAK cukup. Strategi hemat: (1) Kurangi lebar jalur menjadi 7 m → biaya lebih rendah. (2) Gunakan material lebih murah (paving block). (3) Buat jalur sebagian saja (setengah keliling) → potong biaya 50%.',
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
l = (α/360°) × 2πr

Luas Juring adalah luas daerah yang dibatasi oleh dua jari-jari dan sebuah busur lingkaran. Luas juring juga sebanding dengan besar sudut pusat.

Rumus Luas Juring:
L = (α/360°) × πr²

di mana \u03b1 adalah besar sudut pusat (dalam derajat) dan r adalah jari-jari lingkaran.`
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
        soal: 'Sebuah sprinkler berputar membentuk sudut pusat 120° dan menjangkau 14 meter. Petani ingin tahu apakah luas siramannya cukup 600 m².\n\na. Apa saja yang perlu dihitung untuk menjawab pertanyaan petani?\n\nb. Tuliskan data yang diketahui dari soal.\n\nc. Hitunglah panjang busur dan luas juring sapuan sprinkler! (π = 22/7)\n\nd. Mengapa area yang disiram berbentuk juring? Jelaskan secara geometris.\n\ne. Apakah luas siraman cukup 600 m²? Jika tidak, apa solusinya?',
        solusi: [
          '(a) Yang perlu dihitung: panjang busur dan luas juring sapuan sprinkler, lalu dibandingkan dengan target 600 m².',
          '(b) Data: sudut pusat α = 120°, jari-jari r = 14 m, target = 600 m², π = 22/7.',
          '(c) Panjang busur l = (120/360) × 2 × (22/7) × 14 = (1/3) × 88 = 29,33 m. Luas juring L = (120/360) × (22/7) × 14² = (1/3) × 616 = 205,33 m².',
          '(d) Sprinkler berputar dari satu titik (pusat) hanya pada sudut 120°, bukan 360° penuh. Areanya dibatasi dua jari-jari dan satu busur — itulah definisi juring.',
          '(e) Tidak cukup, karena 205,33 m² < 600 m². Solusi: perpanjang jari-jari (jangkauan), karena luas juring sebanding dengan r² — lebih efektif daripada memperbesar sudut yang hanya berbanding lurus.'
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
        soal: 'Roda sebuah sepeda berjari-jari 28 cm sedang berjalan di atas jalan yang rata. Di titik T roda menyentuh jalan.\n\na. Berapa banyak titik persentuhan antara roda dan jalan? Jelaskan mengapa!\n\nb. Bagaimana hubungan antara jari-jari OT dan permukaan jalan di titik T?\n\nc. Apakah jalan termasuk garis singgung atau garis potong terhadap roda? Berikan alasanmu!\n\nd. Apa perbedaan antara garis singgung dan garis potong (sekans)?\n\ne. Seorang teman berpendapat roda menyentuh jalan di dua titik agar lebih stabil. Apakah benar? Jelaskan alasanmu!',
        solusi: [
          '(a) Hanya 1 titik (titik T). Karena roda berbentuk lingkaran dan jalan adalah garis lurus yang hanya menyentuhnya di satu titik.',
          '(b) Jari-jari OT tegak lurus (90°) terhadap permukaan jalan di titik T.',
          '(c) Jalan adalah garis singgung, karena hanya memiliki satu titik persekutuan dengan roda (titik T).',
          '(d) Garis singgung: tepat 1 titik persekutuan. Garis potong (sekans): 2 titik persekutuan, artinya memotong lingkaran.',
          '(e) Pendapat SALAH. Dua titik sentuhan berarti jalan memotong roda (jadi garis potong) — roda akan terbenam ke dalam jalan, yang mustahil secara fisik. Satu titik sentuh yang benar memungkinkan roda menggelinding bebas.'
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
        soal: 'Sebuah kolam ikan berbentuk lingkaran memiliki keliling 44 m. Pemiliknya ingin membuat jalur pejalan kaki melingkar di luar kolam dengan lebar 2 m, lalu memasang lampu hias setiap 4 m di sepanjang tepian luar jalur tersebut.\n\na. Identifikasi semua hal yang perlu dihitung dari situasi kolam dan jalur ini. Apa inti permasalahannya?\n\nb. Tuliskan semua data yang tersedia. Fakta mana yang paling menentukan dalam perhitungan luas jalur?\n\nc. Hitunglah: (1) Jari-jari kolam, (2) Luas jalur pejalan kaki, (3) Jumlah lampu hias. Gunakan π = 22/7.\n\nd. Mengapa luas jalur dihitung sebagai selisih dua lingkaran, bukan hanya keliling dikali lebar? Jelaskan asumsi geometris yang mendasarinya!\n\ne. Jika anggaran pembuatan jalur adalah Rp800.000/m², apakah anggaran Rp3.000.000 cukup? Jika tidak, tentukan strategi paling efektif untuk menghemat biaya tanpa menghilangkan fungsi jalur!',
        solusi: [
          '(a) Dari situasi ini, hal-hal yang perlu dihitung meliputi: (1) Jari-jari kolam, karena yang diketahui hanyalah keliling, (2) Luas jalur pejalan kaki yang mengelilingi kolam, dan (3) Jumlah lampu hias yang dibutuhkan di tepian luar jalur. Inti permasalahannya adalah bagaimana menentukan ukuran-ukuran tersebut dari informasi keliling kolam, lebar jalur, dan jarak antar lampu yang diberikan.',
          '(b) Data: K = 44 m, lebar jalur = 2 m, jarak lampu = 4 m, π = 22/7, harga = Rp800.000/m². Fakta paling menentukan: jari-jari kolam (r) — menjadi dasar semua perhitungan selanjutnya.',
          '(c) (1) K = 2πr → 44 = 2×(22/7)×r → r = 7 m. (2) R = 7+2 = 9 m. Luas jalur = πR² − πr² = (22/7)(81−49) = (22/7)×32 ≈ 100,57 m². (3) Keliling luar = 2πR = 2×(22/7)×9 ≈ 56,57 m. Jumlah lampu = 56,57/4 ≈ 15 lampu.',
          '(d) Luas jalur = selisih dua lingkaran konsentris (berjari-jari r dan R), bukan keliling × lebar — karena jalur melingkar bukan persegi panjang. Asumsi: jalur seragam lebarnya di seluruh keliling, sehingga R = r + lebar jalur.',
          '(e) Biaya = 100,57 × 800.000 ≈ Rp80.456.000. Anggaran Rp3.000.000 jauh TIDAK cukup. Strategi hemat: (1) Kurangi lebar jalur menjadi 0,5 m → biaya lebih rendah. (2) Gunakan material lebih murah (paving block). (3) Buat jalur sebagian saja (setengah keliling) → potong biaya 50%.',
        ],
      },
    ],
  },
};

/** Jumlah soal berpikir-kritis per sesi latihan */
export const MAX_BERPIKIR_KRITIS = 1;
/** Jumlah soal pilihan-ganda per sesi latihan */
export const MAX_PILIHAN_GANDA = 14;

/**
 * Bangun urutan soal latihan untuk satu topik:
 * 1 soal berpikir-kritis di urutan pertama, diikuti maksimum 14 soal pilihan-ganda.
 *
 * Urutan ini harus konsisten antara siswa (saat mengerjakan & melihat hasil) dan
 * admin (saat melihat rekap), karena jawaban + foto essay disimpan ber-key pada
 * indeks daftar ini.
 */
export function buildSoalList(topicId: string): SoalItem[] {
  const allSoal = soalPerTopik[topicId] ?? soalPerTopik['definisi-unsur'] ?? [];
  return [
    ...allSoal.filter((s) => s.tipe === 'berpikir-kritis').slice(0, MAX_BERPIKIR_KRITIS),
    ...allSoal.filter((s) => s.tipe !== 'berpikir-kritis').slice(0, MAX_PILIHAN_GANDA),
  ];
}
