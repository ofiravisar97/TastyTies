import express from "express";
import { like, unlike } from "../controllers/likesController.js";
import { validateData } from "../middlewares/validateData.js";
import { likeSchema } from "../schemas/likesSchemas.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.use(isAuth);

router.post("/like", validateData(likeSchema), like);
router.post("/unlike", validateData(likeSchema), unlike);

export default router;
