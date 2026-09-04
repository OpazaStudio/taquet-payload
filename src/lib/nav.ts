export const NAV = [
  { href: '/', label: 'Accueil' },
  { href: '/patinoire-roller-la-rochelle', label: 'La patinoire' },
  { href: '/cours', label: 'Cours' },
  { href: '/anniversaires', label: 'Anniversaires' },
  { href: '/acces', label: 'Accès' },
  { href: '/contact', label: 'Contact' },
] as const

export type Facet = 'fuchsia' | 'mandarine' | 'aqua' | 'blanc'

export const PAGE_FACET: Record<string, Facet> = {
  '/': 'fuchsia',
  '/patinoire-roller-la-rochelle': 'aqua',
  '/cours': 'mandarine',
  '/anniversaires': 'fuchsia',
  '/acces': 'aqua',
  '/contact': 'fuchsia',
  '/actualites': 'mandarine',
  '/galerie': 'aqua',
  '/mentions-legales': 'aqua',
}

export const facetFor = (pathname: string): Facet =>
  PAGE_FACET[pathname] ?? PAGE_FACET[Object.keys(PAGE_FACET).find((k) => k !== '/' && pathname.startsWith(k)) ?? '/']

export const FACET_INIT_SCRIPT = `(function(){var m=${JSON.stringify(PAGE_FACET)},p=location.pathname,f=m[p];if(!f){for(var k in m){if(k!=='/'&&p.indexOf(k)===0){f=m[k];break}}}f=f||'fuchsia';var s=document.documentElement.style;s.setProperty('--facet','var(--color-'+(f==='blanc'?'mirror':f)+')');s.setProperty('--facet-deep','var(--color-'+(f==='blanc'?'chrome-300':f+'-deep')+')')})()`

export const FACET_HEX: Record<Facet, string> = {
  fuchsia: '#ff3fa4',
  mandarine: '#ff8c1a',
  aqua: '#35e3ff',
  blanc: '#ffffff',
}
export const FACET_DEEP_HEX: Record<Facet, string> = {
  fuchsia: '#c9127a',
  mandarine: '#d66a00',
  aqua: '#00a9c4',
  blanc: '#b6b7c4',
}
export const FACET_TILE_CLASS: Record<Facet, string> = {
  fuchsia: 'tile-fuchsia',
  mandarine: 'tile-mandarine',
  aqua: 'tile-aqua',
  blanc: 'tile-mirror',
}
