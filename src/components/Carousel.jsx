import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Carousel scroll-snap: geser dengan jari/trackpad, tombol, atau panah keyboard.
export default function Carousel({ label, children, className = '', itemClass = 'w-[82%] sm:w-[46%] lg:w-[31%]' }) {
  const ref = useRef(null)
  const [i, setI] = useState(0)
  const [edge, setEdge] = useState({ start: true, end: false })
  const n = Array.isArray(children) ? children.length : 1

  const measure = useCallback(() => {
    const el = ref.current; if (!el) return
    const first = el.children[0]; if (!first) return
    const step = first.getBoundingClientRect().width + 16
    setI(Math.min(n - 1, Math.round(el.scrollLeft / step)))
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }, [n])

  useEffect(() => {
    const el = ref.current; if (!el) return
    let raf = 0
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure) }
    el.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    on()
    return () => { cancelAnimationFrame(raf); el.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [measure])

  const go = (dir) => {
    const el = ref.current; const first = el.children[0]; if (!first) return
    el.scrollBy({ left: dir * (first.getBoundingClientRect().width + 16), behavior: 'smooth' })
  }
  const key = (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); go(1) } if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) } }
  const jump = (k) => {
    const el = ref.current; const t = el.children[k]; if (t) el.scrollTo({ left: t.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  }

  return (
    <section aria-roledescription="carousel" aria-label={label} className={className}>
      <div ref={ref} tabIndex={0} onKeyDown={key} className="snap-row -mx-4 px-4 pb-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
        {(Array.isArray(children) ? children : [children]).map((c, k) => (
          <div key={k} role="group" aria-roledescription="slide" aria-label={`${k + 1} dari ${n}`} className={itemClass}>{c}</div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-1.5" aria-hidden>
          {Array.from({ length: n }, (_, k) => (
            <button key={k} tabIndex={-1} onClick={() => jump(k)} className={`h-2 rounded-full transition-all duration-300 ${k === i ? 'w-7 bg-brand' : 'w-2 bg-brand/30'}`} />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => go(-1)} disabled={edge.start} aria-label="Sebelumnya" className="btn btn-soft size-12 !min-h-12 !p-0 !rounded-full"><ChevronLeft size={20} /></button>
          <button onClick={() => go(1)} disabled={edge.end} aria-label="Berikutnya" className="btn btn-soft size-12 !min-h-12 !p-0 !rounded-full"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  )
}
