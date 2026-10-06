'use client'
import { FieldDescription, FieldError, FieldLabel, useConfig, useField, useFormFields } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'
import { useEffect, useMemo, useState } from 'react'
import { BLANC, couleursFrom, type LigneCouleur } from '@/lib/couleurs'

type Option = { cle: string; nom: string; hex: string }

const BLANC_OPTION: Option = { cle: BLANC, nom: 'Blanc (miroir)', hex: '#ffffff' }

export function ChoixCouleur({ path, field, readOnly, blanc = false }: TextFieldClientProps & { blanc?: boolean }) {
  const { value, setValue, showError, errorMessage } = useField<string>({ path })
  const { config } = useConfig()
  const duFormulaire = useFormFields(([fields]) => {
    if (!fields['couleurs']) return ''
    const lignes: LigneCouleur[] = []
    for (let i = 0; fields[`couleurs.${i}.hex`]; i++) {
      lignes.push({ cle: fields[`couleurs.${i}.cle`]?.value as string, nom: fields[`couleurs.${i}.nom`]?.value as string, hex: fields[`couleurs.${i}.hex`]?.value as string })
    }
    return JSON.stringify(lignes)
  })
  const [distantes, setDistantes] = useState<LigneCouleur[] | null>(null)

  useEffect(() => {
    if (duFormulaire) return
    let actif = true
    fetch(`${config.routes.api}/globals/apparence?depth=0`, { credentials: 'include' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (actif) setDistantes(d?.couleurs ?? []) })
      .catch(() => { if (actif) setDistantes([]) })
    return () => { actif = false }
  }, [duFormulaire, config.routes.api])

  const options = useMemo<Option[]>(() => {
    const lignes: LigneCouleur[] = duFormulaire ? JSON.parse(duFormulaire) : distantes ?? []
    const base = couleursFrom({ couleurs: lignes.filter((l) => l.cle) })
    return blanc ? [...base, BLANC_OPTION] : base
  }, [duFormulaire, distantes, blanc])

  const inconnue = typeof value === 'string' && value !== '' && !options.some((o) => o.cle === value)

  return (
    <div className="field-type text choix-couleur" style={{ marginBottom: 'var(--base)' }}>
      <FieldLabel label={field.label} required={field.required} />
      <div role="radiogroup" aria-label={typeof field.label === 'string' ? field.label : path} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
        {options.map((o) => {
          const actif = value === o.cle
          return (
            <button
              key={o.cle}
              type="button"
              role="radio"
              aria-checked={actif}
              disabled={readOnly}
              onClick={() => setValue(o.cle)}
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
      {inconnue && <p style={{ marginTop: '0.4rem', color: 'var(--theme-error-500)' }}>La couleur « {value} » n’existe plus dans la palette : choisissez-en une autre.</p>}
      <FieldDescription description={field.admin?.description} path={path} />
      {showError && <FieldError message={errorMessage} showError />}
    </div>
  )
}
