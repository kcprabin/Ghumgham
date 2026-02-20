import connectDB from "./database/db.connect.js";
import app from "./app.js";

try {  
    connectDB()
} catch (error) {
    console.error("Failed to connect to the database:", error);
}

app.listen(process.env.PORT, () => {
    console.log(`Hotel service is running on port ${process.env.PORT}`);
});


