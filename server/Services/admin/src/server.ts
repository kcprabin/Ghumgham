import app from "./app.js";
import connectDB from "./database/connect.db.js";
import dotenv from 'dotenv';

dotenv.config({
    path: '../../.env'
})



connectDB().then(() => {
    console.log("Database connected, starting server...");
}).catch((error) => {
    console.error("Failed to connect to database:", error);
    process.exit(1); // Exit the process with failure
});