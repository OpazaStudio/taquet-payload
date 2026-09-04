'use client'
import { Facebook, Instagram, Mail } from 'lucide-react'
import type { Contact, InfosPratiques } from '@/payload-types'
import { Img } from '@/components/Img'
import { PageHero } from '@/components/PageHero'
import { PhoneTile } from '@/components/PhoneTile'
import { telHref } from '@/lib/format'
import { ContactForm } from './ContactForm'
import { useLiveDoc } from '@/lib/useLiveDoc'

export function ContactView({ page: initial, infos }: { page: Contact; infos: InfosPratiques }) {
  const page = useLiveDoc(initial, { globalSlug: 'contact' }, 2)
  return (
    <>
      <PageHero titre={page.titre} facet="fuchsia" aside={<PhoneTile telephone={infos.telephone} label="Le plus rapide : appeler" compact />}>
        {page.intro && <p>{page.intro}</p>}
      </PageHero>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:py-32">
        <div className="relative lg:col-span-7">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">Écrivez-nous</h2>
          <div className="mt-6"><ContactForm messageSucces={page.messageSucces ?? 'Merci, votre message est bien arrivé.'} /></div>
        </div>
        <div className="grid content-start gap-px lg:col-span-5">
          <div className="tile tile-chrome p-5 text-mirror">
            <h2 className="font-display text-[0.9375rem] font-bold">Par téléphone</h2>
            <p className="mt-2 text-[1.0625rem]">
              <a href={telHref(infos.telephone)} className="font-display font-bold hover:text-[var(--facet)]">{infos.telephone}</a>
              {infos.telephoneMobile && <><br /><a href={telHref(infos.telephoneMobile)} className="hover:text-[var(--facet)]">{infos.telephoneMobile}</a></>}
            </p>
          </div>
          {infos.email && (
            <a href={`mailto:${infos.email}`} className="tile tile-lit tile-chrome flex items-center gap-3 p-5 text-mirror"><Mail className="size-5" aria-hidden="true" />{infos.email}</a>
          )}
          {infos.reseaux?.facebook && <a href={infos.reseaux.facebook} target="_blank" rel="noopener" className="tile tile-lit tile-chrome flex items-center gap-3 p-5 text-mirror"><Facebook className="size-5" aria-hidden="true" />Facebook « Au Taquet »</a>}
          {infos.reseaux?.instagram && <a href={infos.reseaux.instagram} target="_blank" rel="noopener" className="tile tile-lit tile-chrome flex items-center gap-3 p-5 text-mirror"><Instagram className="size-5" aria-hidden="true" />Instagram « musicdanceroller »</a>}
          <div className="tile relative mt-px aspect-[4/3] bg-chrome-900"><Img media={page.photo} fill sizes="(min-width:1024px) 40vw, 100vw" /></div>
        </div>
      </section>
    </>
  )
}
