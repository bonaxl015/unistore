import {
  pgTable,
  serial,
  varchar,
  boolean,
  integer,
  timestamp
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).unique().notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  imageUrl: varchar('image_url', { length: 255 }).notNull(),
  price: integer('price').notNull(),
  currency: varchar('currency', { length: 3 }).notNull(),
  isBestSeller: boolean('is_best_seller').default(false).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
});
