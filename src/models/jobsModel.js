import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    service: {
      type: String,
      ref: 'Service',
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  // Create a Job model
  const Job = mongoose.model('Job', jobSchema);
  
  module.exports = Job;