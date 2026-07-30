const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    // Ensure user exists
    if (!req.user) {
      console.log("❌ No user found in request");

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Debug Logs
    console.log("========== ROLE MIDDLEWARE ==========");
    console.log("User:", req.user);
    console.log("User Role:", req.user.role);
    console.log("Allowed Roles:", roles);
    console.log("=====================================");

    // Check role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
      });
    }

    next();
  };
};

export default roleMiddleware;