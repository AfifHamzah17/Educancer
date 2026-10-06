import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, X, MapPin, Download, ArrowUp, HeartHandshake } from 'lucide-react'
import { useShell } from '../lib/shell.js'
import { useEscape } from '../lib/hooks.js'

// Tombol aksi mengambang dengan menu yang mekar ke atas.
export default function Fab() {
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  const { openApk } = useShell()
  useEscape(open, () => setOpen(false))
  useEffect(() => {
    if (!open) return
    const h = (e) => { if (!box.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', h)
    return () => document.removeEventListener('pointerdown', h)
  }, [open])

  const item = 'btn btn-soft glass !min-h-12 gap-3 !rounded-full !pl-5 !pr-2 text-sm'
  const ico = 'grid size-9 place-items-center rounded-full bg-pale text-brand-ink'
  const close = () => setOpen(false)
  return (
    <div ref={box} className="pointer-events-none fixed bottom-24 right-4 z-30 flex flex-col items-end gap-3 lg:bottom-8 lg:right-8">
      <div id="fab-menu" data-open={open} className="flex flex-col items-end gap-2.5">
        <Link to="/konsultasi" onClick={close} style={{ '--i': 3 }} className={`fab-item ${item}`} tabIndex={open ? 0 : -1}>Tanya tim<span className={ico}><HeartHandshake size={18} aria-hidden /></span></Link>
        <Link to="/lokasi" onClick={close} style={{ '--i': 2 }} className={`fab-item ${item}`} tabIndex={open ? 0 : -1}>Lokasi RSUD<span className={ico}><MapPin size={18} aria-hidden /></span></Link>
        <button onClick={() => { close(); openApk() }} style={{ '--i': 1 }} className={`fab-item ${item}`} tabIndex={open ? 0 : -1}>Unduh APK<span className={ico}><Download size={18} aria-hidden /></span></button>
        <button onClick={() => { close(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} style={{ '--i': 0 }} className={`fab-item ${item}`} tabIndex={open ? 0 : -1}>Ke atas<span className={ico}><ArrowUp size={18} aria-hidden /></span></button>
      </div>
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="fab-menu" aria-label={open ? 'Tutup menu cepat' : 'Buka menu cepat'}
        className="btn btn-primary pointer-events-auto !size-16 !min-h-16 !rounded-[1.4rem] !p-0 shadow-soft">
        {open ? <X size={26} aria-hidden /> : <MessageCircle size={26} aria-hidden />}
      </button>
    </div>
  )
}