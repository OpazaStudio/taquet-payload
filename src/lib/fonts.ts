import { Bricolage_Grotesque, Unbounded } from 'next/font/google'

export const unbounded = Unbounded({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '700', '900'],
  variable: '--font-unbounded',
  display: 'swap',
})

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin', 'latin-ext'],
  axes: ['opsz', 'wdth'],
  variable: '--font-bricolage',
  display: 'swap',
})
