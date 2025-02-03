import { Router } from "express";
import { createPost, deletePost, getPost, getPosts, uploadAuth } from "../controllers/post.controller.js";
import { verifyJwt } from "../middlwares/auth.middleware.js";
import { createRateLimiter } from "../middlwares/rate-limiting.middleware.js";
import { upload } from "../middlwares/multer.middleware.js";

const postRouter = Router();
postRouter.route("/upload-auth").get(uploadAuth)
postRouter.route("/create").post(verifyJwt, createRateLimiter(5 * 60 * 1000, 5, "Too much create post request hit, please try again after five minute"), createPost);
postRouter.route("/").get(createRateLimiter(2 * 60 * 1000, 15, "Too much get post request hit, please try again after two minute"), getPosts);
postRouter.route("/:slug").get(verifyJwt, createRateLimiter(5 * 60 * 1000, 10, "Too much get post request hit, please try again after five minute"), getPost);
postRouter.route("/:id").delete(verifyJwt, deletePost);

export default postRouter;