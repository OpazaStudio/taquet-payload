import Image from 'next/image'
import { isMedia, mediaAlt, mediaDims, mediaUrl, type MediaRef } from '@/lib/media'

type Props = {
  media: MediaRef
  alt?: string
  className?: string
  sizes?: string
  priority?: boolean
  fill?: boolean
  size?: 'miniature' | 'carte' | 'large'
}

export function Img({ media, alt, className = '', sizes = '100vw', priority = false, fill = false, size }: Props) {
  const src = mediaUrl(media, size) ?? mediaUrl(media)
  if (!src || !isMedia(media)) return null
  const { width, height } = mediaDims(media)
  const a = alt ?? mediaAlt(media)
  if (fill) return <Image src={src} alt={a} fill sizes={sizes} priority={priority} className={className} style={{ objectFit: 'cover' }} />
  return <Image src={src} alt={a} width={width} height={height} sizes={sizes} priority={priority} className={className} />
}
