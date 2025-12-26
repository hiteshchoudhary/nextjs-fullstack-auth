import { NextRequest, NextResponse } from "next/server";
import  dbConnect  from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const { token, password } = (await request.json()) as {
      token: string;
      password: string;
    };

    if (!token || !password) {
      return NextResponse.json(
        { success: false, error: "New Password Is Required" },
        { status: 400 }
      );
    }

    console.log("Token from frontend:", token);

    const user = await User.findOne({
        forgotPasswordToken: token,
        forgotPasswordExpiry: { $gt: Date.now() },
    }).select("+password");
    if (!user) {
        console.log("No user found with this token or token expired");
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    if (await bcrypt.compare(password, user.password!)) {
      return NextResponse.json(
        { success: false, error: "New password cannot be the same as the old one" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    return NextResponse.json({ success: true, message: "Password reset successful" });
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, error: "Unable to reset password" },
      { status: 500 }
    );
  }
}