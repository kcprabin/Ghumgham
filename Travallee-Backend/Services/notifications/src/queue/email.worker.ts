//@ts-ignore
import { Worker, Job } from 'bullmq';
import { sendEmail } from '../config/Resend.config.js';
import { getWelcomeLoginTemplate } from "../templates/index.js";
import type { WelcomeLoginParams } from "../templates/index.js";

const connection = {
  host: process.env.REDIS_HOST as string,
  port: Number(process.env.REDIS_PORT)
}

interface RegisterEmailJobData {
  userName: string;
  to: string;
  userId: string;
}

interface OTPEmailJobData {
  Name: string;
  otp: number;
}

interface BookingConfirmationJobData {
  email: string;
  userName: string;
  bookingId: string;
  hotelName: string;
  checkInDate: string;
  checkOutDate: string;
  roomNumber: string;
}

interface BookingCancellationJobData {
  email: string;
  userName: string;
  bookingId: string;
  hotelName: string;
  cancellationReason?: string;
}

interface PaymentSuccessJobData {
  email: string;
  userName: string;
  bookingId: string;
  amount: number;
  transactionId: string;
  currency?: string;
}

interface PaymentFailedJobData {
  email: string;
  userName: string;
  bookingId: string;
  amount: number;
  failureReason?: string;
}

const registerEmailWorker = new Worker<RegisterEmailJobData>(
  "Register",
  async (job: Job<RegisterEmailJobData>) => {
    try {
      const { userName, to, userId } = job.data;
      
      console.log(`Processing email job #${job.id} for user: ${userName}`);
      
      await sendEmail(
        to,
        "Welcome to Travallee - Your Journey Begins Here!",
        getWelcomeLoginTemplate({
          user_name: userName,
          app_link: process.env.APP_LINK || "https://kcprabin9.com.np",
          unsubscribe_link: `${process.env.APP_LINK}/unsubscribe`,
          preferences_link: `${process.env.APP_LINK}/preferences`,
          view_online_link: `${process.env.APP_LINK}/view-online`
        })
      );
      
      console.log(`Email successfully sent to ${to} for user ${userName}`);
      return { 
        success: true, 
        email: to, 
        userId,
        message: "Welcome email sent successfully" 
      };
    } catch (error) {
      console.error(`Error sending welcome email:`, error);
      throw error;
    }
  },
  {
    connection,
  }
);

registerEmailWorker.on('completed', (job) => {
  console.log(`Job #${job.id} completed:`, job.returnvalue);
});

registerEmailWorker.on('failed', (job, err) => {
  console.error(`Job #${job?.id} failed:`, err.message);
});

export default registerEmailWorker;

