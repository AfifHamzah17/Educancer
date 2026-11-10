import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Stethoscope, Syringe, Radiation, ArrowUpRight, Star, MapPin, X } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Spot from '../components/Spot.jsx'
import { PROFIL_LAYANAN } from '../data/links.js'
import { RS } from '../data/contact.js'

const ICON = { poli: Stethoscope, kemo: Syringe, radio: Radiation }

// Lightbox sederhana: overlay + gambar diperbesar, tutup via klik luar / ✕ / Esc
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden' // kunci scroll halaman belakang
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])
  return (
    <div role="dialog" aria-modal="true" aria-label={alt} onClick={onClose}
      className="fixed inset-0 z-50 grid cursor-zoom-out place-items-center bg-ink/90 p-4 sm:p-8">
      <img src={src} alt={alt} onClick={(e) => e.stopPropagation()}
        className="max-h-[92dvh] max-w-full cursor-zoom-in rounded-[1.5rem] object-contain shadow-soft" />
      <button onClick={onClose} aria-label="Tutup gambar jadwal"
        className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/95 text-brand shadow-soft transition-transform duration-200 hover:scale-105 active:scale-95">
        <X size={22} aria-hidden />
      </button>
    </div>
  )
}

export default function ProfilLayanan() {
  const [zoom, setZoom] = useState(false)
  return (
    <main>
      <PageHeader title="Profil layanan onkologi" crumbs={[{ to: '/menu', label: 'Beranda' }, { label: 'Layanan onkologi' }]}
        lead="Tiga layanan kanker di RSUD Provinsi NTB. Buka profil lengkap tiap layanan untuk jadwal dan prosedurnya." />

      <section className="relative overflow-hidden rounded-[2.5rem] shadow-soft" aria-label="RSUD Provinsi NTB">
        <img src="/images/bg-rsud.webp" alt="Gedung RSUD Provinsi NTB dilihat dari udara" width="1280" height="720" className="aspect-[16/10] w-full object-cover sm:aspect-[21/9]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2E3B]/80 via-[#0F2E3B]/10 to-transparent" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 text-white sm:p-10">
          <div className="flex items-center gap-4">
            <img src="/images/logo-rsud.png" alt="" width="360" height="360" className="size-14 rounded-full bg-white p-1 sm:size-16" />
            <div><p className="font-display text-2xl font-semibold sm:text-4xl">RSUD Provinsi NTB</p><p className="text-white/85">Melayani dengan tulus dan santun</p></div>
          </div>
          <Link to="/lokasi" className="btn glass !text-ink"><MapPin size={18} aria-hidden />Lokasi dan kontak</Link>
        </div>
      </section>

      {/* Zig-zag, bukan tiga kolom sama */}
      <ul className="mt-10 space-y-5 lg:space-y-6">
        {PROFIL_LAYANAN.map((s, i) => {
          const Icon = ICON[s.ikon]
          return (
            <li key={s.id}>
              <Spot as="a" href={s.url} target="_blank" rel="noopener noreferrer"
                className={`group grid items-center gap-6 rounded-[2.5rem] bg-surface p-6 shadow-soft transition-transform duration-300 [transition-timing-function:cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 active:scale-[.99] sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:gap-10 ${i === 1 ? 'lg:ml-16' : i === 2 ? 'lg:mr-16' : ''}`}>
                <span className="grid size-20 place-items-center rounded-[1.75rem] bg-pale text-brand-ink lg:size-28"><Icon size={40} aria-hidden /></span>
                <div>
                  <h2 className="text-3xl font-semibold sm:text-4xl">{s.judul}</h2>
                  <p className="mt-2 max-w-[56ch] text-lg leading-relaxed text-muted">{s.ket}</p>
                </div>
                <span className="btn btn-primary btn-lg w-full lg:w-auto">Lihat profil lengkap</span>
              </Spot>
            </li>
          )
        })}
      </ul>

      {/* Jadwal layanan — ketuk gambar untuk memperbesar */}
      <section className="mt-10 rounded-[2.5rem] bg-surface p-6 shadow-soft sm:p-10" aria-label="Jadwal layanan onkologi">
        <h2 className="text-2xl font-semibold sm:text-3xl">Jadwal layanan onkologi</h2>
        <p className="mt-2 text-lg text-muted">Jadwal praktik dokter dan layanan kanker. Ketuk gambar untuk memperbesar.</p>
        <button type="button" onClick={() => setZoom(true)} aria-label="Perbesar gambar jadwal layanan"
          className="mt-6 block w-full cursor-zoom-in">
          <img src="/images/Jadwal.png" alt="Tabel jadwal praktik dokter layanan onkologi RSUD Provinsi NTB"
            width="1200" height="1500" loading="lazy" decoding="async"
            className="mx-auto w-full max-w-3xl rounded-[1.5rem] object-contain" />
        </button>
      </section>

      {zoom && <Lightbox src="/images/Jadwal.png" alt="Jadwal praktik dokter layanan onkologi RSUD Provinsi NTB" onClose={() => setZoom(false)} />}

      <section className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-[2.5rem] bg-pale/80 p-6 sm:p-10" aria-label="Beri ulasan">
        <div className="max-w-xl"><h2 className="text-2xl font-semibold sm:text-3xl">Beri ulasan untuk layanan kami</h2><p className="mt-2 text-lg text-ink/75">Pengalaman Anda membantu kami memperbaiki layanan dan materi Educancer.</p></div>
        <Link to="/kata-mereka" className="btn btn-primary btn-lg"><Star size={20} aria-hidden />Tulis ulasan</Link>
      </section>
      <p className="mt-6 text-sm text-muted">Pertanyaan lain? Hubungi {RS.telepon} atau lewat halaman konsultasi.</p>
    </main>
  )
}