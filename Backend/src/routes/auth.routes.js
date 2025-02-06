import { Router } from "express";
import { changeCurrentPassword, forgotPassword, getUser, googleSignup, logout, refreshAccessToken, resendOtp, signin, signup, uploadImage, verifyEmail } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlwares/auth.middleware.js";
import { createRateLimiter } from "../middlwares/rate-limiting.middleware.js";

const authRouter = Router();
authRouter.route("/uploadImage").post(verifyJwt, uploadImage)
authRouter.route("/signup").post( createRateLimiter(5 * 60 * 1000, 5, "Too much signup request hit, please try again after five minute"), signup);
authRouter.route("/googleSignup").post( createRateLimiter(5 * 60 * 1000, 5, "Too much signup request hit, please try again after five minute"), googleSignup);
authRouter.route("/signin").post( createRateLimiter(4 * 60 * 1000, 10, "Too much signin request hit, please try again after four minute"), signin);
authRouter.route("/logout").post(verifyJwt, logout);
authRouter.route("/verify-email").post(verifyJwt, verifyEmail)
authRouter.route("/resend-otp").post( createRateLimiter(4 * 60 * 1000, 10, "Too much resendItp request hit, please try again after four minute"), resendOtp);
authRouter.route("/forgot-password").post(forgotPassword);
authRouter.route("/change-password/:token").post(changeCurrentPassword)
authRouter.route("/refresh-token").post(refreshAccessToken);
authRouter.route("/isuser").get(verifyJwt, getUser)
export default authRouter;