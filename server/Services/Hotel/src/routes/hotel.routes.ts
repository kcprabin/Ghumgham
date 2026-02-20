import { Router } from "express";
import {registerHotel , createroom ,deleteRoom} from "../controller/register.controller.js";
import {roleMiddleware , passwordCheck} from "@packages"


const router = Router();

router.post("/register", roleMiddleware, registerHotel);
router.post("/room/:hotelId",roleMiddleware, createroom);
router.delete("/room/:hotelId/:roomId",roleMiddleware, passwordCheck, deleteRoom); 


export default router;