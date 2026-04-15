# ✅ JWT AUTHENTICATION - VERIFICATION CHECKLIST

## 🎯 VERIFY YOUR IMPLEMENTATION

Use this checklist to ensure everything is working correctly.

---

## 1️⃣ BACKEND SETUP VERIFICATION

### Environment & Dependencies
- [ ] `backend/.env` contains `JWT_SECRET`
- [ ] `backend/.env` contains `JWT_EXPIRY=7d`
- [ ] `backend/package.json` contains `bcryptjs`
- [ ] `backend/package.json` contains `jsonwebtoken`
- [ ] Run: `npm install` was successful
- [ ] No npm errors in terminal

### Files Created
- [ ] `backend/model/UserModel.js` exists (60 lines)
- [ ] `backend/controller/AuthController.js` exists (120 lines)
- [ ] `backend/middleware/AuthMiddleware.js` exists (30 lines)
- [ ] `backend/routes/AuthRoutes.js` exists (15 lines)
- [ ] File sizes reasonable (check with `ls -la`)

### Server Status
- [ ] Run: `npm start` in backend folder
- [ ] Console shows: "Backend server running on port 3002"
- [ ] Console shows: "MongoDB connected"
- [ ] No error messages
- [ ] Server remains running

---

## 2️⃣ CODE INTEGRATION VERIFICATION

### backend/index.js Modifications
- [ ] AuthRoutes imported: `const AuthRoutes = require("./routes/AuthRoutes");`
- [ ] authMiddleware imported: `const { authMiddleware } = require("./middleware/AuthMiddleware");`
- [ ] Auth routes used: `app.use("/auth", AuthRoutes);`
- [ ] /newOrder protected: `app.post("/newOrder", authMiddleware, async(req,res)=>...`
- [ ] /sellOrder protected: `app.post("/sellOrder", authMiddleware, async(req,res)=>...`

### No Syntax Errors
- [ ] No red squiggly lines in VS Code
- [ ] `npm start` doesn't show compilation errors
- [ ] No TypeErrors in console on startup

---

## 3️⃣ API ENDPOINT VERIFICATION

### Test Signup Endpoint
```bash
# Run this command in PowerShell/Terminal:
curl -X POST http://localhost:3002/auth/signup `
  -H "Content-Type: application/json" `
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123",
    "confirmPassword": "TestPass123"
  }'

Expected Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbG...",
  "user": { "id": "...", "name": "Test User", "email": "test@example.com" }
}

- [ ] Status Code: 201
- [ ] Response has "token"
- [ ] Response has "user" object
- [ ] No password in response
```

### Test Login Endpoint
```bash
# Run this command:
curl -X POST http://localhost:3002/auth/login `
  -H "Content-Type: application/json" `
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'

Expected Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbG...",
  "user": { ... }
}

- [ ] Status Code: 200
- [ ] Response has valid JWT token
- [ ] Token is different from signup token
- [ ] Can log in multiple times
```

### Test Protected Me Endpoint
```bash
# Copy token from login response, then run:
curl -X GET http://localhost:3002/auth/me `
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

Expected Response:
{
  "success": true,
  "user": { "id": "...", "name": "Test User", "email": "test@example.com" }
}

- [ ] Status Code: 200 (with valid token)
- [ ] Status Code: 401 (without token)
- [ ] Status Code: 401 (with invalid token)
- [ ] User data returned correctly
```

### Test Buy Order with Token
```bash
# Run this command with valid token:
curl -X POST http://localhost:3002/newOrder `
  -H "Authorization: Bearer YOUR_TOKEN_HERE" `
  -H "Content-Type: application/json" `
  -d '{
    "name": "TCS",
    "qty": 5,
    "price": 3500,
    "mode": "BUY"
  }'

- [ ] Status Code: 201 (with valid token)
- [ ] Status Code: 401 (without token)
- [ ] Order saved to database
- [ ] Holdings updated
- [ ] Positions updated
```

---

## 4️⃣ SECURITY VERIFICATION

### Password Security
- [ ] Passwords are hashed in database
- [ ] Test: Check MongoDB → users collection
- [ ] Password field starts with `$2b$` (bcrypt hash)
- [ ] Plain password never returned from API

### JWT Token Security
- [ ] Token has 3 parts separated by dots: `part1.part2.part3`
- [ ] Token expiry is set to 7 days
- [ ] Test: Wait 1 second, token should be different each generation
- [ ] Old tokens don't work after logout/new login

### Endpoint Protection
- [ ] POST /newOrder fails without token
- [ ] POST /sellOrder fails without token
- [ ] GET /auth/me fails without token
- [ ] GET /allHoldings works without token
- [ ] GET /allPositions works without token

---

## 5️⃣ DATABASE VERIFICATION

### User Collection Created
```bash
# In MongoDB Atlas or local MongoDB:
- [ ] Database: (your_db_name)
- [ ] Collection: users exists
- [ ] User documents have: _id, name, email, password, createdAt
- [ ] Password is hashed (not readable)
```

### Data Persistence
```bash
- [ ] After signup, user appears in users collection
- [ ] After login, same user retrieved from database
- [ ] User email is unique (can't register twice)
- [ ] After buy/sell, Holdings updated
- [ ] After buy/sell, Positions updated
```

---

## 6️⃣ ERROR HANDLING VERIFICATION

### Invalid Inputs
- [ ] Signing up with no email returns error
- [ ] Signing up with no password returns error
- [ ] Signing up with mismatched passwords returns error
- [ ] Logging in with wrong password returns 401

### Duplicate Email
- [ ] Signing up with existing email returns error
- [ ] Error message: "Email already in use"

### Invalid Tokens
- [ ] Expired token returns 401
- [ ] Malformed token returns 401
- [ ] Wrong JWT_SECRET would reject token

---

## 7️⃣ DOCUMENTATION VERIFICATION

### Files Exist
- [ ] `AUTHENTICATION_COMPLETE.md` readable
- [ ] `AUTH_GUIDE.md` readable
- [ ] `QUICK_REFERENCE.md` readable
- [ ] `INSTALLATION.md` readable
- [ ] `PROJECT_STRUCTURE.md` readable

### Documentation Quality
- [ ] All examples are runnable
- [ ] All endpoints documented
- [ ] Error cases explained
- [ ] Frontend integration examples provided
- [ ] Troubleshooting section available

---

## 8️⃣ FRONTEND INTEGRATION (OPTIONAL)

### Token Storage
- [ ] Frontend stores token in localStorage after login
- [ ] Token retrieved from localStorage on page reload
- [ ] Token cleared on logout

### Auth Header
- [ ] BuyActionWindow includes `Authorization: Bearer {token}`
- [ ] SellActionWindow includes `Authorization: Bearer {token}`
- [ ] Other protected endpoints include auth header

### Error Handling
- [ ] 401 errors trigger re-login
- [ ] Expired tokens show error message
- [ ] Invalid tokens show error message

---

## 🎯 QUICK TEST SEQUENCE

Follow this order to verify everything works:

### 1. Start Backend
```
cd backend
npm start
✅ Confirm: "Backend server running on port 3002"
```

### 2. Test Signup
```
Use curl command from Section 3.1
✅ Confirm: Status 201, got token
```

### 3. Test Login
```
Use curl command from Section 3.2
✅ Confirm: Status 200, got new token
```

### 4. Test Protected Endpoint
```
Use curl command from Section 3.3 with token
✅ Confirm: Status 200, got user data
✅ Confirm: Status 401 without token
```

### 5. Test Buy Order
```
Use curl command from Section 3.4 with token
✅ Confirm: Status 201
✅ Confirm: Order in database
```

### 6. Verify Database
```
Check MongoDB collections
✅ Confirm: User saved
✅ Confirm: Order saved
✅ Confirm: Holdings updated
✅ Confirm: Positions updated
```

---

## 📋 FINAL CHECKLIST

```
CRITICAL ITEMS:
✅ [ ] Backend runs without errors
✅ [ ] MongoDB is connected
✅ [ ] Auth routes are loaded
✅ [ ] Signup endpoint works
✅ [ ] Login endpoint works
✅ [ ] Protected endpoints require token
✅ [ ] Passwords are hashed
✅ [ ] JWT tokens are valid
✅ [ ] Documentation is complete

IMPORTANT ITEMS:
✅ [ ] Error handling works
✅ [ ] Database persists data
✅ [ ] Token expiry works
✅ [ ] Email uniqueness enforced
✅ [ ] Buy/Sell operations work with token

OPTIONAL ITEMS:
✅ [ ] Frontend integration started
✅ [ ] Logout functionality added
✅ [ ] Token refresh implemented
✅ [ ] Rate limiting configured
✅ [ ] HTTPS enabled
```

---

## 🚨 TROUBLESHOOTING

### Issue: Dependencies not installing
```
Solution:
cd backend
rm -r node_modules package-lock.json
npm install
```

### Issue: MongoDB connection failing
```
Solution:
1. Check .env MONGO_URL
2. Verify MongoDB is running
3. Check connection string format
```

### Issue: Port 3002 already in use
```
Solution:
1. Kill existing process on port 3002
2. Or change PORT in .env
```

### Issue: JWT token not working
```
Solution:
1. Check JWT_SECRET in .env
2. Verify token format: Bearer eyJhbG...
3. Check token expiry
```

### Issue: Signup returning error
```
Solution:
1. Check email format is valid
2. Verify passwords match
3. Ensure email not already registered
```

---

## 📞 VERIFICATION SUPPORT

If something doesn't work:

1. **Check Error Message** - Read the exact error from terminal
2. **Review Logs** - Backend console shows helpful error details
3. **Verify Files** - Ensure all 5 files exist and have content
4. **Check Dependencies** - Run `npm list bcryptjs jsonwebtoken`
5. **Read Documentation** - Answer in INSTALLATION.md troubleshooting

---

## ✅ SUCCESS INDICATORS

You'll know everything is working when:

✅ Signup returns token
✅ Login returns token  
✅ /auth/me works with token
✅ /newOrder works with token
✅ /sellOrder works with token
✅ Without token, returns 401
✅ Data persists in MongoDB
✅ No console errors

---

## 🎉 YOU'RE DONE!

Once all checks pass, your JWT authentication is:
- ✅ Fully functional
- ✅ Secure and production-ready
- ✅ Ready for frontend integration

**Congratulations! 🚀**

---

**Last Updated:** April 14, 2026
**Status:** Ready to Verify ✅
**Time to Verify:** ~15 minutes
