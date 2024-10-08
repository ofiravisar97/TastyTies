import catchAsync from "../utils/catchAsync.js";
import { UserDataSchema, UserSchema } from "../db/schemas.js";
import { StatusCodes } from "http-status-codes";

import bcrypt from "bcrypt";
import db from "../db/db.js";
import AppError from "../utils/AppError.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const register = catchAsync(async (req, res) => {
  const { email, password, displayName } = req.body;

  const foundUser = await db
    .select()
    .from(UserSchema)
    .where(eq(UserSchema.email, email));

  if (foundUser.length > 0) {
    throw new AppError("Email already in use.", StatusCodes.BAD_REQUEST);
  }

  const hashedPass = await bcrypt.hash(password, Number(process.env.SALT));
  await db.transaction(async (tx) => {
    const user = await tx
      .insert(UserSchema)
      .values({ email, password: hashedPass, displayName })
      .returning({ id: UserSchema.id });
    if (!user || user.length === 0) {
      tx.rollback();
    }
    await tx.insert(UserDataSchema).values({
      userId: user[0].id,
    });
    res.status(StatusCodes.OK).json({ message: `User ${user[0].id} Created.` });
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await db
    .select()
    .from(UserSchema)
    .where(eq(UserSchema.email, email));

  // Validation
  if (!foundUser || foundUser.length == 0) {
    throw new AppError("Invalid email or password.", StatusCodes.BAD_REQUEST);
  }

  const isEqual = await bcrypt.compare(password, foundUser[0].password);
  if (!isEqual) {
    throw new AppError("Invalid email or password.", StatusCodes.BAD_REQUEST);
  }

  const accessToken = jwt.sign(
    {
      userId: foundUser[0].id,
      displayName: foundUser[0].displayName,
    },
    process.env.ACCESS_SECRET,
    { expiresIn: "15d", algorithm: "HS256" }
  );

  const refreshToken = jwt.sign(
    {
      userId: foundUser[0].id,
      displayName: foundUser[0].displayName,
    },
    process.env.REFRESH_SECRET,
    { expiresIn: "30d", algorithm: "HS256" }
  );

  await db
    .update(UserSchema)
    .set({ refreshToken })
    .where(eq(UserSchema.id, foundUser[0].id));

  res.cookie("refresh", refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(StatusCodes.OK).json({
    userId: foundUser[0].id,
    displayName: foundUser[0].displayName,
    accessToken,
    avatarUrl: foundUser[0].avatarUrl,
  });
});

export const logout = catchAsync(async (req, res) => {
  res.clearCookie("refresh", {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  res.json({ message: "cookie cleared" });
});
