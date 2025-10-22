import Job from "../models/jobModel";

export const createJob = async (req, res) => {
    try {
        const { title, description, requiremnets, salary, location, jobType, experience, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requiremnets || !salary || !location || !jobType || !experience || !companyId) {
            return req.status(400).json({
                message: "All fields are required",
                success: false
            })
        }

        const job = await Job.create({
            title,
            description,
            requiremnets: requiremnets.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            company: companyId,
            created_by: userId

        })

        return res.status(201).json({
            message: "Job created successfully",
            job,
            success: true
        })

    } catch (error) {
        req.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}



export const getAllJobs = async (req, res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            success: false
        })
    }
}