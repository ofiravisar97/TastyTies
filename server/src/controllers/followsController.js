import db from "../db/db.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import {
  FollowersSchema,
  UserDataSchema,
  UsersFollowersSchema,
} from "../db/schemas.js";
import { and, eq, sql } from "drizzle-orm";
import { StatusCodes } from "http-status-codes";

export const follow = catchAsync(async (req, res) => {
  const { followerId, followingId } = req.body;

  // Check if Follow already
  const foundRelation = await db
    .select()
    .from(FollowersSchema)
    .where(
      and(
        eq(FollowersSchema.follower_id, followerId),
        eq(FollowersSchema.following_id, followingId)
      )
    );

  if (foundRelation.length > 0) {
    throw new AppError(
      `User ${followerId} already following ${followingId} User`,
      StatusCodes.BAD_REQUEST
    );
  }

  // Follow transaction
  await db.transaction(async (tx) => {
    await tx
      .update(UserDataSchema)
      .set({ followersCount: sql`${UserDataSchema.followersCount} + 1` })
      .where(eq(UserDataSchema.userId, followingId));
    const result = await tx
      .insert(FollowersSchema)
      .values({ follower_id: followerId, following_id: followingId })
      .returning({ id: FollowersSchema.id });

    if (!result || result.length === 0) {
      tx.rollback();
      throw new AppError(
        "Something wrong happend.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    const relationId = result[0].id;
    await tx
      .insert(UsersFollowersSchema)
      .values({ user_id: followerId, follow_id: relationId });
  });

  res.status(StatusCodes.OK).json({ message: "successfully followed user." });
});

export const unfollow = catchAsync(async (req, res) => {
  const { followerId, followingId } = req.body;

  // Check if Follow already
  const foundRelation = await db
    .select()
    .from(FollowersSchema)
    .where(
      and(
        eq(FollowersSchema.follower_id, followerId),
        eq(FollowersSchema.following_id, followingId)
      )
    );

  if (foundRelation.length === 0) {
    throw new AppError(
      `User ${followerId} not following ${followingId} User`,
      StatusCodes.BAD_REQUEST
    );
  }

  await db.transaction(async (tx) => {
    await tx
      .update(UserDataSchema)
      .set({ followersCount: sql`${UserDataSchema.followersCount} - 1` })
      .where(eq(UserDataSchema.userId, followingId));

    const result = await tx
      .delete(FollowersSchema)
      .where(
        and(
          eq(FollowersSchema.follower_id, followerId),
          eq(FollowersSchema.following_id, followingId)
        )
      )
      .returning({ id: FollowersSchema.id });

    if (!result || result.length === 0) {
      tx.rollback();
      throw new AppError(
        "Something wrong happend.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }

    await tx
      .delete(UsersFollowersSchema)
      .where(
        and(
          eq(UsersFollowersSchema.follow_id, result[0].id),
          eq(UsersFollowersSchema.user_id, followerId)
        )
      );
  });

  res
    .status(StatusCodes.OK)
    .json({ message: `User ${followerId} unfollowed User ${followingId}` });
});
