import { Router } from "express";
import { getUserSavedPost, saveUserPost } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlwares/auth.middleware.js";

const userRouter = Router();
userRouter.route("/saved").get(verifyJwt, getUserSavedPost);
userRouter.route("/save").patch(verifyJwt, saveUserPost);

export default userRouter;