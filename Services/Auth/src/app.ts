import express, { Router } from "express";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import cors from "cors";
import UserRouter from "./Router/user.router.ts";

dotenv.config({
    path: "./.env"
});

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));    
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true, limit: "10mb"}));   
app.use(express.static("public"));
app.use(cookie());


// user routes
app.use("/api/v1/users", UserRouter);

export default app; 

