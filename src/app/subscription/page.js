'use client'
import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js'

const SubscriptionPage = () => {
  const paypalOptions = {
    clientId: process.env.PAYPAL_CLIENT_ID,
    currency: 'USD',
  };

  const onApprove = (data, actions) => {
    // Handle subscription approval and save payment details to your database
    // You can also redirect to a success page
    console.log('Payment approved:', data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gray-900 text-white">
      <h1 className="text-3xl mb-4">Subscribe to Our Service</h1>

      <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
        <h2 className="text-xl mb-2">Choose a Subscription Plan:</h2>
        <div className="mb-4">
          {/* Subscription Plan 1 */}
          <label className="block">
            <input type="radio" name="plan" value="plan1" />
            <span className="ml-2 text-lg">Plan 1 - $10/month</span>
          </label>

          {/* Subscription Plan 2 */}
          <label className="block">
            <input type="radio" name="plan" value="plan2" />
            <span className="ml-2 text-lg">Plan 2 - $20/month</span>
          </label>

          {/* Add more subscription plans as needed */}
        </div>

        <PayPalButtons
          options={paypalOptions}
          createSubscription={(data, actions) => {
            return actions.subscription.create({
              plan_id: process.env.PAYPAL_CLIENT_ID, // Replace with your PayPal plan ID
            });
          }}
          onApprove={onApprove}
          style={{
            color: 'gold',
            shape: 'pill',
            label: 'subscribe',
          }}
        />
      </div>
    </div>
  );
};

export default SubscriptionPage;
