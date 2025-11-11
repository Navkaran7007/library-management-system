import express, { Express } from "express";
import bookRoutes from "./api/v1/routes/bookRoutes";

// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use(express.json())

app.use("/api/v1", bookRoutes)


export default app;