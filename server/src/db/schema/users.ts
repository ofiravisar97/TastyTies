import { relations, sql } from "drizzle-orm";
import { integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email").unique().notNull(),
  password: varchar("password").notNull(),
  displayName: varchar("display_name").notNull().unique(),
  avatarURL: varchar("avatar_url").default(sql`NULL`),
});

export const usersProfile = pgTable("users_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  followersCount: integer("followers_count").default(0),
  recipesCount: integer("recipes_count").default(0),
  bookmarksCount: integer("bookmarks_count").default(0),
  bio: text("bio").default(sql`NULL`),
  userId: uuid("user_id").references(() => users.id),
});

export const usersRelation = relations(users, ({ one }) => ({
  profile: one(usersProfile),
}));

export const profileRelation = relations(usersProfile, ({ one }) => ({
  users: one(users, {
    fields: [usersProfile.userId],
    references: [users.id],
  }),
}));
