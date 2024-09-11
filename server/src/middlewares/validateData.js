import { StatusCodes } from "http-status-codes";
import { ZodError, z } from "zod";

export const validateData = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      err.statusCode = StatusCodes.BAD_REQUEST;
      next(err);
    }
  };
};
