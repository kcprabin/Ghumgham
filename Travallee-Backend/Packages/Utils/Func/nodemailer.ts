import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const sendEmail = async (
  to: string,
  subject?: string,
  html?: string,
): Promise<any> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // ✅ correct Gmail SMTP host
      port: 587,
      secure: false, // false for 587 (STARTTLS)
      auth: {
        user: "kcprabin2063@gmail.com",
        pass: "xehbbndscdhvkrdm"
      },
    });
    const mailOptions = {
      from: process.env.GMAIL_USER as string,
      to,
      subject: subject || "Welcome to Travallee!",
      html:
        html ||
        "<p>Thank you for joining Travallee. We are excited to have you on board!</p>",
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Nodemailer error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to send email",
    );
  }
};
sendEmail("kcprabin2063@gmail.com", "Test Email", "<p>This is a test email.</p>");

export { sendEmail };
