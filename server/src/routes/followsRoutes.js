import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { unfollow, follow } from "../controllers/followsController.js";
import { validateData } from "../middlewares/validateData.js";
import { followSchema } from "../schemas/followSchemas.js";

const router = express.Router();

router.use(isAuth);

router.post("/follow", validateData(followSchema), follow);
router.post("/unfollow", validateData(followSchema), unfollow);

export default router;
