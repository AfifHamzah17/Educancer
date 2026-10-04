import { useEffect, useState, useMemo } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Star, Check, X, Home, RotateCcw, BookOpen } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { Staff } from '../components/Illustrations.jsx'
import { QUIZ } from '../data/quiz.js'
import { TOPICS } from '../data/topics.js'
import { grade, verdict } from '../lib/score.js'
import { load } from '../lib/storage.js'

export default function QuizResult() {
  const { slug } = useParams()
  const qs = QUIZ[slug]
  const answers = load(`attempt:${slug}`)
  const r = useMemo(() => (qs && answers ? grade(qs, answers) : null), [qs, answers])
  const [go, setGo] = useState(false)
  useEffect(() => { const t = requestAnimationFrame(() => setGo(true)); return () => cancelAnimationFrame(t) }, [])
  if (!r) return <Navigate to="/quiz" replace />
  const topic = TOPICS.find((t) => t.slug === slug)
  const C = 2 * Math.PI * 45
  return (
    <main className="py-6 lg:py-10">
      <Breadcrumbs items={[{ to: '/menu', label: 'Beranda' }, { to: '/quiz', label: 'Quiz' }, { label: 'Hasil' }]} />
      <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">Hasil kuis {topic.nama}</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
        <section className="flex flex-col items-center rounded-[2.5rem] bg-surface p-6 text-center shadow-soft sm:p-10 lg:self-start" aria-label="Skor">
          <div className="relative size-60">
            <svg viewBox="0 0 100 100" className="-rotate-90" role="img" aria-label={`Skor ${r.skor} dari 100`}>
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--pale)" strokeWidth="8" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="var(--brand)" strokeWidth="8" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={go ? C * (1 - r.skor / 100) : C} style={{ transition: 'stroke-dashoffset 1.3s cubic-bezier(.16,1,.3,1)' }} />
            </svg>
            <div className="absolute inset-0 grid place-items-center"><div><p className="font-display text-7xl font-semibold tnum">{r.skor}</p><p className="text-muted">dari 100</p></div></div>
          </div>
          <p className="mt-4 font-display text-3xl font-semibold">{verdict(r.skor)}</p>
          <div className="mt-3 flex justify-center gap-1 text-brand" role="img" aria-label={`${r.bintang} dari 5 bintang`}>
            {[0, 1, 2, 3, 4].map((k) => <Star key={k} size={32} className={k < r.bintang ? 'fill-current' : 'opacity-25'} aria-hidden />)}
          </div>
          <dl className="mt-8 grid w-full grid-cols-3 gap-2">
            {[['Benar', r.benar], ['Salah', r.salah], ['Total', r.total]].map(([l, v]) => (
              <div key={l} className="flex flex-col rounded-2xl bg-pale/70 p-3"><dt className="order-2 text-sm text-muted">{l}</dt><dd className="font-display text-3xl font-semibold tnum">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-6 grid w-full gap-3 sm:grid-cols-2">
            <Link to="/menu" className="btn btn-soft"><Home size={18} aria-hidden />Beranda</Link>
            <Link to={`/quiz/${slug}/play`} replace className="btn btn-primary"><RotateCcw size={18} aria-hidden />Ulangi kuis</Link>
          </div>
          <Link to={`/materi/${slug}`} className="btn mt-2 w-full text-brand-ink hover:bg-pale/60"><BookOpen size={18} aria-hidden />Baca materi {topic.nama}</Link>
        </section>

        <section aria-labelledby="rincian">
          <h2 id="rincian" className="text-2xl font-semibold">Rincian jawaban</h2>
          <ol className="mt-4 space-y-3">
            {r.rows.map(({ q, pick, ok }, k) => (
              <li key={k} className={`rounded-[1.75rem] border-2 p-5 ${ok ? 'border-emerald-600/30 bg-emerald-500/10' : 'border-red-600/30 bg-red-500/10'}`}>
                <p className="flex gap-3 text-lg font-semibold leading-snug">
                  <span className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-white ${ok ? 'bg-emerald-600' : 'bg-red-600'}`}>{ok ? <Check size={16} aria-label="Benar" /> : <X size={16} aria-label="Salah" />}</span>
                  <span>{k + 1}. {q.q}</span>
                </p>
                {!ok && <p className="mt-3 pl-10 text-base leading-relaxed">Jawabanmu: {q.o[pick]}<br /><b>Jawaban benar: {q.o[q.a]}</b></p>}
              </li>
            ))}
          </ol>
          <Staff role="perawat" className="mx-auto mt-8 hidden h-40 lg:block" />
        </section>
      </div>
    </main>
  )
}
