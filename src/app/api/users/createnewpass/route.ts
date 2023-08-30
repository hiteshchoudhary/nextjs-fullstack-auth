import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody =  await request.json()
        const {email, password} = reqBody;
        console.log("reqBody.password001: " + reqBody.password);

        return NextResponse.json({
            message: "Create new pass successful",
            success: true,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}