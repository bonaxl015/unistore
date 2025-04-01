import {
  pgTable,
  serial,
  varchar,
  boolean,
  timestamp
} from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: varchar('content', { length: 255 }).notNull(),
  imageUrl: varchar('image_url', { length: 255 }).default(''),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
});
