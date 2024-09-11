import { StatusCodes } from "http-status-codes";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";

export const isAuth = catchAsync(async (req, res, next) => {
  if (!req.headers["authorization"]) {
    throw new AppError("Unauthorized", StatusCodes.FORBIDDEN);
  }
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    throw new AppError("Unauthorized", StatusCodes.FORBIDDEN);
  }

  jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
    if (err) {
      throw new AppError("Unauthorized", StatusCodes.FORBIDDEN);
    }
    next();
  });
});
