import express, { Express } from "express";
import bookRoutes from "./api/v1/routes/bookRoutes";
import borrowRoutes from "./api/v1/routes/borrowRoutes";
import userRoutes from "./api/v1/routes/userRoutes";
import setupSwagger from "../config/swagger";
import {limiter} from './api/v1/middleware/rateLimiter';
import { accessLogger, consoleLogger, errorLogger } from "./api/v1/middleware/logger";
import reviewRoutes from "./api/v1/routes/reviewRoutes";

// Initialize Express application
const app: Express = express();
// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

app.use(limiter);
// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
app.use(express.json())

app.use("/api/v1", bookRoutes)
app.use("/api/v1", borrowRoutes)
app.use("/api/v1", userRoutes)
app.use("/api/v1",reviewRoutes)
// Setup Swagger
setupSwagger(app);
export default app;