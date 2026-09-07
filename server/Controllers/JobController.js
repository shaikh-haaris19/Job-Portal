import JobModel from "../Models/jobSchema.js"


//Get All Jobs - Endpoint Example -> http://localhost:5000/api/jobs
export const getJobs = async (req, res) => {

    try {

        const jobs = await JobModel.find({ visible: true })
            .populate({ path: 'companyId', select: '-password' })
        // Populate companyId field with company details, excluding the password

        res.json({ success: true, "allJobs": jobs })

    } catch (error) {

        console.error(error)
        res.status(500).json({ success: false, message: "Error fetching jobs" })

    }

}


//Get Single Job By ID : Endpoint Example -> http://localhost:5000/api/jobs/6a9e7eb88759131162614402 
export const getJobById = async (req, res) => {

    try {

        const { id } = req.params

        const job = await JobModel.findById(id)
            .populate({ path: 'companyId', select: '-password' })
        // Populate companyId field with company details, excluding the password

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" })
        }

        res.json({ success: true, job })

    } catch (error) {

        console.error(error)
        res.status(500).json({ success: false, message: "Error fetching job" })

    }

}