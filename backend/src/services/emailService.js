const nodemailer = require("nodemailer");

/**
 * Sends a verification email to the user.
 * @param {string} recipientEmail - The email address of the user.
 * @param {string} verificationUrl - The URL containing the email verification token.
 */
const sendVerificationEmail = async (recipientEmail, verificationUrl) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: "Verify your SyncDocs account",
      html: `
                <h1>Welcome to SyncDocs!</h1>
                <p>Please click the link below to verify your email:</p>
                <a href="${verificationUrl}">Verify Email</a>
                <p>This link is valid for 1 hour.</p>
            `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = { sendVerificationEmail };
