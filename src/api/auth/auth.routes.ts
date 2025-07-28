import { Router } from "express";
import * as authController from "./auth.controllers";

const authRoutes: ReturnType<typeof Router> = Router();

//all api routes for auth services
authRoutes.post("/login", authController.loginAuthController);
authRoutes.post("/logout", authController.logoutAuthController);
authRoutes.post("/register", authController.registerAuthController);
authRoutes.post("/verify-email", authController.verifyEmailAuthController);
authRoutes.post("/reset-password", authController.resetPasswordAuthController);
authRoutes.post(
  "/forgot-password",
  authController.forgotPasswordAuthController
);

export default authRoutes;
