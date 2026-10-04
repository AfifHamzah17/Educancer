import { useCallback, useEffect, useState } from 'react'
import { load, save } from './storage.js'

const apply = (t) => { document.documentElement.dataset.theme = t }

export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  useEffect(() => {
    // Ikuti pengaturan sistem selama pengguna belum memilih sendiri.
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const h = (e) => { if (!load('theme')) { const t = e.matches ? 'dark' : 'light'; apply(t); setTheme(t) } }
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])
  const set = useCallback((t) => { apply(t); save('theme', t); setTheme(t) }, [])
  const toggle = useCallback(() => set(theme === 'dark' ? 'light' : 'dark'), [theme, set])
  return { theme, set, toggle }
}
