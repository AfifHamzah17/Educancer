const V = (type, id, judul, grup) => ({
  type, id, judul, grup,
  url: type === 'ig'
    ? `https://www.instagram.com/reel/${id}/`
    : type === 'gd'
      ? `https://drive.google.com/file/d/${id}/preview` // penting: /preview, bukan /view
      : `https://www.youtube-nocookie.com/embed/${id}`,
})

export const VIDEOS = [
  V('yt', 'yJrJpTBPM4w', 'Nutrisi Untuk Pasien Kanker dengan Kemoterapi', 'Serba-serbi Kanker'),
  V('yt', 'pomiFEjKinc', 'Apa Itu Kanker Kolorektal dan Apa Saja Gejalanya ?', 'Serba-serbi Kanker'),
  V('yt', 'CplbhsdY7P0', 'Kenali Gejala Awal "KANKER PARU"', 'Serba-serbi Kanker'),
  V('ig', 'CoUBttMgzDR', 'Serba-serbi Kanker', 'Serba-serbi Kanker'),

  V('yt', 'm0mXf03LO1E', 'Mengenal Lebih Dekat Kanker', 'Penanganan'),
  V('yt', 'guysYc6584Q', 'Mari Kenali Lebih Jauh Tentang "KANKER PROSTAT"', 'Penanganan'),
  V('yt', 'P7yBca8EowA', 'Puasa Aman Bagi "PEDERITA KANKER"', 'Penanganan'),
  V('ig', 'DCadsjiO39X', 'Deteksi Dini Kanker Leher Rahim', 'Penanganan'),

  V('yt', 'k5Tf5qbLToQ', 'REHAT : "Tentang Seputar Kanker"', 'Nutrisi & Gaya Hidup'),
  V('yt', 's8LqeQqKSCU', 'Talkshow Onkologi Terpadu Pada Penderita Kanker Payudara', 'Nutrisi & Gaya Hidup'),

  V('yt', 'wJl3Bux1384', 'REHAT : "Kemoterapi Bikin Botak ?"', 'Dukungan & Perawatan'),
  V('yt', 'NO9HTkoHI1E', 'REHAT : "Radioterapi Bikin Gosong"', 'Dukungan & Perawatan'),
  V('yt', 'Ou52YY-szcU', 'Deteksi Dini Kanker Payudara dengan SADARI – SADANIS: ', 'Dukungan & Perawatan'),
  V('yt', 'G7KtlIl4HVA', 'Deteksi Dini Kanker Leher Rahim', 'Dukungan & Perawatan'),
  V('yt', 'VKcbDH96lS0', 'Cegah Kanker Serviks Sejak Dini dengan Imunisasi HPV', 'Dukungan & Perawatan'),
  V('yt', 'HmdM7JSvENc', 'Ayo Cegah Penyakit Kanker', 'Dukungan & Perawatan'),

  // Tambahan: video dari Google Drive (grup baru otomatis muncul di urutan terakhir)
  V('gd', '18eF9L0yioKu50wTCkpYbcvb3G5cLGQwK', 'Batuk Tak Kunjung Sembuh, Apakah Bisa Kanker Paru?', 'Deteksi Dini & Gejala'),
  V('gd', '1Wmh53AY1cKxi7FFv8EU7tPBVujfHyv5w', 'Sering Mimisan, Kapan Harus Curiga Kanker Nasofaring?', 'Deteksi Dini & Gejala'),
  V('gd', '1yPjLuyI5DeRhXkZo0GOBmk8fftylVmcw', '5 Gejala Hamil Anggur yang Perlu Diwaspadai', 'Deteksi Dini & Gejala'),
  V('gd', '1EVVw0xzlG4IVpcFh0V12nAAh08TL9eB6', 'Ada Benjolan di Payudara, Apakah Pasti Kanker?', 'Deteksi Dini & Gejala'),
  V('gd', '1keHf0OBzDLkZI_n0kKpe6Wzy_54kWDhC', 'BAB Berdarah, Apakah Pasti Wasir?', 'Deteksi Dini & Gejala'),
  V('gd', '19d36GiUl7VyVN_2F_ZNdLBs2Vfzuag8i', '5 Gejala Kanker Ovarium yang Perlu Diwaspadai', 'Deteksi Dini & Gejala'),
  V('gd', '1n_0TQGVnCc6bXU9dFbBENeyxVvpj9nCk', 'Mitos atau Fakta Seputar Kanker Serviks', 'Deteksi Dini & Gejala'),
  V('gd', '1is_wpjupCqcm3CGcc3QGBgjGbBmNCQ05', 'Kanker Testis: Kanker yang Bisa Menyerang Laki-Laki Usia Muda', 'Deteksi Dini & Gejala'),
]

// Urutan grup = urutan kemunculan pertama di VIDEOS
export const GRUP_VIDEO = [...new Set(VIDEOS.map((v) => v.grup))]