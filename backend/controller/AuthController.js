const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

// ✅ Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY || "7d",
  });
};

// ✅ SIGNUP CONTROLLER
const signup = async (req, res) => {
  try {
    console.log("📝 Signup request received:", req.body);
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check if email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Create new user
    const user = await UserModel.create({
      name,
      email,
      password,
    });

    console.log("✅ User created:", user._id);

    // Generate token
    const token = generateToken(user._id);

    // Return response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error during signup",
    });
  }
};

// ✅ LOGIN CONTROLLER
const login = async (req, res) => {
  try {
    console.log("🔐 Login request received:", req.body);
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user and include password field (since it's normally excluded)
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    console.log("✅ User authenticated:", user._id);

    // Generate token
    const token = generateToken(user._id);

    // Return response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error during login",
    });
  }
};

// ✅ GET CURRENT USER (Protected Route Example)
const getCurrentUser = async (req, res) => {
  try {
    console.log("👤 Getting user:", req.user.id);
    const user = await UserModel.findById(req.user.id);
    
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("❌ Get User Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user",
    });
  }
};

module.exports = {
  signup,
  login,
  getCurrentUser,
  generateToken,
};
