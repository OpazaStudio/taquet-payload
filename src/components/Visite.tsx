'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function Visite() {
  const pathname = usePathname()
  useEffect(() => {
    if (!pathname || window.self !== window.top || navigator.webdriver) return
    fetch('/api/visites/enregistrer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chemin: pathname }),
      keepalive: true,
      credentials: 'same-origin',
    }).catch(() => {})
  }, [pathname])
  return null
}
