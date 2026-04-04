export const RealixColors = {
  pageBackground: '#1a1a1a',
  screenBackground: '#111111',
  sectionBackground: '#1a1a1a',
  cardBackground: '#1e1e1e',
  rowBackground: '#1c1c1c',
  inputBackground: '#2a2a2a',
  textPrimary: '#f0f0f0',
  textSecondary: '#aaaaaa',
  textMuted: '#666666',
  textCaption: '#555555',
  border: '#2a2a2a',
  inputBorder: '#333333',
  accent: '#7ED321',
  accentBright: '#8EE52A',
  accentDark: '#6abc18',
  accentToggle: '#4CAF50',
  orange: '#f39c12',
  blue: '#3a7bd5',
  shadow: 'rgba(0, 0, 0, 0.6)',
  danger: '#ef4444',
} as const;

export const realixDestinations = [
  { id: 'romania', label: 'Romania', emoji: '🏰', color: '#44206b' },
  { id: 'italy', label: 'Italy', emoji: '🗼', color: '#1f5c39' },
  { id: 'greece', label: 'Greece', emoji: '🏛️', color: '#1f4d72' },
  { id: 'norway', label: 'Norway', emoji: '🏔️', color: '#6b4a18' },
  { id: 'russia', label: 'Russia', emoji: '🏯', color: '#5d2020' },
] as const;

export const realixSearchResults = [
  { id: 'sr1', name: 'Mighty Cinco Family', address: '25 Argent St., Santa Monica', emoji: '🏠' },
  { id: 'sr2', name: 'Mighty Cinco Family', address: '25 Argent St., Santa Monica', emoji: '🏘️' },
  { id: 'sr3', name: 'Mighty Cinco Family', address: '25 Argent St., Santa Monica', emoji: '🏡' },
] as const;

export const realixMapPins = [
  { id: 'pin1', label: '$250', top: 100, left: 38, active: false },
  { id: 'pin2', label: '$180', top: 168, left: 42, active: true },
  { id: 'pin3', label: '$320', top: 170, right: 20, active: false },
  { id: 'pin4', label: '$145', top: 240, left: 36, active: false },
  { id: 'pin5', label: '$290', top: 300, right: 18, active: false },
  { id: 'pin6', label: '$175', top: 370, left: 40, active: false },
] as const;

export const realixPropertyTypes = ['Breakfast combo', 'Townhouse', 'Condo', 'Penthouse'] as const;

export const realixFilterSortOptions = ['Best Match', 'Most Popular'] as const;

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
    question: 'How does Travallee work?',
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

export const realixEmptyNotificationsCopy = {
  title: 'No Notifications Yet',
  body: 'No notification right now, notifications about your activity will show up here.',
} as const;

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
  { id: 'g1', title: 'Living Room', tone: '#1a2a3a' },
  { id: 'g2', title: 'Bathroom', tone: '#2a1a1a' },
  { id: 'g3', title: 'Bedroom', tone: '#1a2a1a' },
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
  name: 'Primary Apartment',
  location: '701 Ocean avenue, Unit 103, Santa Monica',
  about:
    'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence.',
  nightlyPrice: 150,
  discountedPrice: 146.9,
  discountValue: 38,
  tax: 34.9,
  reviewScore: 4.9,
  reviewCount: 150,
  cardDate: '25 August 2023',
} as const;

export const realixPaymentMethods = [
  { id: 'mastercard', label: '•••• •••• •••• 4242', shortCode: 'MC' },
  { id: 'paypal', label: 'PayPal', shortCode: 'PP' },
] as const;

export const realixInboxThreads = [
  {
    id: 'daria',
    name: 'Daria',
    avatar: '👩',
    message: 'Oh hello Wiliam...',
    time: '20:16',
    unreadCount: 1,
    online: true,
  },
  {
    id: 'silvain-sastre',
    name: 'Silvain Sastre',
    avatar: '👨',
    message: 'Hey my friend, how are you?',
    time: '20:16',
    unreadCount: 0,
    online: true,
  },
  {
    id: 'michael-huss',
    name: 'Michael Huss',
    avatar: '🧔',
    message: 'Can I meet you today?',
    time: '21:00',
    unreadCount: 0,
    online: true,
  },
  {
    id: 'alexandria',
    name: 'Alexandria',
    avatar: '👧',
    message: 'Can I meet you today?',
    time: 'Yesterday',
    unreadCount: 0,
    online: false,
  },
  {
    id: 'lee-chang',
    name: 'Lee Chang',
    avatar: '🧑',
    message: 'Can I meet you today?',
    time: 'Nov 15',
    unreadCount: 0,
    online: false,
  },
] as const;

export const realixChatMessages = [
  {
    id: 't0',
    type: 'time',
    value: 'Today, 11:20',
  },
  {
    id: 'm1',
    type: 'incoming',
    value: 'I\'m looking for information about your house. Can I visit to see your house?',
  },
  {
    id: 'm2',
    type: 'outgoing',
    value: 'Ok, Bob!',
  },
  {
    id: 'm3',
    type: 'incoming',
    value: 'Hi, Band Of Course, the door is always open.',
  },
  {
    id: 'm4',
    type: 'outgoing',
    value: 'That\'s great, thank you! Sunday at 12 PM does that work for you?',
  },
  {
    id: 'm5',
    type: 'incoming',
    value: 'Of course, see you on Sunday!',
  },
] as const;

export const realixHistoryBookings = [
  {
    id: 'h1',
    name: 'Pullman Legian Bali',
    detail: '1 room, 2 Adults',
    dates: 'Thu, 23 Feb 22 – Sat, 26 Feb 22',
    emoji: '🏖️',
  },
  {
    id: 'h2',
    name: 'Pullman Legian Bali',
    detail: '1 room, 2 Adults',
    dates: 'Thu, 23 Feb 22 – Sat, 26 Feb 22',
    emoji: '🌴',
  },
] as const;

export const realixReviewCopy = {
  title: 'Thank you for review',
  body: 'Your review has been submitted successfully. Thank you!',
} as const;