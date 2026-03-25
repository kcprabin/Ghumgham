# Admin Dashboard - Travallee Hotel Management System

A modern, responsive React TypeScript admin dashboard for managing hotel operations including guests, rooms, bookings, payments, reviews, and promotions.

## 🎯 Features

- 📊 **Real-time Dashboard** - KPIs, analytics, and business metrics
- 👥 **Guest Management** - Comprehensive guest profiles and booking history
- 🏠 **Room Management** - Inventory tracking and occupancy status
- 💰 **Revenue Analytics** - Payment tracking and vendor payouts
- ⭐ **Reviews Management** - Customer feedback and ratings
- 📅 **Booking Management** - Reservations and check-in/check-out
- 💳 **Deal Management** - Promotions and special offers

## 💻 Technology Stack

- **React 19.2** with TypeScript 5.9
- **Vite 8.0** for ultra-fast development
- **Tailwind CSS 3.4** for styling
- **React Router v6** for navigation
- **ESLint + Prettier** for code quality

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Card, Modal, etc.)
│   └── layout/          # Layout components (Sidebar, Topbar, PageWrapper)
├── pages/               # Page components (Dashboard, Guests, Rooms, etc.)
├── routes/              # Application routing configuration
├── hooks/               # Custom React hooks (useAuth, useModal, usePagination)
├── services/            # API integration layer
├── types/               # TypeScript interfaces and types
├── data/                # Mock data for development
├── utils/               # Helper functions
└── main.tsx             # Application entry point
```

## 🚀 Quick Start

### Option 1: Development Mode (Recommended)
```bash
npm install
npm run dev
```
App opens at **http://localhost:5173**

### Option 2: With Local Backend
```bash
# Terminal 1: Start backend
cd ../Travallee-Backend
docker-compose up -d

# Terminal 2: Start frontend
cd ../Admin-Frontend
npm install
npm run dev
```

### Option 3: Production Build
```bash
npm install
npm run build    # Creates optimized dist/ folder
npm run preview  # Preview production build locally
```

## 🔐 Demo Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@travallee.com | admin123 | Admin |
| manager@travallee.com | manager123 | Manager |
| test@example.com | test123 | Test |

*Note: In demo mode, any non-empty credentials work*

## 📝 Environment Variables

Create `.env` file in the root directory:

```env
# Backend API configuration
VITE_API_BASE_URL=http://localhost:4000/api/v1
VITE_AUTH_SERVICE_URL=http://localhost:3000/api/v1
VITE_ADMIN_SERVICE_URL=http://localhost:4001/api/v1
VITE_BOOKING_SERVICE_URL=http://localhost:5002/api/v1
VITE_HOTEL_SERVICE_URL=http://localhost:5003/api/v1

# App Configuration
VITE_APP_NAME=Travallee
VITE_APP_VERSION=0.1.0
VITE_API_TIMEOUT=10000

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_MOCK_API=true
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server with HMR

# Building
npm run build            # Production build
npm run preview          # Preview production build
npm run build:watch      # Watch mode build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run format           # Format with Prettier
npm run type-check       # TypeScript validation

# Testing
npm run test             # Run tests
npm run test:watch       # Watch mode tests
npm run test:coverage    # Coverage report
```

## 🧪 Mock Data

The application comes with pre-loaded sample data for development:
- **10 Guests** with various statuses
- **8 Rooms** across 5 floors
- **4 Active Deals** and promotions
- **6 Vendors** for payments
- **5 Customer Reviews** with ratings

Data is managed through `src/data/mock.ts` and API services in `src/services/api.ts`.

## 🎨 Styling & Components

All styling uses **Tailwind CSS**. Key design tokens:

- **Primary Color:** Blue (#4285F4)
- **Font Family:** Plus Jakarta Sans
- **Breakpoints:** Mobile-first responsive design
- **Component System:** 6+ reusable UI components

### Component Reference

- `<Button />` - Primary, outline, ghost variants
- `<Card />` - Rounded container with shadow
- `<Modal />` - Dialog overlay with backdrop
- `<Drawer />` - Side panel (used for guest details)
- `<Input />` & `<Select />` - Form controls
- `<Badge />` - Status labels with color coding
- `<Pagination />` - Page navigation
- `<Stars />` - Rating display

## 🔗 API Integration

API calls are handled in `src/services/api.ts`:

```typescript
// Services available
getGuests()                    // Fetch guest list
getRooms()                     // Fetch room inventory
getDeals()                     // Fetch active deals
getVendors()                   // Fetch vendor list
getReviews()                   // Fetch reviews

// Mutations
updateVendorStatus(id, status)
addVendor(vendor)
addDeal(deal)
```

## 🧩 Custom Hooks

### useAuth
```typescript
const { isLoggedIn, login, logout, user } = useAuth();
login(email, password);
logout();
```

### useModal
```typescript
const { isOpen, open, close } = useModal();
```

### usePagination
```typescript
const { page, totalPages, nextPage, prevPage, setPage } = usePagination({
  totalItems: 100,
  pageSize: 10
});
```

## 📦 Dependencies

Main dependencies:
- `react` - UI library
- `react-router-dom` - Client routing
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS
- `vite` - Build tool

See `package.json` for complete list.

## 🐛 Troubleshooting

### Port 5173 Already in Use
```bash
# Use different port
npm run dev -- --port 5174
```

### Build Fails
```bash
# Clear build cache
rm -rf node_modules dist
npm install
npm run build
```

### Styling Issues
```bash
# Ensure Tailwind CSS is properly initialized
npm run build -- --mode development
```

## 📚 Documentation

- [Admin-Frontend/SETUP.md](./SETUP.md) - Detailed setup guide
- [Architecture Guide](../docs/ARCHITECTURE.md) - System architecture
- [Contributing Guidelines](../CONTRIBUTING.md) - How to contribute

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint:fix`
4. Submit a pull request

## 📄 License

MIT - See [LICENSE](../LICENSE) file
