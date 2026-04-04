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
        app_link: process.env.APP_URL || 'randomd ata',
        unsubscribe_link: process.env.APP_URL + '/unsubscribe' || 'randoanf',
        preferences_link: process.env.APP_URL + '/preferences' || 'and',
        view_online_link: process.env.APP_URL || 'ajksdgda',
      });
      
  
      try {
        await sendEmailNodeMailer(to, subject, html);
      } catch (error: any) {
        console.warn('Resend API failed, attempting fallback...', error);
         await sendEmail(to, subject, html);
      }
      
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



