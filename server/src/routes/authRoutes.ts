import express from "express";
import { Login } from "../controllers/authController";

const router = express.Router();

router.get("/login", Login);

export default router;
