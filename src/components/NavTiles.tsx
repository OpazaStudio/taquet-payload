'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { NAV, FACET_TILE_CLASS, facetFor } from '@/lib/nav'
import { telHref } from '@/lib/format'

const isActive = (pathname: string, href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

export function NavTiles({ telephone }: { telephone: string }) {
  const pathname = usePathname()
  const facet = facetFor(pathname)
  const [open, setOpen] = useState(false)
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) { setLastPath(pathname); setOpen(false) }
  useLayoutEffect(() => {
    document.documentElement.style.setProperty('--facet', `var(--color-${facet === 'blanc' ? 'mirror' : facet})`)
    document.documentElement.style.setProperty('--facet-deep', `var(--color-${facet === 'blanc' ? 'chrome-300' : `${facet}-deep`})`)
  }, [facet])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav aria-label="Navigation principale" className="hidden md:flex md:items-stretch md:gap-px">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={`tile flex items-center px-4 font-display text-[0.8125rem] font-medium tracking-[0.02em] hover:bg-mirror hover:text-ink ${active ? `${FACET_TILE_CLASS[facet]} tile-ink` : 'tile-chrome text-chrome-100'}`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
      <a href={telHref(telephone)} className="tile tile-facet tile-ink flex items-center gap-2 px-4 font-display text-[0.8125rem] font-bold hover:bg-mirror">
        <Phone className="size-4" strokeWidth={2.5} aria-hidden="true" />
        <span className="hidden sm:inline">{telephone}</span>
        <span className="sm:hidden">Appeler</span>
      </a>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="menu-mobile"
        className="tile tile-chrome flex items-center gap-2 px-4 font-display text-[0.8125rem] font-medium text-chrome-100 hover:bg-mirror hover:text-ink md:hidden"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        Menu
      </button>
      {open && (
        <div id="menu-mobile" className="fixed inset-x-0 top-16 bottom-0 z-40 grid grid-cols-2 gap-px bg-chrome-700 md:hidden" role="dialog" aria-label="Menu">
          {NAV.map((item, i) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`tile flex items-end p-4 font-display text-[1.25rem] font-bold leading-tight ${active ? `${FACET_TILE_CLASS[facet]} tile-ink` : i % 3 === 1 ? 'tile-chrome text-mirror' : 'bg-chrome-900 text-mirror'}`}
              >
                {item.label}
              </Link>
            )
          })}
          <a href={telHref(telephone)} className="tile tile-facet tile-ink col-span-2 flex items-center gap-3 p-4 font-display text-[1.25rem] font-bold">
            <Phone className="size-6" strokeWidth={2.5} aria-hidden="true" />
            {telephone}
          </a>
        </div>
      )}
    </>
  )
}
