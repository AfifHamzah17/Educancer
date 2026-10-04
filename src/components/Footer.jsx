import { Link } from 'react-router-dom'
import { MapPin, Phone, Globe } from 'lucide-react'
import { RS } from '../data/contact.js'
import { NAV } from '../data/nav.js'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line/70 pb-32 pt-12 lg:pb-12">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/images/logo-rsud.png" alt="RSUD Provinsi NTB" width="360" height="360" className="size-14" />
            <img src="/images/logo-pkrs.png" alt="PKRS RSUD Provinsi NTB" width="360" height="360" className="size-14" />
          </div>
          <p className="mt-4 max-w-sm leading-relaxed text-muted">Educancer disusun oleh tim Promosi Kesehatan Rumah Sakit (PKRS) RSUD Provinsi NTB. Skor kuis disimpan hanya di perangkat Anda.</p>
        </div>
        <nav aria-label="Tautan footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="inline-flex min-h-11 items-center text-muted hover:text-brand-ink hover:underline">{n.label}</Link></li>)}
          </ul>
        </nav>
        <address className="space-y-3 not-italic text-muted">
          <p className="flex gap-3"><MapPin size={18} className="mt-1 shrink-0" aria-hidden />{RS.alamat}</p>
          <p className="flex items-center gap-3"><Phone size={18} className="shrink-0" aria-hidden /><a href={RS.teleponHref} className="hover:underline tnum">{RS.telepon}</a></p>
          <p className="flex items-center gap-3"><Globe size={18} className="shrink-0" aria-hidden /><a href={RS.web} target="_blank" rel="noopener noreferrer" className="hover:underline">{RS.webLabel}</a></p>
        </address>
      </div>
      <p className="mt-10 text-sm text-muted">Informasi di aplikasi ini bersifat edukasi dan tidak menggantikan pemeriksaan dokter. 2025 PKRS RSUD Provinsi NTB.</p>
    </footer>
  )
}
