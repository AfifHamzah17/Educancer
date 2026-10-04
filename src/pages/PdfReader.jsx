import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { Document, Page, pdfjs } from 'react-pdf'
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { ChevronLeft, ChevronRight, WifiOff, FileX } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import { TOPICS } from '../data/topics.js'
import { debounce } from '../lib/debounce.js'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

export default function PdfReader() {
  const { slug } = useParams()
  const topic = TOPICS.find((t) => t.slug === slug)
  const [blob, setBlob] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ok | missing | offline
  const [n, setN] = useState(0)
  const [page, setPage] = useState(1)
  const [slider, setSlider] = useState(1)
  const [w, setW] = useState(360)
  const box = useRef(null)

  // Unduh PDF utuh (respons 200) agar service worker menyimpannya untuk mode offline.
  useEffect(() => {
    if (!topic) return
    const ac = new AbortController()
    setStatus('loading')
    fetch(topic.pdf, { signal: ac.signal })
      .then(async (r) => {
        if (!r.ok || !(r.headers.get('content-type') || '').includes('pdf')) return setStatus('missing')
        setBlob(await r.blob()); setStatus('ok')
      })
      .catch((e) => { if (e.name !== 'AbortError') setStatus(navigator.onLine ? 'missing' : 'offline') })
    return () => ac.abort()
  }, [topic])

  useEffect(() => {
    const el = box.current; if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.floor(e.contentRect.width)))
    ro.observe(el); return () => ro.disconnect()
  }, [])
  useEffect(() => setSlider(page), [page])

  const commit = useMemo(() => debounce(setPage, 150), [])
  const go = useCallback((p) => setPage(Math.min(Math.max(1, p), n || 1)), [n])
  const file = useMemo(() => blob, [blob])

  if (!topic) return <Navigate to="/materi" replace />
  const skel = <div className="skeleton w-full rounded-2xl" style={{ height: w * 1.42 }} aria-busy="true" />
  const note = (Icon, text) => (
    <div className="grid place-items-center rounded-[2rem] bg-surface p-10 text-center shadow-soft"><div><Icon className="mx-auto mb-3 text-brand-ink" size={32} aria-hidden /><p className="max-w-sm text-lg">{text}</p></div></div>
  )
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col">
      <PageHeader back="/materi" title={topic.nama} crumbs={[{ to: '/menu', label: 'Beranda' }, { to: '/materi', label: 'Materi' }, { label: topic.nama }]} />
      <div ref={box} className="flex-1">
        {status === 'loading' && skel}
        {status === 'missing' && note(FileX, 'Materi ini belum tersedia.')}
        {status === 'offline' && note(WifiOff, 'Anda sedang offline. Buka materi ini sekali saat online agar bisa dibaca tanpa internet.')}
        {status === 'ok' && (
          <Document file={file} loading={skel} error={note(FileX, 'PDF gagal dibuka.')} onLoadSuccess={(d) => setN(d.numPages)}>
            <Page pageNumber={page} width={w} renderTextLayer={false} renderAnnotationLayer={false} loading={skel} className="overflow-hidden rounded-2xl shadow-soft" />
          </Document>
        )}
      </div>
      {status === 'ok' && n > 0 && (
        <div className="glass sticky bottom-3 z-20 mt-4 space-y-2 rounded-[1.75rem] p-3">
          <input type="range" min={1} max={n} value={slider} aria-label="Lompat ke halaman" className="w-full accent-[var(--brand)]"
            onChange={(e) => { const v = +e.target.value; setSlider(v); commit(v) }} />
          <div className="flex items-center justify-between">
            <button aria-label="Halaman sebelumnya" disabled={page <= 1} onClick={() => go(page - 1)} className="btn btn-primary size-14 !min-h-14 !p-0"><ChevronLeft /></button>
            <span className="text-lg font-semibold tnum" aria-live="polite">Halaman {page} dari {n}</span>
            <button aria-label="Halaman berikutnya" disabled={page >= n} onClick={() => go(page + 1)} className="btn btn-primary size-14 !min-h-14 !p-0"><ChevronRight /></button>
          </div>
        </div>
      )}
    </main>
  )
}
