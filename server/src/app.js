import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import customerRoutes from "./routes/customer.routes.js";
import policyRoutes from "./routes/policy.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import claimRoutes from "./routes/claim.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import documentRoutes from "./routes/document.routes.js";
import reportRoutes from "./routes/report.routes.js";
import swaggerSpec from "./docs/swagger.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.resolve("uploads")));

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Insurance Management API is running 🚀",
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/reports", reportRoutes);
// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Global Error Handler
app.use(errorMiddleware);

export default app;