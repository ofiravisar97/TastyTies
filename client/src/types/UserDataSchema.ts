import { z } from "zod";

export const UserProfileSchema = z.object({
  id: z.string().uuid("Not a valid id"),
  avatarUrl: z.string().url("Not a valid url"),
  bio: z.string(),
  displayName: z.string().min(1).max(120),
  followersCount: z.number().int().min(0),
  isMe: z.boolean(),
  isFollowing: z.boolean(),
});

export type UserProfileType = z.infer<typeof UserProfileSchema>;
