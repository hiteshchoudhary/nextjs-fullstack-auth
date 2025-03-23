import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

connect()

export async function POST(request: NextRequest){
  try{
  const reqBody =  await request.json()
  const {token, newpassword} = reqBody
  console.log(reqBody)

  const user = await User.findOne({forgotPasswordToken: token,forgotPasswordTokenExpiry: {$gt: Date.now()}}) 

  if(!user){
    return NextResponse.json({error: "invalid token"},{status:400})
  }

  //hash password
  const salt = await bcryptjs.genSalt(10)
  const hashedpassword = await bcryptjs.hash(newpassword,salt)


//update password

user.password = hashedpassword
user.forgotPasswordToken =undefined
user.forgotPasswordTokenExpiry =undefined
 await user.save()

 return NextResponse.json({message: "user successfully created",success: true})
}catch(error: any){
  return NextResponse.json({error: error.message},{status:500})
}

}