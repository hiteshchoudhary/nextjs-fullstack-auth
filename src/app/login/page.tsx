"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function signUpPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setbuttonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const Login = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      // console.log("successfully logged in", response.data);
      toast.success(response.data.message)
     setTimeout(()=>{
      router.push('/profile')
     },2500)
     
    } catch (error: any) {
      console.log("login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
     
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 font-sans">
      <div className="flex flex-col items-center justify-center bg-gradient-to-br from-purple-950 via-purple-800 to-purple-700 p-6 rounded-2xl border border-purple-600 w-full sm:w-96 max-w-lg gap-y-4 shadow-lg shadow-purple-900">
        <Toaster />
        <h1 className="text-3xl font-extrabold text-white  drop-shadow-lg">
          {loading ? "Processing" : "Login"}
        </h1>
        <hr />
        <div className="flex flex-col items-start w-full mb-4">
          <label
            htmlFor="email"
            className="text-lg font-semibold text-white mb-2"
          >
            Email
          </label>
          <input
            className="w-full p-3 border border-gray-500 rounded-lg mb-4 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
            type="text"
            id="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label
            className="text-lg font-semibold text-white mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full p-3 border border-gray-500 rounded-lg mb-4 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
            type="password"
            id="password"
            placeholder="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          className="w-full p-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-purple-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300 mb-4"
          onClick={Login}
        >
          {buttonDisabled ? "No Login" : "Login"}
        </button>

        <Link className="text-white" href="/signup">
          Visit Signup page
        </Link>
        <div className="mt-4">
          <Link
            href="/forgotpassword"
            className="text-blue-500 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  );
}
