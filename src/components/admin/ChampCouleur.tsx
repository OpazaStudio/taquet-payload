'use client'
import { FieldDescription, FieldError, FieldLabel, useConfig, useField } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'
import { useEffect, useState } from 'react'
import { couleursFrom, type LigneCouleur } from '@/lib/couleurs'

const HEX_RE = /^#[0-9a-f]{6}$/i

type Option = { nom: string; hex: string }

export function ChampCouleur({ path, field, readOnly, palette = false }: TextFieldClientProps & { palette?: boolean }) {
  const { value, setValue, showError, errorMessage } = useField<string>({ path })
  const { config } = useConfig()
  const [options, setOptions] = useState<Option[]>([])
  const hex = typeof value === 'string' && HEX_RE.test(value) ? value : '#000000'

  useEffect(() => {
    if (!palette) return
    let actif = true
    fetch(`${config.routes.api}/globals/apparence?depth=0`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((d) => {
        if (!actif) return
        const lignes: LigneCouleur[] = (d?.couleurs ?? []).filter((l: LigneCouleur) => l.cle)
        setOptions([...couleursFrom({ couleurs: lignes }), { nom: 'Noir', hex: '#0a0a0e' }, { nom: 'Blanc', hex: '#ffffff' }])
      })
    return () => { actif = false }
  }, [palette, config.routes.api])
  return (
    <div className="field-type text champ-couleur" style={{ marginBottom: 'var(--base)' }}>
      <FieldLabel htmlFor={`field-${path}`} label={field.label} required={field.required} />
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="color"
          aria-label={`Choisir : ${typeof field.label === 'string' ? field.label : path}`}
          value={hex}
          disabled={readOnly}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: '2.75rem', height: '2.5rem', padding: 0, border: '1px solid var(--theme-elevation-150)', background: 'transparent', cursor: 'pointer' }}
        />
        <input
          id={`field-${path}`}
          type="text"
          value={typeof value === 'string' ? value : ''}
          disabled={readOnly}
          onChange={(e) => setValue(e.target.value.trim().toLowerCase())}
          placeholder="#ff3fa4"
          spellCheck={false}
          style={{ flex: 1, fontFamily: 'monospace' }}
        />
      </div>
      {options.length > 0 && (
        <div role="group" aria-label="Couleurs du site" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginTop: '0.5rem' }}>
          {options.map((o) => {
            const actif = typeof value === 'string' && value.toLowerCase() === o.hex.toLowerCase()
            return (
              <button
                key={`${o.nom}-${o.hex}`}
                type="button"
                aria-pressed={actif}
                disabled={readOnly}
                onClick={() => setValue(o.hex)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.3rem 0.6rem 0.3rem 0.35rem',
                  border: `1px solid ${actif ? 'var(--theme-text)' : 'var(--theme-elevation-150)'}`,
                  boxShadow: actif ? 'inset 0 0 0 1px var(--theme-text)' : 'none',
                  background: 'var(--theme-input-bg)',
                  color: 'var(--theme-text)',
                  borderRadius: '4px',
                  cursor: readOnly ? 'default' : 'pointer',
                  fontSize: '0.8125rem',
                }}
              >
                <span aria-hidden="true" style={{ width: '1.1rem', height: '1.1rem', borderRadius: '3px', background: o.hex, border: '1px solid var(--theme-elevation-200)' }} />
                {o.nom}
              </button>
            )
          })}
        </div>
      )}
      <FieldDescription description={field.admin?.description} path={path} />
      {showError && <FieldError message={errorMessage} showError />}
    </div>
  )
}
