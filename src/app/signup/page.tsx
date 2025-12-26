"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus, Loader2 } from "lucide-react";
import { z } from "zod";

// --- Validation Schema ---
const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/\d/, "Must contain one number")
    .regex(/[@$!%*?&]/, "Must contain one special character"),
});

type FormData = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  // Real-time validation for touched fields
  const validateField = (field: keyof FormData, value: string) => {
    try {
      // Pick specific field from schema to validate
      const fieldSchema = signupSchema.shape[field];
      fieldSchema.parse(value);
      
      // Clear error if valid
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (error: any) {
      // Set error message
      setErrors((prev) => ({ ...prev, [field]: error.errors[0].message }));
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      setTouched({ username: true, email: true, password: true });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/users/signup", formData);
      toast.success("Account created! Please verify your email.");
      
      // Optional: clear form
      setFormData({ username: "", email: "", password: "" });
      
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed", error.message);
      toast.error(error.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 rounded-xl mb-4 text-white shadow-lg shadow-slate-200">
            <UserPlus size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create an account</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Start your journey with us today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSignup} className="space-y-5">
          
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
              Username
            </label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                id="username"
                type="text"
                placeholder="Enter a username"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-lg outline-none transition-all duration-200 
                  ${errors.username 
                    ? "border-red-300 focus:ring-2 focus:ring-red-100" 
                    : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                onBlur={() => handleBlur("username")}
              />
            </div>
            {errors.username && touched.username && (
              <p className="mt-1 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-lg outline-none transition-all duration-200 
                  ${errors.email 
                    ? "border-red-300 focus:ring-2 focus:ring-red-100" 
                    : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
              />
            </div>
            {errors.email && touched.email && (
              <p className="mt-1 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                className={`w-full pl-10 pr-12 py-3 bg-slate-50 border rounded-lg outline-none transition-all duration-200 
                  ${errors.password
                    ? "border-red-300 focus:ring-2 focus:ring-red-100" 
                    : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  }`}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onBlur={() => handleBlur("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="mt-1 text-xs text-red-500 font-medium animate-in slide-in-from-top-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 focus:ring-4 focus:ring-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-slate-900 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}