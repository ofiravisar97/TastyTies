import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import { users, usersProfile } from "../db/schema/users";
import "dotenv/config";
import { db } from "../db/index";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const Login = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  const user = await db.select().from(users).where(eq(email, users.email))[0];

  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Wrong credentials" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Wrong credentials" });
  }

  const accessTime = 1000 * 60 * 7;
  const refreshTime = 1000 * 60 * 60 * 30;

  const accessToken = await jwt.sign(
    {
      displayName: user.displayName,
      id: user.id,
    },
    process.env.ACCESS_SECRET as string,
    {
      expiresIn: accessTime,
    }
  );

  const refreshToken = await jwt.sign(
    {
      displayName: user.displayName,
      id: user.id,
    },
    process.env.REFRESH_SECRET as string,
    {
      expiresIn: refreshTime,
    }
  );

  res.cookie("access", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: accessTime,
  });

  res.cookie("refresh", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: refreshTime,
  });

  res.status(StatusCodes.OK).json({
    message: "User successfully logged in.",
  });
};

export const Register = async (req: Request, res: Response) => {
  const { email, password, displayName } = req.body;

  const hashed = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUNDS as string)
  );

  db.transaction(async (tx) => {
    const user = await tx
      .insert(users)
      .values({
        email,
        password: hashed,
        displayName,
        avatarURL: null,
      })
      .returning({ id: users.id });

    if (!user[0].id) {
      tx.rollback();
    }

    await tx.insert(usersProfile).values({
      userId: user[0].id,
    });
  });

  res.status(StatusCodes.OK).json({ message: "User successfully registered." });
};
