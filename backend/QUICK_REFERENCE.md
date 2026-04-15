# JWT Authentication - Quick Reference

## Files Created

### 1. User Model
**Path:** `backend/model/UserModel.js`
- User schema with name, email, password
- Pre-save middleware hashes password
- comparePassword() method for login
- Excludes password from JSON responses

### 2. Auth Controller  
**Path:** `backend/controller/AuthController.js`
- `signup()` - Register users with password hashing
- `login()` - Authenticate and return JWT token
- `getCurrentUser()` - Get user profile

### 3. JWT Middleware
**Path:** `backend/middleware/AuthMiddleware.js`
- Verifies Bearer tokens
- Attaches user to req.user
- Handles token errors

### 4. Auth Routes
**Path:** `backend/routes/AuthRoutes.js`
- `POST /auth/signup` - Register
- `POST /auth/login` - Login
- `GET /auth/me` - Get profile (protected)

### 5. Updated Files
- `backend/index.js` - Integrated auth routes
- `backend/.env` - Added JWT variables
- `backend/package.json` - Added dependencies

---

## Key Features

✅ User registration with email validation
✅ Password hashing with bcrypt
✅ JWT token generation
✅ Protected routes with middleware
✅ Token expiry (default 7 days)
✅ Prevent duplicate emails
✅ Error handling
✅ Bearer token authentication

---

## Quick Start

### Install Dependencies
```bash
cd backend
npm install
```

### Environment Variables (`.env`)
```
JWT_SECRET=your_secret_key_here
JWT_EXPIRY=7d
MONGO_URL=your_mongodb_url
```

### Test Authentication

1. **Signup:**
```bash
curl -X POST http://localhost:3002/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Pass123",
    "confirmPassword": "Pass123"
  }'
```

2. **Login:**
```bash
curl -X POST http://localhost:3002/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Pass123"
  }'
```

3. **Protected Route (Buy Stock):**
```bash
curl -X POST http://localhost:3002/newOrder \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TCS",
    "qty": 10,
    "price": 3500,
    "mode": "BUY"
  }'
```

---

## Frontend Integration

### Axios Setup
```javascript
// Store token after login
localStorage.setItem("token", response.data.token);

// Use in API calls
axios.post("/newOrder", data, {
  headers: { Authorization: `Bearer ${token}` }
});
```

### React Hook Example
```javascript
const [token, setToken] = useState(localStorage.getItem("token"));

const buyStock = async (name, qty, price) => {
  const response = await axios.post("/newOrder", 
    { name, qty, price, mode: "BUY" },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
```

---

## API Endpoints

| Method | URL | Auth Required | Description |
|--------|-----|---------------|-------------|
| POST | /auth/signup | No | Register new user |
| POST | /auth/login | No | Login & get token |
| GET | /auth/me | Yes | Get user profile |
| POST | /newOrder | Yes | Buy stock |
| POST | /sellOrder | Yes | Sell stock |
| GET | /allHoldings | No | Get all holdings |
| GET | /allPositions | No | Get all positions |

---

## Token Header Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## How to Protect Routes

```javascript
// Import middleware
const { authMiddleware } = require("./middleware/AuthMiddleware");

// Use on any route
app.post("/protected", authMiddleware, async (req, res) => {
  // req.user.id contains user ID
  console.log(req.user.id);
});
```

---

## Expiry Handling

Token expires after 7 days by default. User must login again to get new token.

To change expiry, update `.env`:
```
JWT_EXPIRY=30d    # 30 days
JWT_EXPIRY=1h     # 1 hour
```

---

## See Also
- Full guide: `AUTH_GUIDE.md`
- Postman collection examples in `AUTH_GUIDE.md`
