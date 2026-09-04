export type RGB = [number, number, number]
export type Light = { color: RGB; dir: [number, number, number]; spread?: number }

export const norm = (v: [number, number, number]): [number, number, number] => {
  const l = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / l, v[1] / l, v[2] / l]
}

export const FUCHSIA: RGB = [255, 63, 164]
export const MANDARINE: RGB = [255, 140, 26]
export const AQUA: RGB = [53, 227, 255]
export const SILVER: RGB = [236, 236, 244]
export const WHITE: RGB = [255, 255, 255]

export const lightsFor = (tint: 'all' | 'fuchsia' | 'mandarine' | 'aqua'): Light[] => {
  const dirs: Array<[number, number, number]> = [norm([-0.55, -0.5, 0.68]), norm([0.72, -0.05, 0.69]), norm([-0.05, 0.78, 0.62])]
  if (tint === 'all') return [{ color: FUCHSIA, dir: dirs[0] }, { color: MANDARINE, dir: dirs[1] }, { color: AQUA, dir: dirs[2] }]
  const c = tint === 'fuchsia' ? FUCHSIA : tint === 'mandarine' ? MANDARINE : AQUA
  return [{ color: c, dir: dirs[0] }, { color: SILVER, dir: dirs[1] }, { color: c, dir: dirs[2] }]
}

const hash = (i: number, j: number): number => {
  let h = (i * 374761393 + j * 668265263) | 0
  h = ((h ^ (h >>> 13)) * 1274126177) | 0
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}

export type Facet = { pts: Array<[number, number]>; fill: string }

const toCss = (c: RGB) => `rgb(${c[0] | 0} ${c[1] | 0} ${c[2] | 0})`
const mix = (a: RGB, b: RGB, t: number): RGB => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]

const CHROME_DARK: RGB = [22, 22, 30]
const CHROME_LIGHT: RGB = [205, 206, 218]

export const facets = (angle: number, lights: Light[], rows = 32, density = 84): Facet[] => {
  const out: Facet[] = []
  const bandH = Math.PI / rows
  for (let i = 0; i < rows; i++) {
    const lat0 = -Math.PI / 2 + i * bandH
    const lat1 = lat0 + bandH
    const mid = (lat0 + lat1) / 2
    const count = Math.max(8, Math.round(density * Math.cos(mid)))
    const w = (2 * Math.PI) / count
    for (let j = 0; j < count; j++) {
      const lon0 = j * w + angle + (i % 2) * (w / 2)
      const lon1 = lon0 + w
      const cLon = (lon0 + lon1) / 2
      const nz = Math.cos(mid) * Math.cos(cLon)
      if (nz < 0.04) continue
      const nx = Math.cos(mid) * Math.sin(cLon)
      const ny = -Math.sin(mid)
      let best = -1
      let bestLight: Light | null = null
      for (const L of lights) {
        const d = nx * L.dir[0] + ny * L.dir[1] + nz * L.dir[2]
        if (d > best) { best = d; bestLight = L }
      }
      const r = hash(i, j)
      let fill: RGB
      if (bestLight && best > 0.905) fill = bestLight.color
      else if (bestLight && best > 0.83) fill = mix(CHROME_LIGHT, bestLight.color, 0.45 + r * 0.25)
      else {
        const v = Math.pow(nz, 1.6) * 0.75 + r * 0.22
        fill = mix(CHROME_DARK, CHROME_LIGHT, Math.min(1, v))
      }
      const p = (lat: number, lon: number): [number, number] => [Math.cos(lat) * Math.sin(lon), -Math.sin(lat)]
      out.push({ pts: [p(lat0, lon0), p(lat0, lon1), p(lat1, lon1), p(lat1, lon0)], fill: toCss(fill) })
    }
  }
  return out
}
