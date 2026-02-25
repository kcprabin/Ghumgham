import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from project root (Ghumgham/.env)
dotenv.config({
    path: resolve(__dirname, '../../../../.env')
});

import { connectDB } from "@packages";
import app from "./app.js";

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URI_AUTH as string, process.env.MONGO_DB_NAME_AUTH as string);
        console.log("Database connection established and established successfully. Starting Auth service...");
    
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
};

startServer();

