import express from "express";
import { Login, Register } from "../controllers/authController";
import { validateData } from "../middlewares/validateData";
import { registerSchema, loginSchema } from "../schemas/authSchemas";

const router = express.Router();

router.get("/login", validateData(loginSchema), Login);
router.post("/register", validateData(registerSchema), Register);

export default router;
