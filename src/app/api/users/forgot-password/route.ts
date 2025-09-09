import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });

        if (user) {
            await sendEmail({ email, emailType: "RESET", userId: user._id });
        }

        return NextResponse.json({
            message: "If an account with this email exists, a password reset link has been sent.",
            success: true,
        });

    } catch (error: any) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
