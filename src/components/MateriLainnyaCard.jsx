import { memo } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Spot from './Spot.jsx'

const DRIVE_URL = 'https://drive.google.com/drive/folders/1GhBVdcvZrVaYGw9h0cqvsx4W5EZ8Zhm1?usp=sharing'

export default memo(function MateriLainnyaCard() {
  return (
    <Spot as="a" href={DRIVE_URL} target="_blank" rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-[2rem] bg-surface p-4 shadow-soft transition-transform duration-300 [transition-timing-function:cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 active:scale-[.98]">
      <span className="relative block overflow-hidden rounded-[1.5rem] p-3" style={{ background: 'var(--pale)' }}>
        <img src="/images/materilainnya.png" alt="" width="480" height="480" loading="lazy" decoding="async"
          className="mx-auto aspect-square w-full max-w-40 rounded-full transition-transform duration-500 group-hover:scale-105" />
      </span>
      <span className="mt-4 block text-lg font-semibold leading-tight">Materi Lainnya</span>
      <span className="mt-auto flex items-center gap-1 pt-3 text-sm font-semibold text-brand-ink">Buka di Drive
        <ArrowUpRight size={16} aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Spot>
  )
})