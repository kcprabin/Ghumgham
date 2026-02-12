import express from "express";
import dotenv from "dotenv";
import cookie from "cookie-parser";
import cors from "cors";

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

export default app; 

