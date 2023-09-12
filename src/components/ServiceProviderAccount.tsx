import React from 'react';

const ServiceProviderAccount = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-4">Service Provider Account</h1>

        {/* Account information */}
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <p className="py-2 px-3 rounded border border-gray-700">John Doe</p>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <p className="py-2 px-3 rounded border border-gray-700">john@example.com</p>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold">
              Phone
            </label>
            <p className="py-2 px-3 rounded border border-gray-700">123-456-7890</p>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="services" className="text-sm font-semibold">
              Services Offered
            </label>
            <ul className="py-2 px-3 rounded border border-gray-700">
              <li>Service 1</li>
              <li>Service 2</li>
              <li>Service 3</li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2">
            <label htmlFor="jobs" className="text-sm font-semibold">
              Available Jobs
            </label>
            <ul className="py-2 px-3 rounded border border-gray-700">
              <li>Job 1</li>
              <li>Job 2</li>
              <li>Job 3</li>
            </ul>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full font-semibold transition duration-300 ease-in-out"
          >
            Subscribe
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-full font-semibold transition duration-300 ease-in-out"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderAccount;
