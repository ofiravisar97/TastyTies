import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import logger from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
const app = express();

const port = process.env.PORT || 8080;

// Route Imports
import authRoutes from "./routes/authRoutes.js";
import followsRoutes from "./routes/followsRoutes.js";
import refreshRoutes from "./routes/refreshRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import likesRoutes from "./routes/likesRoutes.js";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(logger("dev"));

app.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode === StatusCodes.INTERNAL_SERVER_ERROR;
  }
  if (err.statusCode === StatusCodes.UNAUTHORIZED) {
    res.status(err.statusCode).json({ error: "Unauthorized." });
  }
  res.status(err.statusCode).json({ error: err.message });
});

app.use(authRoutes);
app.use(refreshRoutes);

app.use(followsRoutes);
app.use(recipeRoutes);
app.use(usersRoutes);
app.use(likesRoutes);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
