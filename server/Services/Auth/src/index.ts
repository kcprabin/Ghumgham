import connectDB from "./Db/Connect.db.js";
import app from "./app.js"; 
 

connectDB().then(() => {
    console.log("Database connection established. Starting the server...");
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
}); 

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

