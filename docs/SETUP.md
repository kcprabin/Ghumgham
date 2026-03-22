# Setup & Installation Guide

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Docker & Docker Compose** (optional, for backend) ([Download](https://www.docker.com/products/docker-desktop))

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/kcprabin/Travallee.git
cd Travallee
```

### 2. Install Root Dependencies (Optional)

```bash
npm install
```

## Admin Frontend Setup

### Step 1: Navigate to Admin Frontend

```bash
cd Admin-Frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File

```bash
# Create .env file (optional)
echo "VITE_API_BASE_URL=http://localhost:4000/api/v1" > .env
```

### Step 4: Start Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173**

### Step 5: Login with Demo Credentials

| Email | Password |
|-------|----------|
| admin@travallee.com | admin123 |
| manager@travallee.com | manager123 |
| test@example.com | test123 |

### Production Build

```bash
npm run build
npm run preview
```

## Mobile App Setup (Travallee)

### Prerequisites
- Install **Expo Go** on your phone
- Same network as development computer

### Step 1: Navigate to App

```bash
cd ../Travallee-App
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File

```bash
# Copy sample env
cp .env.sample .env

# Update with your computer's IP
# Replace COMPUTER_IP with: ifconfig (Mac/Linux) or ipconfig (Windows)
```

**.env**
```env
API_BASE_URL=http://COMPUTER_IP:4000/api/v1
```

### Step 4: Start Expo

```bash
npm start
```

### Step 5: Scan QR Code

- Open **Expo Go** on your phone
- Scan QR code from terminal
- App will load in seconds

## Backend Services Setup

### Option 1: Docker Compose (Recommended)

```bash
cd ../Travallee-Backend

# Create environment files for each service
# (See Travallee-Backend/README.md for details)

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f auth    # View specific service
docker-compose logs -f         # View all services

# Stop services
docker-compose down
```

### Option 2: Manual Setup

```bash
cd Travallee-Backend/Services/Auth

npm install

# Create .env file
cp .env.sample .env

# Update .env with your configuration
nano .env

# Start service
npm run dev
```

Repeat for each service:
- Auth
- Hotel
- Booking
- Admin
- Notifications
- Payments

## Verification Checklist

After setup, verify everything works:

- [ ] Admin Dashboard loads at localhost:5173
- [ ] Can login with demo credentials
- [ ] Dashboard displays sample data
- [ ] Can navigate to different pages
- [ ] API calls work (check browser console for errors)
- [ ] Backend services running (if using Docker)

## Troubleshooting

### Port Already in Use

```bash
# Find process using port 5173
lsof -i :5173    # Mac/Linux
netstat -ano | findstr :5173  # Windows

# Kill process
kill -9 <PID>    # Mac/Linux
taskkill /PID <PID> /F  # Windows
```

### Module Not Found Error

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Loading

```bash
# Ensure .env file exists in correct location
# For Vite, variables must start with VITE_
# Example: VITE_API_BASE_URL=...

# Restart dev server after creating .env
```

### CORS Issues

The backend should have CORS enabled. Check:
```javascript
// In backend server
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

### Docker Issues

```bash
# Check Docker is running
docker --version

# Rebuild images
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Check service logs
docker-compose logs <service-name>
```

## Next Steps

1. **Read Documentation**
   - [Architecture Guide](ARCHITECTURE.md)
   - [Contributing Guidelines](../CONTRIBUTING.md)

2. **Explore the Code**
   - Check the component structure in `Admin-Frontend/src`
   - Review API services in `Admin-Frontend/src/services`

3. **Make Your Changes**
   - Create a feature branch
   - Follow commit conventions
   - Submit a pull request

4. **Deploy** (Coming Soon)
   - Frontend to Vercel/Netlify
   - Backend to Render/Railway
   - Mobile app to Expo

## Getting Help

- 📖 Check [README.md](../README.md)
- 💬 Open GitHub Discussions
- 🐛 Report bugs with issue template
- Email: kcprabin2063@gmail.com

---

**Happy coding! 🚀**
