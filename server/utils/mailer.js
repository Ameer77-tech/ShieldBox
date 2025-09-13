import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

// Set SendGrid API key
sgMail.setApiKey(process.env.SHIELDBOX_MAILER_API);

/**
 * Send verification code email
 * @param {string} to - recipient email
 * @param {string | number} code - verification code
 */
export const sendCode = async (to, code) => {
  try {
    const message = {
      to,
      from: {
        email: process.env.EMAIL, // verified sender email
        name: "ShieldBox", // app name shown in inbox
      },
      subject: "🔒 Your ShieldBox Verification Code",
      text: `Hello,\n\nYour ShieldBox verification code is: ${code}\n\nIf you did not request this, please ignore this email.\n\nThank you,\nShieldBox Team`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.5;">
          <p>Hello,</p>
          <p>Your <strong>ShieldBox</strong> verification code is:</p>
          <h2 style="color:#1a73e8;">${code}</h2>
          <p>If you did not request this, please ignore this email.</p>
          <p>Thank you,<br/><strong>ShieldBox Team</strong></p>
        </div>
      `,
    };

    const response = await sgMail.send(message);
    console.log("Email sent:", response[0].statusCode);

    return { success: true, response };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};
