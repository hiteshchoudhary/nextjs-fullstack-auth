import { NextResponse } from "next/server";

export async function POST() { 
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        response.cookies.set("token", "", { 
            httpOnly: true, 
            expires: new Date(0) 
        });

        return response;

    } catch (error: any) {
        console.error("Logout Error Details:", error);

        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}