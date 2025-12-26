// enable dynamic, since we're reading route params
export const dynamic = "force-dynamic";

import Link from "next/link";
import { User, ArrowLeft, Hash } from "lucide-react";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // params is now async, so await it
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              User Profile
            </h1>
            <p className="text-gray-600">View your profile information</p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-black mb-4 flex items-center">
                <Hash className="w-5 h-5 mr-2 text-indigo-600" />
                User ID
              </h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="font-mono text-sm text-black break-all">{id}</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/profile"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}