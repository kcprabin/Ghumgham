import nodemailer from "nodemailer";

interface EmailResponse {
  id: string;
  from: string;
  to: string;
  created_at: string;
}

const sendEmailNodeMailer = async (
  to: string,
  subject?: string,
  html?: string,
  options?: { name?: string },
): Promise<EmailResponse> => {
  try {
    if (!to) {
      throw new Error("Recipient email is required");
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new Error(
        "Gmail credentials (GMAIL_USER, GMAIL_APP_PASSWORD) environment variables are not set",
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // FIXED
      port: 587,
      secure: false, // true for port 465
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const emailSubject = subject || "Welcome to Travallee!";

    const response = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: emailSubject,
      html: html || `<p>Hello ${options?.name || "User"},</p>`,
    });

    return {
      id: response.messageId || "unknown",
      from: process.env.GMAIL_USER,
      to,
      created_at: new Date().toISOString(),
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send email";
    throw new Error(errorMessage);
  }
};

export { sendEmailNodeMailer };
