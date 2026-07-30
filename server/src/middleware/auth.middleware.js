import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    console.log("\n========== AUTH MIDDLEWARE ==========");
    console.log("Authorization Header:", authHeader);

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ No Bearer token found.");

      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    console.log("Extracted Token:", token);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token verified successfully.");
    console.log("Decoded Payload:", decoded);

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    console.log("❌ JWT Verification Failed");
    console.log("Error Name:", error.name);
    console.log("Error Message:", error.message);
    console.log("Stack:", error.stack);
    console.log("=====================================\n");

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;