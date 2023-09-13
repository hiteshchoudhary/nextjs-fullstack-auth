import Job from '../../../models/jobsModel'



export default async function POST(req, res) {
   
      try {
        const { serviceName, location, budget /* other quote fields */ } = req.body;
  
        // Create a new job based on the quote request
        const job = new Job({
          service: serviceName, // Assuming serviceName corresponds to a service ID or name
          location,
          budget,
          // Add other job-related fields here
        });
  
        // Save the job to the database
        await job.save();
  
        return res.status(201).json({ message: "Quote request submitted successfully" });
      } catch (error) {
        console.error("Error submitting quote request:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    
  }
  