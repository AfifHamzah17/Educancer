// src/components/RouteTracker.jsx
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { inject } from '@vercel/analytics'

export default function RouteTracker() {
  const { pathname } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return } // load pertama sudah ditangani <Analytics />
    inject() // kirim pageview untuk route baru
  }, [pathname])
  return null
}