import dotenv from "dotenv"
import {connectDB} from "@packages"
dotenv.config({
    path:"./.env"
})
import app from "./app.js"

connectDB(process.env.DATABASE_URL!,process.env.DATABASE_NAME!).then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT,()=>{
            console.log(`server running on port ${process.env.PORT}`)
    })
}).catch(()=>{
    console.log("Error in database connection booking")
})