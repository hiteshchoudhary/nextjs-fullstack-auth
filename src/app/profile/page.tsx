"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  User,
  LogOut,
  RefreshCcw, 
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Mail,
  ShieldCheck,
  Fingerprint
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<string>("nothing");
  const [email, setEmail] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false); 
  const [loading, setLoading] = useState<boolean>(false); // For Logout
  const [fetchLoading, setFetchLoading] = useState<boolean>(false); // For getting details
  const [resendLoading, setResendLoading] = useState<boolean>(false); // For resending email

  const getUserDetails = async () => {
    setFetchLoading(true);
    try {
      const res = await axios.get("/api/users/me");
      const userData = res.data?.data;
      
      setData(userData?._id || "nothing");
      setIsVerified(userData?.isVerified || false);
      setEmail(userData?.email || "");
      
    } catch (error: any) {
      console.error("Failed to fetch user details");
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const onLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const onResendVerification = async () => {
    setResendLoading(true);
    try {
      await axios.post("/api/users/verify-email", { email });
      toast.success("Verification link sent! Check your inbox.");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send link");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        
        {/* Header / Avatar */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-500 shadow-inner">
            <User size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Profile Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your account details</p>
        </div>

        <div className="space-y-6">
          
          {/* Status Badge */}
          {data !== "nothing" && (
            <div className="flex justify-center">
              {isVerified ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 text-sm font-medium">
                  <ShieldCheck size={16} />
                  <span>Verified Account</span>
                </div>
              ) : (
                <div className="w-full bg-amber-50 border border-amber-100 rounded-xl p-4 flex flex-col items-center text-center animate-in fade-in">
                  <div className="flex items-center gap-2 text-amber-700 font-medium mb-2">
                    <AlertTriangle size={18} />
                    <span>Account Unverified</span>
                  </div>
                  <p className="text-xs text-amber-600/80 mb-3">
                    Please verify your email to access all features.
                  </p>
                  <button
                    onClick={onResendVerification}
                    disabled={resendLoading}
                    className="text-xs bg-white border border-amber-200 text-amber-700 px-3 py-1.5 rounded-md hover:bg-amber-50 hover:border-amber-300 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
                  >
                    {resendLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={12} />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail size={12} />
                        Resend Verification Link
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* User Details Card */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Fingerprint size={14} />
              User Identity
            </h2>
            
            {data === "nothing" ? (
              <p className="text-sm text-slate-500 italic">Loading user data...</p>
            ) : (
              <div className="flex flex-col gap-1">
                 <label className="text-[10px] text-slate-400 font-medium">UNIQUE ID</label>
                 <div className="bg-white border border-slate-200 rounded-lg p-3 font-mono text-sm text-slate-700 shadow-sm break-all">
                    {data}
                 </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={getUserDetails}
              disabled={fetchLoading}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all disabled:opacity-50"
            >
              {fetchLoading ? <Loader2 className="animate-spin" size={16} /> : <RefreshCcw size={16} />}
              Refresh
            </button>

            <button
              onClick={onLogout}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-medium hover:bg-red-100 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={16} /> : <LogOut size={16} />}
              Logout
            </button>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-slate-900 transition-colors"
          >
            Go to Home Page
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>
  );
}