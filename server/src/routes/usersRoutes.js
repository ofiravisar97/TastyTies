import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  searchHandler,
  changeBioHandler,
  changeAvatarHandler,
  getUserHandler,
} from "../controllers/usersController.js";
import { validateData } from "../middlewares/validateData.js";
import { getUserSchema } from "../schemas/usersSchema.js";

const router = express.Router();

router.use(isAuth);

router.get("/search", searchHandler);
router.put("/bio", changeBioHandler);
router.put("/changeAvatar", changeAvatarHandler);
router.post("/getUser", validateData(getUserSchema), getUserHandler);

export default router;
