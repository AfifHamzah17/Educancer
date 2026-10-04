import { useMemo, useState } from 'react'
import { SearchX, WifiOff } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import TopicCard from '../components/TopicCard.jsx'
import Field from '../components/Field.jsx'
import { TOPICS } from '../data/topics.js'

export default function Materi() {
  const [q, setQ] = useState('')
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return TOPICS.filter((t) => !s || t.nama.toLowerCase().includes(s))
  }, [q])
  return (
    <main>
      <PageHeader title="Materi" crumbs={[{ to: '/menu', label: 'Beranda' }, { label: 'Materi' }]} art="buku"
        lead="Pilih jenis kanker untuk membaca modulnya.">
        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-muted"><WifiOff size={16} aria-hidden />Modul yang sudah dibuka bisa dibaca lagi tanpa internet.</p>
      </PageHeader>

      <div className="mb-8 max-w-md"><Field label="Cari jenis kanker" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Contoh: payudara" /></div>

      {list.length === 0 ? (
        <div className="grid place-items-center rounded-[2.5rem] bg-surface p-12 text-center shadow-soft">
          <SearchX size={36} className="text-brand-ink" aria-hidden />
          <p className="mt-3 text-xl font-semibold">Belum ada materi dengan nama itu.</p>
          <button onClick={() => setQ('')} className="btn btn-soft mt-5">Tampilkan semua materi</button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
          {list.map((t) => <TopicCard key={t.slug} t={t} to={`/materi/${t.slug}`} />)}
        </div>
      )}
    </main>
  )
}
