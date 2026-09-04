import Link from 'next/link'
import { DiscoBall } from '@/components/DiscoBall'

export default function NotFound() {
  return (
    <section className="relative mx-auto flex max-w-[1440px] flex-col items-start gap-8 overflow-hidden px-4 py-24 sm:px-6">
      <div className="absolute -top-16 right-0 opacity-70 [--ball:320px]"><DiscoBall size={320} tint="aqua" /></div>
      <h1 className="font-display-tight relative text-[clamp(3rem,10vw,7rem)] font-black text-mirror">Perdu ?</h1>
      <p className="relative max-w-[40ch] text-lg text-chrome-100">Cette page n’existe pas ou plus. La piste, elle, est toujours là.</p>
      <Link href="/" className="tile tile-lit tile-aqua tile-ink relative inline-flex px-6 py-4 font-display text-[0.9375rem] font-bold">Retour à l’accueil</Link>
    </section>
  )
}
