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
import healthRoutes from "./routes/health.routes.js";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.resolve("uploads")));

// ============================
// API Landing Page
// ============================
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Insurance Management API</title>

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Poppins,sans-serif;
}

body{

background:linear-gradient(135deg,#2563eb,#0f172a);

min-height:100vh;

display:flex;

justify-content:center;

align-items:center;

padding:40px;

color:white;

}

.container{

max-width:1100px;

width:100%;

background:white;

color:#1e293b;

border-radius:24px;

padding:50px;

box-shadow:0 30px 60px rgba(0,0,0,.3);

}

.header{

text-align:center;

margin-bottom:40px;

}

.header h1{

font-size:42px;

color:#2563eb;

margin-bottom:10px;

}

.header p{

font-size:18px;

color:#64748b;

}

.cards{

display:grid;

grid-template-columns:repeat(auto-fit,minmax(220px,1fr));

gap:20px;

margin:40px 0;

}

.card{

background:#f8fafc;

padding:25px;

border-radius:18px;

border-left:6px solid #2563eb;

transition:.3s;

}

.card:hover{

transform:translateY(-6px);

box-shadow:0 10px 30px rgba(0,0,0,.15);

}

.card h3{

margin-bottom:10px;

color:#2563eb;

}

.card p{

font-size:15px;

color:#475569;

}

.routes{

margin-top:40px;

}

.routes table{

width:100%;

border-collapse:collapse;

}

.routes th{

background:#2563eb;

color:white;

padding:15px;

}

.routes td{

padding:14px;

border-bottom:1px solid #e2e8f0;

}

.routes tr:hover{

background:#eff6ff;

}

.buttons{

display:flex;

justify-content:center;

gap:20px;

margin-top:40px;

flex-wrap:wrap;

}

.btn{

text-decoration:none;

padding:14px 28px;

border-radius:12px;

font-weight:600;

transition:.3s;

}

.blue{

background:#2563eb;

color:white;

}

.green{

background:#16a34a;

color:white;

}

.btn:hover{

transform:translateY(-3px);

}

.footer{

margin-top:50px;

text-align:center;

font-size:14px;

color:#64748b;

}

</style>

</head>

<body>

<div class="container">

<div class="header">

<h1>🛡 Insurance Management System API</h1>

<p>Professional REST API built using Express.js, Prisma ORM & PostgreSQL</p>

</div>

<div class="cards">

<div class="card">

<h3>🟢 Server Status</h3>

<p>Running Successfully</p>

</div>

<div class="card">

<h3>🗄 Database</h3>

<p>PostgreSQL Connected</p>

</div>

<div class="card">

<h3>🔐 Authentication</h3>

<p>JWT Enabled</p>

</div>

<div class="card">

<h3>⚡ Environment</h3>

<p>${process.env.NODE_ENV || "Production"}</p>

</div>

</div>

<div class="routes">

<h2 style="margin-bottom:20px;color:#2563eb;">
Available API Modules
</h2>

<table>

<tr>

<th>Module</th>

<th>Endpoint</th>

</tr>

<tr><td>Authentication</td><td>/api/auth</td></tr>

<tr><td>Users</td><td>/api/users</td></tr>

<tr><td>Customers</td><td>/api/customers</td></tr>

<tr><td>Policies</td><td>/api/policies</td></tr>

<tr><td>Payments</td><td>/api/payments</td></tr>

<tr><td>Claims</td><td>/api/claims</td></tr>

<tr><td>Documents</td><td>/api/documents</td></tr>

<tr><td>Reports</td><td>/api/reports</td></tr>

<tr><td>Dashboard</td><td>/api/dashboard</td></tr>

</table>

</div>

<div class="buttons">

<a class="btn blue" href="/api-docs">
📘 Swagger Documentation
</a>

<a class="btn green" href="/api/dashboard">
📊 Dashboard API
</a>

</div>

<div class="footer">

<h3>Insurance Management System</h3>

<p>Version 1.0.0</p>

<p>Developed by <strong>Aayush Mahadik</strong></p>

<p>MCA Final Year Project • 2026</p>

</div>

</div>

</body>

</html>
`);
});
// Health Route
app.use("/health", healthRoutes);
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