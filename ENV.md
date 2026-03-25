# Environment Variables Guide

Comprehensive guide to configuring environment variables for all services in the Travallee Hotel Management System.

## Table of Contents

1. [Admin Frontend](#admin-frontend)
2. [User Frontend](#user-frontend)
3. [Mobile App](#mobile-app)
4. [Auth Service](#auth-service)
5. [Admin Service](#admin-service)
6. [Booking Service](#booking-service)
7. [Hotel Service](#hotel-service)
8. [Notification Service](#notification-service)
9. [Payment Service](#payment-service)
10. [Development vs Production](#development-vs-production)

---

## Admin Frontend

**Location:** `Admin-Frontend/.env`

```env
# ===== API CONFIGURATION =====
# Base API endpoint (used as default)
VITE_API_BASE_URL=http://localhost:4000/api/v1

# Service-specific endpoints (optional, overrides base URL for specific services)
VITE_AUTH_SERVICE_URL=http://localhost:3000/api/v1
VITE_ADMIN_SERVICE_URL=http://localhost:4001/api/v1
VITE_BOOKING_SERVICE_URL=http://localhost:5002/api/v1
VITE_HOTEL_SERVICE_URL=http://localhost:5003/api/v1

# ===== APP CONFIGURATION =====
# Application metadata
VITE_APP_NAME=Travallee
VITE_APP_VERSION=0.1.0
VITE_ENVIRONMENT=development

# ===== FEATURE FLAGS =====
# Use mock data instead of real API (set to false in production)
VITE_MOCK_API=true

# Additional features
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_DARK_MODE=true

# ===== DEVELOPMENT =====
# Request timeout in milliseconds
VITE_API_TIMEOUT=10000

# Enable debug logging
VITE_DEBUG=false

# CORS settings
VITE_CORS_ORIGIN=http://localhost:5173
```

### Development Setup
```bash
cd Admin-Frontend
cat > .env << 'EOF'
VITE_API_BASE_URL=http://localhost:4000/api/v1
VITE_MOCK_API=true
VITE_DEBUG=true
VITE_APP_NAME=Travallee
EOF
```

### Production Setup
```bash
cat > .env.production << 'EOF'
VITE_API_BASE_URL=https://api.travallee.com/api/v1
VITE_MOCK_API=false
VITE_DEBUG=false
VITE_APP_NAME=Travallee
EOF
```

---

## User Frontend

**Location:** `User-Frontend/.env`

```env
# ===== API CONFIGURATION =====
VITE_API_BASE_URL=http://localhost:4000/api/v1
VITE_AUTH_SERVICE_URL=http://localhost:3000/api/v1
VITE_HOTEL_SERVICE_URL=http://localhost:5003/api/v1
VITE_BOOKING_SERVICE_URL=http://localhost:5002/api/v1

# ===== APP CONFIGURATION =====
VITE_APP_NAME=Travallee
VITE_MOCK_API=true

# ===== FEATURE FLAGS =====
VITE_ENABLE_PAYMENTS=true
VITE_ENABLE_REVIEWS=true
VITE_API_TIMEOUT=10000
```

---

## Mobile App

**Location:** `Travallee-App/.env`

```env
# ===== CRITICAL: Computer IP Address =====
# Replace 192.168.1.100 with your actual IP
# Find it with: ifconfig (Mac/Linux) or ipconfig (Windows)
# Must be the SAME network as your development machine
COMPUTER_IP=192.168.1.100

# ===== API CONFIGURATION =====
# Use http (not https) for local development
API_BASE_URL=http://192.168.1.100:4000/api/v1
AUTH_SERVICE_URL=http://192.168.1.100:3000/api/v1
BOOKING_SERVICE_URL=http://192.168.1.100:5002/api/v1
HOTEL_SERVICE_URL=http://192.168.1.100:5003/api/v1

# ===== EXPO CONFIGURATION =====
# This is read by Expo and must be prefixed
EXPO_PUBLIC_API_URL=http://192.168.1.100:4000/api/v1
EXPO_PUBLIC_BOOKING_URL=http://192.168.1.100:5002/api/v1

# ===== APP CONFIGURATION =====
APP_NAME=Travallee
APP_VERSION=0.1.0
ENVIRONMENT=development

# ===== FEATURE FLAGS =====
ENABLE_PUSH_NOTIFICATIONS=true
ENABLE_LOCATION_SERVICES=true
MOCK_API=false

# ===== APP CONFIG (from app.config.js) =====
EXPO_ACCOUNT_OWNER=your-username
EAS_PROJECT_ID=your-project-id
```

### Setup for Physical Device
```bash
cd Travallee-App

# Get your computer's IP
ifconfig | grep "inet " | grep -v 127.0.0.1
# Example output: inet 192.168.1.100

# Create .env with your IP
cat > .env << 'EOF'
COMPUTER_IP=192.168.1.100
API_BASE_URL=http://192.168.1.100:4000/api/v1
EXPO_PUBLIC_API_URL=http://192.168.1.100:4000/api/v1
ENABLE_PUSH_NOTIFICATIONS=true
EOF

# Start Expo
npm start

# On phone: Open Expo Go app and scan QR code
```

### Setup for Emulator/Simulator
```bash
# Emulator/Simulator can reach host via localhost
cat > .env << 'EOF'
API_BASE_URL=http://localhost:4000/api/v1
EXPO_PUBLIC_API_URL=http://localhost:4000/api/v1
EOF
```

---

## Auth Service

**Location:** `Travallee-Backend/Services/Auth/.env`

```env
# ===== SERVER =====
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug

# ===== DATABASE =====
# MongoDB example
DB_URI=mongodb://mongodb:27017/travallee
DB_NAME=travallee
DB_USER=
DB_PASSWORD=

# Alternatively, use SQL
# DB_TYPE=postgres
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=travallee_user
# DB_PASSWORD=secure_password
# DB_NAME=travallee_db

# ===== JWT CONFIGURATION =====
# Secret key for signing tokens (use strong random value)
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=24h
JWT_REFRESH_SECRET=your-super-secret-refresh-token-key
JWT_REFRESH_EXPIRE=7d

# ===== EMAIL CONFIGURATION =====
# For password reset emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@travallee.com

# ===== SECURITY =====
BCRYPT_ROUNDS=10
PASSWORD_MIN_LENGTH=8
ALLOW_REGISTRATION=true

# ===== CORS =====
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
CORS_CREDENTIALS=true

# ===== EXTERNAL SERVICES =====
# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

---

## Admin Service

**Location:** `Travallee-Backend/Services/admin/.env`

```env
# ===== SERVER =====
NODE_ENV=development
PORT=4001
LOG_LEVEL=debug

# ===== DATABASE =====
DB_URI=mongodb://mongodb:27017/travallee_admin
DB_NAME=travallee_admin

# ===== SERVICE COMMUNICATION =====
# Internal service URLs (for inter-service calls)
AUTH_SERVICE_URL=http://auth:3000/api/v1
BOOKING_SERVICE_URL=http://bookings:5002/api/v1
HOTEL_SERVICE_URL=http://hotel:5003/api/v1

# ===== JWT =====
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# ===== CORS =====
CORS_ORIGIN=http://localhost:5173,http://localhost:5174

# ===== FEATURES =====
ENABLE_AUDIT_LOGGING=true
ENABLE_ROLE_BASED_ACCESS=true
```

---

## Booking Service

**Location:** `Travallee-Backend/Services/booking/.env`

```env
# ===== SERVER =====
NODE_ENV=development
PORT=5002
LOG_LEVEL=debug

# ===== DATABASE =====
DB_URI=mongodb://mongodb:27017/travallee_bookings
DB_NAME=travallee_bookings

# ===== SERVICE COMMUNICATION =====
AUTH_SERVICE_URL=http://auth:3000/api/v1
HOTEL_SERVICE_URL=http://hotel:5003/api/v1
PAYMENT_SERVICE_URL=http://payments:5004/api/v1

# ===== CACHE (Redis) =====
# Optional: For caching availability, rates, etc.
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
CACHE_TTL=3600

# ===== JWT =====
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# ===== BOOKING RULES =====
# Advance booking allowed (days)
MAX_ADVANCE_BOOKING=365

# Minimum stay (nights)
MIN_STAY_NIGHTS=1

# Cancellation policy
REFUND_PERCENTAGE=100
CANCELLATION_HOURS_BEFORE=24

# ===== CORS =====
CORS_ORIGIN=http://localhost:5173,http://localhost:5174,http://localhost:19006
```

---

## Hotel Service

**Location:** `Travallee-Backend/Services/Hotel/.env`

```env
# ===== SERVER =====
NODE_ENV=development
PORT=5003
LOG_LEVEL=debug

# ===== DATABASE =====
DB_URI=mongodb://mongodb:27017/travallee_hotel
DB_NAME=travallee_hotel

# ===== SERVICE COMMUNICATION =====
AUTH_SERVICE_URL=http://auth:3000/api/v1
BOOKING_SERVICE_URL=http://bookings:5002/api/v1

# ===== CACHE =====
REDIS_HOST=redis
REDIS_PORT=6379
CACHE_TTL=3600

# ===== JWT =====
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# ===== FEATURES =====
ENABLE_ROOM_PRICING=true
ENABLE_OCCUPANCY_TRACKING=true
ENABLE_SEASONAL_PRICING=true

# ===== CORS =====
CORS_ORIGIN=http://localhost:5173,http://localhost:5174
```

---

## Notification Service

**Location:** `Travallee-Backend/Services/notifications/.env`

```env
# ===== SERVER =====
NODE_ENV=development
PORT=5005
LOG_LEVEL=debug

# ===== DATABASE =====
DB_URI=mongodb://mongodb:27017/travallee_notifications
DB_NAME=travallee_notifications

# ===== EMAIL =====
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=notifications@travallee.com

# ===== SMS =====
# Twilio example
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

# ===== PUSH NOTIFICATIONS =====
# Firebase Cloud Messaging
FCM_PROJECT_ID=your-firebase-project-id
FCM_PRIVATE_KEY_ID=your-key-id
FCM_PRIVATE_KEY=your-private-key
FCM_CLIENT_EMAIL=firebase@your-project.iam.gserviceaccount.com

# ===== NOTIFICATION TEMPLATES =====
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_SMS_NOTIFICATIONS=false
ENABLE_PUSH_NOTIFICATIONS=true

# ===== QUEUE =====
# Message queue for async notifications
QUEUE_HOST=rabbitmq
QUEUE_PORT=5672
QUEUE_USER=guest
QUEUE_PASSWORD=guest
```

---

## Payment Service

**Location:** `Travallee-Backend/Services/payments/.env`

```env
# ===== SERVER =====
NODE_ENV=development
PORT=5004
LOG_LEVEL=debug

# ===== DATABASE =====
DB_URI=mongodb://mongodb:27017/travallee_payments
DB_NAME=travallee_payments

# ===== STRIPE =====
STRIPE_PUBLIC_KEY=pk_test_your_public_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# ===== PAYPAL =====
PAYPAL_CLIENT_ID=your-client-id
PAYPAL_CLIENT_SECRET=your-client-secret
PAYPAL_MODE=sandbox

# ===== RAZORPAY =====
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret

# ===== PAYMENT SETTINGS =====
PAYMENT_CURRENCY=USD
ENABLE_INSTALLMENTS=false
TRANSACTION_FEE_PERCENTAGE=2.5

# ===== SECURITY =====
ENCRYPT_PAYMENT_DATA=true
PCI_COMPLIANCE_MODE=true

# ===== JWT =====
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# ===== WEBHOOK =====
WEBHOOK_TIMEOUT=30000
```

---

## Development vs Production

### Environment Selection

**Development (.env)**
```env
NODE_ENV=development
# Mock data enabled
VITE_MOCK_API=true
# Debug logging enabled
DEBUG=*
# Localhost services
API_BASE_URL=http://localhost:4000/api/v1
# CORS allows all
CORS_ORIGIN=*
```

**Staging (.env.staging)**
```env
NODE_ENV=staging
VITE_MOCK_API=false
DEBUG=app:*
API_BASE_URL=https://api-staging.travallee.com/api/v1
CORS_ORIGIN=https://staging.travallee.com
```

**Production (.env.production)**
```env
NODE_ENV=production
VITE_MOCK_API=false
DEBUG=
API_BASE_URL=https://api.travallee.com/api/v1
CORS_ORIGIN=https://travallee.com
JWT_SECRET=<use AWS Secrets Manager or similar>
DB_PASSWORD=<use AWS Secrets Manager or similar>
```

### Switching Environments

**Frontend:**
```bash
npm run build -- --mode production
npm run build -- --mode staging
```

**Backend:**
```bash
NODE_ENV=production node dist/index.js
NODE_ENV=staging node dist/index.js
```

---

## Security Best Practices

1. **Never commit .env files** - Add to `.gitignore`:
   ```
   .env
   .env.local
   .env.*.local
   ```

2. **Use strong secrets** - Generate with:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Rotate secrets regularly** - Especially JWT secrets

4. **Use infrastructure secrets manager** - AWS Secrets Manager, HashiCorp Vault, etc.

5. **Environment-specific secrets** - Different secrets per environment

6. **Validate at startup** - Check all required env vars are present:
   ```javascript
   const requiredVars = ['JWT_SECRET', 'DB_URI', 'API_BASE_URL'];
   requiredVars.forEach(v => {
     if (!process.env[v]) throw new Error(`Missing ${v}`);
   });
   ```

---

## Troubleshooting

### "Cannot connect to API"
- **Check:** API_BASE_URL is correct
- **Check:** Backend services are running
- **Check:** Firewall allows connections
- **Check:** Port numbers are correct

### "JWT_SECRET is undefined"
- **Solution:** Ensure `.env` file exists
- **Solution:** Restart application after editing `.env`
- **Solution:** Check for typos in variable names

### "CORS error"
- **Check:** CORS_ORIGIN includes frontend URL
- **Check:** PREFIX environment variables correctly (EXPO_PUBLIC_ for Expo)

### "AsyncStorage issues" (Mobile)
- **Check:** Await AsyncStorage operations
- **Check:** Use useEffect for storage access
- See [Debugging Guide](debugging.md) for more

---

## Next Steps

- [Admin Frontend Setup](Admin-Frontend/SETUP.md)
- [Backend Setup](Travallee-Backend/README.md)
- [Mobile App Setup](Travallee-App/README.md)
- [Architecture Guide](docs/ARCHITECTURE.md)
