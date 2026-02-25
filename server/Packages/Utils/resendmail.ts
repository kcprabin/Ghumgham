import { Resend } from 'resend';
import dotenv from 'dotenv';



const resend = new Resend(process.env.RESEND_API as string);


const sendEmail = async (to :string, subject?: string , html?: string) => {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: to,
            subject: subject || 'Welcome to Ghumgham!',
            html: html || '<p>Thank you for joining Ghumgham. We are excited to have you on board!</p>'
        });
    } catch (error: any) {
        console.error('Error sending email:', error);
    }   
}
export { sendEmail };