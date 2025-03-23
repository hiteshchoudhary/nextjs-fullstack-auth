"use client";
import { NextRequest, NextResponse } from "next/server";
import Router from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function VerifyEmailPage() {
const[token,setToken] = useState("")
const [verified,setVerified] = useState(false)
const [error,setError] = useState(false)

const verifyUserEmail = async () => {
  try {
    await axios.post("api/users/verifyemail", { token });
    console.log("Received Token:", token);

    setVerified(true);
  } catch (error: any) {
    setError(true);
    console.log(error.response.data);
  }
};

useEffect(()=>{
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
})

useEffect(()=>{
    if(token.length > 0){
        verifyUserEmail()
    }
},[token])
return (
  <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 font-sans">
    <h1 className="text-3xl font-bold font-sans text-amber-50">Verify Email</h1>
    <h2 className="hidden">{token ? `${token}` : "no token"}</h2>
    {verified && (
      <div>
        <h2 className="flex items-center justify-center bg-purple-200 rounded-2xl p-3 m-4">
          Email verified
        </h2>
        <Link
          className="flex justify-center items-center w-full p-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-purple-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 mb-4 border border-black
 "
          href="/login"
        >
          Login
        </Link>
      </div>
    )}
    {error && (
      <div>
        <h2>Error</h2>
      </div>
    )}
  </div>
);

}
