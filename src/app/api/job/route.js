// pages/api/jobs.js
import { connect } from '@/dbConfig/dbConfig'; // Import your database connection module
import Job from '@/models/jobModel'; // Import your job model
import { NextApiRequest, NextApiResponse } from 'next';

// Establish a database connection
connect();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Handle GET request to fetch jobs
    try {
      const jobs = await Job.find();
      return res.status(200).json(jobs);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching jobs' });
    }
  } else if (req.method === 'POST') {
    // Handle POST request to create a new job
    const { title, description } = req.body;

    try {
      const newJob = new Job({ title, description });
      const savedJob = await newJob.save();
      return res.status(201).json(savedJob);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating job' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
