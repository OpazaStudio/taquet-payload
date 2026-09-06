'use client'
import { FieldError, FieldLabel, useField } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'

const HEX_RE = /^#[0-9a-f]{6}$/i

export function ChampCouleur({ path, field, readOnly }: TextFieldClientProps) {
  const { value, setValue, showError, errorMessage } = useField<string>({ path })
  const hex = typeof value === 'string' && HEX_RE.test(value) ? value : '#000000'
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
      {showError && <FieldError message={errorMessage} showError />}
    </div>
  )
}
