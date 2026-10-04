import { memo, useState, useEffect, useCallback } from 'react'
import { ExternalLink, PenLine, WifiOff } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import ApkCard from '../components/ApkCard.jsx'
import Spot from '../components/Spot.jsx'
import { REVIEW_FORM_URL } from '../data/links.js'
import { REVIEWS, SAMPLE } from '../data/reviews.js'
import { useOnline } from '../lib/hooks.js'

const IDS = Array.from({ length: 15 }, (_, i) => i + 1)

function ReviewCta() {
  const online = useOnline()
  return (
    <Spot className="flex flex-col rounded-[2.5rem] bg-surface p-6 shadow-soft sm:p-8">
      <span className="grid size-14 place-items-center rounded-2xl bg-pale text-brand-ink"><PenLine size={26} aria-hidden /></span>
      <h2 className="mt-5 text-2xl font-semibold sm:text-3xl">Sudah mencoba Educancer?</h2>
      <p className="mt-2 max-w-[48ch] leading-relaxed text-muted">Ceritakan pengalaman Anda lewat formulir review. Masukan Anda kami baca satu per satu.</p>
      <a href={REVIEW_FORM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg mt-6 self-start">Tulis review<ExternalLink size={18} aria-hidden /></a>
      {!online && <p className="mt-3 flex items-center gap-2 text-sm font-medium text-muted"><WifiOff size={16} aria-hidden />Formulir butuh koneksi internet.</p>}
    </Spot>
  )
}

// Foto ulasan hanya tampil bila berkas ada. Tanpa foto, bagian ini tidak menyisakan ruang kosong.
const Photo = memo(function Photo({ n, onLoaded }) {
  const [state, setState] = useState('loading')
  if (state === 'failed') return null
  return (
    <div className="relative mb-4 aspect-[3/4] w-full break-inside-avoid overflow-hidden rounded-[1.75rem] shadow-soft">
      {state === 'loading' && <div className="skeleton absolute inset-0" />}
      <img src={`/images/review/${n}.jpg`} alt={`Tangkapan layar ulasan pengguna ${n}`} decoding="async" width="900" height="1200"
        onLoad={() => { setState('ok'); onLoaded() }} onError={() => setState('failed')} className="size-full object-cover" />
    </div>
  )
})

export default function KataMereka() {
  const [shown, setShown] = useState(0)
  const onLoaded = useCallback(() => setShown((c) => c + 1), [])
  return (
    <main>
      <PageHeader title="Kata mereka" crumbs={[{ to: '/menu', label: 'Beranda' }, { label: 'Kata mereka' }]} art="ponsel"
        lead="Ulasan dari pasien, keluarga, dan tenaga kesehatan yang memakai Educancer." />

      {/* Dua komponen berbeda: formulir review dan unduh APK */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
        <ReviewCta />
        <ApkCard />
      </div>

      <section className="mt-14 lg:mt-20" aria-labelledby="h-ulasan">
        <h2 id="h-ulasan" className="text-3xl font-semibold sm:text-4xl">Ulasan pengguna</h2>
        {SAMPLE && <p className="mt-2 text-sm text-muted">Ulasan contoh untuk tampilan. Ganti dengan ulasan asli di src/data/reviews.js.</p>}
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {REVIEWS.map((r, i) => <div key={r.id} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}><ReviewCard r={r} /></div>)}
        </div>
      </section>

      <section className={`mt-14 lg:mt-20 ${shown === 0 ? 'sr-only' : ''}`} aria-hidden={shown === 0 || undefined} aria-labelledby="h-foto">
        <h2 id="h-foto" className="text-3xl font-semibold sm:text-4xl">Tangkapan layar ulasan</h2>
        <div className="mt-8 columns-2 gap-4 lg:columns-4">{IDS.map((n) => <Photo key={n} n={n} onLoaded={onLoaded} />)}</div>
      </section>
    </main>
  )
}
