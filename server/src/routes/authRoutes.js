import { validateData } from "../middlewares/validateData.js";
import { login, register, logout } from "../controllers/authController.js";
import express from "express";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/register", validateData(registerSchema), register);
router.post("/login", validateData(loginSchema), login);
router.get("/logout", isAuth, logout);

export default router;
