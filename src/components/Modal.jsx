import { useEffect, useRef, useId } from 'react'
import { X } from 'lucide-react'
import { useEscape, useScrollLock } from '../lib/hooks.js'

// Dialog peringatan: fokus masuk ke dialog, Esc menutup, fokus kembali ke pemicu.
export default function Modal({ open, onClose, title, children, actions, art, alert = true }) {
  const ref = useRef(null)
  const last = useRef(null)
  const id = useId()
  useScrollLock(open)
  useEscape(open, onClose)
  useEffect(() => {
    if (!open) return
    last.current = document.activeElement
    const t = setTimeout(() => (ref.current?.querySelector('[data-autofocus]') || ref.current)?.focus(), 30)
    return () => { clearTimeout(t); last.current?.focus?.() }
  }, [open])

  // Jebakan fokus sederhana
  const trap = (e) => {
    if (e.key !== 'Tab') return
    const f = ref.current.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    if (!f.length) return
    const a = f[0], z = f[f.length - 1]
    if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() }
    else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() }
  }
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-ink/45 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div ref={ref} tabIndex={-1} onKeyDown={trap} role={alert ? 'alertdialog' : 'dialog'} aria-modal="true" aria-labelledby={id}
        className="pop glass relative w-full max-w-md rounded-[2rem] bg-surface p-6 outline-none sm:p-7">
        <button onClick={onClose} aria-label="Tutup" className="absolute right-3 top-3 grid size-11 place-items-center rounded-full text-muted hover:bg-pale/60"><X size={20} /></button>
        {art && <div className="-mt-1 mb-3 size-24">{art}</div>}
        <h2 id={id} className="pr-10 font-display text-2xl font-semibold leading-tight">{title}</h2>
        <div className="mt-2 leading-relaxed text-muted">{children}</div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{actions}</div>
      </div>
    </div>
  )
}
