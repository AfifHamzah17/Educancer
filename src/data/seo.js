// Registry SEO per route. Key harus sama dengan path di App.jsx.
// canonical dipakai kalau URL route beda dengan URL final (mis. '/menu' → '/')

export const SEO = {
  '/menu': {
    title: '', // kosong = pakai judul default situs
    canonical: '/',
    description:
      'Platform edukasi kanker gratis dari RSUD Provinsi NTB: modul 10 jenis kanker, video edukasi, kuis, tanya jawab, dan konsultasi WhatsApp oleh tenaga kesehatan lintas profesi.',
  },
  '/materi': {
    title: 'Materi Edukasi Kanker',
    description:
      'Modul edukasi 10 jenis kanker — payudara, ovarium, rektum, nasofaring, serviks, paru, testis, dan lainnya — disusun tenaga kesehatan RSUD Provinsi NTB. Bisa dibaca ulang tanpa internet.',
  },
  '/video': {
    title: 'Video Edukasi Kanker',
    description:
      '16 video edukasi kanker dari dokter dan tenaga kesehatan RSUD Provinsi NTB: gejala, deteksi dini, kemoterapi, radioterapi, dan nutrisi pasien kanker.',
  },
  '/quiz': {
    title: 'Kuis Kanker per Topik',
    description:
      'Uji pemahamanmu lewat kuis 5 soal untuk 10 jenis kanker. Gratis, bisa diulang kapan saja, skor tersimpan di perangkatmu.',
  },
  '/faq': {
    title: 'Tanya Jawab Seputar Kanker',
    description:
      '15 pertanyaan yang paling sering diajukan pasien dan keluarga: apakah kanker menular, mitos gula, herbal vs kemoterapi, puasa saat kanker, dan lainnya.',
  },
  '/konsultasi': {
    title: 'Konsultasi Online Kanker',
    description:
      'Konsultasi kanker lewat WhatsApp RSUD Provinsi NTB, Senin–Jumat pukul 08.00–15.00 WITA. Ditanggapi tenaga kesehatan.',
  },
  '/layanan': {
    title: 'Layanan Onkologi RSUD Provinsi NTB',
    description:
      'Poliklinik onkologi, kemoterapi, dan radioterapi di RSUD Provinsi NTB — jadwal praktik, prosedur, dan persiapan pasien.',
  },
  '/kata-mereka': {
    title: 'Ulasan Pengguna',
    description:
      'Ulasan asli pengguna Educancer: pasien, keluarga, dan masyarakat NTB yang memakai materi edukasi kanker ini.',
  },
  '/lokasi': {
    title: 'Lokasi & Kontak RSUD Provinsi NTB',
    description:
      'Alamat, telepon, dan petunjuk arah RSUD Provinsi NTB di Jl. Jaya Lengkara, Dasan Cermen, Mataram, NTB.',
  },
}

// JSON-LD FAQPage — dibangun otomatis dari data FAQ.
// Menerima field q/a, pertanyaan/jawaban, atau question/answer.
export const faqJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.q ?? f.pertanyaan ?? f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.a ?? f.jawaban ?? f.answer },
  })),
})

// JSON-LD MedicalWebPage untuk halaman detail materi
export const materiJsonLd = (t) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  name: t?.judul,
  inLanguage: 'id',
  about: { '@type': 'MedicalCondition', name: t?.judul },
  publisher: { '@type': 'Organization', name: 'PKRS RSUD Provinsi NTB' },
  isAccessibleForFree: true,
})