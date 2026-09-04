import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { bricolage, unbounded } from '@/lib/fonts'
import { toSchemaHours } from '@/lib/hours'
import { mediaUrl } from '@/lib/media'
import { FACET_INIT_SCRIPT } from '@/lib/nav'
import { getInfos } from '@/lib/payload'
import { SITE } from '@/lib/seo'
import { getServerSideURL } from '@/utilities/getURL'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: `${SITE.alt} · ${SITE.name}, ${SITE.tagline}`,
    template: `%s · ${SITE.name}, patinoire roller La Rochelle`,
  },
  description: 'Au Taquet (Music Dance Roller) : patinoire roller couverte de 1000 m² à Aytré, La Rochelle. Patinage libre le week-end, cours de roller et de danse, anniversaires, privatisation.',
  applicationName: SITE.name,
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const infos = await getInfos()
  const base = getServerSideURL()
  const logo = mediaUrl(infos.logo)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['SportsActivityLocation', 'LocalBusiness'],
    '@id': `${base}/#lieu`,
    name: `${infos.nom} · ${infos.nomSite}`,
    alternateName: [infos.nomSite, 'Patinoire roller La Rochelle'],
    description: 'Patinoire de roller couverte (1000 m², piste de 500 m²) à Aytré, La Rochelle : patinage libre, cours de roller et de danse, anniversaires, privatisation.',
    url: base,
    telephone: infos.telephone,
    ...(infos.email ? { email: infos.email } : {}),
    ...(logo ? { image: logo.startsWith('http') ? logo : `${base}${logo}`, logo: logo.startsWith('http') ? logo : `${base}${logo}` } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: [infos.adresse.rue, infos.adresse.complement].filter(Boolean).join(', '),
      postalCode: infos.adresse.codePostal,
      addressLocality: infos.adresse.ville,
      addressRegion: 'Charente-Maritime',
      addressCountry: 'FR',
    },
    ...(infos.adresse.latitude && infos.adresse.longitude
      ? { geo: { '@type': 'GeoCoordinates', latitude: infos.adresse.latitude, longitude: infos.adresse.longitude } }
      : {}),
    areaServed: ['La Rochelle', 'Aytré', 'Rochefort', 'Châtelaillon-Plage', 'Fouras', 'Île de Ré', 'Charente-Maritime'],
    openingHours: toSchemaHours(infos.horaires ?? []),
    priceRange: '€',
    sameAs: [infos.reseaux?.facebook, infos.reseaux?.instagram].filter(Boolean),
  }

  return (
    <html lang="fr" className={`${unbounded.variable} ${bricolage.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <script dangerouslySetInnerHTML={{ __html: FACET_INIT_SCRIPT }} />
        <JsonLd data={jsonLd} />
        <Header infos={infos} />
        <main className="flex-1">{children}</main>
        <Footer infos={infos} />
      </body>
    </html>
  )
}
