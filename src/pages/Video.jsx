import { memo, useState, useEffect } from 'react'
import { Play, ExternalLink, WifiOff, Instagram } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { VIDEOS } from '../data/videos.js'
import { useOnline } from '../lib/hooks.js'

const thumb = (v) => `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`

// Facade: iframe baru dimuat setelah pengguna menekan play.
function Player({ v }) {
  const [playing, setPlaying] = useState(false)
  const online = useOnline()
  useEffect(() => setPlaying(false), [v])
  const ig = v.type === 'ig'
  if (!online) return (
    <div className="grid aspect-video place-items-center rounded-[2rem] bg-surface p-6 text-center shadow-soft">
      <div><WifiOff className="mx-auto mb-3 text-brand-ink" size={32} aria-hidden /><p className="text-lg font-semibold">Video membutuhkan koneksi internet.</p><p className="text-muted">Materi PDF tetap bisa dibaca tanpa internet.</p></div>
    </div>
  )
  return (
    <div>
      <div className={`relative overflow-hidden rounded-[2rem] bg-ink shadow-soft ${ig ? 'h-[34rem]' : 'aspect-video'}`}>
        {playing ? (
          <iframe title={v.judul} className="size-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen
            src={ig ? `https://www.instagram.com/reel/${v.id}/embed/` : `${v.url}?autoplay=1&rel=0`} />
        ) : (
          <button onClick={() => setPlaying(true)} aria-label={`Putar ${v.judul}`} className="group relative size-full">
            {ig ? <div className="grid size-full place-items-center bg-gradient-to-br from-[#1F6F8B] to-[#0F2E3B] text-white"><div className="text-center"><Instagram className="mx-auto mb-2" size={40} aria-hidden /><p className="font-semibold">Reel Instagram</p></div></div>
                : <img src={thumb(v)} alt="" width="480" height="360" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />}
            <span className="absolute inset-0 grid place-items-center bg-ink/10"><span className="grid size-20 place-items-center rounded-full bg-white/95 text-brand shadow-soft transition-transform duration-300 group-hover:scale-110 group-active:scale-95"><Play size={30} fill="currentColor" aria-hidden /></span></span>
          </button>
        )}
      </div>
      {ig && <a href={v.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 font-bold text-brand-ink">Buka di Instagram <ExternalLink size={16} aria-hidden /></a>}
    </div>
  )
}

const Row = memo(function Row({ v, active, onPick }) {
  const [ok, setOk] = useState(false)
  return (
    <button onClick={() => onPick(v)} aria-current={active} className={`flex w-full items-center gap-4 rounded-[1.5rem] p-2.5 pr-4 text-left transition-all duration-300 active:scale-[.98] ${active ? 'bg-brand text-white shadow-soft' : 'bg-surface shadow-soft hover:-translate-y-0.5'}`}>
      <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-2xl bg-pale">
        {v.type === 'yt' ? <>
          {!ok && <span className="skeleton absolute inset-0" />}
          <img src={thumb(v)} alt="" width="480" height="360" loading="lazy" decoding="async" onLoad={() => setOk(true)} className="size-full object-cover" />
        </> : <span className="grid size-full place-items-center bg-[#0F2E3B] text-white"><Instagram aria-hidden /></span>}
      </span>
      <span className="font-semibold leading-snug">{v.judul}</span>
    </button>
  )
})

export default function Video() {
  const [cur, setCur] = useState(VIDEOS[0])
  return (
    <main>
      <PageHeader title="Video edukasi" crumbs={[{ to: '/menu', label: 'Beranda' }, { label: 'Video' }]} art="video"
        lead={`${VIDEOS.length} video singkat dari tim RSUD Provinsi NTB. Pilih satu dari daftar, lalu tekan putar.`} />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="space-y-4 lg:sticky lg:top-28">
          <Player v={cur} />
          <h2 className="text-2xl font-semibold">{cur.judul}</h2>
        </div>
        <div className="space-y-3 lg:max-h-[calc(100dvh-9rem)] lg:overflow-y-auto lg:p-1" aria-label="Daftar video">
          {VIDEOS.map((v) => <Row key={v.id} v={v} active={v === cur} onPick={setCur} />)}
        </div>
      </div>
    </main>
  )
}
