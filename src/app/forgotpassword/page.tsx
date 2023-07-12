"use client";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onSendVerificationEmail = async () => {
    setLoading(true);
    try {
      const resp = await axios.post("/api/users/verifypasswordemail", {email});
      console.log(resp);
      toast.success("Reset password link send to your email");
      setEmail("");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">
        Send Verification Link to register user email
      </h1>
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email..."
      />
      <button
        onClick={onSendVerificationEmail}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        disabled={!email || isLoading}
      >
        {isLoading ? 'Sending...' : 'Send Verification'}
      </button>
      <Link href="/login">Visit login page</Link>
      <Toaster/>
    </div>
  );
}
