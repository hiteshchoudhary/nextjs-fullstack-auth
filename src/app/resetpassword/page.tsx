"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = searchParam.get("token");
    if (token) {
      setToken(token);
    }
  }, [searchParam]);

  useEffect(() => {
    if (
      password.length > 0 &&
      confirmpassword.length > 0 &&
      password === confirmpassword
    ) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  }, [password, confirmpassword]);

  const resetPasswordHandler = async () => {
    console.log(password, confirmpassword);
    try {
      const resp = await axios.post("/api/users/resetpassword", {
        token,
        password,
      });
      console.log(resp);
      toast.success("Password reset successfully");
      router.replace('/login');
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Reset Password</h1>
      <hr />

      <label htmlFor="password">New Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your new password..."
      />

      <label htmlFor="confirmpassword">Confirm New Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="confirmpassword"
        type="password"
        value={confirmpassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
      />
      <button
        onClick={resetPasswordHandler}
        disabled={!passwordValid}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Reset Password
      </button>
      <Link href="/login">Visit Login page</Link>
      <Toaster/>
    </div>
  );
}
