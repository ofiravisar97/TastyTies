import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const refresh = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized." });
  }

  const refresh = cookie.jwt;
  const decoded = jwt.verify(refresh, process.env.REFRESH_SECRET);
};
