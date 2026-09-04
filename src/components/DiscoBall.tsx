'use client'
import { useEffect, useMemo, useRef } from 'react'
import { facets, lightsFor } from '@/lib/ball'

type Props = {
  size?: number
  tint?: 'all' | 'fuchsia' | 'mandarine' | 'aqua'
  className?: string
  speed?: number
  drive?: boolean
}

export function DiscoBall({ size = 720, tint = 'all', className = '', speed = 0.12, drive = false }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const lights = useMemo(() => lightsFor(tint), [tint])
  const initial = useMemo(() => facets(0.4, lights, 18), [lights])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const svg = svgRef.current
    if (!wrap || !canvas || !svg) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const displayed = Math.min(size, wrap.clientWidth || size)
    const px = Math.round(displayed * dpr)
    canvas.width = px
    canvas.height = px
    const R = px / 2

    const draw = (angle: number) => {
      ctx.clearRect(0, 0, px, px)
      ctx.lineWidth = Math.max(0.6, dpr * 0.55)
      ctx.strokeStyle = '#0a0a0e'
      ctx.lineJoin = 'round'
      for (const f of facets(angle, lights)) {
        ctx.beginPath()
        f.pts.forEach(([x, y], k) => (k === 0 ? ctx.moveTo(R + x * R, R + y * R) : ctx.lineTo(R + x * R, R + y * R)))
        ctx.closePath()
        ctx.fillStyle = f.fill
        ctx.fill()
        ctx.stroke()
      }
      if (drive) document.documentElement.style.setProperty('--a', `${angle.toFixed(4)}rad`)
    }

    draw(0.4)
    svg.style.visibility = 'hidden'
    if (reduce) return

    let raf = 0
    let visible = true
    const t0 = performance.now()
    const loop = (t: number) => {
      if (visible) draw(0.4 + ((t - t0) / 1000) * speed + window.scrollY * 0.0018)
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { rootMargin: '200px' })
    io.observe(canvas)
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [lights, size, speed, drive])

  return (
    <div ref={wrapRef} data-ball className={`relative aspect-square ${className}`} style={{ width: 'var(--ball, 720px)' }} aria-hidden="true">
      <svg ref={svgRef} viewBox="-1.02 -1.02 2.04 2.04" className="absolute inset-0 h-full w-full">
        {initial.map((f, i) => (
          <polygon key={i} points={f.pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')} fill={f.fill} stroke="#0a0a0e" strokeWidth={0.006} strokeLinejoin="round" />
        ))}
      </svg>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
