import { NextRequest, NextResponse } from "next/server";
import  dbconnect  from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

dbconnect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (user) {
      await sendEmail({ email, emailType: "RESET", userId: user._id });
    }

    return NextResponse.json({ 
      success: true, 
      message: "If that email is registered, you’ll receive a reset link" 
    });
    
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ success: false, error: "Unable to process request" }, { status: 500 });
  }
}