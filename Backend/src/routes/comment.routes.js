import { Router } from "express";
import { addComment, deleteComment, getPostComments } from "../controllers/comment.controller.js";
import { verifyJwt } from "../middlwares/auth.middleware.js";

const commentRouter = Router();
commentRouter.route("/:postId").get(getPostComments);
commentRouter.route("/:postId").post(verifyJwt, addComment);
commentRouter.route("/:id").delete(verifyJwt, deleteComment);

export default commentRouter;