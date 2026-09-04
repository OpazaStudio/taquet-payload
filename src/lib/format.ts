export const telHref = (phone: string): string => {
  const digits = phone.replace(/\D/g, '')
  const intl = digits.startsWith('0') ? `+33${digits.slice(1)}` : `+${digits}`
  return `tel:${intl}`
}

export const euros = (n: number): string =>
  `${Number.isInteger(n) ? n : n.toFixed(2).replace('.', ',')} €`

export const dateLongue = (iso: string): string =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }).format(new Date(iso))
