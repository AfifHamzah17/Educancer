import { Suspense, useEffect, useMemo, useState, useCallback } from 'react'
import { Outlet, NavLink, Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { Menu as MenuIcon, Download, ExternalLink } from 'lucide-react'
import { NAV } from '../data/nav.js'
import { APK_URL } from '../data/links.js'
import { ShellCtx } from '../lib/shell.js'
import { useTheme } from '../lib/theme.js'
import { useInstall } from '../lib/install.js'
import Drawer from './Drawer.jsx'
import TabBar from './TabBar.jsx'
import Fab from './Fab.jsx'
import Footer from './Footer.jsx'
import Modal from './Modal.jsx'
import InstallSheet from './InstallSheet.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import { PageSkeleton } from './Skeletons.jsx'
import { PonselChat, Staff } from './Illustrations.jsx'

export default function Shell() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const reader = !!useMatch('/materi/:slug')
  const [menu, setMenu] = useState(false)
  const [exit, setExit] = useState(false)
  const [bye, setBye] = useState(false)
  const [apk, setApk] = useState(false)
  const theme = useTheme()
  const install = useInstall()

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); setMenu(false) }, [pathname])

  const openExit = useCallback(() => setExit(true), [])
  const openApk = useCallback(() => setApk(true), [])
  const ctx = useMemo(() => ({ openExit, openApk, install, theme }), [openExit, openApk, install, theme])

  const doExit = () => {
    setExit(false); setBye(true)
    setTimeout(() => { window.close(); setTimeout(() => nav('/', { replace: true }), 400); setTimeout(() => setBye(false), 600) }, 1800)
  }

  if (bye) return (
    <main className="grid min-h-dvh place-items-center p-8 text-center">
      <div>
        <div className="flex justify-center gap-4"><img src="/images/logo-rsud.png" alt="RSUD Provinsi NTB" width="360" height="360" className="size-20" /><img src="/images/logo-pkrs.png" alt="PKRS RSUD Provinsi NTB" width="360" height="360" className="size-20" /></div>
        <p className="mt-6 font-display text-2xl font-semibold">Terima kasih telah menggunakan Educancer</p>
        <p className="mt-1 text-muted">Tetap jaga kesehatan.</p>
      </div>
    </main>
  )

  return (
    <ShellCtx.Provider value={ctx}>
      <a href="#isi" className="skip-link">Lompat ke konten</a>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="glass sticky top-3 z-30 mt-3 flex h-16 items-center justify-between rounded-[1.75rem] pl-3 pr-2 sm:pl-4">
          <Link to="/menu" className="flex items-center gap-3 rounded-xl py-1 font-display text-xl font-semibold tracking-tight">
            <Staff role="dokter" className="size-10" />Educancer
          </Link>
          <nav aria-label="Navigasi utama" className="hidden items-center gap-0.5 xl:flex">
            {NAV.map(({ to, label, short }) => (
              <NavLink key={to} to={to} className={({ isActive }) => `rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${isActive ? 'bg-brand text-white' : 'text-ink/80 hover:bg-pale/70'}`}>{short || label}</NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button onClick={openApk} className="btn btn-primary !min-h-11 hidden !px-4 text-sm sm:inline-flex"><Download size={17} aria-hidden />APK</button>
            <button onClick={() => setMenu(true)} aria-label="Buka menu" aria-expanded={menu} aria-controls="menu-samping" className="btn btn-soft size-11 !min-h-11 !p-0 !rounded-full xl:hidden"><MenuIcon size={20} /></button>
          </div>
        </header>

        <div id="isi" className="min-h-[70dvh] overflow-x-clip" tabIndex={-1}>
          <Suspense fallback={<PageSkeleton />}><Outlet /></Suspense>
        </div>
        <Footer />
      </div>

      <Drawer open={menu} onClose={() => setMenu(false)} />
      {!reader && <TabBar />}
      {!reader && <Fab />}
      <InstallSheet />

      <Modal open={exit} onClose={() => setExit(false)} title="Keluar dari Educancer?" art={<Staff role="dokter" className="size-full" />}
        actions={<>
          <button data-autofocus className="btn btn-soft" onClick={() => setExit(false)}>Tetap di sini</button>
          <button className="btn btn-primary" onClick={doExit}>Keluar</button>
        </>}>
        Skor kuis dan materi yang sudah dibuka tetap tersimpan di perangkat ini.
      </Modal>

      <Modal open={apk} onClose={() => setApk(false)} title="Unduh APK Educancer" art={<PonselChat className="size-full" />}
        actions={<>
          <button className="btn btn-soft" onClick={() => setApk(false)}>Batal</button>
          <a data-autofocus href={APK_URL} target="_blank" rel="noopener noreferrer" onClick={() => setApk(false)} className="btn btn-primary">Buka folder unduhan<ExternalLink size={16} aria-hidden /></a>
        </>}>
        <p>Anda akan membuka folder Google Drive berisi file APK. Pilih versi terbaru, unduh, lalu pasang.</p>
        <p className="mt-2">Android akan meminta izin memasang aplikasi dari sumber di luar Play Store. Itu normal untuk APK ini.</p>
      </Modal>
    </ShellCtx.Provider>
  )
}
