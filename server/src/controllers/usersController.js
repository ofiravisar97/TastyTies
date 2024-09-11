import catchAsync from "../utils/catchAsync.js";
import db from "../db/db.js";
import { UserSchema, UserDataSchema, FollowersSchema } from "../db/schemas.js";
import { and, eq, gte, like } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";
import AppError from "../utils/AppError.js";

import cloudinary from "../utils/cloudinary.js";

export const changeAvatarHandler = catchAsync(async (req, res, next) => {
  const { imageUrl, userId } = req.body;
  const result = await cloudinary.uploader.upload(imageUrl, {
    folder: "avatars",
  });
  if (!result) {
    throw new AppError(
      "Something wrong happend",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
  const avatarUrl = result.secure_url;
  await db
    .update(UserSchema)
    .set({ avatarUrl })
    .where(eq(UserSchema.id, userId));
  res.status(StatusCodes.OK).json({ message: "Avatar set" });
});

export const searchHandler = catchAsync(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    next(new AppError("No query search", StatusCodes.BAD_REQUEST));
  }
  const users = await db
    .select({
      id: UserSchema.id,
      avatarUrl: UserSchema.avatarUrl,
      displayName: UserSchema.displayName,
    })
    .from(UserSchema)
    .where(like(UserSchema.displayName, `${query}%`))
    .limit(8);
  res.status(StatusCodes.OK).json(users);
});

export const changeBioHandler = catchAsync(async (req, res) => {
  const { bio, userId } = req.body;
  await db
    .update(UserDataSchema)
    .set({ bio })
    .where(eq(UserDataSchema.userId, userId));
  res.status(StatusCodes.OK).json({ message: "Bio updated." });
});

export const getUserHandler = catchAsync(async (req, res) => {
  const { userId, connectedUserId } = req.body;

  const foundUser = await db
    .select({
      id: UserSchema.id,
      displayName: UserSchema.displayName,
      avatarUrl: UserSchema.avatarUrl,
      bio: UserDataSchema.bio,
      followersCount: UserDataSchema.followersCount,
    })
    .from(UserSchema)
    .where(eq(UserSchema.id, userId))
    .leftJoin(UserDataSchema, eq(UserDataSchema.userId, userId));

  if (!foundUser || foundUser.length === 0) {
    throw new AppError("User not found.", StatusCodes.NOT_FOUND);
  }

  const relation = await db
    .select()
    .from(FollowersSchema)
    .where(
      and(
        eq(FollowersSchema.follower_id, connectedUserId),
        eq(FollowersSchema.following_id, userId)
      )
    );

  const isFollowing = relation.length > 0;
  const isMe = connectedUserId === userId;

  const user = { ...foundUser[0], isFollowing, isMe };

  res.status(StatusCodes.OK).json(user);
});
