"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  // While Loading or Form is not filledup disable the button
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  // Determine Loading when login button is Clicked
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
    <div className="max-w-sm w-full mx-auto">
      <h1 className="font-bold text-4xl my-8">Login</h1>

      {/* Email Field */}
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input className="input-field" id="email" type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="Email" />
      </div>

      {/* Password Field */}
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          className="input-field"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        />
      </div>

      {/* Submit Button and Progress Bar */}
      <div className="flex items-center gap-5">
        <button onClick={onLogin} className="btn btn-primary">
          Login here
        </button>

        {loading && <p>Processing...</p>}
      </div>

      <span className="mt-4 text-sm">
        Not have an Account ? {""}
        <Link href="/signup" className="underline hover:text-blue-500">
          Sign Up
        </Link>{" "}
        {""}
        Here
      </span>
    </div>
  );
}
