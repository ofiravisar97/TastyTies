import express from "express";
import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import AuthRoutes from "./routes/authRoutes.ts";

const app = express();
const port: number = Number(process.env.PORT as string);
//=========== Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(morgan("combined"));
//============ Routes
app.use(AuthRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});
