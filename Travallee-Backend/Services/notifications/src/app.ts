import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config({
    path: "./.env"
});

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


export default app;