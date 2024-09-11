import { validateData } from "../middlewares/validateData.js";
import { login, register } from "../controllers/authController.js";
import express from "express";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";

const router = express.Router();

router.post("/register", validateData(registerSchema), register);
router.post("/login", validateData(loginSchema), login);

export default router;
