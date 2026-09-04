'use client'
import { useState } from 'react'
import { MousePointerClick } from 'lucide-react'

export function MapFrame({ src, title }: { src: string; title: string }) {
  const [active, setActive] = useState(false)
  return (
    <div className="absolute inset-0">
      <iframe
        src={src}
        title={title}
        className={`h-full w-full border-0 grayscale-[35%] contrast-[1.05] ${active ? '' : 'pointer-events-none'}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      {!active && (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="tile tile-lit tile-mirror absolute bottom-4 left-4 inline-flex items-center gap-2 px-4 py-3 font-display text-[0.8125rem] font-bold shadow-tile"
        >
          <MousePointerClick className="size-4" aria-hidden="true" />Activer la carte
        </button>
      )}
    </div>
  )
}
