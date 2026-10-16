import nodemailer from "nodemailer";
import { AppError } from "../middlewares/error.middleware.js";


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    secure: true,
    port: 465
});

export const sendMail = async ({ email, otp }: { email: string, otp: string }) => {

    const html: string = `<body style="margin:0; padding:0; background-color:#f3f6fc; font-family:Arial,Helvetica,sans-serif;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
        style="background-color:#f3f6fc; padding:35px 12px;">
        <tr>
            <td align="center">

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                    style="max-width:520px; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e5eaf5;">

                    <!-- Header -->
                    <tr>
                        <td align="center"
                            style="padding:32px 24px; background-color:#4f46e5;">
                            <h1 style="margin:0; color:#ffffff; font-size:27px; letter-spacing:0.5px;">
                                Pipeline
                            </h1>
                            <p style="margin:8px 0 0; color:#e0e7ff; font-size:13px;">
                                Secure account verification
                            </p>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td align="center" style="padding:35px 28px 20px;">

                            <h2 style="margin:0 0 16px; color:#172554; font-size:25px;">
                                Your OTP Code
                            </h2>

                            <p style="margin:0; color:#64748b; font-size:15px; line-height:1.8;">
                                Hi there!<br />
                                Use the verification code below to verify your
                                account and continue.
                            </p>

                            <!-- OTP -->
                            <table role="presentation" cellspacing="0" cellpadding="0"
                                style="margin:28px auto; background-color:#eef2ff; border:1px solid #dbe4ff; border-radius:12px;">
                                <tr>
                                    <td align="center"
                                        style="padding:20px 30px; color:#3730a3; font-size:34px; font-weight:bold; letter-spacing:10px;">
                                        ${otp}
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:0; color:#64748b; font-size:14px; line-height:1.7;">
                                This code is valid for
                                <strong style="color:#334155;">10 minutes</strong> only.
                            </p>

                        </td>
                    </tr>

                    <!-- Security Notice -->
                    <tr>
                        <td style="padding:10px 28px 30px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:10px;">
                                <tr>
                                    <td style="padding:16px; color:#475569; font-size:13px; line-height:1.8;">
                                        <strong style="color:#1e293b;">
                                            Security reminder
                                        </strong>
                                        <br />
                                        Never share this OTP with anyone.
                                        Pipeline will never ask you to disclose
                                        your verification code.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center"
                            style="padding:22px 25px; background-color:#f8fafc; border-top:1px solid #e2e8f0;">

                            <p style="margin:0 0 8px; color:#64748b; font-size:12px; line-height:1.7;">
                                If you didn't request this code, you can safely
                                ignore this email.
                            </p>

                            <p style="margin:0; color:#94a3b8; font-size:12px;">
                                &copy; Servora. All rights reserved.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

    </body>`

    try {
        await transporter.sendMail({
            from: "mathematicsking123r@gmail.com",
            to: email,
            subject: "For Verify Your Email",
            html

        });
    } catch (error) {
        console.log("Error from mail utility", error)
        if (error instanceof Error) {
            return new AppError(error.message, 500)
        } else {
            return new AppError("Internal Server Error", 500)
        }
    }
}