import { useEffect, useState, useCallback } from 'react'

export const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true
export const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent)

// Satu sumber kebenaran untuk pemasangan PWA, dipakai oleh sheet, menu, dan beranda.
export function useInstall() {
  const [evt, setEvt] = useState(null)
  const [installed, setInstalled] = useState(isStandalone())
  useEffect(() => {
    const p = (e) => { e.preventDefault(); setEvt(e) }
    const i = () => { setInstalled(true); setEvt(null) }
    window.addEventListener('beforeinstallprompt', p)
    window.addEventListener('appinstalled', i)
    return () => { window.removeEventListener('beforeinstallprompt', p); window.removeEventListener('appinstalled', i) }
  }, [])
  const prompt = useCallback(async () => {
    if (!evt) return
    evt.prompt()
    await evt.userChoice
    setEvt(null)
  }, [evt])
  const ios = isIOS()
  return { canInstall: !installed && (!!evt || ios), ios, hasPrompt: !!evt, installed, prompt }
}
