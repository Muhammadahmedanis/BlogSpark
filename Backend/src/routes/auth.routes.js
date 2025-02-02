import { Router } from "express";
import { changeCurrentPassword, forgotPassword, logout, refreshAccessToken, resendOtp, signin, signup, verifyEmail } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlwares/auth.middleware.js";
import { createRateLimiter } from "../middlwares/rate-limiting.middleware.js";

const authRouter = Router();
authRouter.route("/signup").post( createRateLimiter(5 * 60 * 1000, 5, "Too much signup request hit, please try again after five minute"), signup);
authRouter.route("/signin").post( createRateLimiter(4 * 60 * 1000, 10, "Too much signin request hit, please try again after four minute"), signin);
authRouter.route("/logout").post(verifyJwt, logout);
authRouter.route("/verify-email").post(verifyJwt, verifyEmail)
authRouter.route("/resend-otp").post( createRateLimiter(4 * 60 * 1000, 10, "Too much resendItp request hit, please try again after four minute"), resendOtp);
authRouter.route("/forgot-password").post(forgotPassword);
authRouter.route("/change-password/:token").post(changeCurrentPassword)
authRouter.route("/refresh-token").post(refreshAccessToken);

export default authRouter;