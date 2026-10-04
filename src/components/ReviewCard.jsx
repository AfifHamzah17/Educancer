import { Star } from 'lucide-react'
import Spot from './Spot.jsx'

const TINTS = ['#95CCDD', '#B7DDD6', '#A9C9E6', '#C4E3EC', '#9FD3CF']
const initials = (n) => n.replace(/^(Ibu|Pak|Bapak)\s/, '').split(' ').slice(0, 2).map((w) => w[0]).join('')

export default function ReviewCard({ r }) {
  return (
    <Spot as="figure" className="flex h-full flex-col justify-between gap-6 rounded-[2rem] bg-surface p-6 shadow-soft">
      <div>
        <div className="flex gap-0.5 text-brand" role="img" aria-label={`${r.rating} dari 5 bintang`}>
          {[0, 1, 2, 3, 4].map((k) => <Star key={k} size={18} className={k < r.rating ? 'fill-current' : 'opacity-25'} aria-hidden />)}
        </div>
        <blockquote className="mt-4 text-lg leading-relaxed">{r.teks}</blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl font-display text-lg font-semibold text-[#0F2E3B]" style={{ background: TINTS[r.id % TINTS.length] }} aria-hidden>{initials(r.nama)}</span>
        <span><span className="block font-semibold">{r.nama}</span><span className="text-sm text-muted">{r.peran}</span></span>
      </figcaption>
    </Spot>
  )
}
