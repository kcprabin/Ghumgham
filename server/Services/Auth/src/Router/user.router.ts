import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  googleAuth
} from "../Controllers/user.controller.js";

import passport from "passport";

const router = Router();

router.post("/register", registerUser);
router.post("/logout",  logoutUser);
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

export default router;