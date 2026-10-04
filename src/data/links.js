export const REVIEW_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdxZerCHeN2E9R6wOIgB-KI0S563aXymSTFoSY5EJwrbmTfRg/viewform'

// Folder Google Drive berisi APK Educancer versi Unity.
export const APK_URL = 'https://drive.google.com/drive/folders/1M7nLr0ITnwSwBYg984id97Wf_nu3if-D'

export const WA_NUMBER = '62817364246'
export const waLink = (text = '') =>
  `https://api.whatsapp.com/send/?phone=${WA_NUMBER}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`

export const KONSULTASI = [
  { id: 'umum', judul: 'Konsultasi umum', ket: 'Untuk masyarakat umum (non-pasien). Tanyakan gejala, pencegahan, atau layanan yang tersedia.',
    aksi: 'Hubungi lewat WhatsApp', url: waLink(), kontak: '+62 817-364-246' },
  { id: 'khusus', judul: 'Konsultasi pasien onkologi', ket: 'Khusus pasien onkologi RSUD Provinsi NTB. Grup WhatsApp Community, gratis bergabung.',
    aksi: 'Bergabung ke grup WhatsApp', url: 'https://chat.whatsapp.com/GBKPi3HDOV5HDLG0LKSoH6', kontak: 'Grup komunitas pasien' },
]

export const PROFIL_LAYANAN = [
  { id: 'poliklinik', judul: 'Layanan poliklinik onkologi', ket: 'Jadwal poliklinik dan alur pendaftaran pasien.', ikon: 'poli', url: 'https://online.pubhtml5.com/aneyy/vtgu' },
  { id: 'kemoterapi', judul: 'Layanan kemoterapi', ket: 'Informasi prosedur kemoterapi, dari persiapan sampai perawatan di rumah.', ikon: 'kemo', url: 'https://online.pubhtml5.com/aneyy/grfx' },
  { id: 'radioterapi', judul: 'Layanan radioterapi', ket: 'Informasi prosedur radioterapi dan hal yang perlu disiapkan pasien.', ikon: 'radio', url: 'https://online.pubhtml5.com/aneyy/fywr' },
]
