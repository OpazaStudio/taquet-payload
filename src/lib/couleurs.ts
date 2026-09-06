import type { CSSProperties } from 'react'
import { FACET_DEEP_HEX, FACET_HEX, PAGE_FACET, type FacetCouleur, type PageFacetMap } from './nav'

export const FACETS: FacetCouleur[] = ['fuchsia', 'mandarine', 'aqua']

export const FACET_LABEL: Record<FacetCouleur, string> = {
  fuchsia: 'Rose (fuchsia)',
  mandarine: 'Orange (mandarine)',
  aqua: 'Bleu (aqua)',
}

export const PAGES_APPARENCE = [
  { name: 'accueil', label: 'Accueil', path: '/' },
  { name: 'patinoire', label: 'La patinoire', path: '/patinoire-roller-la-rochelle' },
  { name: 'cours', label: 'Cours', path: '/cours' },
  { name: 'anniversaires', label: 'Anniversaires', path: '/anniversaires' },
  { name: 'acces', label: 'Accès', path: '/acces' },
  { name: 'contact', label: 'Contact', path: '/contact' },
  { name: 'actualites', label: 'Actualités', path: '/actualites' },
  { name: 'galerie', label: 'Galerie', path: '/galerie' },
  { name: 'mentionsLegales', label: 'Mentions légales', path: '/mentions-legales' },
] as const

export type ApparenceData = {
  palette?: Partial<Record<FacetCouleur, string | null>> | null
  pages?: Partial<Record<(typeof PAGES_APPARENCE)[number]['name'], string | null>> | null
}

export type Palette = Record<FacetCouleur, { hex: string; deep: string }>

export const HEX_RE = /^#[0-9a-f]{6}$/i

const hexToHsl = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  const h = max === r ? ((g - b) / d + (g < b ? 6 : 0)) / 6 : max === g ? ((b - r) / d + 2) / 6 : ((r - g) / d + 4) / 6
  return [h, s, l]
}

const hslToHex = (h: number, s: number, l: number): string => {
  const f = (n: number) => {
    const k = (n + h * 12) % 12
    const a = s * Math.min(l, 1 - l)
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
    return Math.round(c * 255).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export const deepOf = (hex: string): string => {
  const [h, s, l] = hexToHsl(hex)
  return hslToHex(h, s, l * 0.68)
}

const normalise = (v: string | null | undefined, fallback: string): string => {
  const t = v?.trim().toLowerCase() ?? ''
  return HEX_RE.test(t) ? t : fallback
}

export const paletteFrom = (a?: ApparenceData | null): Palette => {
  const out = {} as Palette
  for (const f of FACETS) {
    const hex = normalise(a?.palette?.[f], FACET_HEX[f])
    out[f] = { hex, deep: hex === FACET_HEX[f] ? FACET_DEEP_HEX[f] : deepOf(hex) }
  }
  return out
}

export const pageFacetFrom = (a?: ApparenceData | null): PageFacetMap => {
  const map: PageFacetMap = { ...PAGE_FACET }
  for (const p of PAGES_APPARENCE) {
    const v = a?.pages?.[p.name]
    if (v && (FACETS as string[]).includes(v)) map[p.path] = v as FacetCouleur
  }
  return map
}

export const paletteStyle = (p: Palette): CSSProperties => {
  const s: Record<string, string> = {}
  for (const f of FACETS) {
    s[`--color-${f}`] = p[f].hex
    s[`--color-${f}-deep`] = p[f].deep
  }
  return s as CSSProperties
}

export const readCssHex = (name: string, fallback: string): string => {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim().toLowerCase()
  return HEX_RE.test(v) ? v : fallback
}

export const hexToRgb = (hex: string): [number, number, number] => [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)]

export const clientPalette = (): Palette => {
  const out = {} as Palette
  for (const f of FACETS) out[f] = { hex: readCssHex(`--color-${f}`, FACET_HEX[f]), deep: readCssHex(`--color-${f}-deep`, FACET_DEEP_HEX[f]) }
  return out
}
