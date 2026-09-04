import { postgresAdapter } from '@payloadcms/db-postgres'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { fr } from '@payloadcms/translations/languages/fr'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Cours } from './collections/Cours'
import { Actualites } from './collections/Actualites'
import { GaleriePhotos } from './collections/GaleriePhotos'
import { MessagesContact } from './collections/MessagesContact'
import { InfosPratiques } from './globals/InfosPratiques'
import { Accueil } from './globals/Accueil'
import { Patinoire } from './globals/Patinoire'
import { PageCours } from './globals/PageCours'
import { Anniversaires } from './globals/Anniversaires'
import { Acces } from './globals/Acces'
import { Contact } from './globals/Contact'
import { MentionsLegales } from './globals/MentionsLegales'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const SITE_NAME = 'Au Taquet'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' · Au Taquet',
      description: 'Administration du site musicdanceroller.com',
    },
    livePreview: {
      breakpoints: [
        { label: 'Téléphone', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablette', name: 'tablet', width: 820, height: 1180 },
        { label: 'Ordinateur', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  i18n: {
    supportedLanguages: { fr },
    fallbackLanguage: 'fr',
  },
  collections: [Cours, Actualites, GaleriePhotos, Media, MessagesContact, Users],
  globals: [Accueil, Patinoire, PageCours, Anniversaires, Acces, Contact, MentionsLegales, InfosPratiques],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures.filter((f) => !['upload', 'relationship', 'blockquote', 'horizontalRule', 'indent', 'align', 'checklist'].includes(f.key)),
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
      FixedToolbarFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  cors: [getServerSideURL()].filter(Boolean),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
    push: false,
  }),
  sharp,
  plugins: [
    seoPlugin({
      globals: ['accueil', 'patinoire', 'page-cours', 'anniversaires', 'acces', 'contact'],
      collections: ['actualites'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => {
        const t = (doc as { titre?: string; bandeau?: { titre?: string } })?.titre ?? (doc as { bandeau?: { titre?: string } })?.bandeau?.titre
        return t ? `${t} · ${SITE_NAME}, patinoire roller La Rochelle` : `${SITE_NAME} · patinoire roller La Rochelle`
      },
      generateDescription: ({ doc }) => (doc as { resume?: string; intro?: string })?.resume ?? '',
      generateURL: ({ doc, collectionSlug }) => {
        const base = getServerSideURL()
        const slug = (doc as { slug?: string })?.slug
        return collectionSlug === 'actualites' && slug ? `${base}/actualites/${slug}` : base
      },
    }),
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: { disablePayloadAccessControl: true } },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
