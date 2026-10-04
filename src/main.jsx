import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/plus-jakarta-sans'
import '@fontsource-variable/outfit'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter><App /></BrowserRouter>
)

// Registrasi service worker ditunda sampai halaman selesai dimuat.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    const { registerSW } = await import('virtual:pwa-register')
    const update = registerSW({
      onNeedRefresh() { window.dispatchEvent(new CustomEvent('educancer:update', { detail: update })) },
    })
  })
}
