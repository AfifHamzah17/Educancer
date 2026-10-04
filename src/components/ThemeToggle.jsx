import { Sun, Moon } from 'lucide-react'
import { useShell } from '../lib/shell.js'

export default function ThemeToggle({ className = '' }) {
  const { theme } = useShell()
  const dark = theme.theme === 'dark'
  return (
    <button onClick={theme.toggle} aria-pressed={dark} aria-label={dark ? 'Pakai tema terang' : 'Pakai tema gelap'}
      className={`btn btn-soft size-11 !min-h-11 !p-0 !rounded-full ${className}`}>
      {dark ? <Sun size={19} aria-hidden /> : <Moon size={19} aria-hidden />}
    </button>
  )
}
