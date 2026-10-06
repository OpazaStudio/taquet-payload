import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_infos_pratiques_annonce_couleur_texte" AS ENUM('noir', 'blanc');
  ALTER TABLE "infos_pratiques" ADD COLUMN "annonce_fond" varchar DEFAULT '#ff3fa4';
  ALTER TABLE "infos_pratiques" ADD COLUMN "annonce_couleur_texte" "enum_infos_pratiques_annonce_couleur_texte" DEFAULT 'noir';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "infos_pratiques" DROP COLUMN "annonce_fond";
  ALTER TABLE "infos_pratiques" DROP COLUMN "annonce_couleur_texte";
  DROP TYPE "public"."enum_infos_pratiques_annonce_couleur_texte";`)
}
