import { sendEmail } from "../config/Resend.config.js"
//@ts-ignore
import { apiError, asyncHandler, apiResponse } from "@packages";
import { sendEmailNodeMailer } from "../config/nodemailer.js";



const MailEmit =  async (to: string, subject: string, html: string) => {
    try {
        await sendEmailNodeMailer(to, subject, html);
    } catch (error: any) {
        console.error("Failed to send email:", error);
    }
}
export { MailEmit } 