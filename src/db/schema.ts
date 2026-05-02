import {
  pgTable,
  pgEnum,
  uuid,
  text,
  boolean,
  integer,
  numeric,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// ─────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────

export const roleEnum = pgEnum("role", ["super_admin", "admin"]);

export const propertyTypeEnum = pgEnum("property_type", [
  "apartment",
  "house",
  "land",
  "commercial",
]);

export const listingTypeEnum = pgEnum("listing_type", ["sale", "rent"]);

export const statusEnum = pgEnum("status", [
  "available",
  "sold",
  "rented",
  "off-market",
]);

// ─────────────────────────────────────────────
// ADMINS TABLE
// ─────────────────────────────────────────────

export const admins = pgTable("admins", {
  id: uuid("id").defaultRandom().primaryKey(),

  email: text("email").notNull().unique(),
  display_name: text("display_name").notNull(),

  // super_admin can delete other admins & create new ones
  // admin can only manage properties
  role: roleEnum("role").notNull().default("admin"),

  // set to true when account is created by super_admin
  // forces new admin to change password on first login
  must_change_password: boolean("must_change_password").notNull().default(true),

  // tracks who created this admin account (null for the original super_admin)
  created_by: uuid("created_by").references((): any => admins.id),

  created_at: timestamp("created_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// PROPERTIES TABLE
// ─────────────────────────────────────────────

export const properties = pgTable("properties", {
  id: uuid("id").defaultRandom().primaryKey(),

  // URL-friendly identifier e.g. "the-monarch-suite"
  slug: text("slug").notNull().unique(),

  title: text("title").notNull(),
  description: text("description").notNull(),

  // neighbourhood / area e.g. "Banana Island, Lagos"
  location: text("location").notNull(),

  // full street address
  full_address: text("full_address").notNull(),

  state: text("state").notNull(),
  country: text("country").notNull().default("Nigeria"),

  // apartment | house | land | commercial
  property_type: propertyTypeEnum("property_type").notNull(),

  // sale | rent
  type: listingTypeEnum("type").notNull(),

  // available | sold | rented | off-market
  status: statusEnum("status").notNull().default("available"),

  // single Cloudinary URL used for listing cards / thumbnails
  cover_image: text("cover_image").notNull(),

  // array of Cloudinary URLs for the property gallery
  images: text("images").array().notNull().default([]),

  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),

  // stored as text to match frontend format e.g. "2,400"
  area_sqft: text("area_sqft").notNull(),

  year_built: text("year_built"),
  parking: text("parking"),

  // e.g. ["Swimming Pool", "Gym", "24/7 Security"]
  amenities: text("amenities").array().notNull().default([]),

  // nullable — only set if the company decides to show a price
  price: numeric("price"),

  // controls whether price is shown on the public frontend
  show_price: boolean("show_price").notNull().default(false),

  // audit trail
  created_by: uuid("created_by").references(() => admins.id),
  updated_by: uuid("updated_by").references(() => admins.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// PROPERTY DRAFTS TABLE
// ─────────────────────────────────────────────

// One draft per admin — stores an incomplete property form
// so the admin can continue where they left off after a session timeout.
// The admin dashboard shows an "Unfinished task" button if a draft exists.

export const property_drafts = pgTable("property_drafts", {
  id: uuid("id").defaultRandom().primaryKey(),

  // one draft per admin at a time (unique constraint)
  admin_id: uuid("admin_id")
    .notNull()
    .references(() => admins.id)
    .unique(),

  // the entire incomplete form stored as a JSON blob
  draft_data: jsonb("draft_data").notNull(),

  last_saved_at: timestamp("last_saved_at").defaultNow().notNull(),
});

// ─────────────────────────────────────────────
// EXPORTED TYPES (inferred from schema)
// ─────────────────────────────────────────────

export type Admin = typeof admins.$inferSelect;
export type NewAdmin = typeof admins.$inferInsert;

export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;

export type PropertyDraft = typeof property_drafts.$inferSelect;
export type NewPropertyDraft = typeof property_drafts.$inferInsert;