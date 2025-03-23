"use client";
import axios from "axios";
import toast from "react-hot-toast";

import { useEffect, useState } from "react";



export default function ForgotPasswordPage(){

const[email,setEmail]=useState("")


const onhandleSubmit = async(e:any)=>{
  e.preventDefault()
  try{
    const res = await axios.post("api/users/forgotpassword",{email})
    toast.success(res.data.message)

  }
  catch(error:any){
    toast.error(error.response.data.error)
  } 
}

return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700">
    <h1 className="text-3xl font-bold text-white">Forgot Password</h1>
    <form
      onSubmit={onhandleSubmit}
      className="flex flex-col space-y-4 mt-5 w-80"
    >
      <input
        type="text"
        className="p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Enter your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700">
        Send Reset Link
      </button>
    </form>
  </div>
);
}