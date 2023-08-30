import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody =  await request.json()
        const {password} = reqBody;
        console.log("reqBody.password: " + reqBody.password);

        const email = request.cookies.get("email")?.value || '';
        console.log("Email: " + email)

        return NextResponse.json({
            message: "Create new pass successful",
            success: true,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}