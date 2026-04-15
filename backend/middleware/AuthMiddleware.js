const jwt = require("jsonwebtoken");

// ✅ JWT Authentication Middleware - CLEAN VERSION
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header (Bearer token)
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.slice(7);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request
    req.user = decoded;
    
    // Call next middleware/route handler
    next();
    
  } catch (error) {
    console.error("Auth Error:", error.message);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      });
    }
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Auth error",
    });
  }
};

module.exports = { authMiddleware };
