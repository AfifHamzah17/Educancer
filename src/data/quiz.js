// Soal: { q, o: pilihan, a: indeks jawaban benar }. 4 pilihan ganda + 1 benar/salah per topik.
const mc = (q, o, a) => ({ q, o, a: 'ABCD'.indexOf(a) })
const tf = (q, v) => ({ q, o: ['Benar', 'Salah'], a: v ? 0 : 1 })

export const QUIZ = {
  payudara: [
    mc('Apa yang dimaksud dengan kanker payudara?', ['Pembengkakan biasa pada payudara', 'Sel di jaringan payudara tumbuh cepat dan tidak terkendali', 'Rasa nyeri karena menyusui', 'Luka ringan pada kulit payudara'], 'B'),
    tf('Wanita berusia di atas 40 tahun lebih rentan terkena kanker payudara.', true),
    mc('Salah satu cara pencegahan kanker payudara adalah...', ['Tidak pernah berolahraga', 'Merokok setiap hari', 'Menjaga berat badan tetap ideal', 'Menghindari semua makanan berprotein'], 'C'),
    mc('Tanda atau gejala kanker payudara yang perlu diwaspadai adalah...', ['Benjolan atau bentuk payudara tidak simetris', 'Rambut rontok', 'Sakit gigi', 'Mata merah'], 'A'),
    mc('SADARI adalah kegiatan untuk...', ['Memeriksa tekanan darah sendiri', 'Memeriksa payudara sendiri untuk deteksi dini', 'Mengukur berat badan setiap hari', 'Menghindari makanan manis'], 'B'),
  ],
  ovarium: [
    mc('Apa yang dimaksud dengan kanker ovarium?', ['Pertumbuhan sel tidak terkendali di indung telur', 'Nyeri biasa saat menstruasi', 'Infeksi ringan pada rahim', 'Pembengkakan pada lambung'], 'A'),
    tf('Wanita berusia di atas 50 tahun lebih rentan terkena kanker ovarium.', true),
    mc('Salah satu faktor risiko kanker ovarium adalah...', ['Minum air putih', 'Merokok', 'Olahraga teratur', 'Makan sayur dan buah'], 'B'),
    mc('Gejala kanker ovarium yang perlu diwaspadai adalah...', ['Perut kembung dan sakit perut', 'Gatal di telinga', 'Batuk ringan', 'Mata berair'], 'A'),
    mc('Pemeriksaan yang dapat digunakan untuk deteksi dini kanker ovarium adalah...', ['Tes pendengaran', 'USG transvaginal', 'Pemeriksaan gigi', 'Tes buta warna'], 'B'),
  ],
  rektum: [
    mc('Apa yang dimaksud dengan kanker rektum?', ['Pertumbuhan sel tidak beraturan pada rektum', 'Sakit perut biasa setelah makan', 'Luka ringan di kulit', 'Gangguan pada paru-paru'], 'A'),
    tf('Rektum adalah bagian terakhir dari usus besar.', true),
    mc('Salah satu faktor risiko kanker rektum adalah...', ['Rajin berolahraga', 'Memiliki riwayat keluarga dengan kanker rektum atau kanker usus besar', 'Minum air putih cukup', 'Makan buah dan sayur'], 'B'),
    mc('Tanda atau gejala kanker rektum yang perlu diwaspadai adalah...', ['Adanya lendir atau darah saat buang air besar', 'Rambut cepat panjang', 'Telinga berdenging', 'Kulit tangan kering'], 'A'),
    mc('Pemeriksaan yang dapat membantu mendeteksi kanker rektum adalah...', ['Kolonoskopi', 'Tes pendengaran', 'Pemeriksaan mata', 'Tes alergi makanan'], 'A'),
  ],
  nhl: [
    mc('Apa yang dimaksud dengan NHL?', ['Kanker yang berkembang pada sistem limfatik atau getah bening', 'Penyakit kulit ringan', 'Gangguan pada saluran pencernaan', 'Infeksi biasa pada tenggorokan'], 'A'),
    tf('Sistem limfatik memiliki peran penting dalam imunitas atau daya tahan tubuh.', true),
    mc('Salah satu faktor risiko kanker NHL adalah...', ['Daya tahan tubuh yang lemah', 'Tidur cukup', 'Rutin berolahraga', 'Makan makanan bergizi seimbang'], 'A'),
    mc('Gejala kanker NHL yang perlu diwaspadai adalah...', ['Pembengkakan kelenjar getah bening yang tidak terasa sakit', 'Kuku tumbuh lebih cepat', 'Mata terasa perih saat membaca', 'Sakit gigi ringan'], 'A'),
    mc('Pemeriksaan yang dapat dilakukan untuk mendeteksi kanker NHL adalah...', ['Biopsi jaringan getah bening', 'Tes pendengaran', 'Pemeriksaan gigi', 'Tes buta warna'], 'A'),
  ],
  testis: [
    mc('Apa yang dimaksud dengan kanker testis?', ['Tumor ganas yang tumbuh di testis atau buah zakar', 'Infeksi ringan pada kulit', 'Gangguan pada lambung', 'Penyakit pada paru-paru'], 'A'),
    tf('Kanker testis umumnya dapat ditandai dengan benjolan yang tidak terasa nyeri pada salah satu testis.', true),
    mc('Salah satu faktor risiko kanker testis adalah...', ['Berolahraga rutin', 'Konsumsi makanan bergizi', 'Kriptorkismus atau testis tidak turun', 'Minum air putih cukup'], 'C'),
    mc('Salah satu cara pencegahan kanker testis adalah...', ['Berhenti merokok', 'Mengabaikan benjolan di testis', 'Tidak melakukan pemeriksaan mandiri', 'Menghindari olahraga'], 'A'),
    mc('Deteksi dini kanker testis dapat dilakukan dengan...', ['Pemeriksaan testis secara mandiri', 'Tes pendengaran', 'Pemeriksaan gigi', 'Tes penglihatan'], 'A'),
  ],
  kss: [
    mc('Apa yang dimaksud dengan Karsinoma Sel Skuamosa (KSS)?', ['Jenis kanker kulit yang mengenai lapisan epidermis bagian bawah', 'Penyakit ringan pada rambut', 'Infeksi biasa pada kuku', 'Gangguan pada saluran pencernaan'], 'A'),
    tf('KSS paling sering menyerang bagian tubuh yang sering terkena sinar matahari.', true),
    mc('Salah satu faktor risiko KSS adalah...', ['Terpapar sinar ultraviolet secara terus-menerus', 'Minum air putih cukup', 'Tidur teratur', 'Makan buah dan sayur'], 'A'),
    mc('Salah satu cara pencegahan KSS adalah...', ['Mengurangi paparan radiasi UV', 'Tidak memakai tabir surya', 'Membiarkan luka kulit menahun', 'Sering menggunakan mesin tanning'], 'A'),
    mc('Deteksi dini kanker kulit dapat dilakukan dengan SAKURI, yaitu...', ['Periksa kulit sendiri', 'Periksa tekanan darah sendiri', 'Periksa gigi sendiri', 'Periksa pendengaran sendiri'], 'A'),
  ],
  paru: [
    mc('Apa yang dimaksud dengan kanker paru?', ['Kanker yang terbentuk di paru-paru', 'Gangguan ringan pada tenggorokan', 'Infeksi biasa pada hidung', 'Penyakit pada tulang belakang'], 'A'),
    tf('Kanker paru hanya dapat terjadi pada orang yang merokok.', false),
    mc('Salah satu faktor risiko kanker paru adalah...', ['Paparan asap rokok', 'Minum air putih cukup', 'Tidur teratur', 'Makan buah dan sayur'], 'A'),
    mc('Salah satu cara pencegahan kanker paru adalah...', ['Berhenti merokok', 'Sering berada di dekat asap rokok', 'Mengabaikan olahraga', 'Sering terpapar zat kimia berbahaya'], 'A'),
    mc('Gejala kanker paru yang perlu diwaspadai adalah...', ['Batuk berkelanjutan dan bertambah parah', 'Kuku cepat panjang', 'Rambut mudah kusut', 'Gatal ringan di tangan'], 'A'),
  ],
  serviks: [
    mc('Apa yang dimaksud dengan kanker serviks?', ['Kanker yang muncul pada sel-sel di leher rahim', 'Kanker yang muncul pada paru-paru', 'Infeksi ringan pada kulit', 'Gangguan pada lambung'], 'A'),
    tf('Kanker serviks berkaitan erat dengan infeksi Human Papillomavirus atau HPV.', true),
    mc('Salah satu cara pencegahan kanker serviks adalah...', ['Mendapatkan vaksinasi HPV', 'Merokok setiap hari', 'Menghindari pemeriksaan pap smear', 'Melakukan hubungan seksual pada usia dini'], 'A'),
    mc('Salah satu tanda atau gejala kanker serviks yang perlu diwaspadai adalah...', ['Perdarahan yang tidak wajar dari vagina', 'Rambut cepat panjang', 'Telinga berdenging ringan', 'Kuku mudah patah'], 'A'),
    mc('Pap smear dilakukan untuk...', ['Mendeteksi sel-sel pada leher rahim yang berpotensi menjadi kanker', 'Mengukur tekanan darah', 'Memeriksa kesehatan gigi', 'Mengobati batuk'], 'A'),
  ],
  nasofaring: [
    mc('Apa yang dimaksud dengan Karsinoma Nasofaring?', ['Kanker ganas yang muncul di area atas tenggorok dan belakang hidung', 'Infeksi ringan pada kulit', 'Gangguan pada lambung', 'Penyakit pada tulang kaki'], 'A'),
    tf('Karsinoma nasofaring lebih sering terjadi pada pria daripada wanita.', true),
    mc('Salah satu faktor risiko Karsinoma Nasofaring adalah...', ['Konsumsi makanan yang diawetkan dan diasinkan', 'Minum air putih cukup', 'Tidur teratur', 'Olahraga rutin'], 'A'),
    mc('Salah satu gejala Karsinoma Nasofaring yang perlu diwaspadai adalah...', ['Mimisan berulang', 'Kuku cepat panjang', 'Rambut mudah kusut', 'Gatal ringan di tangan'], 'A'),
    mc('Salah satu pemeriksaan untuk mendeteksi Karsinoma Nasofaring adalah...', ['Nasofaringoskopi atau nasoendoskopi', 'Tes pendengaran biasa', 'Pemeriksaan gigi', 'Tes buta warna'], 'A'),
  ],
  trofoblastik: [
    mc('Apa yang dimaksud dengan Trofoblastik Gestasional?', ['Sekelompok penyakit yang terjadi pada kehamilan tidak normal', 'Penyakit kulit ringan', 'Gangguan pada paru-paru', 'Infeksi biasa pada lambung'], 'A'),
    tf('Trofoblastik gestasional dapat menyebabkan embrio atau bakal janin tidak terbentuk setelah pembuahan.', true),
    mc('Salah satu jenis penyakit trofoblastik gestasional adalah...', ['Hamil anggur', 'Batuk pilek', 'Tekanan darah rendah biasa', 'Sakit gigi'], 'A'),
    mc('Salah satu tanda atau gejala trofoblastik gestasional adalah...', ['Perdarahan dari vagina di luar siklus menstruasi', 'Rambut cepat panjang', 'Mata terasa gatal', 'Kuku mudah patah'], 'A'),
    mc('Salah satu penanganan trofoblastik gestasional adalah...', ['Kuretase', 'Tes pendengaran', 'Pemeriksaan gigi', 'Terapi pijat biasa tanpa pemeriksaan dokter'], 'A'),
  ],
}
