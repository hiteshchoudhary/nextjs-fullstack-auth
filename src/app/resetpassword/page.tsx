"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import toast from "react-hot-toast";

export default function resetPasswordPage(){
  const [token, setToken]=useState("")
  const[newpassword, setNewPassword] =useState("")
  const router = useRouter()

  const onhandleSubmit=(async(e:any)=>{
     e.preventDefault();
    try{
     
      const res = await axios.post("api/users/resetpassword",{token,newpassword})
      toast.success(res.data.message)
      router.push('/login')

    }catch(error: any){
 toast.error(error.response.data.error)
    }
  })

  useEffect(()=>{
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "")
  },[])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700">
      <h1 className="text-3xl font-bold text-white">Reset Password</h1>
      
    
      <form
        onSubmit={onhandleSubmit}
        className="flex flex-col space-y-4 mt-5 w-80"
      >
        <input
          type="text"
          placeholder="Enter your new password"
          className="p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={newpassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}