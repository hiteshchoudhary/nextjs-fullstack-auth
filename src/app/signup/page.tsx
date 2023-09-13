"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";

export default function SignupPage() {
  const router = useRouter();
  const [serviceProvider, setServiceProvider] = React.useState({
    email: "",
    password: "",
    phone: "",
    services: ["", "", ""],
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/serviceProviders/signup", serviceProvider);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error) {
      console.log("Signup failed");
      return NextResponse.json({error: "Internal server error" }, {status:500})
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      serviceProvider.email.length > 0 &&
      serviceProvider.password.length > 0 &&
      serviceProvider.phone.length > 0 &&
      serviceProvider.services.some((service) => service.length > 0)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [serviceProvider]);

  const handleServiceChange = (index:any, value:any) => {
    const updatedServices = [...serviceProvider.services];
    updatedServices[index] = value;
    setServiceProvider({ ...serviceProvider, services: updatedServices });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-900 text-white">
      <h1 className="text-3xl">{loading ? "Processing" : "Signup As a service Provider"}</h1>
      <hr className="w-16 border-t-2 border-gray-300 my-4" />

      <label htmlFor="email" className="mt-4">
        Email
      </label>
      <input
        className="input-field"
        id="email"
        type="text"
        value={serviceProvider.email}
        onChange={(e) => setServiceProvider({ ...serviceProvider, email: e.target.value })}
        placeholder="Email"
      />

      <label htmlFor="password" className="mt-4">
        Password
      </label>
      <input
        className="input-field"
        id="password"
        type="password"
        value={serviceProvider.password}
        onChange={(e) => setServiceProvider({ ...serviceProvider, password: e.target.value })}
        placeholder="Password"
      />

      <label htmlFor="phone" className="mt-4">
        Phone Number
      </label>
      <input
        className="input-field"
        id="phone"
        type="number"
        value={serviceProvider.phone}
        onChange={(e) => setServiceProvider({ ...serviceProvider, phone: e.target.value })}
        placeholder="Phone Number"
      />

      <label className="mt-4">Services Offered (Up to 3)</label>
      {serviceProvider.services.map((service, index) => (
        <input
          key={index}
          className="input-field"
          type="text"
          placeholder={`Service ${index + 1}`}
          value={service}
          onChange={(e) => handleServiceChange(index, e.target.value)}
        />
      ))}

      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className={`button ${buttonDisabled ? "button-disabled" : ""}`}
      >
        {loading ? "Processing" : "Signup"}
      </button>

      <Link href="/login" className="text-blue-500 mt-4">
        Visit login page
      </Link>

      <style jsx>{`
        .input-field {
          padding: 0.5rem;
          border: 1px solid #333;
          border-radius: 0.25rem;
          margin-top: 0.5rem;
          width: 100%;
          background-color: #444;
          color: #fff;
        }
        .button {
          padding: 0.5rem 1rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
        }
        .button-disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
