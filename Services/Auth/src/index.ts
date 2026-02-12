import connectDB from "./Db/Connect.db.ts";
import app from "./app.ts"; 

connectDB().then(() => {
    console.log("Database connection established. Starting the server...");
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
}); 

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

