import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_apparence_pages_accueil" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_patinoire" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_cours" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_anniversaires" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_acces" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_contact" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_actualites" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_galerie" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TYPE "public"."enum_apparence_pages_mentions_legales" AS ENUM('fuchsia', 'mandarine', 'aqua');
  CREATE TABLE "visites" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"jour" varchar NOT NULL,
  	"chemin" varchar NOT NULL,
  	"visiteur" varchar NOT NULL,
  	"vues" numeric DEFAULT 1 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "apparence" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"pages_accueil" "enum_apparence_pages_accueil" DEFAULT 'fuchsia' NOT NULL,
  	"pages_patinoire" "enum_apparence_pages_patinoire" DEFAULT 'aqua' NOT NULL,
  	"pages_cours" "enum_apparence_pages_cours" DEFAULT 'mandarine' NOT NULL,
  	"pages_anniversaires" "enum_apparence_pages_anniversaires" DEFAULT 'fuchsia' NOT NULL,
  	"pages_acces" "enum_apparence_pages_acces" DEFAULT 'aqua' NOT NULL,
  	"pages_contact" "enum_apparence_pages_contact" DEFAULT 'fuchsia' NOT NULL,
  	"pages_actualites" "enum_apparence_pages_actualites" DEFAULT 'mandarine' NOT NULL,
  	"pages_galerie" "enum_apparence_pages_galerie" DEFAULT 'aqua' NOT NULL,
  	"pages_mentions_legales" "enum_apparence_pages_mentions_legales" DEFAULT 'aqua' NOT NULL,
  	"palette_fuchsia" varchar DEFAULT '#ff3fa4' NOT NULL,
  	"palette_mandarine" varchar DEFAULT '#ff8c1a' NOT NULL,
  	"palette_aqua" varchar DEFAULT '#35e3ff' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_messages_contact_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_messages_contact_id_idx";
  ALTER TABLE "messages_contact" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "messages_contact" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "visites_id" integer;
  ALTER TABLE "contact" ADD COLUMN "reseaux_titre" varchar DEFAULT 'Écrivez-nous sur les réseaux';
  ALTER TABLE "contact" ADD COLUMN "reseaux_texte" varchar DEFAULT 'Une question, une réservation d’anniversaire, une privatisation ? Envoyez-nous un message sur Facebook ou Instagram : nous répondons rapidement.';
  CREATE INDEX "visites_jour_idx" ON "visites" USING btree ("jour");
  CREATE INDEX "visites_updated_at_idx" ON "visites" USING btree ("updated_at");
  CREATE INDEX "visites_created_at_idx" ON "visites" USING btree ("created_at");
  CREATE UNIQUE INDEX "jour_chemin_visiteur_idx" ON "visites" USING btree ("jour","chemin","visiteur");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_visites_fk" FOREIGN KEY ("visites_id") REFERENCES "public"."visites"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_visites_id_idx" ON "payload_locked_documents_rels" USING btree ("visites_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "messages_contact_id";
  ALTER TABLE "contact" DROP COLUMN "message_succes";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "messages_contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nom" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"telephone" varchar,
  	"message" varchar NOT NULL,
  	"lu" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "visites" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "apparence" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_visites_fk";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_visites_id_idx";
  DROP TABLE "visites" CASCADE;
  DROP TABLE "apparence" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "messages_contact_id" integer;
  ALTER TABLE "contact" ADD COLUMN "message_succes" varchar DEFAULT 'Merci, votre message est bien arrivé. Nous vous répondons au plus vite.';
  CREATE INDEX "messages_contact_updated_at_idx" ON "messages_contact" USING btree ("updated_at");
  CREATE INDEX "messages_contact_created_at_idx" ON "messages_contact" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_messages_contact_fk" FOREIGN KEY ("messages_contact_id") REFERENCES "public"."messages_contact"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_messages_contact_id_idx" ON "payload_locked_documents_rels" USING btree ("messages_contact_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "visites_id";
  ALTER TABLE "contact" DROP COLUMN "reseaux_titre";
  ALTER TABLE "contact" DROP COLUMN "reseaux_texte";
  DROP TYPE "public"."enum_apparence_pages_accueil";
  DROP TYPE "public"."enum_apparence_pages_patinoire";
  DROP TYPE "public"."enum_apparence_pages_cours";
  DROP TYPE "public"."enum_apparence_pages_anniversaires";
  DROP TYPE "public"."enum_apparence_pages_acces";
  DROP TYPE "public"."enum_apparence_pages_contact";
  DROP TYPE "public"."enum_apparence_pages_actualites";
  DROP TYPE "public"."enum_apparence_pages_galerie";
  DROP TYPE "public"."enum_apparence_pages_mentions_legales";`)
}
