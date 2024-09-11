import { StatusCodes } from "http-status-codes";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";

export const isAuth = catchAsync(async (req, res, next) => {
  const { userId } = req.body;
  if (!req.headers["authorization"]) {
    throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
  }

  const decoded = jwt.verify(token, process.env.ACCESS_SECRET);

  // if (userId !== decoded.userId) {
  //   throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED);
  // }

  next();
});
