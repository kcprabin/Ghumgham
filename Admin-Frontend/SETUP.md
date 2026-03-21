# Travallee Hotel Management System - Installation & Setup

## Overview
Travallee HMS is a production-ready React TypeScript hotel management system with a clean folder structure, Tailwind CSS styling, React Router v6 navigation, and comprehensive UI components.

## Project Structure

```
src/
├── components/
│   ├── ui/                          # Reusable UI primitives
│   │   ├── Badge.tsx                # Status badge with color mapping
│   │   ├── Button.tsx               # Multi-variant button component
│   │   ├── Input.tsx                # Styled input with focus ring
│   │   ├── Select.tsx               # Styled dropdown select
│   │   ├── Card.tsx                 # Rounded card with shadow
│   │   ├── Modal.tsx                # Overlay modal dialog
│   │   ├── Drawer.tsx               # Right-side slide-in panel
│   │   ├── Pagination.tsx           # Pagination controls
│   │   ├── Stars.tsx                # Star rating display
│   │   ├── BarChart.tsx             # Horizontal bar chart
│   │   └── Gauge.tsx                # SVG semi-circle gauge
│   └── layout/                      # Layout components
│       ├── Sidebar.tsx              # Fixed left navigation (180px)
│       ├── Topbar.tsx               # Sticky top bar with search
│       └── PageWrapper.tsx          # Page container with title
├── pages/                           # Page-level components (one per route)
│   ├── LoginPage.tsx                # /login route
│   ├── DashboardPage.tsx            # /dashboard route
│   ├── GuestPage.tsx                # /guests route with drawer
│   ├── RoomPage.tsx                 # /rooms route
│   ├── DealPage.tsx                 # /deals route with modal
│   ├── ReviewsPage.tsx              # /reviews route
│   └── EarningPage.tsx              # /earning route (hotel revenue + vendor payouts)
├── routes/
│   └── AppRoutes.tsx                # React Router v6 routing config
├── hooks/                           # Custom React hooks
│   ├── useModal.ts                  # Modal open/close state
│   ├── usePagination.ts             # Pagination logic
│   └── useAuth.ts                   # Authentication state (localStorage)
├── services/
│   └── api.ts                       # Placeholder API functions with mock data
├── types/
│   └── index.ts                     # TypeScript interfaces & types
├── data/
│   └── mock.ts                      # Mock seed data (guests, rooms, deals, vendors, reviews)
├── utils/
│   └── helpers.ts                   # Utility functions (formatting, color mapping, classNames)
├── App.tsx                          # Main App wrapper with Router
└── main.tsx                         # React DOM entry point
```

## Key Features

### Authentication
- **useAuth hook** with localStorage persistence
- Login page with email/password validation
- Auto-redirect to dashboard on successful login

### Pages & Features
1. **Dashboard** - KPIs, room types, occupancy charts, customer feedback
2. **Guest Management** - Searchable table, click-to-open drawer, pagination
3. **Room Management** - Room status, filterable tabs, pagination
4. **Deal Management** - Add deal modal form, status badges
5. **Reviews** - Star ratings, filter tabs, reply functionality
6. **Earning** - Revenue charts, vendor payout management with "Pay Now" button

### UI Components
- **Badge** - Color-coded status labels
- **Button** - Primary, outline, ghost variants with sizes
- **Input/Select** - Blue focus rings, labels
- **Card** - White rounded container with shadow
- **Modal** - Overlay dialog with form fields and close handlers
- **Drawer** - Right-side panel that slides in (used for guest details)
- **Pagination** - Previous/page numbers/Next controls
- **Stars** - Filled/empty star rating
- **BarChart** - Horizontal bars with labels and values
- **Gauge** - SVG progress semicircle

### Styling
- **Tailwind CSS** for all utility classes
- **Custom color palette** with primary blue (#4285F4)
- **Responsive design** with mobile-first breakpoints
- **Plus Jakarta Sans** Google Font
- **Consistent spacing** using Tailwind scale

### State Management
- React Hooks (useState, useEffect)
- Custom hooks for modals, pagination, auth
- Mock API calls with simulated delays

## Installation

### 1. Install Dependencies
```bash
cd Admin-Frontend
npm install
```

### 2. Add Missing Packages
If you haven't already, ensure these are in package.json:
```bash
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/react @types/react-dom
```

### 3. Verify Configuration Files
The following are now created:
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS + Tailwind
- `src/index.css` - Tailwind directives
- `src/App.css` - Global styles

### 4. Run Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Usage

### Login
```
Email: admin@travallee.com
Password: password123
```
(Any non-empty email/password will work in demo mode)

### Navigation
- **Sidebar** (left): Click nav items to switch pages
- **Topbar** (top): Search (non-functional), bell icon, avatar

### Interactive Features
- **Guests**: Click row to open drawer, use pagination
- **Deals**: Click "+ Add deal" to open modal form
- **Vendor Payouts**: Click "Pay Now" to update payment status, "+ Add Vendor" for modal
- **Reviews**: View cards with star ratings and reply buttons

## TypeScript Types

Core entities defined in `src/types/index.ts`:

```typescript
type BadgeStatus = 'Available' | 'Booked' | 'Reserved' | 'Waitlist' | 'Clean' | 'Dirty' | 'Inspected' | 'Pick up' | 'Ongoing' | 'Full' | 'Inactive' | 'New' | 'Paid' | 'Pending' | 'Overdue'

interface Guest { id, name, room, total, paid, status: BadgeStatus }
interface Room  { number, bed, floor, facility, status: BadgeStatus }
interface Deal  { ref, name, reservationsLeft, endDate, roomType, status: BadgeStatus }
interface Vendor { id, name, category, amountDue, lastPaid, status: BadgeStatus }
interface Review { name, room, rating, date, text }
```

## Mock Data
All mock data is in `src/data/mock.ts`:
- 10 guests with mixed statuses
- 8 rooms with different bed types
- 4 deals (Ongoing, Full, Inactive, New)
- 6 vendors with payment statuses
- 5 reviews with ratings

## API Services
Placeholder functions in `src/services/api.ts`:
- `getGuests()`, `getRooms()`, `getDeals()`, `getVendors()`, `getReviews()`
- `updateVendorStatus(vendorId, status)` - Updates vendor payment status
- `addVendor(vendor)` - Adds new vendor to list
- `addDeal(deal)` - Adds new deal to list

All return promised with 300ms simulated delay.

## Custom Hooks

### useAuth
```typescript
const { isLoggedIn, login, logout } = useAuth();
login(email, password); // Sets isLoggedIn = true
logout(); // Clears auth state
```

### useModal
```typescript
const { isOpen, open, close, toggle } = useModal();
<Modal isOpen={isOpen} onClose={close} />
```

### usePagination
```typescript
const pagination = usePagination({ totalItems: 100, pageSize: 10 });
pagination.page          // Current page (1-based)
pagination.totalPages    // Calculated total pages
pagination.setPage(2)    // Go to page 2
pagination.nextPage()    // Next page
pagination.prevPage()    // Previous page
pagination.startIndex    // For array slicing
pagination.endIndex
```

## Styling Guide

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
