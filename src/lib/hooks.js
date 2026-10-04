import { useEffect, useState, useRef, useCallback } from 'react'

export function useOnline() {
  const [on, setOn] = useState(navigator.onLine)
  useEffect(() => {
    const a = () => setOn(true), b = () => setOn(false)
    window.addEventListener('online', a); window.addEventListener('offline', b)
    return () => { window.removeEventListener('online', a); window.removeEventListener('offline', b) }
  }, [])
  return on
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Kunci scroll body selama panel/dialog terbuka.
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [locked])
}

export function useEscape(active, fn) {
  useEffect(() => {
    if (!active) return
    const h = (e) => { if (e.key === 'Escape') fn() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [active, fn])
}

// Efek kartu menyala: nilai kursor ditulis langsung ke CSS variable tanpa render ulang.
export function useSpot() {
  return useCallback((e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])
}

// Acak huruf lalu menyusun teks asli dari kiri ke kanan.
const GLYPHS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
export function useScramble(text, { play = true, duration = 900 } = {}) {
  const [out, setOut] = useState(text)
  const raf = useRef(0)
  const run = useCallback(() => {
    if (prefersReducedMotion()) return setOut(text)
    cancelAnimationFrame(raf.current)
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      const keep = Math.floor(p * text.length)
      let s = ''
      for (let i = 0; i < text.length; i++) {
        const c = text[i]
        s += i < keep || c === ' ' || /[^A-Za-z]/.test(c) ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }
      setOut(s)
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [text, duration])
  useEffect(() => { setOut(text); if (play) run(); return () => cancelAnimationFrame(raf.current) }, [text, play, run])
  return [out, run]
}
