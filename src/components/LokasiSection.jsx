import { useState } from 'react'
import { MapPin, Phone, Globe, Clock, Copy, Check, Navigation } from 'lucide-react'
import MapEmbed from './MapEmbed.jsx'
import { RS } from '../data/contact.js'

const Row = ({ icon: Icon, label, children }) => (
  <div className="flex gap-4 py-4 first:pt-0 last:pb-0">
    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-pale text-brand-ink"><Icon size={20} aria-hidden /></span>
    <div className="min-w-0"><p className="text-sm font-medium text-muted">{label}</p><div className="mt-0.5 font-semibold leading-snug">{children}</div></div>
  </div>
)

const link = 'rounded-md underline decoration-brand/40 underline-offset-4 hover:decoration-brand'

export default function LokasiSection() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(RS.alamat); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* clipboard diblokir */ }
  }
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
      <div className="flex flex-col rounded-[2.5rem] bg-surface p-6 shadow-soft sm:p-8">
        <div className="divide-y divide-line">
          <Row icon={MapPin} label="Alamat">
            <p>{RS.alamat}</p>
            <button onClick={copy} className="mt-1 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-ink">
              {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}<span aria-live="polite">{copied ? 'Alamat tersalin' : 'Salin alamat'}</span>
            </button>
          </Row>
          <Row icon={Phone} label="Telepon"><a href={RS.teleponHref} className={`${link} tnum`}>{RS.telepon}</a></Row>
          <Row icon={Globe} label="Situs resmi"><a href={RS.web} target="_blank" rel="noopener noreferrer" className={link}>{RS.webLabel}</a></Row>
          <Row icon={Clock} label="Jam konsultasi WhatsApp"><p>{RS.jamKonsultasi}</p><p className="tnum">{RS.jamKonsultasiJam}</p></Row>
        </div>
        <div className="mt-6 flex flex-wrap gap-3 pt-2 lg:mt-auto">
          <a href={RS.rutePetaUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><Navigation size={18} aria-hidden />Petunjuk arah</a>
          <a href={RS.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-soft">Lihat di Google Maps</a>
        </div>
      </div>
      <MapEmbed className="min-h-80 lg:min-h-[30rem]" />
    </div>
  )
}
