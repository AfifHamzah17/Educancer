import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Spot from './Spot.jsx'

// Kartu jenis kanker. Warna tiap topik tetap sebagai penanda, dilarutkan ke dalam palet biru.
export default memo(function TopicCard({ t, to, badge, cta = 'Buka materi' }) {
  return (
    <Spot as={Link} to={to} className="group flex h-full flex-col rounded-[2rem] bg-surface p-4 shadow-soft transition-transform duration-300 [transition-timing-function:cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 active:scale-[.98]">
      <span className="relative block overflow-hidden rounded-[1.5rem] p-3" style={{ background: `color-mix(in srgb, ${t.warna} 14%, var(--pale))` }}>
        <img src={t.img} alt="" width="480" height="480" loading="lazy" decoding="async" className="mx-auto aspect-square w-full max-w-40 rounded-full transition-transform duration-500 group-hover:scale-105" />
        {badge != null && <span className="absolute right-2 top-2 rounded-lg bg-ink px-2 py-1 text-xs font-bold text-paper tnum">Skor {badge}</span>}
      </span>
      <span className="mt-4 block text-lg font-semibold leading-tight">{t.nama}</span>
      <span className="mt-auto flex items-center gap-1 pt-3 text-sm font-semibold text-brand-ink">{cta}<ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
    </Spot>
  )
})
