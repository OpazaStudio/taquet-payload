'use client'
import { useRowLabel } from '@payloadcms/ui'
import { HEX_RE } from '@/lib/couleurs'

export function LigneCouleur() {
  const { data, rowNumber } = useRowLabel<{ nom?: string; hex?: string }>()
  const hex = data?.hex && HEX_RE.test(data.hex) ? data.hex : 'transparent'
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
      <span aria-hidden="true" style={{ width: '1rem', height: '1rem', borderRadius: '3px', background: hex, border: '1px solid var(--theme-elevation-200)' }} />
      {data?.nom || `Couleur ${(rowNumber ?? 0) + 1}`}
    </span>
  )
}
