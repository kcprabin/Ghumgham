import { connectDB } from "@packages"
import app from "./app.js"


const startServer = async()=>{
    try {
        await connectDB( process.env.MONGODB_URI as string, process.env.MONGODB_DB_NAME as string);
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })  
       
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1); 
}
}

 await startServer()