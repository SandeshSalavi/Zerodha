const express = require("express");
const { signup, login, getCurrentUser } = require("../controller/AuthController");
const { authMiddleware } = require("../middleware/AuthMiddleware");

const router = express.Router();

// ✅ Public Routes
router.post("/signup", signup);
router.post("/login", login);

// ✅ Protected Routes (require authentication)
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
