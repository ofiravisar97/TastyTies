ALTER TABLE "users" ADD COLUMN "display_name" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_display_name_unique" UNIQUE("display_name");