import { memo, useState, useEffect, useRef, useCallback } from 'react'
import { Play, ExternalLink, WifiOff, Instagram, Film } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { VIDEOS } from '../data/videos.js'
import { useOnline } from '../lib/hooks.js'

// ---------- Sumber thumbnail ----------
// yt : i.ytimg.com
// gd : drive.google.com/thumbnail → fallback lh3.googleusercontent.com (file wajib di-share "Anyone with the link")
// ig : tidak ada thumbnail publik → placeholder
const sources = (v) =>
  v.type === 'yt'
    ? [`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`]
    : [
        `https://drive.google.com/thumbnail?id=${v.id}&sz=w480`,
        `https://lh3.googleusercontent.com/d/${v.id}=w480`,
      ]

const IgPh = () => (
  <span className="grid size-full place-items-center bg-gradient-to-br from-[#1F6F8B] to-[#0F2E3B] text-white">
    <span className="text-center"><Instagram className="mx-auto mb-1" size={26} aria-hidden /><span className="text-xs font-semibold">Reel Instagram</span></span>
  </span>
)
const GdPh = () => (
  <span className="grid size-full place-items-center bg-gradient-to-br from-[#0F2E3B] to-[#1F6F8B] text-white">
    <span className="text-center"><Film className="mx-auto mb-1" size={26} aria-hidden /><span className="text-xs font-semibold">Video Drive</span></span>
  </span>
)

// Thumbnail dengan fallback berjenjang. <img> menutupi skeleton begitu termuat.
function Thumb({ v, imgClass = '' }) {
  const [n, setN] = useState(0)
  if (v.type === 'ig') return <IgPh />
  const list = sources(v)
  if (n >= list.length) return <GdPh />
  return (
    <>
      <span className="skeleton absolute inset-0" />
      <img src={list[n]} alt="" width="480" height="360" loading="lazy" decoding="async"
        onError={() => setN(n + 1)}
        className={`relative size-full object-cover ${imgClass}`} />
    </>
  )
}

// ---------- Ukur lebar elemen (untuk menskala iframe Drive di layar sempit) ----------
function useWidth(ref, dep) {
  const [w, setW] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    setW(el.getBoundingClientRect().width)
    return () => ro.disconnect()
  }, [ref, dep])
  return w
}

const GD_MIN_W = 420 // lebar minimum agar kontrol pemutar Drive muat

// Facade: iframe baru dimuat setelah pengguna menekan play (atau memilih video dari daftar).
// Player di-remount lewat `key`, jadi semua state ter-reset per video.
function Player({ v, autoStart }) {
  const [playing, setPlaying] = useState(autoStart)
  const [showCtl, setShowCtl] = useState(false) // false = kontrol Drive ditutup lapisan transparan
  const online = useOnline()
  const boxRef = useRef(null)
  const boxW = useWidth(boxRef, online)
  const ig = v.type === 'ig'
  const gd = v.type === 'gd'
  const ratio = v.ratio // undefined = 16:9 biasa
  const sized = !ig && !!ratio

  if (!online) return (
    <div className="grid aspect-video place-items-center rounded-[2rem] bg-surface p-6 text-center shadow-soft">
      <div><WifiOff className="mx-auto mb-3 text-brand-ink" size={32} aria-hidden /><p className="text-lg font-semibold">Video membutuhkan koneksi internet.</p><p className="text-muted">Materi PDF tetap bisa dibaca tanpa internet.</p></div>
    </div>
  )

  // Video dengan rasio khusus (vertikal): kotak mengikuti rasio, tinggi maksimal 70% layar
  const frameStyle = sized
    ? { width: `min(100%, calc(70dvh * ${ratio}))`, aspectRatio: String(ratio) }
    : undefined
  const frameClass = ig ? 'h-[34rem]' : sized ? '' : 'aspect-video'

  // Drive: iframe dirender selebar GD_MIN_W lalu diperkecil agar kontrolnya tidak terpotong
  const scale = gd && boxW ? Math.min(1, boxW / GD_MIN_W) : 1
  const gdW = boxW ? boxW / scale : GD_MIN_W
  const gdStyle = gd
    ? { position: 'absolute', top: 0, left: 0, width: gdW, height: gdW / ratio,
        transform: `scale(${scale})`, transformOrigin: '0 0' }
    : undefined

  const src = ig
    ? `https://www.instagram.com/reel/${v.id}/embed/`
    : gd
      ? `${v.url}${v.url.includes('?') ? '&' : '?'}autoplay=1` // Drive tidak menjamin autoplay
      : `${v.url}?autoplay=1&rel=0&playsinline=1`

  return (
    <div>
      <div ref={boxRef} style={frameStyle} className={`relative isolate mx-auto overflow-hidden rounded-3xl bg-ink shadow-soft ${frameClass}`}>
        {playing ? (
          <>
            <iframe title={v.judul} style={gdStyle}
              className={gd ? 'border-0' : 'absolute inset-0 size-full border-0'}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen src={src} />
            {/* Lapisan transparan: menahan sentuhan agar kontrol Drive tidak muncul.
                Kalau autoplay gagal, ketuk video sekali untuk membuka kontrol. */}
            {gd && !showCtl && (
              <div className="absolute inset-0 z-10" onClick={() => setShowCtl(true)} aria-hidden />
            )}
          </>
        ) : (
          <button onClick={() => setPlaying(true)} aria-label={`Putar ${v.judul}`} className="group relative size-full">
            <Thumb v={v} imgClass="transition-transform duration-500 group-hover:scale-[1.03]" />
            <span className="absolute inset-0 grid place-items-center bg-ink/10"><span className="grid size-20 place-items-center rounded-full bg-white/95 text-brand shadow-soft transition-transform duration-300 group-hover:scale-110 group-active:scale-95"><Play size={30} fill="currentColor" aria-hidden /></span></span>
          </button>
        )}
      </div>
      {ig && <a href={v.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 font-bold text-brand-ink">Buka di Instagram <ExternalLink size={16} aria-hidden /></a>}
      {gd && (
        <div className="flex flex-wrap items-center gap-x-5">
          <a href={v.url.replace('/preview', '/view')} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 font-bold text-brand-ink">Buka di Google Drive <ExternalLink size={16} aria-hidden /></a>
          {playing && (
            <button onClick={() => setShowCtl((s) => !s)} className="mt-3 inline-flex min-h-11 items-center font-bold text-brand-ink underline-offset-4 hover:underline">
              {showCtl ? 'Sembunyikan kontrol' : 'Tampilkan kontrol'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

const Row = memo(function Row({ v, active, onPick }) {
  return (
    <button onClick={() => onPick(v)} aria-current={active} className={`flex w-full items-center gap-4 rounded-[1.5rem] p-2.5 pr-4 text-left transition-all duration-300 active:scale-[.98] ${active ? 'bg-brand text-white shadow-soft' : 'bg-surface shadow-soft hover:-translate-y-0.5'}`}>
      <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-2xl bg-pale">
        <Thumb v={v} />
      </span>
      <span className="font-semibold leading-snug">{v.judul}</span>
    </button>
  )
})

export default function Video() {
  const [cur, setCur] = useState(VIDEOS[0])
  const [auto, setAuto] = useState(false) // video pertama tidak autoplay, hanya yang dipilih dari daftar
  const playerRef = useRef(null)

  const pick = useCallback((v) => {
    setCur(v)
    setAuto(true)
    // Di mobile daftar ada di bawah player → gulir ke player
    if (window.matchMedia('(max-width: 1023px)').matches) {
      playerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <main>
      <PageHeader title="Video edukasi" crumbs={[{ to: '/menu', label: 'Beranda' }, { label: 'Video' }]} art="video"
        lead={`${VIDEOS.length} video singkat dari tim RSUD Provinsi NTB. Pilih satu dari daftar, lalu tekan putar.`} />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_26rem]">
        <div ref={playerRef} className="scroll-mt-24 space-y-4 lg:sticky lg:top-28">
          <Player key={cur.id} v={cur} autoStart={auto} />
          <h2 className="text-2xl font-semibold">{cur.judul}</h2>
        </div>
        <div className="space-y-3 pb-28 lg:max-h-[calc(100dvh-9rem)] lg:overflow-y-auto lg:p-1 lg:pb-1" aria-label="Daftar video">
          {VIDEOS.map((v) => <Row key={v.id} v={v} active={v === cur} onPick={pick} />)}
        </div>
      </div>
    </main>
  )
}