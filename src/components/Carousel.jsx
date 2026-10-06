import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Carousel scroll-snap: swipe di HP, drag dengan mouse, tombol, dan panah keyboard.
export default function Carousel({ label, children, className = '', itemClass = 'w-[82%] sm:w-[46%] lg:w-[31%]' }) {
  const ref = useRef(null)
  const drag = useRef({ down: false, x: 0, left: 0, moved: false, block: false })
  const [i, setI] = useState(0)
  const [edge, setEdge] = useState({ start: true, end: false })
  const [grab, setGrab] = useState(false)
  const items = Array.isArray(children) ? children : [children]
  const n = items.length

  const padLeft = (el) => parseFloat(getComputedStyle(el).paddingLeft) || 0

  // Indeks kartu yang paling dekat dengan tepi kiri area geser.
  const nearest = useCallback(() => {
    const el = ref.current; if (!el) return 0
    const origin = el.getBoundingClientRect().left + padLeft(el)
    let best = 0, dist = Infinity
    for (let k = 0; k < el.children.length; k++) {
      const d = Math.abs(el.children[k].getBoundingClientRect().left - origin)
      if (d < dist) { dist = d; best = k }
    }
    return best
  }, [])

  const measure = useCallback(() => {
    const el = ref.current; if (!el) return
    const start = el.scrollLeft < 4
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    setEdge((p) => (p.start === start && p.end === end ? p : { start, end }))
    setI(end ? n - 1 : nearest())
  }, [n, nearest])

  useEffect(() => {
    const el = ref.current; if (!el) return
    let raf = 0
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure) }
    el.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    on()
    return () => { cancelAnimationFrame(raf); el.removeEventListener('scroll', on); window.removeEventListener('resize', on) }
  }, [measure])

  const jump = useCallback((k) => {
    const el = ref.current; if (!el) return
    const t = el.children[Math.max(0, Math.min(n - 1, k))]; if (!t) return
    const left = el.scrollLeft + t.getBoundingClientRect().left - (el.getBoundingClientRect().left + padLeft(el))
    el.scrollTo({ left, behavior: 'smooth' })
  }, [n])
  const go = (dir) => jump(nearest() + dir)
  const key = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }

  // Drag dengan mouse (sentuhan sudah ditangani browser).
  const down = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    drag.current = { down: true, x: e.clientX, left: ref.current.scrollLeft, moved: false, block: false }
  }
  const move = (e) => {
    const d = drag.current; if (!d.down) return
    const el = ref.current; const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true; el.style.scrollSnapType = 'none'; el.setPointerCapture?.(e.pointerId); setGrab(true)
    }
    if (d.moved) el.scrollLeft = d.left - dx
  }
  const up = () => {
    const d = drag.current; if (!d.down) return
    d.down = false
    if (!d.moved) return
    d.block = true; setTimeout(() => { d.block = false }, 0) // cegah klik tautan setelah drag
    const el = ref.current; el.style.scrollSnapType = ''; setGrab(false)
    jump(nearest())
  }

  return (
    <section aria-roledescription="carousel" aria-label={label} className={className}>
      <div ref={ref} tabIndex={0} onKeyDown={key}
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
        onDragStart={(e) => e.preventDefault()}
        onClickCapture={(e) => { if (drag.current.block) { e.preventDefault(); e.stopPropagation() } }}
        className={`snap-row -mx-4 scroll-px-4 px-4 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0 ${grab ? 'cursor-grabbing' : 'lg:cursor-grab'}`}>
        {items.map((c, k) => (
          <div key={k} role="group" aria-roledescription="slide" aria-label={`${k + 1} dari ${n}`} className={itemClass}>{c}</div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center" role="group" aria-label="Pilih slide">
          {items.map((_, k) => (
            <button key={k} onClick={() => jump(k)} aria-label={`Ke slide ${k + 1}`} aria-current={k === i} className="grid size-5 place-items-center">
              <span className={`h-2 rounded-full transition-all duration-300 ${k === i ? 'w-5 bg-brand' : 'w-2 bg-brand/30'}`} />
            </button>
          ))}
        </div>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => go(-1)} disabled={edge.start} aria-label="Sebelumnya" className="btn btn-soft size-12 !min-h-12 !p-0 !rounded-full"><ChevronLeft size={20} /></button>
          <button onClick={() => go(1)} disabled={edge.end} aria-label="Berikutnya" className="btn btn-soft size-12 !min-h-12 !p-0 !rounded-full"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  )
}