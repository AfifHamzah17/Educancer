import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, SearchX, MessageCircle } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import Field from '../components/Field.jsx'
import { Staff } from '../components/Illustrations.jsx'
import { FAQ } from '../data/faq.js'

export default function Faq() {
  const [open, setOpen] = useState(0)
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return FAQ.map((x, i) => ({ q: x[0], a: x[1], i })).filter((x) => !s || x.q.toLowerCase().includes(s) || x.a.toLowerCase().includes(s))
  }, [q])

  return (
    <main>
      <PageHeader title="Tanya jawab" crumbs={[{ to: '/menu', label: 'Beranda' }, { label: 'FAQ' }]} art="apoteker"
        lead="Jawaban untuk pertanyaan yang paling sering diajukan pasien dan keluarga, dari mitos kanker sampai efek samping kemoterapi." />

      <div className="grid gap-8 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-12">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-[2.5rem] bg-surface p-6 shadow-soft">
            <Staff role="apoteker" className="mx-auto hidden h-44 lg:block" />
            <Field label="Cari pertanyaan" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Contoh: kemoterapi, puasa" hint={`${list.length} dari ${FAQ.length} pertanyaan ditampilkan`} className="lg:mt-4" />
            <div className="mt-6 border-t border-line pt-5">
              <p className="font-semibold">Belum menemukan jawabannya?</p>
              <Link to="/konsultasi" className="btn btn-primary mt-3 w-full"><MessageCircle size={18} aria-hidden />Tanya tim lewat WhatsApp</Link>
            </div>
          </div>
        </aside>

        {/* Daftar memakai seluruh lebar kolom kanan */}
        <section aria-label="Daftar pertanyaan" className="min-w-0">
          {list.length === 0 ? (
            <div className="grid place-items-center rounded-[2.5rem] bg-surface p-10 text-center shadow-soft">
              <SearchX size={36} className="text-brand-ink" aria-hidden />
              <p className="mt-3 text-xl font-semibold">Tidak ada pertanyaan untuk kata itu.</p>
              <p className="mt-1 text-muted">Coba kata yang lebih umum, atau tanyakan langsung ke tim.</p>
              <button onClick={() => setQ('')} className="btn btn-soft mt-5">Tampilkan semua</button>
            </div>
          ) : (
            <ul className="w-full space-y-3">
              {list.map((x) => {
                const on = open === x.i
                return (
                  <li key={x.i} className={`w-full rounded-[1.75rem] bg-surface shadow-soft transition-colors ${on ? 'ring-2 ring-brand/40' : ''}`}>
                    <h2 className="font-sans text-base tracking-normal">
                      <button aria-expanded={on} aria-controls={`jawab-${x.i}`} onClick={() => setOpen(on ? null : x.i)}
                        className="flex min-h-16 w-full items-center gap-4 rounded-[1.75rem] px-5 py-4 text-left text-lg font-semibold leading-snug sm:px-7">
                        <span className="flex-1">{x.q}</span>
                        <span className={`grid size-10 shrink-0 place-items-center rounded-full bg-pale text-brand-ink transition-transform duration-300 ${on ? 'rotate-180' : ''}`}><ChevronDown size={20} aria-hidden /></span>
                      </button>
                    </h2>
                    <div id={`jawab-${x.i}`} role="region" data-open={on} className="acc">
                      <div><p className="px-5 pb-6 text-lg leading-relaxed text-muted sm:px-7">{x.a}</p></div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
