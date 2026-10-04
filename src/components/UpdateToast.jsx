import { useEffect, useState } from 'react'

export default function UpdateToast() {
  const [update, setUpdate] = useState(null)
  useEffect(() => {
    const h = (e) => setUpdate(() => e.detail)
    window.addEventListener('educancer:update', h)
    return () => window.removeEventListener('educancer:update', h)
  }, [])
  if (!update) return null
  return (
    <div role="status" className="pop fixed inset-x-3 bottom-28 z-[60] mx-auto flex max-w-md items-center justify-between gap-3 rounded-2xl bg-ink px-5 py-3 text-sm text-paper shadow-soft lg:bottom-6">
      <span>Versi baru tersedia. Muat ulang sekarang?</span>
      <span className="flex gap-1">
        <button className="min-h-11 rounded-xl px-3 text-paper/70" onClick={() => setUpdate(null)}>Nanti</button>
        <button className="min-h-11 rounded-xl bg-sky px-4 font-bold text-[#0F2E3B]" onClick={() => update(true)}>Muat ulang</button>
      </span>
    </div>
  )
}
