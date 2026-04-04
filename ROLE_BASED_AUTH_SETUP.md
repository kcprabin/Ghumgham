# Role-Based Authentication Setup

## Overview

The Ghumgham application now supports role-based access control with three admin roles:

1. **Super Admin** (`superadmin`) - Full system control
2. **Hotel Admin** (`hotelAdmin`) - Hotel-specific management
3. **User** (`user`) - Guest/User accounts

## Roles and Permissions

### Super Admin (superadmin)
- Access all hotels and their data
- View system-wide analytics and reports
- Manage all hotel admins
- Generate system reports
- Full control over the entire platform

**Frontend:** Admin-Frontend (port 5173)
**Login Route:** `/`
**Dashboard Route:** `/dashboard`

### Hotel Admin (hotelAdmin)
- Manage their own hotel only
- View only their hotel's bookings, rooms, employees, earnings
- Cannot see other hotels' data
- Add and manage hotel employees
- Manage room inventory
- Track earnings and reviews

**Frontend:** HotelAdmin-Frontend (port 5174)
**Login Route:** `/`
**Dashboard Route:** `/dashboard`

### User (user)
- Standard user/guest accounts
- Book hotels
- Leave reviews
- View personal bookings

## Backend Middleware

All role-based middleware is located in:
```
Travallee-Backend/Packages/middleware/role.middleware.ts
```

### Available Middleware Functions

```typescript
// Authenticate token
authenticate: Validates JWT token

// Single role check
checkRole(role): Checks if user has specific role
superAdminMiddleware: Only superadmin access
hotelAdminMiddleware: Only hotelAdmin access

// Multiple roles check
checkRoles(roles[]): Checks if user has any of the roles
superAdminOrHotelAdminMiddleware: Both superadmin and hotelAdmin

// Ownership check
checkOwnership: Verifies user owns the hotel/resource
```

## Implementation Guide

### 1. Protecting Routes

Use middleware in your route handlers:

```typescript
// Only Super Admin
router.get('/hotels', superAdminMiddleware, getAllHotels);

// Only Hotel Admin
router.get('/my-hotel', hotelAdminMiddleware, getMyHotel);

// Both Super Admin and Hotel Admin
router.get('/bookings', superAdminOrHotelAdminMiddleware, getBookings);

// With ownership check
router.get('/hotel/:hotelId', authenticate, checkOwnership, getHotelDetails);
```

### 2. User Model Updates

Added to User schema:
```typescript
role: enum ["user", "admin", "superadmin", "hotelAdmin"]
hotelId: string (ID of the hotel the admin manages)
```

### 3. Backend API Filtering

Make sure backend endpoints filter data based on role:

```typescript
if (req.user.role === 'hotelAdmin') {
  // Only show their hotel's data
  data = await Hotel.find({ _id: req.user.hotelId });
} else if (req.user.role === 'superadmin') {
  // Show all hotels
  data = await Hotel.find();
}
```

## Frontend Login Flow

### Admin-Frontend (Super Admin)
1. User logs in with credentials
2. Backend validates and returns role in JWT token
3. If role is `superadmin`: Redirected to dashboard
4. If role is `hotelAdmin`: Shows error message
5. If other role: Access denied

### HotelAdmin-Frontend (Hotel Admin)
1. User logs in with credentials
2. Backend validates and returns role in JWT token
3. If role is `hotelAdmin`: Redirected to dashboard
4. User sees only their hotel's data
5. Backend filters all requests by `req.user.hotelId`

## Database Schema

### User Document
```json
{
  "_id": "user123",
  "Name": "John Hotel Admin",
  "email": "admin@hotel.com",
  "Username": "hotelAdmin1",
  "role": "hotelAdmin",
  "hotelId": "hotel456",
  "password": "hashed_password",
  "createdAt": "2025-03-27T10:00:00Z"
}
```

## Protected Routes Example

### Super Admin Routes (Admin-Frontend)
```
GET /api/v1/hotels - Get all hotels
GET /api/v1/hotels/:id - Get hotel details
GET /api/v1/analytics - System analytics
```

### Hotel Admin Routes (HotelAdmin-Frontend)
```
GET /api/v1/hotels/my-hotel - Get own hotel
GET /api/v1/hotels/:hotelId/bookings - Get own hotel bookings
GET /api/v1/hotels/:hotelId/rooms - Get own hotel rooms
GET /api/v1/hotels/:hotelId/employees - Get own hotel employees
```

## Deployment

Both frontends should be deployed on different ports or subdomains:

**Admin-Frontend:** `http://admin.ghumgham.com` (Super Admin)
**HotelAdmin-Frontend:** `http://hotels.ghumgham.com` (Hotel Admins)

## Security Best Practices

1. Always validate role in backend before returning data
2. Use `checkOwnership` middleware to verify hotel access
3. Never trust client-side role information
4. Log all admin actions
5. Set appropriate JWT token expiry (default: 7 days)
6. Use HTTPS in production

## Testing

### Create Test Accounts

**Super Admin:**
```
Username: superadmin
Email: super@ghumgham.com
Role: superadmin
```

**Hotel Admin:**
```
Username: hoteladmin1
Email: admin1@hotel.com
Role: hotelAdmin
hotelId: "hotel-id-123"
```

### Test Endpoints

```bash
# Login
curl -X POST http://localhost:3000/api/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{"Username":"hotelAdmin1","password":"password123"}'

# Use returned token
curl -X GET http://localhost:3000/api/v1/hotels/my-hotel \
  -H "Authorization: Bearer <token>"
```

## Environment Variables

Add to backend `.env`:
```
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7D
```

## Troubleshooting

### "Hotel Admins: Please use Hotel Admin Portal"
- User tried to login to Admin-Frontend with hotelAdmin role
- Redirect to HotelAdmin-Frontend instead

### "Access denied: Token verification failed"
- Token may be expired or invalid
- User needs to re-login

### "Forbidden: Access requires hotelAdmin role"
- User doesn't have required role
- May have logged in with wrong portal

## API Response Format

All protected endpoints return:

```json
{
  "success": true/false,
  "statusCode": 200/401/403,
  "data": { ... },
  "message": "Success or error message"
}
```

## Future Enhancements

- [ ] Add permission levels within roles
- [ ] Implement audit logging
- [ ] Add role-based API rate limiting
- [ ] Create admin panel for role management
- [ ] Add session management
- [ ] Implement two-factor authentication
