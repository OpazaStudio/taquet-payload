'use client'
import { usePathname } from 'next/navigation'
import { useLayoutEffect } from 'react'
import type { Apparence } from '@/payload-types'
import { pageFacetFrom, paletteFrom } from '@/lib/couleurs'
import { facetFor } from '@/lib/nav'
import { useLiveDoc } from '@/lib/useLiveDoc'

export function ApparenceLive({ apparence }: { apparence: Apparence }) {
  const live = useLiveDoc(apparence, { globalSlug: 'apparence' }, 0)
  const pathname = usePathname()
  useLayoutEffect(() => {
    const s = document.documentElement.style
    const palette = paletteFrom(live)
    for (const [cle, c] of Object.entries(palette)) {
      s.setProperty(`--color-${cle}`, c.hex)
      s.setProperty(`--color-${cle}-deep`, c.deep)
    }
    const facet = facetFor(pathname, pageFacetFrom(live))
    s.setProperty('--facet', `var(--color-${facet})`)
    s.setProperty('--facet-deep', `var(--color-${facet}-deep)`)
  }, [live, pathname])
  return null
}
