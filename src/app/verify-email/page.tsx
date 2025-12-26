"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { CheckCircle2, XCircle, Loader2, Mail } from "lucide-react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyUserEmail = useCallback(async () => {
    setLoading(true);
    try {
      await axios.post("/api/users/verify-email", { token });
      setVerified(true);
      setError(false);
    } catch (err: any) {
      setError(true);
      console.error(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");
    if (urlToken) setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token, verifyUserEmail]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
        <div className="mb-6 flex justify-center">
          <div className="p-3 bg-blue-50 rounded-full text-blue-600">
            <Mail size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Email Verification</h1>
        <p className="text-slate-500 mb-8">
          {loading ? "Verifying your account..." : "Click below to finalize your registration."}
        </p>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-4">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <p className="text-sm text-slate-400 font-medium">Communicating with server...</p>
          </div>
        )}

        {/* Success State */}
        {verified && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center gap-4 py-4">
              <CheckCircle2 className="text-emerald-500" size={50} />
              <h2 className="text-xl font-semibold text-slate-800">Email Verified!</h2>
              <p className="text-slate-500 text-sm">Your account is now active and ready to use.</p>
            </div>
            <Link
              href="/login"
              className="mt-6 inline-block w-full bg-slate-900 text-white py-3 rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="flex flex-col items-center gap-4 py-4">
              <XCircle className="text-red-500" size={50} />
              <h2 className="text-xl font-semibold text-slate-800">Verification Failed</h2>
              <p className="text-slate-500 text-sm">
                The link is invalid or has expired. Please try requesting a new one.
              </p>
            </div>
            <Link
              href="/signup"
              className="mt-6 inline-block w-full border border-slate-200 text-slate-600 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Back to Signup
            </Link>
          </div>
        )}

        {/* Token Missing State */}
        {!token && !loading && !verified && !error && (
          <div className="py-4">
            <p className="text-amber-600 bg-amber-50 p-3 rounded-md text-sm">
              No verification token found in URL.
            </p>
          </div>
        )}
      </div>
      
      <footer className="mt-8 text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} AdityaBhosale22 Inc.
      </footer>
    </div>
  );
}