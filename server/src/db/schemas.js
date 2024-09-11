import { relations } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  integer,
  pgEnum,
  date,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

export const UserSchema = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email").notNull().unique(),
    password: varchar("password").notNull(),
    displayName: varchar("displayName").notNull(),
    refreshToken: varchar("refreshToken"),
    avatarUrl: varchar("avatarUrl"),
  },
  (table) => ({
    nameIdx: index("name_idx").on(table.displayName),
  })
);

export const UserDataSchema = pgTable("usersData", {
  id: uuid("id").primaryKey().defaultRandom(),
  bio: varchar("bio"),
  followersCount: integer("followersCount").default(0),
  userId: uuid("userId").references(() => UserSchema.id, {
    onDelete: "cascade",
  }),
});

export const RecipeSchema = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  imageUrl: varchar("imageUrl").notNull(),
  title: varchar("title").notNull(),
  description: varchar("description"),
  likesCount: integer("likesCount").default(0),
  commentsCount: integer("commentsCount").default(0),
  createdAt: date("createdAt").defaultNow(),
  userId: uuid("userId").references(() => UserSchema.id, {
    onDelete: "cascade",
  }),
});

export const ingredientTypeEnum = pgEnum("ingredientType", [
  " ",
  "Kg",
  "G",
  "L",
  "Ml",
]);

export const IngredientSchema = pgTable("ingredients", {
  id: uuid("id").primaryKey().defaultRandom(),
  amount: integer("amount").notNull(),
  name: varchar("name").notNull(),
  type: ingredientTypeEnum("type"),
  recipeId: uuid("recipeId").references(() => RecipeSchema.id, {
    onDelete: "cascade",
  }),
});

export const InstructionSchema = pgTable("instructions", {
  id: uuid("id").primaryKey().defaultRandom(),
  instruction: varchar("instruction").notNull(),
  recipeId: uuid("recipeId").references(() => RecipeSchema.id, {
    onDelete: "cascade",
  }),
});

export const FollowersSchema = pgTable("followers", {
  id: uuid("id").primaryKey().defaultRandom(),
  follower_id: uuid("follower_id")
    .references(() => UserSchema.id, { onDelete: "cascade" })
    .notNull(),
  following_id: uuid("following_id").notNull(),
});

export const UsersFollowersSchema = pgTable(
  "users_followers",
  {
    user_id: uuid("user_id").references(() => UserSchema.id, {
      onDelete: "cascade",
    }),
    follow_id: uuid("follow_id").references(() => FollowersSchema.id, {
      onDelete: "cascade",
    }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.follow_id, table.user_id] }),
  })
);

export const LikesSchema = pgTable(
  "likes",
  {
    recipeId: uuid("recipeId")
      .references(() => RecipeSchema.id, {
        onDelete: "cascade",
      })
      .notNull(),
    userId: uuid("userId")
      .references(() => UserSchema.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.recipeId, table.userId] }),
  })
);

//============= Relations =====================

export const UsersRelations = relations(UserSchema, ({ one, many }) => {
  relations: many(UsersFollowersSchema);
  likes: many(LikesSchema);
});

export const UserDataRelations = relations(UserDataSchema, ({ one }) => {
  user: one(UserSchema, {
    fields: [UserDataSchema.userId],
    references: [UserSchema.id],
  });
});

export const LikesRelations = relations(LikesSchema, ({ one }) => {
  user: one(UserSchema, {
    fields: [LikesSchema.userId],
    references: [UserSchema.id],
  });
  recipe: one(RecipeSchema, {
    fields: [LikesSchema.recipeId],
    references: [RecipeSchema.id],
  });
});

export const recipeRelations = relations(RecipeSchema, ({ one, many }) => {
  author: one(UserSchema, {
    fields: [RecipeSchema.userId],
    references: [UserSchema.id],
  });
  likes: many(LikesSchema);
});

export const followRelations = relations(FollowersSchema, ({ one, many }) => {
  relations: many(UsersFollowersSchema);
});

export const UserFollowsRelations = relations(
  UsersFollowersSchema,
  ({ one }) => {
    follows: one(FollowersSchema, {
      fields: [UsersFollowersSchema.follow_id],
      references: [FollowersSchema.id],
    });
    users: one(UserSchema, {
      fields: [UsersFollowersSchema.user_id],
      references: [UserSchema.id],
    });
  }
);
