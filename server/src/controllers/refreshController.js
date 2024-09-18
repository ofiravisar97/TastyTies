import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import db from "../db/db.js";
import { UserSchema } from "../db/schemas.js";
import { eq } from "drizzle-orm";
import AppError from "../utils/AppError.js";

export const refresh = (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.refresh) {
    next(new AppError("No cookie found", StatusCodes.BAD_REQUEST));
  }
  const refresh = cookie.refresh;

  db.select()
    .from(UserSchema)
    .where(eq(refresh, UserSchema.refreshToken))
    .then((foundUser) => {
      jwt.verify(refresh, process.env.REFRESH_SECRET, (err, decoded) => {
        if (err || foundUser[0].id !== decoded.userId) {
          return res.status(StatusCodes.FORBIDDEN);
        }
        const accessToken = jwt.sign(
          {
            userId: foundUser[0].id,
            displayName: foundUser[0].displayName,
          },
          process.env.ACCESS_SECRET,
          { expiresIn: "15d", algorithm: "HS256" }
        );
        res.status(StatusCodes.OK).json({
          userId: foundUser[0].id,
          displayName: foundUser[0].displayName,
          accessToken,
          avatarUrl: foundUser[0].avatarUrl,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(StatusCodes.FORBIDDEN);
    });
};
