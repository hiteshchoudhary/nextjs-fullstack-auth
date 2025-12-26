"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { z } from "zod";

// --- Validation Schema ---
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [needsVerification, setNeedsVerification] = useState(false);

  const validateField = (field: keyof FormData, value: string) => {
    try {
      loginSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) validateField(field, value);
    // Reset verification warning if user starts typing again
    if (needsVerification) setNeedsVerification(false);
  };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate Form
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    setNeedsVerification(false); // Reset state before attempt

    try {
      const response = await axios.post("/api/users/login", formData);
      toast.success("Login successful!");
      router.push("/profile");
    } catch (error: any) {
      console.log("Full Error Object:", error);
      const msg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Invalid credentials";

      // Check for specific backend error indicating unverified email
      if (
        msg.toLowerCase().includes("verified") ||
        error.response?.status === 403
      ) {
        setNeedsVerification(true);
        toast.error("Please verify your email first.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async () => {
    try {
      toast.loading("Sending verification email...");
      await axios.post("/api/users/resend-verification", {
        email: formData.email,
      });
      toast.dismiss();
      toast.success("Verification link sent! Check your inbox.");
      setNeedsVerification(false);
    } catch (error: any) {
      toast.dismiss();
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 rounded-xl mb-4 text-white shadow-lg shadow-slate-200">
            <LogIn size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Please enter your details to sign in
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onLogin} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-lg outline-none transition-all duration-200 
                  ${
                    errors.email
                      ? "border-red-300 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full pl-10 pr-12 py-3 bg-slate-50 border rounded-lg outline-none transition-all duration-200 
                  ${
                    errors.password
                      ? "border-red-300 focus:ring-2 focus:ring-red-100"
                      : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Dynamic Resend Verification Block */}
          {needsVerification && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex flex-col items-center text-center animate-in fade-in slide-in-from-top-2">
              <p className="text-sm text-amber-800 mb-2">
                Your email is not verified yet.
              </p>
              <button
                type="button"
                onClick={resendVerificationEmail}
                className="text-sm font-semibold text-amber-700 underline hover:text-amber-900"
              >
                Resend Verification Link
              </button>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-slate-900 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
