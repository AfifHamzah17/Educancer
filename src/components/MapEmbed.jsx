import { useState } from 'react'
import { MapPin, WifiOff, ExternalLink } from 'lucide-react'
import { RS } from '../data/contact.js'
import { useOnline } from '../lib/hooks.js'

export default function MapEmbed({ className = '' }) {
  const [ready, setReady] = useState(false)
  const online = useOnline()
  return (
    <div className={`relative isolate overflow-hidden rounded-[2.5rem] bg-pale shadow-soft ${className}`}>
      {!online ? (
        <div className="grid size-full min-h-72 place-items-center p-8 text-center">
          <div><WifiOff className="mx-auto mb-3 text-brand-ink" aria-hidden /><p className="font-semibold">Peta butuh koneksi internet.</p>
            <a href={RS.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-soft mt-4">Buka di Google Maps</a></div>
        </div>
      ) : (
        <>
          {!ready && <div className="skeleton absolute inset-0 grid place-items-center" aria-busy="true"><MapPin className="text-brand-ink/60" size={32} aria-hidden /></div>}
          <iframe title={`Peta lokasi ${RS.nama}`} src={RS.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" onLoad={() => setReady(true)} className="absolute inset-0 size-full border-0" />
          <a href={RS.mapsUrl} target="_blank" rel="noopener noreferrer" className="glass absolute bottom-3 left-3 inline-flex min-h-11 items-center gap-2 rounded-2xl px-4 text-sm font-bold">
            Buka di Google Maps <ExternalLink size={14} aria-hidden />
          </a>
        </>
      )}
    </div>
  )
}
