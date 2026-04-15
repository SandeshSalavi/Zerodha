# JWT Authentication Implementation Guide

## Overview
This guide explains the JWT authentication system added to your MERN project.

## Files Created

### 1. **User Model** (`backend/model/UserModel.js`)
- Schemas for user registration
- Password hashing with bcrypt
- Password comparison method
- Excludes password from toJSON() response

### 2. **Auth Controller** (`backend/controller/AuthController.js`)
- `signup()` - Register new users
- `login()` - Authenticate users and return JWT
- `getCurrentUser()` - Get authenticated user info

### 3. **JWT Middleware** (`backend/middleware/AuthMiddleware.js`)
- Verifies JWT tokens
- Extracts Bearer token from Authorization header
- Attaches user info to request object
- Handles token expiration errors

### 4. **Auth Routes** (`backend/routes/AuthRoutes.js`)
- POST `/auth/signup` - Public route
- POST `/auth/login` - Public route
- GET `/auth/me` - Protected route (example)

### 5. **Integration** (`backend/index.js`)
- Imports and uses auth routes
- Protects `/newOrder` and `/sellOrder` endpoints with authMiddleware
- Uses: `app.use("/auth", AuthRoutes);`

## Environment Variables

Add to `.env`:
```
JWT_SECRET=your_jwt_secret_key_change_this_in_production_12345
JWT_EXPIRY=7d
MONGO_URL=your_mongodb_connection_string
```

## How to Use

### 1. Import Middleware in Other Routes
```javascript
const { authMiddleware } = require("./middleware/AuthMiddleware");

// Protect any route
app.post("/protected-route", authMiddleware, (req, res) => {
  // req.user contains: { id: user_id }
  console.log(req.user.id); // Get authenticated user's ID
});
```

### 2. Access User ID in Protected Routes
```javascript
app.post("/newOrder", authMiddleware, async(req,res) => {
  const userId = req.user.id; // User ID from JWT
  const stockName = req.body.name;
  // Use userId to associate order with specific user
});
```

---

## API ENDPOINTS

### 1. SIGNUP (Register New User)
**URL:** `POST /auth/signup`
**Headers:** `Content-Type: application/json`
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### 2. LOGIN (Authenticate User)
**URL:** `POST /auth/login`
**Headers:** `Content-Type: application/json`
**Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 3. GET CURRENT USER (Protected Route Example)
**URL:** `GET /auth/me`
**Headers:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-04-14T12:00:00.000Z"
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid token"
}
```

---

### 4. BUY ORDER (Protected Route - Updated)
**URL:** `POST /newOrder`
**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```
**Body:**
```json
{
  "name": "TCS",
  "qty": 10,
  "price": 3500.50,
  "mode": "BUY"
}
```

---

### 5. SELL ORDER (Protected Route - Updated)
**URL:** `POST /sellOrder`
**Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```
**Body:**
```json
{
  "name": "TCS",
  "qty": 5,
  "price": 3600.75,
  "mode": "SELL"
}
```

---

## POSTMAN Collection Examples

### Step 1: Signup
```
POST http://localhost:3002/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```
**Copy the token from response**

### Step 2: Login
```
POST http://localhost:3002/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```
**Copy the token from response**

### Step 3: Get Current User (Protected)
```
GET http://localhost:3002/auth/me
Authorization: Bearer <paste_your_token_here>
```

### Step 4: Buy Order (Protected)
```
POST http://localhost:3002/newOrder
Authorization: Bearer <paste_your_token_here>
Content-Type: application/json

{
  "name": "TCS",
  "qty": 10,
  "price": 3500
}
```

### Step 5: Sell Order (Protected)
```
POST http://localhost:3002/sellOrder
Authorization: Bearer <paste_your_token_here>
Content-Type: application/json

{
  "name": "TCS",
  "qty": 5,
  "price": 3600
}
```

---

## Frontend Integration (React)

### Example: Login and Store Token

```javascript
import axios from "axios";

const handleLogin = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:3002/auth/login", {
      email,
      password,
    });

    // Store token in localStorage
    const token = response.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    console.log("Login successful!");
  } catch (error) {
    console.error("Login failed:", error.response.data.message);
  }
};
```

### Example: Making Protected API Calls

```javascript
const handleBuyStock = async (stockName, qty, price) => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await axios.post(
      "http://localhost:3002/newOrder",
      {
        name: stockName,
        qty: qty,
        price: price,
        mode: "BUY",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Order placed:", response.data);
  } catch (error) {
    console.error("Order failed:", error.response.data.error);
  }
};
```

### Example: Create Axios Instance with Auto Token

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3002",
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example usage
export const buyStock = (data) => API.post("/newOrder", data);
export const sellStock = (data) => API.post("/sellOrder", data);
export const getCurrentUser = () => API.get("/auth/me");
```

---

## Error Handling

### Common Errors

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "message": "Invalid token"
}
```

**401 Token Expired:**
```json
{
  "success": false,
  "message": "Token has expired"
}
```

---

## Security Best Practices

1. **Change JWT_SECRET** in production to a strong random string
2. **Use HTTPS** in production to protect tokens in transit
3. **Store tokens securely** in frontend (localStorage/sessionStorage)
4. **Set appropriate JWT_EXPIRY** (7d is good, adjust as needed)
5. **Never expose JWT_SECRET** in version control
6. **Validate all inputs** on backend
7. **Use secure password** requirements (min 6 characters)

---

## Testing Flow

1. Register new user with `/auth/signup`
2. Get JWT token from response
3. Use token in Authorization header for protected routes
4. Token expires after 7 days (default)
5. User must login again to get new token

---

## Next Steps

1. Update frontend BuyActionWindow and SellActionWindow to include Authorization header
2. Update Holdings and Positions API calls to use protected endpoints
3. Add logout functionality (clear token from localStorage)
4. Add user profile page
5. Add role-based access control (admin, user)
