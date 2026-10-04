import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { X, Download, LogOut, Smartphone } from 'lucide-react'
import { NAV } from '../data/nav.js'
import ThemeToggle from './ThemeToggle.jsx'
import { Staff } from './Illustrations.jsx'
import { useShell } from '../lib/shell.js'
import { useEscape, useScrollLock } from '../lib/hooks.js'

// Menu hamburger: panel dari kanan dengan semua halaman dan pengaturan.
export default function Drawer({ open, onClose }) {
  const { openApk, openExit, install } = useShell()
  const first = useRef(null)
  useScrollLock(open)
  useEscape(open, onClose)
  useEffect(() => { if (open) first.current?.focus() }, [open])
  const act = (fn) => () => { onClose(); fn() }
  return (
    <>
      <div data-open={open} onClick={onClose} className="scrim fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm xl:hidden" aria-hidden />
      <aside id="menu-samping" data-open={open} aria-label="Menu utama" aria-hidden={!open}
        className="drawer fixed inset-y-0 right-0 z-40 flex w-[min(24rem,92vw)] flex-col rounded-l-[2.5rem] bg-surface p-5 shadow-soft xl:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3"><Staff role="dokter" className="size-12" /><div><p className="font-display text-lg font-semibold leading-none">Educancer</p><p className="mt-1 text-sm text-muted">RSUD Provinsi NTB</p></div></div>
          <button ref={first} onClick={onClose} aria-label="Tutup menu" className="btn btn-soft size-11 !min-h-11 !p-0 !rounded-full"><X size={20} /></button>
        </div>
        <nav aria-label="Halaman" className="mt-6 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {NAV.map(({ to, label, icon: Icon }, i) => (
              <li key={to}>
                <NavLink to={to} onClick={onClose} style={{ transitionDelay: open ? `${120 + i * 28}ms` : '0ms' }}
                  className={({ isActive }) => `flex min-h-14 items-center gap-4 rounded-2xl px-4 font-semibold transition-all duration-500 ${open ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'} ${isActive ? 'bg-brand text-white' : 'hover:bg-pale/70'}`}>
                  <Icon size={21} aria-hidden />{label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 space-y-2 border-t border-line pt-4">
          <div className="flex items-center justify-between rounded-2xl bg-surface2 px-4 py-2"><span className="font-semibold">Tema tampilan</span><ThemeToggle /></div>
          {install.canInstall && <button onClick={act(() => (install.hasPrompt ? install.prompt() : window.dispatchEvent(new Event('educancer:install-help'))))} className="btn btn-soft w-full justify-start"><Smartphone size={19} aria-hidden />Pasang di layar utama</button>}
          <button onClick={act(openApk)} className="btn btn-primary w-full justify-start"><Download size={19} aria-hidden />Unduh APK Android</button>
          <button onClick={act(openExit)} className="btn w-full justify-start text-muted hover:bg-pale/60"><LogOut size={19} aria-hidden />Keluar dari aplikasi</button>
        </div>
      </aside>
    </>
  )
}
