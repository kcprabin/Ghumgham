// Email Queue Job Types
export interface RegisterEmailJobData {
  userName: string;
  to: string;
  userId?: string;
}

export interface OTPEmailJobData {
  email: string;
  otp: string;
  expiresIn?: number;
}

export interface ResetPasswordJobData {
  email: string;
  resetLink: string;
  userName: string;
}

export interface BookingConfirmationJobData {
  email: string;
  userName: string;
  bookingId: string;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  roomNumber: string;
}

export interface BookingCancellationJobData {
  email: string;
  userName: string;
  bookingId: string;
  hotelName: string;
  cancellationReason?: string;
}

export interface PaymentSuccessJobData {
  email: string;
  userName: string;
  bookingId: string;
  amount: number;
  transactionId: string;
  currency?: string;
}

export interface PaymentFailedJobData {
  email: string;
  userName: string;
  bookingId: string;
  amount: number;
  reason: string;
  retryLink?: string;
}

export interface TwoFactorAuthJobData {
  email: string;
  code: string;
  expiresIn?: number;
}

export interface CheckInReminderJobData {
  email: string;
  userName: string;
  hotelName: string;
  checkInDate: string;
  roomNumber: string;
}

export interface BookingReminderJobData {
  email: string;
  userName: string;
  bookingId: string;
  hotelName: string;
  checkInDate: string;
  daysUntilCheckIn: number;
}

export interface DeleteAccountJobData {
  email: string;
  userName: string;
  confirmationLink: string;
}

// Union type for all email jobs
export type EmailJobData =
  | RegisterEmailJobData
  | OTPEmailJobData
  | ResetPasswordJobData
  | BookingConfirmationJobData
  | BookingCancellationJobData
  | PaymentSuccessJobData
  | PaymentFailedJobData
  | TwoFactorAuthJobData
  | CheckInReminderJobData
  | BookingReminderJobData
  | DeleteAccountJobData;
