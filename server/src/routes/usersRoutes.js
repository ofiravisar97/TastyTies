import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  searchHandler,
  changeBioHandler,
  changeAvatarHandler,
  getUserHandler,
  fetchFeed,
} from "../controllers/usersController.js";
import { validateData } from "../middlewares/validateData.js";
import { getUserSchema } from "../schemas/usersSchema.js";

const router = express.Router();

router.get("/search", isAuth, searchHandler);
router.put("/bio", isAuth, changeBioHandler);
router.put("/changeAvatar", isAuth, changeAvatarHandler);
router.post("/getUser", isAuth, validateData(getUserSchema), getUserHandler);
router.get("/feed", isAuth, fetchFeed);

export default router;
