import express, { Express } from "express";
import bookRoutes from "./api/v1/routes/bookRoutes";
import borrowRoutes from "./api/v1/routes/borrowRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import setupSwagger from "../config/swagger";
import {limiter} from './api/v1/middleware/rateLimiter';

// Initialize Express application
const app: Express = express();

app.use(limiter);
// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use(express.json())

app.use("/api/v1", bookRoutes)
app.use("/api/v1", borrowRoutes)
app.use("/api/v1", userRoutes)

// Setup Swagger
setupSwagger(app);
export default app;