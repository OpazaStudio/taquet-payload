'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Facebook, Instagram, Menu, Phone, X } from 'lucide-react'
import type { InfosPratiques } from '@/payload-types'
import { NAV } from '@/lib/nav'
import { telHref } from '@/lib/format'

const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

export function NavTiles({ telephone, reseaux }: { telephone: string; reseaux?: InfosPratiques['reseaux'] }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) { setLastPath(pathname); setOpen(false) }
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav aria-label="Navigation principale" className="hidden lg:flex lg:items-stretch lg:gap-px">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`tile flex items-center px-3 font-display text-[0.8125rem] font-medium tracking-[0.02em] hover:bg-mirror hover:text-ink xl:px-4 ${active ? 'tile-facet tile-ink' : 'tile-chrome text-chrome-100'}`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
      <a href={telHref(telephone)} className="tile tile-facet tile-ink flex items-center gap-2 px-4 font-display text-[0.8125rem] font-bold hover:bg-mirror">
        <Phone className="size-4" strokeWidth={2.5} aria-hidden="true" />
        <span className="hidden sm:inline lg:hidden xl:inline">{telephone}</span>
        <span className="sm:hidden lg:inline xl:hidden">Appeler</span>
      </a>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        className="tile tile-chrome flex items-center gap-2 px-4 font-display text-[0.8125rem] font-medium text-chrome-100 hover:bg-mirror hover:text-ink lg:hidden"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        Menu
      </button>
      {open && (
        <div id="menu-mobile" className="fixed inset-x-0 top-16 bottom-0 z-40 grid grid-cols-2 content-start gap-px overflow-y-auto bg-chrome-700 md:grid-cols-3 lg:hidden" role="dialog" aria-label="Menu">
          {NAV.map((item, i) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`tile flex min-h-[7.5rem] items-end p-4 font-display text-[1.25rem] font-bold leading-tight md:min-h-[9rem] ${active ? 'tile-facet tile-ink' : i % 3 === 1 ? 'tile-chrome text-mirror' : 'bg-chrome-900 text-mirror'}`}
              >
                {item.label}
              </Link>
            )
          })}
          {reseaux?.facebook && (
            <a href={reseaux.facebook} target="_blank" rel="noopener" className="tile tile-aqua tile-ink flex items-center gap-3 p-4 font-display text-[1.125rem] font-bold">
              <Facebook className="size-6" strokeWidth={2.25} aria-hidden="true" />Facebook
            </a>
          )}
          {reseaux?.instagram && (
            <a href={reseaux.instagram} target="_blank" rel="noopener" className="tile tile-fuchsia tile-ink flex items-center gap-3 p-4 font-display text-[1.125rem] font-bold">
              <Instagram className="size-6" strokeWidth={2.25} aria-hidden="true" />Instagram
            </a>
          )}
          <a href={telHref(telephone)} className="tile tile-facet tile-ink col-span-2 flex items-center gap-3 p-4 font-display text-[1.25rem] font-bold md:col-span-1">
            <Phone className="size-6" strokeWidth={2.5} aria-hidden="true" />
            {telephone}
          </a>
        </div>
      )}
    </>
  )
}
