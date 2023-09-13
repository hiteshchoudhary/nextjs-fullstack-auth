import { Schema, model } from 'mongoose';

// Define the Subscription Schema
const subscriptionSchema = new Schema({
  planName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a Subscription model
const Subscription = model('Subscription', subscriptionSchema);

export default Subscription;
