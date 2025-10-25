import Job from "../models/jobModel.js";

//admin post job
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


//student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }

        const jobs = await Job.find(query);
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}


// for student
export const jobById = async (req, res) => {
    try {
        const jobId = req.params.id
        const jobs = await Job.findById({ jobId })

        if (!jobs) {
            return res.status(400).json({
                message: "Not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })



    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//count of jobs , whos created by admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId })

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }

        return res.status(200).json({
            jobs,
            success: true
        })


    } catch (error) {
        return res.status(200).json({
            message: "Internal server error",
            success: false
        }
        )
    }
}