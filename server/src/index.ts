import express from "express";
import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
const port: number = Number(process.env.PORT as string);
//=========== Middlewares

app.use(helmet());
app.use(morgan("combined"));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});
