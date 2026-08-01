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
import healthRoutes from "./routes/health.routes.js";

import swaggerSpec from "./docs/swagger.js";

import notFoundMiddleware from "./middleware/notFound.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

/* ===========================
   Middleware
=========================== */

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads")));

/* ===========================
   Landing Page
=========================== */

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Insurance Management System API</title>

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
}

.container{
width:100%;
max-width:1150px;
background:#fff;
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
color:#64748b;
font-size:18px;
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
box-shadow:0 15px 35px rgba(0,0,0,.12);
}

.card h3{
color:#2563eb;
margin-bottom:10px;
}

.card p{
color:#475569;
}

table{
width:100%;
border-collapse:collapse;
margin-top:20px;
}

th{
background:#2563eb;
color:#fff;
padding:15px;
}

td{
padding:15px;
border-bottom:1px solid #e2e8f0;
}

tr:hover{
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
padding:15px 28px;
border-radius:12px;
font-weight:600;
text-decoration:none;
color:#fff;
transition:.3s;
}

.blue{
background:#2563eb;
}

.green{
background:#16a34a;
}

.btn:hover{
transform:translateY(-3px);
}

.footer{
text-align:center;
margin-top:45px;
color:#64748b;
}

.badge{
color:#dc2626;
font-weight:600;
}

</style>

</head>

<body>

<div class="container">

<div class="header">

<h1>🛡 Insurance Management System API</h1>

<p>Professional REST API powered by Express.js, Prisma ORM & PostgreSQL</p>

</div>

<div class="cards">

<div class="card">
<h3>🟢 Server</h3>
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

<h2 style="color:#2563eb;">Available API Modules</h2>

<table>

<tr>

<th>Module</th>

<th>Endpoint</th>

</tr>

<tr><td>Authentication</td><td>/api/auth</td></tr>
<tr><td>Users <span class="badge">🔒</span></td><td>/api/users</td></tr>
<tr><td>Customers <span class="badge">🔒</span></td><td>/api/customers</td></tr>
<tr><td>Policies <span class="badge">🔒</span></td><td>/api/policies</td></tr>
<tr><td>Payments <span class="badge">🔒</span></td><td>/api/payments</td></tr>
<tr><td>Claims <span class="badge">🔒</span></td><td>/api/claims</td></tr>
<tr><td>Documents <span class="badge">🔒</span></td><td>/api/documents</td></tr>
<tr><td>Reports <span class="badge">🔒</span></td><td>/api/reports</td></tr>
<tr><td>Dashboard <span class="badge">🔒</span></td><td>/api/dashboard/summary</td></tr>

</table>

<div class="buttons">

<a class="btn blue" href="/api-docs">
📘 Swagger Documentation
</a>

<a class="btn green" href="/health">
💚 Health Check
</a>

</div>

<div class="footer">

<h3>Insurance Management System API</h3>

<p>Version 1.0.0</p>

<p>Developed by <strong>Aayush Mahadik</strong></p>

<p>MCA Final Year Project • 2026</p>

</div>

</div>

</body>

</html>
`);
});

/* ===========================
   Routes
=========================== */

app.use("/health", healthRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/reports", reportRoutes);

/* ===========================
   Swagger
=========================== */

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

/* ===========================
   404 Handler
=========================== */

app.use(notFoundMiddleware);

/* ===========================
   Global Error Handler
=========================== */

app.use(errorMiddleware);

export default app;