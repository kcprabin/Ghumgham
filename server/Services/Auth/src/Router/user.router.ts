import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  googleAuth,
  deleteUserProfile,
  updateUserProfile,
  getUserProfile,
  sendOTP,
  verifyOTP
} from "../Controllers/user.controller.js";

import passport from "passport";
import { roleMiddleware } from "../../../../Packages/middleware/role.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/logout", roleMiddleware, logoutUser);
router.post("/login", loginUser);
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email" ],
  }),
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  googleAuth
);
router.get("/profile", roleMiddleware, getUserProfile);
router.put("/update-profile", roleMiddleware, updateUserProfile);
router.delete("/delete-profile", roleMiddleware, deleteUserProfile);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);


export default router;