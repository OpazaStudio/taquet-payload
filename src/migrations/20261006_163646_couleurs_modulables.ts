import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "apparence_couleurs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nom" varchar NOT NULL,
  	"hex" varchar NOT NULL,
  	"cle" varchar
  );
  
  ALTER TABLE "apparence_couleurs" ADD CONSTRAINT "apparence_couleurs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."apparence"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "apparence_couleurs_order_idx" ON "apparence_couleurs" USING btree ("_order");
  CREATE INDEX "apparence_couleurs_parent_id_idx" ON "apparence_couleurs" USING btree ("_parent_id");
  INSERT INTO "apparence_couleurs" ("_order", "_parent_id", "id", "nom", "hex", "cle")
  SELECT c."ordre", a."id", substr(md5(random()::text || clock_timestamp()::text || a."id"::text || c."cle"), 1, 24), c."nom", c."hex", c."cle"
  FROM "apparence" a
  CROSS JOIN LATERAL (VALUES
    (1, 'Rose (fuchsia)', a."palette_fuchsia", 'fuchsia'),
    (2, 'Orange (mandarine)', a."palette_mandarine", 'mandarine'),
    (3, 'Bleu (aqua)', a."palette_aqua", 'aqua')
  ) AS c("ordre", "nom", "hex", "cle");
  ALTER TABLE "cours" ALTER COLUMN "couleur" DROP DEFAULT;
  ALTER TABLE "cours" ALTER COLUMN "couleur" SET DATA TYPE varchar USING "couleur"::text;
  ALTER TABLE "cours" ALTER COLUMN "couleur" SET DEFAULT 'mandarine';
  ALTER TABLE "apparence" ALTER COLUMN "pages_accueil" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_accueil" SET DATA TYPE varchar USING "pages_accueil"::text;
  ALTER TABLE "apparence" ALTER COLUMN "pages_accueil" SET DEFAULT 'fuchsia';
  ALTER TABLE "apparence" ALTER COLUMN "pages_patinoire" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_patinoire" SET DATA TYPE varchar USING "pages_patinoire"::text;
  ALTER TABLE "apparence" ALTER COLUMN "pages_patinoire" SET DEFAULT 'aqua';
  ALTER TABLE "apparence" ALTER COLUMN "pages_cours" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_cours" SET DATA TYPE varchar USING "pages_cours"::text;
  ALTER TABLE "apparence" ALTER COLUMN "pages_cours" SET DEFAULT 'mandarine';
  ALTER TABLE "apparence" ALTER COLUMN "pages_anniversaires" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_anniversaires" SET DATA TYPE varchar USING "pages_anniversaires"::text;
  ALTER TABLE "apparence" ALTER COLUMN "pages_anniversaires" SET DEFAULT 'fuchsia';
  ALTER TABLE "apparence" ALTER COLUMN "pages_acces" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_acces" SET DATA TYPE varchar USING "pages_acces"::text;
  ALTER TABLE "apparence" ALTER COLUMN "pages_acces" SET DEFAULT 'aqua';
  ALTER TABLE "apparence" ALTER COLUMN "pages_contact" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_contact" SET DATA TYPE varchar USING "pages_contact"::text;
  ALTER TABLE "apparence" ALTER COLUMN "pages_contact" SET DEFAULT 'fuchsia';
  ALTER TABLE "apparence" ALTER COLUMN "pages_actualites" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_actualites" SET DATA TYPE varchar USING "pages_actualites"::text;
  ALTER TABLE "apparence" ALTER COLUMN "pages_actualites" SET DEFAULT 'mandarine';
  ALTER TABLE "apparence" ALTER COLUMN "pages_galerie" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_galerie" SET DATA TYPE varchar USING "pages_galerie"::text;
  ALTER TABLE "apparence" ALTER COLUMN "pages_galerie" SET DEFAULT 'aqua';
  ALTER TABLE "apparence" ALTER COLUMN "pages_mentions_legales" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_mentions_legales" SET DATA TYPE varchar USING "pages_mentions_legales"::text;
  ALTER TABLE "apparence" ALTER COLUMN "pages_mentions_legales" SET DEFAULT 'aqua';
  DROP TYPE "public"."enum_cours_couleur";
  DROP TYPE "public"."enum_apparence_pages_accueil";
  DROP TYPE "public"."enum_apparence_pages_patinoire";
  DROP TYPE "public"."enum_apparence_pages_cours";
  DROP TYPE "public"."enum_apparence_pages_anniversaires";
  DROP TYPE "public"."enum_apparence_pages_acces";
  DROP TYPE "public"."enum_apparence_pages_contact";
  DROP TYPE "public"."enum_apparence_pages_actualites";
  DROP TYPE "public"."enum_apparence_pages_galerie";
  DROP TYPE "public"."enum_apparence_pages_mentions_legales";
  ALTER TABLE "apparence" DROP COLUMN "palette_fuchsia";
  ALTER TABLE "apparence" DROP COLUMN "palette_mandarine";
  ALTER TABLE "apparence" DROP COLUMN "palette_aqua";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_cours_couleur" AS ENUM('fuchsia', 'mandarine', 'aqua', 'blanc');
  CREATE TYPE "public"."enum_apparence_pages_accueil" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_patinoire" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_cours" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_anniversaires" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_acces" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_contact" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_actualites" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_galerie" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_mentions_legales" AS ENUM('fuchsia', 'mandarine', 'aqua');
  ALTER TABLE "apparence" ADD COLUMN "palette_fuchsia" varchar DEFAULT '#ff3fa4' NOT NULL;
  ALTER TABLE "apparence" ADD COLUMN "palette_mandarine" varchar DEFAULT '#ff8c1a' NOT NULL;
  ALTER TABLE "apparence" ADD COLUMN "palette_aqua" varchar DEFAULT '#35e3ff' NOT NULL;
  UPDATE "apparence" a SET "palette_fuchsia" = c."hex" FROM "apparence_couleurs" c WHERE c."_parent_id" = a."id" AND c."cle" = 'fuchsia';
  UPDATE "apparence" a SET "palette_mandarine" = c."hex" FROM "apparence_couleurs" c WHERE c."_parent_id" = a."id" AND c."cle" = 'mandarine';
  UPDATE "apparence" a SET "palette_aqua" = c."hex" FROM "apparence_couleurs" c WHERE c."_parent_id" = a."id" AND c."cle" = 'aqua';
  ALTER TABLE "cours" ALTER COLUMN "couleur" DROP DEFAULT;
  ALTER TABLE "cours" ALTER COLUMN "couleur" SET DATA TYPE "public"."enum_cours_couleur" USING (CASE WHEN "couleur" IS NULL THEN NULL WHEN "couleur" IN ('fuchsia', 'mandarine', 'aqua', 'blanc') THEN "couleur" ELSE 'mandarine' END)::"public"."enum_cours_couleur";
  ALTER TABLE "cours" ALTER COLUMN "couleur" SET DEFAULT 'mandarine'::"public"."enum_cours_couleur";
  ALTER TABLE "apparence" ALTER COLUMN "pages_accueil" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_accueil" SET DATA TYPE "public"."enum_apparence_pages_accueil" USING (CASE WHEN "pages_accueil" IN ('fuchsia', 'mandarine', 'aqua') THEN "pages_accueil" ELSE 'fuchsia' END)::"public"."enum_apparence_pages_accueil";
  ALTER TABLE "apparence" ALTER COLUMN "pages_accueil" SET DEFAULT 'fuchsia'::"public"."enum_apparence_pages_accueil";
  ALTER TABLE "apparence" ALTER COLUMN "pages_patinoire" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_patinoire" SET DATA TYPE "public"."enum_apparence_pages_patinoire" USING (CASE WHEN "pages_patinoire" IN ('fuchsia', 'mandarine', 'aqua') THEN "pages_patinoire" ELSE 'aqua' END)::"public"."enum_apparence_pages_patinoire";
  ALTER TABLE "apparence" ALTER COLUMN "pages_patinoire" SET DEFAULT 'aqua'::"public"."enum_apparence_pages_patinoire";
  ALTER TABLE "apparence" ALTER COLUMN "pages_cours" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_cours" SET DATA TYPE "public"."enum_apparence_pages_cours" USING (CASE WHEN "pages_cours" IN ('fuchsia', 'mandarine', 'aqua') THEN "pages_cours" ELSE 'mandarine' END)::"public"."enum_apparence_pages_cours";
  ALTER TABLE "apparence" ALTER COLUMN "pages_cours" SET DEFAULT 'mandarine'::"public"."enum_apparence_pages_cours";
  ALTER TABLE "apparence" ALTER COLUMN "pages_anniversaires" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_anniversaires" SET DATA TYPE "public"."enum_apparence_pages_anniversaires" USING (CASE WHEN "pages_anniversaires" IN ('fuchsia', 'mandarine', 'aqua') THEN "pages_anniversaires" ELSE 'fuchsia' END)::"public"."enum_apparence_pages_anniversaires";
  ALTER TABLE "apparence" ALTER COLUMN "pages_anniversaires" SET DEFAULT 'fuchsia'::"public"."enum_apparence_pages_anniversaires";
  ALTER TABLE "apparence" ALTER COLUMN "pages_acces" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_acces" SET DATA TYPE "public"."enum_apparence_pages_acces" USING (CASE WHEN "pages_acces" IN ('fuchsia', 'mandarine', 'aqua') THEN "pages_acces" ELSE 'aqua' END)::"public"."enum_apparence_pages_acces";
  ALTER TABLE "apparence" ALTER COLUMN "pages_acces" SET DEFAULT 'aqua'::"public"."enum_apparence_pages_acces";
  ALTER TABLE "apparence" ALTER COLUMN "pages_contact" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_contact" SET DATA TYPE "public"."enum_apparence_pages_contact" USING (CASE WHEN "pages_contact" IN ('fuchsia', 'mandarine', 'aqua') THEN "pages_contact" ELSE 'fuchsia' END)::"public"."enum_apparence_pages_contact";
  ALTER TABLE "apparence" ALTER COLUMN "pages_contact" SET DEFAULT 'fuchsia'::"public"."enum_apparence_pages_contact";
  ALTER TABLE "apparence" ALTER COLUMN "pages_actualites" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_actualites" SET DATA TYPE "public"."enum_apparence_pages_actualites" USING (CASE WHEN "pages_actualites" IN ('fuchsia', 'mandarine', 'aqua') THEN "pages_actualites" ELSE 'mandarine' END)::"public"."enum_apparence_pages_actualites";
  ALTER TABLE "apparence" ALTER COLUMN "pages_actualites" SET DEFAULT 'mandarine'::"public"."enum_apparence_pages_actualites";
  ALTER TABLE "apparence" ALTER COLUMN "pages_galerie" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_galerie" SET DATA TYPE "public"."enum_apparence_pages_galerie" USING (CASE WHEN "pages_galerie" IN ('fuchsia', 'mandarine', 'aqua') THEN "pages_galerie" ELSE 'aqua' END)::"public"."enum_apparence_pages_galerie";
  ALTER TABLE "apparence" ALTER COLUMN "pages_galerie" SET DEFAULT 'aqua'::"public"."enum_apparence_pages_galerie";
  ALTER TABLE "apparence" ALTER COLUMN "pages_mentions_legales" DROP DEFAULT;
  ALTER TABLE "apparence" ALTER COLUMN "pages_mentions_legales" SET DATA TYPE "public"."enum_apparence_pages_mentions_legales" USING (CASE WHEN "pages_mentions_legales" IN ('fuchsia', 'mandarine', 'aqua') THEN "pages_mentions_legales" ELSE 'aqua' END)::"public"."enum_apparence_pages_mentions_legales";
  ALTER TABLE "apparence" ALTER COLUMN "pages_mentions_legales" SET DEFAULT 'aqua'::"public"."enum_apparence_pages_mentions_legales";
  DROP TABLE "apparence_couleurs" CASCADE;`)
}
