import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import { sendEmail } from "@/helpers/mailer";
import { error } from "console";
connect()

export async function POST(request:NextRequest){
try{
  const reqBody = await request.json()
  const {email} = reqBody
  console.log(reqBody)

  const user = await User.findOne({email})

  if(!user){
    return NextResponse.json({error: "invalid user"},{status: 400})
  }

  await sendEmail({email, emailtype:"RESET", userId: user._id})

  return NextResponse.json({message: "email send successfull",success: true})
}
catch(error:any){
  return NextResponse.json({error:error.message},{status:500})
}
}