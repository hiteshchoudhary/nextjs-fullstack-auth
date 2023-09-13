"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { NextResponse } from 'next/server';

export default function LoginPage() {
  const router = useRouter() || {};
  
  const [serviceProvider, setServiceProvider] = React.useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/serviceProviders/login', serviceProvider);
      console.log('Login success', response.data);
      
      router.push('/profile');
    } catch (error) {
      console.log('Login failed');
      return NextResponse.json({message: "signup failed"},{status:500})
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (serviceProvider.email.length > 0 && serviceProvider.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [serviceProvider]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-semibold mb-4">{loading ? 'Processing' : 'Login'}</h1>
      <hr className="w-20 border-t border-gray-400 mb-4" />

      <label htmlFor="email" className="text-lg mb-2">
        Email
      </label>
      <input
        className="p-2 bg-gray-700 rounded-lg mb-4 w-full focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        value={serviceProvider.email}
        onChange={(e) => setServiceProvider({ ...serviceProvider, email: e.target.value })}
        placeholder="Email"
      />

      <label htmlFor="password" className="text-lg mb-2">
        Password
      </label>
      <input
        className="p-2 bg-gray-700 rounded-lg mb-4 w-full focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={serviceProvider.password}
        onChange={(e) => setServiceProvider({ ...serviceProvider, password: e.target.value })}
        placeholder="Password"
      />

      <button
        onClick={onLogin}
        disabled={buttonDisabled}
        className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg w-full focus:outline-none"
      >
        {loading ? 'Logging In...' : 'Login'}
      </button>

      <Link href="/signup" className="text-blue-500 mt-4">
        Visit Signup page
      </Link>
    </div>
  );
}
