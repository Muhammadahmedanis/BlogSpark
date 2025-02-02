import { Router } from "express";
import { createPost, deletePost, getPost, getPosts } from "../controllers/post.controller.js";

const postRouter = Router();
postRouter.route("/create").post(createPost);
postRouter.route("/").get(getPosts);
postRouter.route("/:slug").get(getPost);
postRouter.route("/:id").delete(deletePost);

export default postRouter;