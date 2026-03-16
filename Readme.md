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

## Auth Service (for local API testing)

If you need to run the auth service locally:

```bash
cd server/Services/Auth
npm install
npm run dev
```