"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Zap,
  Layout,
  Fingerprint,
  Database,
  Lock,
  ArrowRight,
  Terminal,
  Moon,
  Sun,
  Code2,
  Server,
  Layers,
} from "lucide-react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("/api/users/me");
        setIsLoggedIn(response.ok);
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Enterprise Security",
      description:
        "Bank-grade encryption with bcrypt and secure HTTP-only cookies to keep data safe.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description:
        "Optimized Next.js 15 routing ensures zero-latency transitions between protected pages.",
    },
    {
      icon: <Fingerprint className="w-6 h-6" />,
      title: "Identity Verification",
      description:
        "Robust email verification flow ensures real users and reduces spam registrations.",
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: "Modern UI/UX",
      description:
        "Built with Tailwind CSS for a seamless, responsive experience across all devices.",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Scalable Data",
      description:
        "Powered by MongoDB Aggregations for high-performance data retrieval.",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Edge Protection",
      description:
        "Middleware-based guards preventing unauthorized access at the edge.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="container mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-1.5 rounded-lg">
              <Layers size={20} />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              NextAuth<span className="text-slate-400">.Pro</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {loading ? (
              <div className="w-24 h-9 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
            ) : isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={async () => {
                    await fetch("/api/users/logout");
                    window.location.reload();
                  }}
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6 border border-blue-100 dark:border-blue-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            v2.0 is now live
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tight mb-8">
            The Foundation for your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
              Next Big Idea
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A production-ready authentication boilerplate. Stop rebuilding the
            same login flows and focus on shipping features that users love.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {loading ? (
              <div className="w-40 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse" />
            ) : isLoggedIn ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all active:scale-95"
              >
                Go to Dashboard <ArrowRight size={18} />
              </Link>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all active:scale-95 w-full sm:w-auto justify-center"
                >
                  Start Building <ArrowRight size={18} />
                </Link>
                <Link
                  href="/login"
                  className="flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 w-full sm:w-auto justify-center"
                >
                  View Demo
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* --- Features Grid --- */}
      <div className="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-white mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Tech Stack --- */}
      <div className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-slate-900 dark:bg-slate-800 rounded-3xl p-12 text-white shadow-2xl shadow-slate-200 dark:shadow-none">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold">Powered by the best</h2>
              <p className="text-slate-400 leading-relaxed">
                We've chosen a rock-solid tech stack to ensure your application
                scales from day one. No bloat, just performance.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Next.js 15",
                  "TypeScript",
                  "Tailwind",
                  "MongoDB",
                  "Zod",
                  "Axios",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-800 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-300 border border-slate-700 dark:border-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-slate-800 dark:bg-slate-700 p-4 rounded-xl border border-slate-700 dark:border-slate-600 flex items-center gap-3">
                <div className="p-2 bg-black rounded-lg">
                  <Code2 size={20} />
                </div>
                <span className="font-semibold">Type Safe</span>
              </div>
              <div className="bg-slate-800 dark:bg-slate-700 p-4 rounded-xl border border-slate-700 dark:border-slate-600 flex items-center gap-3">
                <div className="p-2 bg-green-900 text-green-400 rounded-lg">
                  <Server size={20} />
                </div>
                <span className="font-semibold">Server Actions</span>
              </div>
              <div className="bg-slate-800 dark:bg-slate-700 p-4 rounded-xl border border-slate-700 dark:border-slate-600 flex items-center gap-3">
                <div className="p-2 bg-blue-900 text-blue-400 rounded-lg">
                  <Terminal size={20} />
                </div>
                <span className="font-semibold">Modern CLI</span>
              </div>
              <div className="bg-slate-800 dark:bg-slate-700 p-4 rounded-xl border border-slate-700 dark:border-slate-600 flex items-center gap-3">
                <div className="p-2 bg-purple-900 text-purple-400 rounded-lg">
                  <Lock size={20} />
                </div>
                <span className="font-semibold">JWT Auth</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer --- */}
      <footer className="py-8 text-center border-t border-slate-200 dark:border-slate-800">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} NextAuth.Pro. Open Source MIT
          License.
        </p>
      </footer>
    </div>
  );
}
