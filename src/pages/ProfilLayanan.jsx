import { Link } from 'react-router-dom'
import { Stethoscope, Syringe, Radiation, ArrowUpRight, Star, MapPin } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Spot from '../components/Spot.jsx'
import { PROFIL_LAYANAN } from '../data/links.js'
import { RS } from '../data/contact.js'

const ICON = { poli: Stethoscope, kemo: Syringe, radio: Radiation }

export default function ProfilLayanan() {
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

      <section className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-[2.5rem] bg-pale/80 p-6 sm:p-10" aria-label="Beri ulasan">
        <div className="max-w-xl"><h2 className="text-2xl font-semibold sm:text-3xl">Beri ulasan untuk layanan kami</h2><p className="mt-2 text-lg text-ink/75">Pengalaman Anda membantu kami memperbaiki layanan dan materi Educancer.</p></div>
        <Link to="/kata-mereka" className="btn btn-primary btn-lg"><Star size={20} aria-hidden />Tulis ulasan</Link>
      </section>
      <p className="mt-6 text-sm text-muted">Pertanyaan lain? Hubungi {RS.telepon} atau lewat halaman konsultasi.</p>
    </main>
  )
}
