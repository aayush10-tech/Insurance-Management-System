import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  const uptime = process.uptime();

  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  res.json({
    success: true,
    status: "healthy",
    service: "Insurance Management API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    database: "Connected",
    uptime: `${hours}h ${minutes}m ${seconds}s`,
    node: process.version,
    timestamp: new Date().toISOString(),
  });
});

export default router;