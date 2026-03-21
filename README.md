# Ghumgham 🏨 — Hotel Management System

![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![Version](https://img.shields.io/badge/version-0.1.0-green?style=flat-square)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=flat-square)
![Status](https://img.shields.io/badge/status-In%20Development-yellow?style=flat-square)

A modern, full-stack **Hotel Management System** built with React, TypeScript, React Native, and Node.js microservices. Manage guests, rooms, bookings, payments, and more with a beautiful and intuitive interface.

## 🎯 Features

### Admin Dashboard
- 📊 Real-time analytics and KPIs
- 👥 Guest management with detailed profiles
- 🏨 Room inventory and occupancy tracking
- 💰 Revenue analytics and payment management
- ⭐ Customer reviews and feedback
- 📅 Booking management and reservations
- 💳 Deal & promotion management

### Mobile App (Travallee)
- User authentication (coming soon)
- Browse available rooms
- Make bookings
- View booking history
- Payment integration
- Push notifications

### Backend Services
- Auth service (JWT-based)
- Guest management API
- Room booking system
- Payment processing
- Email notifications
- Admin management

## 💻 Tech Stack

### Frontend
- **React 19.2** with TypeScript 5.9
- **Vite 8.0** for fast builds
- **React Router v6** for navigation
- **Tailwind CSS 3.4** for styling
- **Zustand** for state management (optional)

### Mobile
- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for routing

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB/SQL** (configurable)
- **Docker** containerization
- **Microservices** architecture

## 📦 Project Structure

```
Ghumgham/
├── Admin-Frontend/          # React admin dashboard
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   └── types/          # TypeScript definitions
│   └── package.json
├── Travallee-App/           # React Native mobile app
├── Travallee-Backend/       # Backend microservices
│   ├── Packages/           # Shared utilities
│   └── Services/           # Individual microservices
├── User-Frontend/           # Public website (coming soon)
└── docker-compose.yml       # Docker setup

```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm** or **yarn**
- **Docker** (for backend services)

### Admin Frontend Setup

```bash
cd Admin-Frontend
npm install
npm run dev
```

Visit http://localhost:5173 and login with:
- **Email:** admin@travallee.com
- **Password:** admin123

### Backend Setup with Docker

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Mobile App Setup

```bash
cd Travallee-App
npm install
npm start
```

Scan the QR code with Expo Go app on your phone.

## 📖 Documentation

- [Admin Frontend Setup](Admin-Frontend/README.md)
- [Mobile App Setup](Travallee-App/README.md)
- [Backend API Docs](Travallee-Backend/README.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)
- [Security Policy](SECURITY.md)

## 🔐 Demo Credentials

### Admin Dashboard
```
Email: admin@travallee.com
Password: admin123
```

### Additional Test Accounts
```
manager@travallee.com / manager123
test@example.com / test123
```

## 📋 Sample Data

The app comes with pre-loaded sample data:
- **10 Guests** with various booking statuses
- **8 Rooms** across 5 floors
- **4 Active Deals** and promotions
- **6 Vendors** for payments
- **5 Customer Reviews** with ratings

All data is managed through mock API services for demo purposes.

## 🛠️ Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Linting & Formatting
```bash
npm run lint
npm run format
```

## 🐛 Reporting Issues

Found a bug? Please open an [issue](https://github.com/kcprabin/Ghumgham/issues) using the bug report template.

## 💡 Feature Requests

Have an idea? Submit a [feature request](https://github.com/kcprabin/Ghumgham/issues) with details.

## 🤝 Contributing

We welcome contributions! Please:
1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Create a branch for your feature
3. Follow code style guidelines
4. Submit a PR with details

## 📝 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for hotel management professionals
- Special thanks to contributors and testers
- Icons and graphics from open-source libraries

## 📞 Support

- 📧 Email: support@ghumgham.com
- 💬 Discussions: GitHub Discussions
- 🐛 Issues: GitHub Issues

---

**Made with ❤️ by the Ghumgham Team**

⭐ If you find this helpful, please star the repository!
