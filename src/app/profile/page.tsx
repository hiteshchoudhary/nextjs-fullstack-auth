"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function profilePage(){

const router = useRouter();
const [data,setData]= useState("nothing")


const logOut=async()=>{
 await axios.get("/api/users/logout")
 toast.success("logged out successfully")
 router.push('/login')
}
const getuserDetails=async()=>{
    const res= await axios.get("/api/users/me")
    console.log(res)
    setData(res.data.data._id)

}

return (
  <div className="flex flex-col justify-center items-center min-h-screen bg-blue-300">
    <h1 className="text-3xl font-bold font-sans text-amber-50">PROFILE</h1>
    <hr />
    <h2 className="flex items-center justify-center bg-purple-200 rounded-2xl p-3 m-4">
      {data === "nothing" ? (
        "nothing"
      ) : (
        <Link href={`/profile/${data}`}>{data} </Link>
      )}
    </h2>

    <button
      className="bg-green-300 w-45 rounded-2xl p-3 m-4"
      onClick={getuserDetails}
    >
      Get User Details
    </button>

    <button className="bg-red-400 w-45 rounded-2xl p-3 m-4" onClick={logOut}>
      LogOut
    </button>
  </div>
);
}