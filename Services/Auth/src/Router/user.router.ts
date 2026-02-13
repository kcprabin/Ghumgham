import { Router } from "express";
import { registerUser } from "../Controllers/user.controller.ts";

const router = Router(); 


router.post("/register", registerUser);


export default router;


