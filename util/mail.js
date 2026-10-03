import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});


export const sendOtpMail = async (to, otp) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: to,
            subject: "Biterush Password Reset OTP",
            html: `
            <div style="
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                font-family: Arial, sans-serif;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                background-color: #ffffff;
            ">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #f59e0b;">Bitrushest</h2>
                </div>

                <div style="background-color: #fef3c7;
                padding: 20px;
                text-align: center;
                border-radius: 8px;
                margin-bottom: 20px;">
                    <p style="
                    margin: 0;
                    font-size: 28px;
                    font-weight: bold;
                    letter-spacing: 4px;
                    color: #92400e;">
                        ${otp}
                    </p>
                </div>

                <p style="
                margin: 0 0 15px 0;
                font-size: 16px;
                color: #334155;">
                    This is a one-time password (OTP) for resetting your account password. It will expire in 10 minutes.
                </p>

                <p style="
                margin: 0 0 15px 0;
                font-size: 16px;
                color: #334155;">
                    Please do not share this OTP with anyone.
                </p>

                <p style="margin: 0;
                font-size: 16px;
                color: #9ca3af;
                border-top: 1px solid #e2e8f0;
                padding-top: 15px;">
                    If you did not request this change, please ignore this email.
                </p>
            </div>
        `
        })
        console.log("Otp Sent Successfuly")

    } catch (err) {
        console.log("Internal error sending mail: ", err)
    }
}