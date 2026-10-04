import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { X, ArrowRight, Check } from 'lucide-react'
import Modal from '../components/Modal.jsx'
import { Staff } from '../components/Illustrations.jsx'
import { QUIZ } from '../data/quiz.js'
import { TOPICS } from '../data/topics.js'
import { grade, textClass } from '../lib/score.js'
import { save } from '../lib/storage.js'

export default function QuizPlay() {
  const { slug } = useParams()
  const nav = useNavigate()
  const qs = QUIZ[slug]
  const topic = TOPICS.find((t) => t.slug === slug)
  const [i, setI] = useState(0)
  const [ans, setAns] = useState([])
  const [leave, setLeave] = useState(false)
  const lock = useRef(false)

  const q = qs?.[i]
  const size = useMemo(() => (q ? textClass(q.q) : ''), [q])
  const pick = useCallback((k) => setAns((a) => { const n = [...a]; n[i] = k; return n }), [i])
  const next = useCallback(() => {
    if (lock.current || ans[i] == null) return
    lock.current = true
    setTimeout(() => { lock.current = false }, 300)
    if (i < qs.length - 1) return setI(i + 1)
    const r = grade(qs, ans)
    save(`score:${slug}`, r.skor)
    save(`attempt:${slug}`, ans)
    nav(`/quiz/${slug}/result`, { replace: true })
  }, [i, ans, qs, slug, nav])

  // Pintasan keyboard: A-D atau 1-4 memilih, Enter lanjut.
  useEffect(() => {
    if (!q || leave) return
    const h = (e) => {
      const k = 'abcd'.indexOf(e.key.toLowerCase())
      const d = ['1', '2', '3', '4'].indexOf(e.key)
      const idx = k >= 0 ? k : d
      if (idx >= 0 && idx < q.o.length) pick(idx)
      if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') next()
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [q, pick, next, leave])

  if (!qs) return <Navigate to="/quiz" replace />
  const last = i === qs.length - 1
  const tf = q.o.length === 2
  const close = () => (ans.some((a) => a != null) ? setLeave(true) : nav('/quiz'))

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <header className="glass flex items-center gap-3 rounded-[1.75rem] py-2 pl-2 pr-4">
        <button onClick={close} aria-label="Tutup kuis" className="btn btn-soft size-12 !min-h-12 !p-0 !rounded-2xl"><X size={22} /></button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{topic.nama}</p>
          <div className="mt-1.5 flex gap-1.5" aria-hidden>
            {qs.map((_, k) => <span key={k} className={`h-2 flex-1 rounded-full transition-colors duration-300 ${k <= i ? 'bg-brand' : 'bg-brand/20'}`} />)}
          </div>
        </div>
        <span className="font-display text-2xl font-semibold tnum" aria-live="polite">{i + 1}<span className="text-muted">/{qs.length}</span></span>
      </header>

      <div className="mt-6 grid flex-1 gap-6 lg:mt-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
        {/* Kartu soal besar */}
        <section key={`q${i}`} className="pop relative flex flex-col overflow-hidden rounded-[2.5rem] bg-surface p-6 shadow-soft sm:p-10" aria-labelledby="soal">
          <p className="text-sm font-semibold text-brand-ink">Soal {i + 1}</p>
          <h1 id="soal" className={`${size} mt-3 font-semibold leading-snug`}>{q.q}</h1>
          <div className="mt-auto flex items-end justify-between pt-8">
            <img src={topic.img} alt="" width="480" height="480" className="size-24 rounded-full lg:size-32" />
            <Staff role="perawat" className="hidden h-36 lg:block" />
          </div>
        </section>

        {/* Kartu jawaban besar */}
        <section key={`a${i}`} className="flex flex-col" aria-label="Pilihan jawaban">
          <div role="radiogroup" aria-labelledby="soal" className={`grid gap-3 sm:gap-4 ${tf ? 'grid-cols-2 lg:grid-cols-1' : ''}`}>
            {q.o.map((o, k) => {
              const on = ans[i] === k
              return (
                <button key={k} role="radio" aria-checked={on} onClick={() => pick(k)}
                  className={`rise flex min-h-20 w-full items-center gap-4 rounded-[1.75rem] border-2 p-4 text-left text-lg font-semibold leading-snug transition-all duration-300 [transition-timing-function:cubic-bezier(.16,1,.3,1)] active:scale-[.98] sm:min-h-24 sm:p-5 sm:text-xl ${tf ? 'justify-center text-center lg:justify-start lg:text-left' : ''} ${on ? 'border-brand bg-brand text-white shadow-soft' : 'border-transparent bg-surface shadow-soft hover:-translate-y-0.5 hover:border-brand/40'}`}
                  style={{ '--i': k }}>
                  {!tf && <span className={`grid size-12 shrink-0 place-items-center rounded-2xl text-lg font-bold ${on ? 'bg-white text-brand' : 'bg-pale text-brand-ink'}`}>{on ? <Check size={22} aria-hidden /> : 'ABCD'[k]}</span>}
                  <span>{o}</span>
                </button>
              )
            })}
          </div>
          <button disabled={ans[i] == null} onClick={next} className="btn btn-primary btn-lg mt-6 w-full !min-h-16 text-lg lg:mt-auto">
            {last ? 'Lihat hasil' : 'Pertanyaan berikutnya'}<ArrowRight size={22} aria-hidden />
          </button>
        </section>
      </div>

      <Modal open={leave} onClose={() => setLeave(false)} title="Keluar dari kuis?" art={<Staff role="perawat" className="size-full" />}
        actions={<>
          <button data-autofocus className="btn btn-soft" onClick={() => setLeave(false)}>Lanjut mengerjakan</button>
          <button className="btn btn-primary" onClick={() => nav('/quiz')}>Keluar</button>
        </>}>
        Jawaban yang sudah dipilih akan hilang dan skor tidak disimpan.
      </Modal>
    </main>
  )
}
