import express, { Express } from "express";
import bookRoutes from "./api/v1/routes/bookRoutes";
import borrowRoutes from "./api/v1/routes/borrowRoutes";
import userRoutes from "./api/v1/routes/userRoutes";

// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use(express.json())

app.use("/api/v1", bookRoutes)
app.use("/api/v1", borrowRoutes)
app.use("/api/v1", userRoutes)

export default app;