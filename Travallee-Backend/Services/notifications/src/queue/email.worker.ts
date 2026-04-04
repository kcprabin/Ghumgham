//@ts-ignore

import { Worker, Job } from 'bullmq';
import { sendEmail } from '../config/Resend.config.js';
import { getWelcomeLoginTemplate } from "../templates/index.js";

const connection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
}
const registerEmailWorker  = new Worker("Register",
  async(job)=>{
    console.log(job)
    await sendEmail(job.data.to, "Welcome to Travallee - Your Journey Begins Here!", getWelcomeLoginTemplate(job.data.userName));
  },
  {
   connection
  }
);

