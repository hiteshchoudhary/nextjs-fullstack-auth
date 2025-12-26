import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const reqbody = await request.json();
    const { email, password } = reqbody;

    // Validation check (Basic)
    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill all fields" },
        { status: 400 }
      );
    }
    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }
    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const responce = NextResponse.json({
      message: "Login successful",
      success: true,
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
    responce.cookies.set("token", token, {
      httpOnly: true,
    });

    return responce;
  } catch (error: any) {
    console.log("Login Error Details:", error);

    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
