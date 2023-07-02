"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

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
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="max-w-sm w-full mx-auto">
      <h1 className="font-bold text-4xl my-8">Signup</h1>

      {/* Username */}
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          className="input-field"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
          required
        />
      </div>

      {/* Email */}
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          className="input-field"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="example@email.com"
          required
        />
      </div>

      {/* Password */}
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          className="input-field"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
          required
        />
      </div>

      <div className="flex items-center gap-5">
        <button onClick={onSignup} className="btn btn-primary" disabled={buttonDisabled}>
          Signup
        </button>

        {loading && <p>Processing...</p>}
      </div>

      <span className="mt-4 text-sm">
        Already have an Account ? {""}
        <Link href="/login" className="underline hover:text-blue-500">
          Sign In
        </Link>{" "}
        {""}
        Here
      </span>
    </div>
  );
}
