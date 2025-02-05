import { Router } from "express";
import { deleteUser, getAlluser, getUserSavedPost, saveUserPost, updateUser } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlwares/auth.middleware.js";

const userRouter = Router();
userRouter.route("/saved").get(verifyJwt, getUserSavedPost);
userRouter.route("/save").patch(verifyJwt, saveUserPost);
userRouter.route("/").get(verifyJwt, getAlluser);
userRouter.route("/delete/:userId").delete(verifyJwt,deleteUser)
userRouter.route("/update/:userId").patch(verifyJwt, updateUser);
export default userRouter;