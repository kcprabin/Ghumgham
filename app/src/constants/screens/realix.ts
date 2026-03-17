export const RealixColors = {
  pageBackground: '#ebebeb',
  screenBackground: '#ffffff',
  sectionBackground: '#f7f7f7',
  inputBackground: '#f5f5f5',
  textPrimary: '#1a1a1a',
  textSecondary: '#555555',
  textMuted: '#999999',
  textCaption: '#bbbbbb',
  border: '#eeeeee',
  inputBorder: '#e8e8e8',
  accent: '#7ED321',
  accentDark: '#6abc18',
  accentToggle: '#4CAF50',
  shadow: 'rgba(0, 0, 0, 0.09)',
  danger: '#ef4444',
} as const;

export const realixDestinations = [
  { id: 'romania', label: 'Romania', emoji: '🏰', color: '#f8b500' },
  { id: 'italy', label: 'Italy', emoji: '🗼', color: '#81c784' },
  { id: 'greece', label: 'Greece', emoji: '🏛️', color: '#64b5f6' },
  { id: 'norway', label: 'Norway', emoji: '🏔️', color: '#7e57c2' },
  { id: 'russia', label: 'Russia', emoji: '🏯', color: '#e91e63' },
] as const;

export const realixLanguages = [
  'Indonesian',
  'English (US)',
  'Italian',
  'French',
  'German',
  'Japanese',
  'Swedish',
  'Russian',
] as const;

export const realixFaqs = [
  {
    id: 'how-realix-works',
    question: 'How does Ghumgham work?',
    answer:
      'Browse destinations, compare stays, save favorites, and confirm bookings in a few taps. The app keeps your saved places, alerts, and profile settings together so planning stays lightweight.',
  },
  {
    id: 'who-can-book',
    question: 'Who can book a stay?',
    answer:
      'Any signed-in traveler can browse listings, review property details, and request or confirm a booking when inventory is available.',
  },
  {
    id: 'sell-home',
    question: 'How can I list my home?',
    answer:
      'Host onboarding and listing management are not wired into this mobile build yet, but the profile flows are ready for that extension.',
  },
  {
    id: 'contact-agent',
    question: 'How do I contact a local agent?',
    answer:
      'Open a destination or property card and use the support or contact action when that backend integration is enabled.',
  },
] as const;

export const realixNotificationFeed = [
  {
    id: 'booking-success',
    title: 'Booking Successful',
    message:
      'You have successfully booked the Art Workshops. The event will be held on Sunday, December 22, 13:00 to 14:00. Don\'t forget to activate your reminder.',
    timestamp: '2 Feb 2023 • 7:40 pm',
    group: 'Today',
  },
  {
    id: 'new-services',
    title: 'New Services Available',
    message:
      'You can now make multiple bookings at once and manage cancellations directly from the app.',
    timestamp: '2 Feb 2023 • 7:40 pm',
    group: 'Today',
  },
  {
    id: 'event-reminder',
    title: 'Reminder Enabled',
    message:
      'We will send you a reminder one hour before your next confirmed booking starts.',
    timestamp: '2 Feb 2023 • 7:40 pm',
    group: 'Today',
  },
  {
    id: 'account-setup',
    title: 'Account Setup Successful',
    message:
      'Your account is ready. You can now explore destinations, save places, and receive booking updates.',
    timestamp: '1 Feb 2023 • 10:10 am',
    group: 'This Month',
  },
] as const;

export const realixNotificationSections = [
  {
    id: 'special',
    title: 'Special tips and offers',
    options: [
      { id: 'special-push', label: 'Push notifications', defaultValue: false },
      { id: 'special-email', label: 'Email', defaultValue: false },
    ],
  },
  {
    id: 'activity',
    title: 'Activity',
    options: [
      { id: 'activity-push', label: 'Push notifications', defaultValue: false },
      { id: 'activity-email', label: 'Email', defaultValue: false },
    ],
  },
  {
    id: 'reminders',
    title: 'Reminders',
    options: [
      { id: 'reminders-push', label: 'Push notifications', defaultValue: false },
      { id: 'reminders-email', label: 'Email', defaultValue: false },
    ],
  },
] as const;

export const realixAmenityList = [
  { id: 'sun', label: 'Sunning', icon: 'sunny-outline' },
  { id: 'wifi', label: 'Free Wifi', icon: 'wifi-outline' },
  { id: 'restaurant', label: 'Restaurant', icon: 'restaurant-outline' },
  { id: 'bar', label: 'Bar', icon: 'wine-outline' },
  { id: 'business', label: 'Business', icon: 'briefcase-outline' },
] as const;

export const realixGallery = [
  { id: 'g1', title: 'Living Room', tone: '#f3e8da' },
  { id: 'g2', title: 'Bathroom', tone: '#dde9f2' },
  { id: 'g3', title: 'Bedroom', tone: '#dcc8b4' },
] as const;

export const realixRatingBars = [
  { stars: 5, percent: 60 },
  { stars: 4, percent: 20 },
  { stars: 3, percent: 10 },
  { stars: 2, percent: 5 },
  { stars: 1, percent: 5 },
] as const;

export const realixDiscoverProperty = {
  id: 'mighty-cinco-family',
  name: 'Mighty Cinco Family',
  location: '701 Ocean avenue, Unit 103, Santa Monica',
  about:
    'Cassablanca Ground is located in Malang City which is not far from the city center. This house was made in 2012 with a minimalist and modern architecture suitable for families.',
  nightlyPrice: 150,
  discountedPrice: 146.9,
  discountValue: 38,
  tax: 34.9,
  reviewScore: 4.9,
  reviewCount: 150,
  cardDate: '25 August 2023',
} as const;

export const realixPaymentMethods = [
  { id: 'mastercard', label: 'Master Card', shortCode: 'MC' },
  { id: 'paypal', label: 'Paypal', shortCode: 'PP' },
] as const;