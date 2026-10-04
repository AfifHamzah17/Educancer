import { NavLink } from 'react-router-dom'
import { TABS } from '../data/nav.js'

// Bilah tab bawah seperti aplikasi referensi: Beranda, Materi, Video, Quiz, Layanan.
export default function TabBar() {
  return (
    <nav aria-label="Navigasi bawah" className="glass fixed inset-x-3 bottom-3 z-30 rounded-[1.75rem] p-1.5 pb-[max(.375rem,env(safe-area-inset-bottom))] lg:hidden">
      <ul className="grid grid-cols-5">
        {TABS.map(({ to, label, short, icon: Icon }) => (
          <li key={to}>
            <NavLink to={to} className={({ isActive }) => `flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-2xl text-[0.72rem] font-semibold transition-colors ${isActive ? 'bg-brand text-white' : 'text-muted'}`}>
              <Icon size={21} aria-hidden />{short || label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
