'use client'
import { useEffect, useRef, type ReactNode } from 'react'
import { createTimeline, onScroll, utils } from 'animejs'

const CHROME_DARK = '#1b1b25'
const CHROME_TEXT = '#b6b7c4'
const MIRROR = '#ffffff'
const INK = '#0a0a0e'

export function PlanningReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const tiles = Array.from(root.querySelectorAll<HTMLElement>('[data-tile]'))
    if (!tiles.length) return

    const targets = tiles.map((el) => {
      const cs = getComputedStyle(el)
      return { bg: cs.backgroundColor, fg: cs.color }
    })
    utils.set(tiles, { backgroundColor: CHROME_DARK, color: CHROME_TEXT })

    const tl = createTimeline({
      autoplay: onScroll({ target: root, enter: '88% top', leave: 'top bottom' }),
    })
    tiles.forEach((el, i) => {
      tl.add(
        el,
        {
          backgroundColor: [
            { to: MIRROR, duration: 90, ease: 'out(2)' },
            { to: targets[i].bg, duration: 520, ease: 'outExpo' },
          ],
          color: [
            { to: INK, duration: 90 },
            { to: targets[i].fg, duration: 520, ease: 'outExpo' },
          ],
        },
        i * 38,
      )
    })

    return () => {
      tl.revert()
      utils.remove(tiles)
    }
  }, [])

  return <div ref={ref}>{children}</div>
}
