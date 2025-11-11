import express, { Express } from "express";
import bookRoutes from "./api/v1/routes/bookRoutes";
import borrowRoutes from "./api/v1/routes/borrowRoutes";

// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use(express.json())

app.use("/api/v1", bookRoutes)
app.use("/api/v1", borrowRoutes)

export default app;