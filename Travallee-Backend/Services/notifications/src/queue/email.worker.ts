//@ts-ignore
import { redisConnection, RegisterEmailJobData } from "@packages";
import { Worker, Job } from 'bullmq';
import { sendEmail } from '../config/Resend.config.js';
import { getWelcomeLoginTemplate } from "../templates/index.js";

const connection = redisConnection(
  process.env.REDIS_HOST as string,
  Number(process.env.REDIS_PORT)
);

const registerEmailWorker = new Worker<RegisterEmailJobData>(
  "Register",
  async (job: Job<RegisterEmailJobData>) => {
    try {
      const { userName, to, userId } = job.data;
      
      console.log(`Processing email job #${job.id} for user: ${userName}`);
      
      await sendEmail(
        to,
        "Welcome to Travallee - Your Journey Begins Here!",
        getWelcomeLoginTemplate(userName)
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

