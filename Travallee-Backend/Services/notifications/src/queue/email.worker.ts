import { Worker, Job } from 'bullmq';
import { sendEmailNodeMailer } from '../config/nodemailer.js';
import { sendEmail } from '../config/Resend.config.js';
import { getWelcomeLoginTemplate } from "../templates/index.js";

interface EmailJobData {
  Name: string;
  to: string;
  subject: string;
}

const emailWorkerRegister = new Worker(
  'emailQueueRegister',
  async (job: Job<EmailJobData>) => {
    try {
      const { to, subject, Name } = job.data;
      console.log(`Processing email job ${job.id} - Sending to ${to}`);

      const html = getWelcomeLoginTemplate({
        user_name: Name,
        app_link: process.env.APP_URL || 'https://travallee.com',
        unsubscribe_link: process.env.APP_URL + '/unsubscribe' || 'https://travallee.com/unsubscribe',
        preferences_link: process.env.APP_URL + '/preferences' || 'https://travallee.com/preferences',
        view_online_link: process.env.APP_URL || 'https://travallee.com',
      });
      
      await sendEmailNodeMailer(to, subject, html);
      await sendEmail(to, subject, html);
      
      console.log(`Email sent successfully to ${to}`);
      return { success: true, messageId: job.id };
    } catch (error: any) {
      console.error(`Failed to send email for job ${job.id}:`, error);
      throw error;
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST || 'redis',
      port: Number(process.env.REDIS_PORT) || 6379,
    },
    concurrency: 5,
  }
);

emailWorkerRegister.on('completed', (job: Job) => {
  console.log(` Email job ${job.id} completed`);
});

emailWorkerRegister .on('failed', (job: Job | undefined, err: Error) => {
  console.error(` Email job ${job?.id} failed:`, err.message);
});

emailWorkerRegister.on('error', (err: Error) => {
  console.error('Email worker error:', err);
});


