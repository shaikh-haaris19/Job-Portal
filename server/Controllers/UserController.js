import User from "../Models/userSchema.js"
import JobApplication from "../Models/JobApplicationSchema.js"
import JobModel from "../Models/jobSchema.js"

//Get User Data
export const getUserData = async (req, res) => {

    try {

        const userId = req.auth.userId

        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" })
        }

        res.json({
            success: true,
            user
        })

    } catch (error) {

        console.error("Error fetching user data:", error)
        res.status(500).json({ success: false, message: "Error fetching user data" })

    }

}

//Apply For Job
export const applyForJob = async (req, res) => {

    try {

        const { jobId } = req.body
        const userId = req.auth.userId

        //Check If User Already Applied For The Job
        const isAlreadyApplied = await JobApplication.findOne({ userId, jobId })

        if (isAlreadyApplied) {
            return res.status(400).json({ success: false, message: "You have already applied for this job" })
        }

        //Find The Job Data To Which User Is Applying
        const jobData = await JobModel.findById(jobId)

        if (!jobData) {
            return res.status(404).json({ success: false, message: "Job Not Found" })
        }

        //Create New Job Application
        const newApplication = new JobApplication({
            userId,
            companyId: jobData.companyId,
            jobId,
            date: Date.now()
        })

        await newApplication.save()

        res.json({ success: true, message: "Job application submitted successfully" })

    } catch (error) {

        console.error("Error applying for job:", error)
        res.status(500).json({ success: false, message: "Error applying for job" })

    }

}

//Get User Applied Applications
export const getUserAppliedApplications = async (req, res) => {

    try {

    } catch (error) {

    }

}

//Update User Profile (Only Resume)
export const updateUserProfile = async (req, res) => {

    try {

    } catch (error) {

    }

}   