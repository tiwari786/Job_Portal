import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            })
        }

        //check if job exist
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            })
        }
        //create new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.application.push(newApplication._id);
        await job.save()
        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        })

    } catch (error) {
        return req.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}


export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        })

        if (!application) {
            return res.status(404).json({
                message: " No Application",
                success: false
            })
        }

        return res.status(200).json({
            application,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
};

//for admin 
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
                options: { sort: { createdAt: -1 } },
            }
        })

        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        };
        return res.status(200).json({
            job,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

