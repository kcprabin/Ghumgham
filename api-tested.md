# API Documentation

## Base URLs
- **Auth Service**: `http://localhost:3000/api/v1`
- **Hotel Service**: `http://localhost:3001/api/v1`

---

## 📋 Table of Contents
1. [Authentication APIs](#authentication-apis)
2. [Hotel Management APIs](#hotel-management-apis)
3. [Authentication Details](#authentication-details)
4. [Status Codes](#status-codes)

---

## Authentication APIs

### 1️⃣ User Registration
**Endpoint:** `POST {{base_url}}/users/register`

**Description:** Create a new user account with email and password

**Request Body:**
```json
{
    "Username": "kcprabin",
    "password": "12345678",
    "email": "prabin@gmail.com",
    "Name": "Prabin Kumar"
}
```

**Validation Rules:**
- `Username`: Min 3 characters, alphanumeric + underscore only
- `password`: Min 6 characters
- `email`: Valid email format
- `Name`: Min 2 characters

**Success Response (201):**
```json
{
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
        "id": "507f1f77bcf86cd799439011",
        "Username": "kcprabin",
        "email": "prabin@gmail.com",
        "Name": "Prabin Kumar",
        "role": "user"
    }
}
```

**Error Responses:**
- `400` - Username already exists
- `400` - Validation errors (see response for details)
- `500` - Server error

---

### 2️⃣ User Login
**Endpoint:** `POST {{base_url}}/users/login`

**Description:** Authenticate user and receive JWT token

**Request Body:**
```json
{
    "Username": "kcprabin",
    "password": "12345678"
}
```

**Success Response (200):**
```json
{
    "success": true,
    "statusCode": 200,
    "message": "User logged in successfully",
    "data": {
        "id": "507f1f77bcf86cd799439011",
        "Username": "kcprabin",
        "role": "user"
    }
}
```

**Headers Set:**
- `Authorization: Bearer <jwt_token>`
- `Set-Cookie: token=<jwt_token>; HttpOnly; Secure; SameSite=Strict; Max-Age=86400000`

**Error Responses:**
- `400` - Invalid username or password
- `400` - Validation errors
- `500` - Server error

---

### 3️⃣ User Logout
**Endpoint:** `POST {{base_url}}/users/logout`

**Description:** Invalidate user session by clearing authentication token

**Authentication:** Required (Bearer Token or Cookie)

**Request Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response (200):**
```json
{
    "success": true,
    "statusCode": 200,
    "message": "User logged out successfully"
}
```

**Cookies Cleared:**
- `token` → cleared
- `Authorization` header → cleared

**Error Responses:**
- `401` - Unauthorized (no valid token)
- `500` - Server error

---

### 4️⃣ Google OAuth Authentication
**Endpoint:** `GET {{base_url}}/users/auth/google`

**Description:** Redirect to Google login page for OAuth authentication

**Callback:** `GET {{base_url}}/users/auth/google/callback`

**Scope Requested:**
- `profile` - User profile information
- `email` - User email address

**Success Response:**
- Redirects to frontend with JWT token in Authorization header
- Sets httpOnly cookie with token

**Error Response:**
- `302` Redirect to `/login` on failure

---

## Hotel Management APIs

### 1️⃣ Register Hotel
**Endpoint:** `POST {{base_url}}/hotels/register`

**Authentication:** Required (Verified User)

**Description:** Register a new hotel property

**Request Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "hotelName": "Grand Hotel",
    "description": "Luxury 5-star hotel in downtown",
    "location": "New York, NY",
    "city": "New York",
    "address": "123 Main Street",
    "phone": "+1234567890",
    "amenities": ["WiFi", "Pool", "Gym", "Restaurant"],
    "priceRange": "$$$$",
    "checkInTime": "15:00",
    "checkOutTime": "11:00"
}
```

**Validation Requirements:**
- User must be authenticated (have valid JWT)
- User must be verified (`isVerified: true`)
- All required hotel fields must be provided

**Success Response (201):**
```json
{
    "success": true,
    "statusCode": 201,
    "message": "Hotel registered successfully",
    "data": {
        "_id": "507f1f77bcf86cd799439012",
        "hotelName": "Grand Hotel",
        "userId": "507f1f77bcf86cd799439011",
        "description": "Luxury 5-star hotel in downtown",
        "location": "New York, NY",
        "rooms": [],
        "createdAt": "2024-02-22T10:30:00Z",
        "updatedAt": "2024-02-22T10:30:00Z"
    }
}
```

**Error Responses:**
- `401` - Unauthorized (no valid token)
- `401` - User not verified
- `400` - Validation errors
- `500` - Server error

---

### 2️⃣ Create Hotel Room
**Endpoint:** `POST {{base_url}}/hotels/room/:hotelId`

**Authentication:** Required (Verified User)

**Description:** Add a new room to an existing hotel

**Path Parameters:**
```
hotelId: 507f1f77bcf86cd799439012
```

**Request Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "roomNumber": "301",
    "roomType": "Deluxe",
    "pricePerNight": 150,
    "suitetype": "King Bed"
}
```

**Room Type Examples:** Single, Double, Deluxe, Suite, Presidential

**Success Response (201):**
```json
{
    "success": true,
    "statusCode": 201,
    "message": "Room created successfully",
    "data": {
        "_id": "507f1f77bcf86cd799439013",
        "roomNumber": "301",
        "roomType": "Deluxe",
        "pricePerNight": 150,
        "suitetype": "King Bed",
        "isAvailable": true
    }
}
```

**Error Responses:**
- `401` - Unauthorized
- `404` - Hotel not found
- `400` - Validation errors
- `500` - Server error

---

### 3️⃣ Delete Hotel Room
**Endpoint:** `DELETE {{base_url}}/hotels/room/:hotelId/:roomId`

**Authentication:** Required (Verified User with Password Verification)

**Description:** Remove a room from hotel (requires password confirmation for security)

**Path Parameters:**
```
hotelId: 507f1f77bcf86cd799439012
roomId: 507f1f77bcf86cd799439013
```

**Request Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
    "password": "12345678"
}
```

**Middleware Chain:**
1. `roleMiddleware` - Verifies JWT token
2. `passwordCheck` - Verifies password

**Success Response (200):**
```json
{
    "success": true,
    "statusCode": 200,
    "message": "Room deleted successfully"
}
```

**Error Responses:**
- `401` - Unauthorized
- `401` - Invalid or incorrect password
- `404` - Hotel not found
- `404` - Room not found
- `500` - Server error

---

## Authentication Details

### JWT Token Structure
```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "id": "507f1f77bcf86cd799439011",
  "email": "prabin@gmail.com",
  "role": "user",
  "iat": 1708600200,
  "exp": 1708686600
}

Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

### Token Expiration
- **Duration**: 1 day (24 hours)
- **Refresh**: Not implemented (re-login required)

### User Roles
- `user` - Regular user
- `hotelOwner` - Hotel property owner
- `admin` - Administrator
- `superadmin` - Super administrator
- `editor` - Content editor

### Middleware Functions

**roleMiddleware**
- Validates JWT token from Bearer header or cookie
- Checks if user is verified
- Passes user object to next handler

**passwordCheck**
- Validates password against user's stored password hash
- Used for sensitive operations (delete, update)
- Must be chained after roleMiddleware

---

## Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| `200` | OK | Login, logout, read resources |
| `201` | Created | Register user/hotel, create room |
| `400` | Bad Request | Validation errors, duplicate username |
| `401` | Unauthorized | Missing/invalid token, unverified user |
| `403` | Forbidden | Insufficient permissions |
| `404` | Not Found | Hotel/room doesn't exist |
| `500` | Server Error | Database errors, unexpected errors |

---

## Common Error Response Format

```json
{
    "success": false,
    "statusCode": 400,
    "message": "Validation Error",
    "errors": [
        {
            "field": "Username",
            "message": "Username must be at least 3 characters long"
        },
        {
            "field": "password",
            "message": "Password must be at least 6 characters long"
        }
    ]
}
```

---

## Testing Tips

1. **Use Postman** - Import and test each endpoint
2. **Store tokens** - Save JWT from login response for authenticated requests
3. **Use environment variables** - Set `base_url`, `token`, `hotelId` as variables
4. **Test order** - Register → Login → Create Hotel → Create Room → Delete Room → Logout
5. **Check headers** - Verify `Authorization` header is sent for protected endpoints











 