CREATE TYPE "public"."listing_type" AS ENUM('sale', 'rent');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('apartment', 'house', 'land', 'commercial');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('super_admin', 'admin');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('available', 'sold', 'rented', 'off-market');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"display_name" text NOT NULL,
	"role" "role" DEFAULT 'admin' NOT NULL,
	"must_change_password" boolean DEFAULT true NOT NULL,
	"created_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"location" text NOT NULL,
	"full_address" text NOT NULL,
	"state" text NOT NULL,
	"country" text DEFAULT 'Nigeria' NOT NULL,
	"property_type" "property_type" NOT NULL,
	"type" "listing_type" NOT NULL,
	"status" "status" DEFAULT 'available' NOT NULL,
	"cover_image" text NOT NULL,
	"images" text[] DEFAULT '{}' NOT NULL,
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"area_sqft" text NOT NULL,
	"year_built" text,
	"parking" text,
	"amenities" text[] DEFAULT '{}' NOT NULL,
	"price" numeric,
	"show_price" boolean DEFAULT false NOT NULL,
	"created_by" uuid,
	"updated_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "properties_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "property_drafts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" uuid NOT NULL,
	"draft_data" jsonb NOT NULL,
	"last_saved_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "property_drafts_admin_id_unique" UNIQUE("admin_id")
);
--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_created_by_admins_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_created_by_admins_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_updated_by_admins_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_drafts" ADD CONSTRAINT "property_drafts_admin_id_admins_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;