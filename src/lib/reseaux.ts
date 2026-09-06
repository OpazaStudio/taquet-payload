export const instagramHandle = (url?: string | null): string | null => {
  const m = url?.match(/instagram\.com\/([^/?#]+)/i)
  return m ? `@${m[1]}` : null
}
