import type { ServerProps } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import { jourParis } from '@/collections/Visites'
import { drizzleDe } from '@/lib/db'
import { NAV } from '@/lib/nav'

type Jour = { jour: string; vues: number; visiteurs: number }
type Page = { chemin: string; vues: number; visiteurs: number }

const LABELS: Record<string, string> = Object.fromEntries([...NAV.map((n) => [n.href, n.label]), ['/actualites', 'Actualités'], ['/galerie', 'Galerie'], ['/mentions-legales', 'Mentions légales']])
const libelle = (chemin: string) => LABELS[chemin] ?? (chemin.startsWith('/actualites/') ? `Actualité : ${decodeURIComponent(chemin.slice(12)).replace(/-/g, ' ')}` : chemin)

const decale = (jours: number) => {
  const d = new Date()
  d.setDate(d.getDate() - jours)
  return jourParis(d)
}
const jourCourt = (j: string) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', timeZone: 'Europe/Paris' }).format(new Date(`${j}T12:00:00Z`))
const nombre = (n: number) => new Intl.NumberFormat('fr-FR').format(n)

const somme = (rows: Jour[], depuis: string) => rows.filter((r) => r.jour >= depuis).reduce((a, r) => ({ vues: a.vues + r.vues, visiteurs: a.visiteurs + r.visiteurs }), { vues: 0, visiteurs: 0 })

export async function Statistiques({ payload }: ServerProps) {
  const db = drizzleDe(payload)
  const d30 = decale(29), d7 = decale(6), auj = jourParis()
  const [parJour, parPage, actus, photos, cours] = await Promise.all([
    db.execute<Jour>(sql`select jour, sum(vues)::int as vues, count(distinct visiteur)::int as visiteurs from visites where jour >= ${d30} group by jour order by jour`),
    db.execute<Page>(sql`select chemin, sum(vues)::int as vues, count(distinct visiteur)::int as visiteurs from visites where jour >= ${d30} group by chemin order by 2 desc limit 8`),
    payload.count({ collection: 'actualites', where: { publie: { equals: true } } }),
    payload.count({ collection: 'galerie-photos' }),
    payload.count({ collection: 'cours' }),
  ])
  const jours: Jour[] = []
  for (let i = 29; i >= 0; i--) {
    const j = decale(i)
    jours.push(parJour.rows.find((r) => r.jour === j) ?? { jour: j, vues: 0, visiteurs: 0 })
  }
  const t30 = somme(jours, d30), t7 = somme(jours, d7), tAuj = somme(jours, auj)
  const max = Math.max(1, ...jours.map((j) => j.visiteurs))
  const W = 600, H = 120, bw = W / 30

  return (
    <section className="stats">
      <h2 className="stats__titre">Fréquentation du site</h2>
      <p className="stats__note">Mesure anonyme, sans cookie : un visiteur est compté une fois par jour et par page.</p>
      <div className="stats__tuiles">
        {[
          { l: 'Aujourd’hui', v: tAuj },
          { l: '7 derniers jours', v: t7 },
          { l: '30 derniers jours', v: t30 },
        ].map((t) => (
          <div key={t.l} className="stats__tuile">
            <span className="stats__tuile-l">{t.l}</span>
            <span className="stats__tuile-v">{nombre(t.v.visiteurs)}</span>
            <span className="stats__tuile-s">visiteur{t.v.visiteurs > 1 ? 's' : ''} · {nombre(t.v.vues)} page{t.v.vues > 1 ? 's' : ''} vue{t.v.vues > 1 ? 's' : ''}</span>
          </div>
        ))}
      </div>
      <div className="stats__grille">
        <figure className="stats__graph">
          <figcaption>Visiteurs par jour, 30 derniers jours</figcaption>
          <svg viewBox={`0 0 ${W} ${H + 18}`} role="img" aria-label="Visiteurs par jour sur les 30 derniers jours">
            {jours.map((j, i) => {
              const h = Math.max(j.visiteurs > 0 ? 2 : 0, (j.visiteurs / max) * H)
              return (
                <g key={j.jour}>
                  <rect x={i * bw + 2} y={H - h} width={bw - 4} height={h} className={j.jour === auj ? 'stats__barre stats__barre--auj' : 'stats__barre'}>
                    <title>{`${jourCourt(j.jour)} : ${j.visiteurs} visiteur${j.visiteurs > 1 ? 's' : ''}, ${j.vues} page${j.vues > 1 ? 's' : ''} vue${j.vues > 1 ? 's' : ''}`}</title>
                  </rect>
                  {(i === 0 || i === 29 || i % 7 === 1) && <text x={i * bw + bw / 2} y={H + 14} textAnchor="middle" className="stats__axe">{jourCourt(j.jour)}</text>}
                </g>
              )
            })}
          </svg>
        </figure>
        <div className="stats__pages">
          <h3>Pages les plus vues, 30 jours</h3>
          {parPage.rows.length === 0 ? (
            <p className="stats__vide">Aucune visite enregistrée pour le moment. Les chiffres apparaissent dès que le site est consulté.</p>
          ) : (
            <table>
              <thead><tr><th>Page</th><th>Visiteurs</th><th>Vues</th></tr></thead>
              <tbody>
                {parPage.rows.map((p) => (
                  <tr key={p.chemin}><td>{libelle(p.chemin)}</td><td>{nombre(p.visiteurs)}</td><td>{nombre(p.vues)}</td></tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <p className="stats__contenu">
        Sur le site : <strong>{nombre(actus.totalDocs)}</strong> actualité{actus.totalDocs > 1 ? 's' : ''} publiée{actus.totalDocs > 1 ? 's' : ''}, <strong>{nombre(photos.totalDocs)}</strong> photo{photos.totalDocs > 1 ? 's' : ''} dans la galerie, <strong>{nombre(cours.totalDocs)}</strong> cours au planning.
      </p>
    </section>
  )
}
