import { Router } from "express";
import { deleteUser, getAlluser, getUserSavedPost, saveUserPost, updateUser, uploadImage } from "../controllers/user.controller.js";
import { verifyJwt } from "../middlwares/auth.middleware.js";
import { upload } from "../middlwares/multer.middleware.js";

const userRouter = Router();
userRouter.route("/uploadAvatar").post(verifyJwt, upload.single("avatar"), uploadImage)
userRouter.route("/saved").get(verifyJwt, getUserSavedPost);
userRouter.route("/save").patch(verifyJwt, saveUserPost);
userRouter.route("/").get(verifyJwt, getAlluser);
userRouter.route("/delete/:userId").delete(verifyJwt,deleteUser)
userRouter.route("/update/:userId").patch(verifyJwt, updateUser);
export default userRouter;