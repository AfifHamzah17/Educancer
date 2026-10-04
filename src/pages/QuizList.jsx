import { useMemo } from 'react'
import { Star, Trophy } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import TopicCard from '../components/TopicCard.jsx'
import { TOPICS } from '../data/topics.js'
import { load } from '../lib/storage.js'

export default function QuizList() {
  const skor = useMemo(() => TOPICS.map((t) => load(`score:${t.slug}`)), [])
  const done = skor.filter((s) => s != null)
  const bintang = done.reduce((a, s) => a + s / 20, 0)
  return (
    <main>
      <PageHeader title="Quiz" crumbs={[{ to: '/menu', label: 'Beranda' }, { label: 'Quiz' }]} art="kuis"
        lead="Lima soal untuk tiap jenis kanker. Skor terakhir Anda tersimpan di perangkat ini." />

      <section aria-label="Ringkasan skor" className="glass mb-8 grid grid-cols-3 gap-2 rounded-[2rem] p-3 sm:p-5">
        {[[done.length, `dari ${TOPICS.length} topik dikerjakan`, null], [bintang, 'bintang terkumpul', Star], [done.length ? Math.round(done.reduce((a, s) => a + s, 0) / done.length) : 0, 'rata-rata skor', Trophy]].map(([v, l, I]) => (
          <div key={l} className="flex flex-col px-2 text-center sm:px-4 sm:text-left">
            <span className="order-2 text-xs font-medium text-muted sm:text-sm">{l}</span>
            <span className="flex items-center justify-center gap-2 font-display text-3xl font-semibold tnum sm:justify-start sm:text-5xl">{I && <I size={26} className="text-brand-ink" aria-hidden />}{v}</span>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {TOPICS.map((t, i) => <TopicCard key={t.slug} t={t} to={`/quiz/${t.slug}/play`} badge={skor[i]} cta={skor[i] == null ? 'Mulai kuis' : 'Ulangi kuis'} />)}
      </div>
    </main>
  )
}
