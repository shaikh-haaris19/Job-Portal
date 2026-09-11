import User from "../Models/userSchema.js"
import JobApplication from "../Models/JobApplicationSchema.js"
import JobModel from "../Models/jobSchema.js"
import { v2 as Cloudinary } from "cloudinary"
import { getAuth } from "@clerk/express";

//Get User Data
export const getUserData = async (req, res) => {

    try {

        const { userId } = getAuth(req);

        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, message: "User Not Found" })
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
        const { userId } = getAuth(req);

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

        const { userId } = getAuth(req);

        // Find all job applications for the user and populate company and job details
        const applications = await JobApplication.find({ userId })
            .populate('companyId ', 'name email image')
            .populate('jobId', 'title description location salary level category')
            .exec()

        if (!applications || applications.length === 0) {
            return res.status(404).json({ success: false, message: "No applications found for this user" })
        }

        return res.json({ success: true, "Applied-Applications": applications })

    } catch (error) {

        console.error("Error fetching user applications:", error)
        res.status(500).json({ success: false, message: "Error fetching user applications" })

    }

}

//Update User Profile (Only Resume)
export const updateUserProfile = async (req, res) => {

    try {

        const { userId } = getAuth(req);

        const resume = req.file

        //Gets User With The Corresponding UserId
        const user = await User.findById(userId)

        //If Resume Uploaded Then Create Secure Url From Cloudinary And Change The Resume In User DB
        if (resume) {

            const resumeUrl = await Cloudinary.uploader.upload(resume.path)

            user.resume = resumeUrl.secure_url

            await user.save()

            return res.json({ success: true, message: "Resume updated successfully" })

        }

    } catch (error) {

        console.error("Error updating user profile:", error)
        res.status(500).json({ success: false, message: "Error updating user profile" })

    }

}   