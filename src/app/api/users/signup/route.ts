import dbConnect  from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    try {
        // 1. Ensure DB is connected BEFORE processing
        await dbConnect();

        const reqbody = await request.json();
        const { username, email, password } = reqbody;

        // Validation check (Basic)
        if (!username || !email || !password) {
            return NextResponse.json({ error: "Please fill all fields" }, { status: 400 });
        }

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" }, 
                { status: 400 }
            );
        }

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. Create and Save user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log("User Saved:", savedUser);

        await sendEmail({
            email: savedUser.email,
            emailType: "VERIFY",
            userId: savedUser._id,
        });

        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email
            },
        });

    } catch (error: any) {
        
        console.error("Signup Error Details:", error); 
        
        return NextResponse.json(
            { error: error.message || "Internal Server Error" }, 
            { status: 500 }
        );
    }
}