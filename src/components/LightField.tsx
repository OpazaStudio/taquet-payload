'use client'
import { useEffect, useRef } from 'react'
import { FACET_DEEP_HEX, FACET_HEX, type Facet } from '@/lib/nav'

type Props = { tint?: 'all' | Facet; variant?: 'home' | 'page'; speed?: number; className?: string }

type Spot = { r: number; phi: number; ring: number; color: string; alpha: number; phase: number; tilt: number }

const PALETTE: Record<'all' | Facet, string[]> = {
  all: [FACET_HEX.fuchsia, FACET_HEX.aqua, FACET_HEX.mandarine, FACET_HEX.fuchsia, FACET_HEX.aqua, '#ffffff'],
  fuchsia: [FACET_HEX.fuchsia, FACET_HEX.fuchsia, FACET_DEEP_HEX.fuchsia, FACET_HEX.mandarine, '#ffffff'],
  mandarine: [FACET_HEX.mandarine, FACET_HEX.mandarine, FACET_DEEP_HEX.mandarine, FACET_HEX.fuchsia, '#ffffff'],
  aqua: [FACET_HEX.aqua, FACET_HEX.aqua, FACET_DEEP_HEX.aqua, FACET_HEX.fuchsia, '#ffffff'],
  blanc: [FACET_HEX.aqua, FACET_HEX.fuchsia, FACET_HEX.mandarine, '#ffffff'],
}

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

const hex = (c: string, a: number) => {
  const r = parseInt(c.slice(1, 3), 16), g = parseInt(c.slice(3, 5), 16), b = parseInt(c.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${a.toFixed(3)})`
}

export function LightField({ tint = 'all', variant = 'page', speed = 0.12, className = '' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const host = canvas?.parentElement
    if (!canvas || !host) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const palette = PALETTE[tint]
    let W = 0, H = 0, dpr = 1, cx = 0, cy = 0, rmax = 1
    let spots: Spot[] = []

    const build = () => {
      W = host.clientWidth
      H = host.clientHeight
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const ball = host.querySelector('[data-ball]')
      const hb = host.getBoundingClientRect()
      const bb = ball?.getBoundingClientRect()
      const R = bb ? bb.width / 2 : 200
      cx = bb ? bb.left - hb.left + R : W * 0.92
      cy = bb ? bb.top - hb.top + R : H * 0.2
      rmax = Math.max(Math.hypot(cx, cy), Math.hypot(cx, H - cy), Math.hypot(W - cx, cy), Math.hypot(W - cx, H - cy))
      const narrow = W < 1024
      spots = []
      let seed = tint.length * 7 + variant.length
      for (let k = 0, r = R + 26; r < rmax + 24; k++, r += (narrow ? 28 : 32) + k * 3) {
        const n = Math.ceil((2 * Math.PI * r) / ((narrow ? 30 : 34) + k * 4))
        const color = palette[k % palette.length]
        for (let i = 0; i < n; i++) {
          seed++
          spots.push({
            r, ring: k,
            phi: ((i + hash(seed) * 0.25) * 2 * Math.PI) / n,
            color,
            alpha: 0.8 + hash(seed + 0.75) * 0.2,
            phase: hash(seed + 0.9) * 0.6,
            tilt: (hash(seed + 0.1) - 0.5) * 0.3,
          })
        }
      }
    }

    const draw = (angle: number) => {
      ctx.clearRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'
      const narrow = W < 1024
      const textX = W * 0.62, textY = H * 0.78
      for (const s of spots) {
        const phi = s.phi + angle * 0.35
        const x = cx + s.r * Math.cos(phi)
        const y = cy + s.r * Math.sin(phi)
        if (x < -20 || x > W + 20 || y < -20 || y > H + 20) continue
        const d = s.r / rmax
        const size = narrow ? 4 + d * 6 : 6 + d * 10
        const nearText = narrow ? 0.6 : x < textX && y < textY ? 0.55 : 1
        const wave = 0.5 + 0.5 * Math.cos(phi * 5 - angle * 2.4 + s.ring * 0.45 + s.phase)
        const a = s.alpha * Math.pow(1 - Math.min(1, d), 0.8) * (0.35 + 0.65 * wave) * nearText
        if (a < 0.02) continue
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(phi + Math.PI / 2 + s.tilt)
        ctx.fillStyle = hex(s.color, a)
        ctx.fillRect(-size * 0.75, -size * 0.5, size * 1.5, size)
        ctx.restore()
      }
      ctx.globalCompositeOperation = 'source-over'
    }

    build()
    draw(0.4)
    canvas.dataset.ready = ''
    const ro = new ResizeObserver(() => { build(); draw(0.4) })
    ro.observe(host)
    if (reduce) return () => ro.disconnect()

    let raf = 0
    let visible = true
    const t0 = performance.now()
    const loop = (now: number) => {
      const t = (now - t0) / 1000
      if (visible) draw(0.4 + t * speed + window.scrollY * 0.0018)
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { rootMargin: '100px' })
    io.observe(canvas)
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect() }
  }, [tint, variant, speed])

  return <canvas ref={ref} className={`light-field ${className}`} aria-hidden="true" />
}
