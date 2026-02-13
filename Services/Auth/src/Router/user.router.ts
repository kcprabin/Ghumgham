import { Router } from "express";
import { loginUser, logoutUser, registerUser,} from "../Controllers/user.controller.ts";

const router = Router(); 


router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.post("/login", loginUser);


export default router;


