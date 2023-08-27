import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userId}:any) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId, 
                {
                    verifyToken: hashedToken, 
                    verifyTokenExpiry: Date.now() + 3600000
                }
            )
        }else if (emailType === "RESET"){
            await User.findByIdAndUpdate(
                userId, 
                {
                    forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            )
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "dec2cb5f266394",
              pass: "124851b2db71c9"
            }
          });
        
    } catch (error: any) {
        throw new Error(error.message);
    }
}