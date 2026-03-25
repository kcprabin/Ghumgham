# Admin Dashboard - Complete Setup Guide

This guide covers installation, configuration, and usage of the Travallee Hotel Management System Admin Dashboard.

## 📋 Prerequisites

- **Node.js** 18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0 or higher (comes with Node.js) or **yarn** 3.0+
- **Git** ([Download](https://git-scm.com/))
- **Docker** (optional, for backend services) ([Download](https://www.docker.com/))

## 📁 Project Structure

```
Admin-Frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # Base components: Button, Card, Modal, etc.
│   │   └── layout/          # Layout: Sidebar, Topbar, PageWrapper
│   ├── pages/               # Page-level components
│   │   ├── DashboardPage.tsx
│   │   ├── GuestPage.tsx
│   │   ├── RoomPage.tsx
│   │   ├── DealPage.tsx
│   │   ├── ReviewsPage.tsx
│   │   ├── EarningPage.tsx
│   │   └── LoginPage.tsx
│   ├── routes/              # React Router configuration
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useModal.ts
│   │   └── usePagination.ts
│   ├── services/            # API services
│   │   └── api.ts
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   ├── data/                # Mock data
│   │   └── mock.ts
│   ├── utils/               # Utility functions
│   │   └── helpers.ts
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS config
├── postcss.config.js        # PostCSS config
└── .env                      # Environment variables (create this)
```

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
cd Admin-Frontend
npm install
```

### Step 2: Create Environment File
```bash
cat > .env << EOF
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:4000/api/v1
VITE_AUTH_SERVICE_URL=http://localhost:3000/api/v1
VITE_ADMIN_SERVICE_URL=http://localhost:4001/api/v1
VITE_BOOKING_SERVICE_URL=http://localhost:5002/api/v1
VITE_HOTEL_SERVICE_URL=http://localhost:5003/api/v1

# App Settings
VITE_APP_NAME=Travallee
VITE_MOCK_API=true
EOF
```

### Step 3: Start Development Server
```bash
npm run dev
```

Open **http://localhost:5173** and login with:
- **Email:** admin@travallee.com
- **Password:** admin123

## 🎯 Multiple Ways to Run

### Option 1: Standalone Frontend (Recommended for Frontend-Only Work)
```bash
npm install
npm run dev
```
- Uses mock API data from `src/data/mock.ts`
- No backend required
- Hot module reloading enabled
- Perfect for UI/UX development

### Option 2: Frontend + Docker Backend (Full Stack Development)

**Terminal 1 - Backend Services:**
```bash
cd ../Travallee-Backend
docker-compose up -d
docker-compose logs -f
```

**Terminal 2 - Frontend:**
```bash
cd ../Admin-Frontend
npm install
npm run dev
```

Update `.env` to connect to real backend:
```env
VITE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

### Option 3: Manual Backend + Frontend (Complete Control)

**Terminal 1 - Auth Service:**
```bash
cd Travallee-Backend/Services/Auth
npm install
npm run dev
# Runs on http://localhost:3000
```

**Terminal 2 - Admin Service:**
```bash
cd Travallee-Backend/Services/admin
npm install
npm run dev
# Runs on http://localhost:4001
```

**Terminal 3 - Booking Service:**
```bash
cd Travallee-Backend/Services/booking
npm install
npm run dev
# Runs on http://localhost:5002
```

**Terminal 4 - Hotel Service:**
```bash
cd Travallee-Backend/Services/Hotel
npm install
npm run dev
# Runs on http://localhost:5003
```

**Terminal 5 - Frontend:**
```bash
cd Admin-Frontend
npm install
npm run dev
```

### Option 4: Production Build
```bash
npm install
npm run build
npm run preview
```

The production build is optimized and available at **http://localhost:4173**

### Option 5: With Package Manager Workspaces (Monorepo)

If the root `package.json` has workspaces configured:

```bash
cd ../../
npm install              # Install all dependencies
npm run dev:all         # Run all dev servers
npm run build:all       # Build all projects
```

## 📝 Environment Variables

Create a `.env` file in the `Admin-Frontend` directory:

```env
# ===== API CONFIGURATION =====
# Base API URL (for aggregated endpoints)
VITE_API_BASE_URL=http://localhost:4000/api/v1

# Service-specific URLs (optional)
VITE_AUTH_SERVICE_URL=http://localhost:3000/api/v1
VITE_ADMIN_SERVICE_URL=http://localhost:4001/api/v1
VITE_BOOKING_SERVICE_URL=http://localhost:5002/api/v1
VITE_HOTEL_SERVICE_URL=http://localhost:5003/api/v1

# ===== APP CONFIGURATION =====
VITE_APP_NAME=Travallee
VITE_APP_VERSION=0.1.0
VITE_ENVIRONMENT=development

# ===== FEATURE FLAGS =====
VITE_MOCK_API=true              # Use mock data instead of real API
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true

# ===== DEVELOPMENT =====
VITE_API_TIMEOUT=10000          # Request timeout in ms
VITE_DEBUG=false
```

**Environment-Specific Configs:**

Development (`.env`):
```env
VITE_MOCK_API=true
VITE_DEBUG=true
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

Staging (`.env.staging`):
```env
VITE_MOCK_API=false
VITE_DEBUG=false
VITE_API_BASE_URL=https://api-staging.travallee.com/api/v1
```

Production (`.env.production`):
```env
VITE_MOCK_API=false
VITE_DEBUG=false
VITE_API_BASE_URL=https://api.travallee.com/api/v1
```

Run with specific config:
```bash
npm run build -- --mode production
npm run build -- --mode staging
```

## 🛠️ Available NPM Scripts

### Development
```bash
npm run dev              # Start dev server (HMR enabled)
npm run dev -- --port 3000  # Use custom port
npm run dev -- --open    # Auto-open in browser
```

### Building
```bash
npm run build            # Production build
npm run build:watch      # Rebuild on file changes
npm run preview          # Preview production build locally
npm run preview -- --port 8080  # Custom port for preview
```

### Code Quality
```bash
npm run lint             # Check for linting errors
npm run lint:fix         # Fix auto-fixable linting issues
npm run format           # Format code with Prettier
npm run type-check       # Check TypeScript types
```

### Testing
```bash
npm run test             # Run tests
npm run test:watch       # Watch mode for tests
npm run test:coverage    # Generate coverage report
```

## 🔐 Authentication

### Demo Credentials

| Email | Password | Notes |
|-------|----------|-------|
| admin@travallee.com | admin123 | Full admin access |
| manager@travallee.com | manager123 | Manager access |
| test@example.com | test123 | Limited test access |

In mock API mode, any non-empty email/password combination works.

### How Authentication Works

1. User enters credentials on Login page
2. `useAuth` hook stores in localStorage:
   ```typescript
   localStorage.setItem('travallee_user', JSON.stringify({ email, isLoggedIn: true }))
   ```
3. Protected routes check `isLoggedIn` status
4. Logout clears storage and redirects to login

## 📦 Mock Data

The application includes pre-populated mock data in `src/data/mock.ts`:

```typescript
// Guests (10 total)
- Various booking statuses: Available, Booked, Reserved
- Different room types and stay durations

// Rooms (8 total)
- Across 5 floors
- Different bed types: Single, Double, Suite
- Status tracking: Clean, Dirty, Inspected

// Deals (4 active)
- Status: Ongoing, Full, Inactive, New
- Different room types and availability

// Vendors (6 total)
- Payment statuses: Paid, Pending, Overdue
- Category-based grouping

// Reviews (5 total)
- Star ratings (1-5)
- Customer feedback text
```

To use real API data instead:
1. Set `VITE_MOCK_API=false` in `.env`
2. Implement actual API calls in `src/services/api.ts`
3. Ensure backend services are running

## 🎨 Styling

### Tailwind CSS
- **Configuration:** `tailwind.config.js`
- **Directives:** `src/index.css`

### Color Scheme
```css
Primary:     #4285F4 (Blue)
Success:     #34A853
Warning:     #FBBC04
Error:       #EA4335
Neutral:     #5F6368
Background:  #FFFFFF
```

### Typography
- **Font:** Plus Jakarta Sans ([Google Fonts](https://fonts.google.com/))
- **Headings:** 600-700 weight
- **Body:** 400-500 weight

### Responsive Breakpoints
```
xs: 320px   (Mobile)
sm: 640px   (Tablet)
md: 768px   (Small laptop)
lg: 1024px  (Laptop)
xl: 1280px  (Desktop)
2xl: 1536px (Large desktop)
```

## 🧩 Custom Hooks Usage

### useAuth - Authentication State
```typescript
import { useAuth } from '@/hooks/useAuth';

const { isLoggedIn, user, login, logout } = useAuth();

// Login
login('admin@travallee.com', 'admin123');

// Check authentication
if (isLoggedIn) {
  // Render authenticated content
}

// Logout
logout();
```

### useModal - Modal State Management
```typescript
import { useModal } from '@/hooks/useModal';

const { isOpen, open, close, toggle } = useModal();

return (
  <>
    <button onClick={open}>Open Modal</button>
    <Modal isOpen={isOpen} onClose={close}>
      Modal Content
    </Modal>
  </>
);
```

### usePagination - Pagination Logic
```typescript
import { usePagination } from '@/hooks/usePagination';

const pagination = usePagination({
  totalItems: 100,
  pageSize: 10
});

// Properties
pagination.page           // Current page (1-indexed)
pagination.totalPages     // Total number of pages
pagination.startIndex     // For array slicing
pagination.endIndex       // For array slicing

// Methods
pagination.setPage(2)     // Jump to page
pagination.nextPage()     // Go to next page
pagination.prevPage()     // Go to previous page
```

## 🔗 API Services

All API calls are centralized in `src/services/api.ts`:

```typescript
// Fetch operations
getGuests()              // Returns Promise<Guest[]>
getRooms()               // Returns Promise<Room[]>
getDeals()               // Returns Promise<Deal[]>
getVendors()             // Returns Promise<Vendor[]>
getReviews()             // Returns Promise<Review[]>

// Mutation operations
updateVendorStatus(id, status)  // Update vendor payment status
addVendor(vendor)               // Create new vendor
addDeal(deal)                   // Create new deal
```

Example:
```typescript
import { getGuests } from '@/services/api';

const guests = await getGuests();
console.log(guests); // Array of guest objects
```

## 📊 Data Types

### Guest
```typescript
interface Guest {
  id: string;
  name: string;
  room: string;
  total: number;
  paid: number;
  status: 'Available' | 'Booked' | 'Reserved' | 'Waitlist';
}
```

### Room
```typescript
interface Room {
  number: string;
  bed: 'Single' | 'Double' | 'Suite';
  floor: number;
  facility: string;
  status: 'Clean' | 'Dirty' | 'Inspected' | 'Booked';
}
```

### Deal
```typescript
interface Deal {
  ref: string;
  name: string;
  reservationsLeft: number;
  endDate: string;
  roomType: string;
  status: 'Ongoing' | 'Full' | 'Inactive' | 'New';
}
```

### Vendor
```typescript
interface Vendor {
  id: string;
  name: string;
  category: string;
  amountDue: number;
  lastPaid: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}
```

### Review
```typescript
interface Review {
  name: string;
  room: string;
  rating: number;
  date: string;
  text: string;
}
```

## 🐛 Troubleshooting

### Issue: Port 5173 Already in Use
**Solution:**
```bash
npm run dev -- --port 3000  # Use different port
# or
lsof -ti:5173 | xargs kill -9  # Kill process using port
```

### Issue: Module Not Found Errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: TypeScript Errors
**Solution:**
```bash
npm run type-check      # Check for type errors
npm run lint:fix        # Auto-fix lint issues
npm install --save-dev typescript@latest  # Update TypeScript
```

### Issue: Tailwind Styles Not Applied
**Solution:**
```bash
# Rebuild Tailwind
npm run build -- --mode development
# Clear cache
rm -rf node_modules/.vite
npm run dev
```

### Issue: Connection Refused When Using Backend
**Solution:**
1. Verify backend is running: `docker-compose ps`
2. Check backend logs: `docker-compose logs auth`
3. Update `.env` with correct API URL
4. Ensure firewall allows localhost connections

## 🚀 Deployment

### Build for Production
```bash
npm install
npm run build
```

Output in `dist/` folder.

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

## 💡 Tips and Best Practices

1. **Use Mock API During Development** - Set `VITE_MOCK_API=true`
2. **Hot Module Reloading** - `npm run dev` supports automatic refresh
3. **Type Safety** - Run `npm run type-check` before commits
4. **Code Formatting** - Auto-format with `npm run format`
5. **Environment Separation** - Use `.env.staging` and `.env.production`

## 🤝 Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - See [LICENSE](../LICENSE)

### Colors
- **Primary**: `#4285F4` (blue) - buttons, active states, accents
- **Background**: `#f4f6fb` (light gray) - page background
- **Cards**: white with `border border-gray-100` and `shadow-sm`
- **Text**: `#1a1a2e` (dark) - headings, `#888`/`#555` - secondary
- **Badges**: green (Available/Paid), red (Booked/Overdue), blue (Reserved), orange (Pending)

### Spacing
- Use Tailwind spacing scale: `px-4`, `py-2`, `mb-6`, `gap-4`, etc.
- Cards: `p-6` padding
- Page margins: `ml-44` (for sidebar), `mt-16` (for topbar)

### Typography
- **Font**: Plus Jakarta Sans (from Google Fonts)
- **Headings**: `text-xl font-bold` or `text-2xl font-bold`
- **Labels**: `text-sm font-medium text-gray-700`
- **Body**: `text-sm text-gray-600` or `text-gray-900`

## Extending the Project

### Add a New Page
1. Create `src/pages/NewPage.tsx`
2. Import components and data
3. Add route in `src/routes/AppRoutes.tsx`
4. Add nav button in `src/components/layout/Sidebar.tsx`

### Add a New UI Component
1. Create `src/components/ui/NewComponent.tsx`
2. Define `NewComponentProps` in `src/types/index.ts`
3. Use in pages with `import NewComponent from '../components/ui/NewComponent'`

### Add Mock Data
1. Add interface in `src/types/index.ts`
2. Add mock data array in `src/data/mock.ts`
3. Create API function in `src/services/api.ts`
4. Use with `useEffect` + `useState` in page component

## Building for Production

```bash
npm run build          # Compiles TypeScript and creates optimized build
npm run preview        # Preview production build locally
```

Output: `dist/` folder with minified assets

## Troubleshooting

### Tailwind styles not loading
- Ensure `tailwind.config.js` and `postcss.config.js` exist
- Verify `src/index.css` has `@tailwind` directives
- Run `npm install` to reinstall dependencies

### Routes not working
- Check `src/routes/AppRoutes.tsx` has all routes defined
- Verify `App.tsx` wraps `<Router><AppRoutes /></Router>`
- Ensure nav items in Sidebar match route paths

### Types missing
- All types must be defined in `src/types/index.ts`
- Use `React.FC<Props>` pattern for components
- No `any` types - use proper TypeScript

## Architecture Decisions

**Separation of Concerns**:
- Pages = screens mapped to routes
- Components = reusable UI pieces
- Hooks = state & logic logic
- Services = data fetching (easily swappable with real API)
- Types = single source of truth for data shapes

**State Management**:
- Local state with `useState` for modals, forms, tabs
- `useEffect` for data fetching
- `localStorage` for auth persistence
- No global state (Redux/Zustand) - the app is simple enough

**Styling**:
- 100% Tailwind CSS utilities
- No CSS modules or styled-components
- Responsive with `sm:`, `md:`, `lg:` breakpoints
- Color mapping functions for dynamic badge colors

---

**Ready to use!** Start the dev server and explore all 7 screens.
