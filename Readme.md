# Ghumgham

Simple setup notes for running the mobile app during development.

## App Setup (Expo)

1. Go to the app folder:

```bash
cd app
```

2. Install dependencies:

```bash
npm install
```

3. Create your environment file from the sample:

```bash
cp .env.sample .env
```

4. Update `.env` with your backend URL:

```env
API_BASE_URL=http://YOUR_COMPUTER_IP:4000/api/v1
```

Important: use your computer IP address, not `localhost`, when testing on a physical phone.

5. Start Expo:

```bash
npm start
```

6. Open Expo Go on your phone and scan the QR code.

## Backend Services (Docker Setup)

You can run all the microservices together using Docker Compose. The services include Auth, Admin, Bookings, Hotel, and Notifications.

### 1. Environment Configuration

Before running Docker, you must create a `.env` file for each service. Here are the templates for each:

**`server/Services/Auth/.env`**
```env
PORT=4001
MONGO_URI=mongodb://db:27017/auth_db
JWT_SECRET=your_secret_key
# Add other Auth specific variables here
```

**`server/Services/admin/.env`**
```env
PORT=3000
MONGO_URI=mongodb://db:27017/admin_db
JWT_SECRET=your_secret_key
```

**`server/Services/booking/.env`**
```env
PORT=5002
MONGO_URI=mongodb://db:27017/booking_db
```

**`server/Services/Hotel/.env`**
```env
PORT=3001
MONGO_URI=mongodb://db:27017/hotel_db
```

**`server/Services/notifications/.env`**
```env
PORT=6000
MONGO_URI=mongodb://db:27017/notifications_db
```

### 2. Run with Docker Compose

From the root directory of the project, build and start all containers:

```bash
docker-compose up --build
```
*(To run in the background, append `-d`)*

To stop the containers, run:
```bash
docker-compose down
```