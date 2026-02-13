import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  googleAuth
} from "../Controllers/user.controller.ts";
import { authMiddleware } from "../Middleware/Auth.middleware.ts";
import passport from "passport";

const router = Router();

router.post("/register", registerUser);
router.post("/logout", authMiddleware, logoutUser);
router.post("/login", loginUser);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleAuth
);

export default router;
