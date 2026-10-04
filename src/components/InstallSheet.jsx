import { useEffect, useState } from 'react'
import { X, Share } from 'lucide-react'
import { PonselChat } from './Illustrations.jsx'
import { useShell } from '../lib/shell.js'
import { load, save } from '../lib/storage.js'

const SNOOZE = 7 * 24 * 3600 * 1000

// Peringatan pemasangan PWA: muncul sekali setelah beberapa detik, bisa ditunda 7 hari.
export default function InstallSheet() {
  const { install } = useShell()
  const [show, setShow] = useState(false)
  useEffect(() => {
    if (!install.canInstall) return setShow(false)
    const until = load('install-snooze') || 0
    if (Date.now() < until) return
    const t = setTimeout(() => setShow(true), 4500)
    return () => clearTimeout(t)
  }, [install.canInstall])
  useEffect(() => {
    const h = () => setShow(true)
    window.addEventListener('educancer:install-help', h)
    return () => window.removeEventListener('educancer:install-help', h)
  }, [])
  if (!show) return null
  const later = () => { save('install-snooze', Date.now() + SNOOZE); setShow(false) }
  return (
    <div role="dialog" aria-label="Pasang aplikasi Educancer" className="pop glass fixed inset-x-3 bottom-24 z-30 mx-auto max-w-md rounded-[2rem] p-4 lg:bottom-6 lg:left-6 lg:right-auto lg:mx-0">
      <button onClick={later} aria-label="Tutup" className="absolute right-2 top-2 grid size-11 place-items-center rounded-full text-muted hover:bg-pale/60"><X size={18} /></button>
      <div className="flex gap-4 pr-8">
        <PonselChat className="size-20 shrink-0" />
        <div>
          <p className="font-display text-lg font-semibold leading-tight">Pasang Educancer di layar utama</p>
          {install.hasPrompt
            ? <p className="mt-1 text-sm text-muted">Dibuka seperti aplikasi, dan materi yang sudah dibuka tetap terbaca tanpa internet.</p>
            : <p className="mt-1 text-sm text-muted">Di iPhone, ketuk <Share size={14} className="inline -translate-y-px" aria-label="Bagikan" /> lalu pilih Tambah ke Layar Utama.</p>}
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button onClick={later} className="btn btn-soft !min-h-11">Nanti saja</button>
        {install.hasPrompt && <button onClick={async () => { await install.prompt(); setShow(false) }} className="btn btn-primary !min-h-11">Pasang</button>}
      </div>
    </div>
  )
}
