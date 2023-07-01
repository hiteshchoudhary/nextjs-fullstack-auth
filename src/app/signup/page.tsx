"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BeatLoader } from "react-spinners";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <div className=" h-96 w-80  bg-slate-800 shadow-2xl shadow-slate-900 rounded-lg border border-amber-100  p-2 flex flex-col justify-center space-y-5 ">
        <span className=" text-2xl font-semibold text-amber-100 w-full text-center  ">
          HC
        </span>
        <h1 className=" text-lg font-semibold text-amber-100 w-full text-center  ">
          Sign Up
        </h1>

        <div className="flex flex-col items-center justify-center  text-slate-500 space-y-5">
          <input
            className="rounded-md w-[90%] px-2 py-1 focus:outline-none "
            id="username"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />

          <input
            className="rounded-md w-[90%] px-2 py-1 focus:outline-none "
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
          <input
            className="rounded-md w-[90%] px-2 py-1 focus:outline-none "
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />

          <button
            onClick={onSignup}
            className="w-[90%] p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none hover:bg-slate-700 hover:text-amber-100 transition-colors duration-200 ease-in-out"
          >
            {loading ? (
              <BeatLoader color="#fef3c7" size="10" />
            ) : (
              "Create Account"
            )}
          </button>
          <h1 className="text-sm">
            Have an account?{" "}
            <span className="underline text-amber-100 opacity-50">
              <Link href="/login">Sign In</Link>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
