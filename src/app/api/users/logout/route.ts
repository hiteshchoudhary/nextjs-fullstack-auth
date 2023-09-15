import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )

        // deleting the existing cookie, in the video cookie was deleted by ending the date. 
        response.cookies.delete("token");
        
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
        
    }

