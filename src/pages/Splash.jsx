import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Splash() {
  const nav = useNavigate()
  useEffect(() => { const t = setTimeout(() => nav('/menu', { replace: true }), 2800); return () => clearTimeout(t) }, [nav])
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden px-6">
      <div className="text-center">
        <div className="relative mx-auto grid size-72 place-items-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" aria-hidden>
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgb(255 255 255 / .55)" strokeWidth="2" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--brand)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="283" style={{ animation: 'ring 2.4s cubic-bezier(.16,1,.3,1) forwards' }} />
          </svg>
          <img src="/images/logo-educancer.webp" alt="Educancer, Edukasi Kanker untuk Semua" width="420" height="420" className="pop size-52 rounded-full" />
        </div>
        <p className="rise mt-8 font-display text-3xl font-semibold" style={{ '--i': 6 }}>Edukasi kanker untuk semua</p>
        <p className="rise mt-1 text-ink/70" style={{ '--i': 8 }}>RSUD Provinsi NTB bersama PKRS</p>
      </div>
      <button onClick={() => nav('/menu', { replace: true })} className="btn btn-soft absolute bottom-8 right-6">Lanjut<ArrowRight size={18} aria-hidden /></button>
      <div className="absolute bottom-8 left-6 flex gap-3">
        <img src="/images/logo-rsud.png" alt="RSUD Provinsi NTB" width="360" height="360" className="size-12" />
        <img src="/images/logo-pkrs.png" alt="PKRS" width="360" height="360" className="size-12" />
      </div>
    </main>
  )
}
