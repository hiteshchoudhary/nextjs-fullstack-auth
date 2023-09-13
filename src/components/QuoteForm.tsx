'use client'

import { useState } from "react";
import axios from "axios";

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    serviceName: "",
    location: "",
    budget: "",
    // Add other quote fields here
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      // Send the POST request to the API endpoint using Axios
      const response = await axios.post("/api/quote", formData);

      if (response.status === 201) {
        console.log("Quote request submitted successfully");
        // Handle success, e.g., show a success message
      } else {
        console.error("Error submitting quote request");
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle network error or other exceptions
    }
  };

  return (
    <div className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-4">Get a Quote</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="serviceName" className="block text-sm font-medium">
              Service Name
            </label>
            <input
              type="text"
              id="serviceName"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-medium">
              Budget
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {/* Add other quote fields here */}
          <div className="text-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;
