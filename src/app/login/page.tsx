"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { BeatLoader } from "react-spinners";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
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
          Login
        </h1>

        <div className="flex flex-col items-center justify-center  text-slate-500 space-y-5">
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
            onClick={onLogin}
            className="w-[90%] p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none hover:bg-slate-700 hover:text-amber-100 transition-colors duration-200 ease-in-out"
          >
            {loading ? <BeatLoader color="#fef3c7" size="10" /> : "Login"}
          </button>
          <h1 className="text-sm">
            Don't have an account?{" "}
            <span className="underline text-amber-100 opacity-50">
              <Link href="/signup">Create an account</Link>
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
