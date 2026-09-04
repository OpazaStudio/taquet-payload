import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_cours_creneaux_jour" AS ENUM('lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche');
  CREATE TYPE "public"."enum_cours_couleur" AS ENUM('fuchsia', 'mandarine', 'aqua', 'blanc');
  CREATE TYPE "public"."enum_infos_pratiques_horaires_jour" AS ENUM('lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche');
  CREATE TABLE "cours_creneaux" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"jour" "enum_cours_creneaux_jour" NOT NULL,
  	"debut" varchar NOT NULL,
  	"fin" varchar,
  	"niveau" varchar
  );
  
  CREATE TABLE "cours" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nom" varchar NOT NULL,
  	"intervenant" varchar,
  	"organisme" varchar,
  	"telephone" varchar,
  	"site_web" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"couleur" "enum_cours_couleur" DEFAULT 'mandarine',
  	"ordre" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "actualites" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"publie" boolean DEFAULT true,
  	"slug" varchar,
  	"image_id" integer,
  	"resume" varchar NOT NULL,
  	"contenu" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "galerie_photos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"legende" varchar NOT NULL,
  	"ordre" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_miniature_url" varchar,
  	"sizes_miniature_width" numeric,
  	"sizes_miniature_height" numeric,
  	"sizes_miniature_mime_type" varchar,
  	"sizes_miniature_filesize" numeric,
  	"sizes_miniature_filename" varchar,
  	"sizes_carte_url" varchar,
  	"sizes_carte_width" numeric,
  	"sizes_carte_height" numeric,
  	"sizes_carte_mime_type" varchar,
  	"sizes_carte_filesize" numeric,
  	"sizes_carte_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
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
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nom" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"cours_id" integer,
  	"actualites_id" integer,
  	"galerie_photos_id" integer,
  	"media_id" integer,
  	"messages_contact_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "accueil_univers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"texte" varchar NOT NULL,
  	"chiffre" varchar,
  	"chiffre_legende" varchar,
  	"lien_texte" varchar NOT NULL,
  	"lien" varchar NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "accueil" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"bandeau_titre" varchar NOT NULL,
  	"bandeau_sous_titre" varchar NOT NULL,
  	"bandeau_accroche" varchar,
  	"bandeau_photo_id" integer,
  	"bandeau_bouton_secondaire_texte" varchar DEFAULT 'Réserver un anniversaire',
  	"bandeau_bouton_secondaire_lien" varchar DEFAULT '/anniversaires',
  	"presentation_titre" varchar NOT NULL,
  	"presentation_texte" jsonb,
  	"privatisation_titre" varchar,
  	"privatisation_texte" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "patinoire_chiffres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"valeur" varchar NOT NULL,
  	"legende" varchar NOT NULL
  );
  
  CREATE TABLE "patinoire_equipements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"texte" varchar
  );
  
  CREATE TABLE "patinoire_regles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "patinoire" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"intro" jsonb,
  	"photo_id" integer,
  	"reglement_id" integer,
  	"tarifs_titre" varchar DEFAULT 'Tarifs',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "page_cours" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"saison" varchar,
  	"intro" jsonb,
  	"photo_id" integer,
  	"note" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "anniversaires_formules_inclus" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texte" varchar NOT NULL
  );
  
  CREATE TABLE "anniversaires_formules" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nom" varchar NOT NULL,
  	"creneau" varchar,
  	"prix" numeric NOT NULL,
  	"note" varchar
  );
  
  CREATE TABLE "anniversaires" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"intro" jsonb,
  	"photo_id" integer,
  	"acompte" numeric,
  	"conditions" jsonb,
  	"carte_invitation_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "acces_itineraires" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"depuis" varchar NOT NULL,
  	"instructions" varchar NOT NULL
  );
  
  CREATE TABLE "acces" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"intro" varchar,
  	"carte_embed" varchar,
  	"photo_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar NOT NULL,
  	"intro" varchar,
  	"message_succes" varchar DEFAULT 'Merci, votre message est bien arrivé. Nous vous répondons au plus vite.',
  	"photo_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "mentions_legales" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titre" varchar DEFAULT 'Mentions légales' NOT NULL,
  	"contenu" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "infos_pratiques_horaires" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"jour" "enum_infos_pratiques_horaires_jour" NOT NULL,
  	"ouverture" varchar NOT NULL,
  	"fermeture" varchar NOT NULL,
  	"precision" varchar
  );
  
  CREATE TABLE "infos_pratiques_tarifs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"libelle" varchar NOT NULL,
  	"prix" numeric NOT NULL,
  	"precision" varchar
  );
  
  CREATE TABLE "infos_pratiques" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"mention_vacances" varchar,
  	"seances_privees" varchar,
  	"annonce_active" boolean DEFAULT false,
  	"annonce_texte" varchar,
  	"tarifs_note" varchar,
  	"nom" varchar DEFAULT 'Au Taquet' NOT NULL,
  	"nom_site" varchar DEFAULT 'Music Dance Roller' NOT NULL,
  	"telephone" varchar NOT NULL,
  	"telephone_mobile" varchar,
  	"email" varchar,
  	"adresse_rue" varchar NOT NULL,
  	"adresse_complement" varchar,
  	"adresse_code_postal" varchar NOT NULL,
  	"adresse_ville" varchar NOT NULL,
  	"adresse_latitude" numeric,
  	"adresse_longitude" numeric,
  	"adresse_lien_itineraire" varchar,
  	"reseaux_facebook" varchar,
  	"reseaux_instagram" varchar,
  	"logo_id" integer,
  	"raison_sociale" varchar,
  	"siret" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "cours_creneaux" ADD CONSTRAINT "cours_creneaux_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cours" ADD CONSTRAINT "cours_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "actualites" ADD CONSTRAINT "actualites_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "actualites" ADD CONSTRAINT "actualites_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galerie_photos" ADD CONSTRAINT "galerie_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cours_fk" FOREIGN KEY ("cours_id") REFERENCES "public"."cours"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_actualites_fk" FOREIGN KEY ("actualites_id") REFERENCES "public"."actualites"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_galerie_photos_fk" FOREIGN KEY ("galerie_photos_id") REFERENCES "public"."galerie_photos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_messages_contact_fk" FOREIGN KEY ("messages_contact_id") REFERENCES "public"."messages_contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil_univers" ADD CONSTRAINT "accueil_univers_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accueil_univers" ADD CONSTRAINT "accueil_univers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."accueil"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "accueil" ADD CONSTRAINT "accueil_bandeau_photo_id_media_id_fk" FOREIGN KEY ("bandeau_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "accueil" ADD CONSTRAINT "accueil_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "patinoire_chiffres" ADD CONSTRAINT "patinoire_chiffres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."patinoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "patinoire_equipements" ADD CONSTRAINT "patinoire_equipements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."patinoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "patinoire_regles" ADD CONSTRAINT "patinoire_regles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."patinoire"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "patinoire" ADD CONSTRAINT "patinoire_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "patinoire" ADD CONSTRAINT "patinoire_reglement_id_media_id_fk" FOREIGN KEY ("reglement_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "patinoire" ADD CONSTRAINT "patinoire_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_cours" ADD CONSTRAINT "page_cours_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_cours" ADD CONSTRAINT "page_cours_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "anniversaires_formules_inclus" ADD CONSTRAINT "anniversaires_formules_inclus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."anniversaires_formules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "anniversaires_formules" ADD CONSTRAINT "anniversaires_formules_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."anniversaires"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "anniversaires" ADD CONSTRAINT "anniversaires_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "anniversaires" ADD CONSTRAINT "anniversaires_carte_invitation_id_media_id_fk" FOREIGN KEY ("carte_invitation_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "anniversaires" ADD CONSTRAINT "anniversaires_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "acces_itineraires" ADD CONSTRAINT "acces_itineraires_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."acces"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "acces" ADD CONSTRAINT "acces_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "acces" ADD CONSTRAINT "acces_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contact" ADD CONSTRAINT "contact_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "infos_pratiques_horaires" ADD CONSTRAINT "infos_pratiques_horaires_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."infos_pratiques"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "infos_pratiques_tarifs" ADD CONSTRAINT "infos_pratiques_tarifs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."infos_pratiques"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "infos_pratiques" ADD CONSTRAINT "infos_pratiques_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "cours_creneaux_order_idx" ON "cours_creneaux" USING btree ("_order");
  CREATE INDEX "cours_creneaux_parent_id_idx" ON "cours_creneaux" USING btree ("_parent_id");
  CREATE INDEX "cours_image_idx" ON "cours" USING btree ("image_id");
  CREATE INDEX "cours_updated_at_idx" ON "cours" USING btree ("updated_at");
  CREATE INDEX "cours_created_at_idx" ON "cours" USING btree ("created_at");
  CREATE UNIQUE INDEX "actualites_slug_idx" ON "actualites" USING btree ("slug");
  CREATE INDEX "actualites_image_idx" ON "actualites" USING btree ("image_id");
  CREATE INDEX "actualites_meta_meta_image_idx" ON "actualites" USING btree ("meta_image_id");
  CREATE INDEX "actualites_updated_at_idx" ON "actualites" USING btree ("updated_at");
  CREATE INDEX "actualites_created_at_idx" ON "actualites" USING btree ("created_at");
  CREATE INDEX "galerie_photos_image_idx" ON "galerie_photos" USING btree ("image_id");
  CREATE INDEX "galerie_photos_updated_at_idx" ON "galerie_photos" USING btree ("updated_at");
  CREATE INDEX "galerie_photos_created_at_idx" ON "galerie_photos" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_miniature_sizes_miniature_filename_idx" ON "media" USING btree ("sizes_miniature_filename");
  CREATE INDEX "media_sizes_carte_sizes_carte_filename_idx" ON "media" USING btree ("sizes_carte_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "messages_contact_updated_at_idx" ON "messages_contact" USING btree ("updated_at");
  CREATE INDEX "messages_contact_created_at_idx" ON "messages_contact" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_cours_id_idx" ON "payload_locked_documents_rels" USING btree ("cours_id");
  CREATE INDEX "payload_locked_documents_rels_actualites_id_idx" ON "payload_locked_documents_rels" USING btree ("actualites_id");
  CREATE INDEX "payload_locked_documents_rels_galerie_photos_id_idx" ON "payload_locked_documents_rels" USING btree ("galerie_photos_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_messages_contact_id_idx" ON "payload_locked_documents_rels" USING btree ("messages_contact_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "accueil_univers_order_idx" ON "accueil_univers" USING btree ("_order");
  CREATE INDEX "accueil_univers_parent_id_idx" ON "accueil_univers" USING btree ("_parent_id");
  CREATE INDEX "accueil_univers_photo_idx" ON "accueil_univers" USING btree ("photo_id");
  CREATE INDEX "accueil_bandeau_bandeau_photo_idx" ON "accueil" USING btree ("bandeau_photo_id");
  CREATE INDEX "accueil_meta_meta_image_idx" ON "accueil" USING btree ("meta_image_id");
  CREATE INDEX "patinoire_chiffres_order_idx" ON "patinoire_chiffres" USING btree ("_order");
  CREATE INDEX "patinoire_chiffres_parent_id_idx" ON "patinoire_chiffres" USING btree ("_parent_id");
  CREATE INDEX "patinoire_equipements_order_idx" ON "patinoire_equipements" USING btree ("_order");
  CREATE INDEX "patinoire_equipements_parent_id_idx" ON "patinoire_equipements" USING btree ("_parent_id");
  CREATE INDEX "patinoire_regles_order_idx" ON "patinoire_regles" USING btree ("_order");
  CREATE INDEX "patinoire_regles_parent_id_idx" ON "patinoire_regles" USING btree ("_parent_id");
  CREATE INDEX "patinoire_photo_idx" ON "patinoire" USING btree ("photo_id");
  CREATE INDEX "patinoire_reglement_idx" ON "patinoire" USING btree ("reglement_id");
  CREATE INDEX "patinoire_meta_meta_image_idx" ON "patinoire" USING btree ("meta_image_id");
  CREATE INDEX "page_cours_photo_idx" ON "page_cours" USING btree ("photo_id");
  CREATE INDEX "page_cours_meta_meta_image_idx" ON "page_cours" USING btree ("meta_image_id");
  CREATE INDEX "anniversaires_formules_inclus_order_idx" ON "anniversaires_formules_inclus" USING btree ("_order");
  CREATE INDEX "anniversaires_formules_inclus_parent_id_idx" ON "anniversaires_formules_inclus" USING btree ("_parent_id");
  CREATE INDEX "anniversaires_formules_order_idx" ON "anniversaires_formules" USING btree ("_order");
  CREATE INDEX "anniversaires_formules_parent_id_idx" ON "anniversaires_formules" USING btree ("_parent_id");
  CREATE INDEX "anniversaires_photo_idx" ON "anniversaires" USING btree ("photo_id");
  CREATE INDEX "anniversaires_carte_invitation_idx" ON "anniversaires" USING btree ("carte_invitation_id");
  CREATE INDEX "anniversaires_meta_meta_image_idx" ON "anniversaires" USING btree ("meta_image_id");
  CREATE INDEX "acces_itineraires_order_idx" ON "acces_itineraires" USING btree ("_order");
  CREATE INDEX "acces_itineraires_parent_id_idx" ON "acces_itineraires" USING btree ("_parent_id");
  CREATE INDEX "acces_photo_idx" ON "acces" USING btree ("photo_id");
  CREATE INDEX "acces_meta_meta_image_idx" ON "acces" USING btree ("meta_image_id");
  CREATE INDEX "contact_photo_idx" ON "contact" USING btree ("photo_id");
  CREATE INDEX "contact_meta_meta_image_idx" ON "contact" USING btree ("meta_image_id");
  CREATE INDEX "infos_pratiques_horaires_order_idx" ON "infos_pratiques_horaires" USING btree ("_order");
  CREATE INDEX "infos_pratiques_horaires_parent_id_idx" ON "infos_pratiques_horaires" USING btree ("_parent_id");
  CREATE INDEX "infos_pratiques_tarifs_order_idx" ON "infos_pratiques_tarifs" USING btree ("_order");
  CREATE INDEX "infos_pratiques_tarifs_parent_id_idx" ON "infos_pratiques_tarifs" USING btree ("_parent_id");
  CREATE INDEX "infos_pratiques_logo_idx" ON "infos_pratiques" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "cours_creneaux" CASCADE;
  DROP TABLE "cours" CASCADE;
  DROP TABLE "actualites" CASCADE;
  DROP TABLE "galerie_photos" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "messages_contact" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "accueil_univers" CASCADE;
  DROP TABLE "accueil" CASCADE;
  DROP TABLE "patinoire_chiffres" CASCADE;
  DROP TABLE "patinoire_equipements" CASCADE;
  DROP TABLE "patinoire_regles" CASCADE;
  DROP TABLE "patinoire" CASCADE;
  DROP TABLE "page_cours" CASCADE;
  DROP TABLE "anniversaires_formules_inclus" CASCADE;
  DROP TABLE "anniversaires_formules" CASCADE;
  DROP TABLE "anniversaires" CASCADE;
  DROP TABLE "acces_itineraires" CASCADE;
  DROP TABLE "acces" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "mentions_legales" CASCADE;
  DROP TABLE "infos_pratiques_horaires" CASCADE;
  DROP TABLE "infos_pratiques_tarifs" CASCADE;
  DROP TABLE "infos_pratiques" CASCADE;
  DROP TYPE "public"."enum_cours_creneaux_jour";
  DROP TYPE "public"."enum_cours_couleur";
  DROP TYPE "public"."enum_infos_pratiques_horaires_jour";`)
}
