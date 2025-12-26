import { getDataFromTokens } from "@/helpers/getDataFromTokens";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import dbConnect from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const userId = await getDataFromTokens(request);

        const user = await User.findOne({ _id: userId }).select("username email isVerified");

        if (!user) {
            return NextResponse.json({
                message: "User not found in database",
                data: null
            }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });

    } catch (error: any) {
        console.error("Me Route Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}