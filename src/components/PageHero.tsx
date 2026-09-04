import type { ReactNode } from 'react'
import { DiscoBall } from './DiscoBall'
import { LightField } from './LightField'
import type { Facet } from '@/lib/nav'

type Props = { titre: string; facet: Exclude<Facet, 'blanc'>; children?: ReactNode; aside?: ReactNode }

export function PageHero({ titre, facet, children, aside }: Props) {
  return (
    <section className="relative overflow-hidden">
      <LightField tint={facet} variant="page" speed={0.08} />
      <div className="pointer-events-none absolute -top-32 -right-32 [--ball:220px] lg:-top-24 lg:-right-24 lg:[--ball:420px]" aria-hidden="true">
        <DiscoBall size={420} tint={facet} speed={0.08} />
      </div>
      <div className="relative mx-auto grid max-w-[1440px] gap-8 px-4 pt-14 pb-12 sm:px-6 lg:grid-cols-12 lg:pt-20 lg:pb-16">
        <div className="lg:col-span-8">
          <h1 className="font-display-tight text-balance text-[clamp(2.25rem,6vw,4.5rem)] font-black text-mirror">{titre}</h1>
          {children && <div className="mt-6 max-w-[60ch] text-[1.0625rem] text-chrome-100 sm:text-lg">{children}</div>}
        </div>
        {aside && <div className="lg:col-span-4 lg:self-end">{aside}</div>}
      </div>
    </section>
  )
}
