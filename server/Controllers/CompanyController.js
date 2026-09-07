import Company from "../Models/companySchema.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import genToken from "../Utils/genToken.js";
import Job from "../Models/jobSchema.js";

//Register A New Company
export const registerCompany = async (req, res) => {

    try {

        const { name, email, password } = req.body

        const image = req.file;

        if (!name || !email || !password || !image) {
            return res.status(400).json({ success: false, message: "Missing Details" })
        }

        //Check If Company Already Exists
        const existingCompany = await Company.findOne({ email })

        if (existingCompany) {
            return res.status(400).json({ success: false, message: "Company Already Registered" })
        }

        //Company Does Not Exist, Create New Company

        //Hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Upload Image to Cloudinary
        const imageURL = await cloudinary.uploader.upload(image.path)

        //Create New Company
        const newCompany = new Company({
            name,
            email,
            password: hashedPassword,
            image: imageURL.secure_url
        })

        await newCompany.save()

        //Creates JWT Token for the Company
        const token = genToken(newCompany._id)

        return res.status(201).json({
            success: true,
            company: { _id: newCompany._id, name: newCompany.name, email: newCompany.email, image: newCompany.image },
            token
        })

    } catch (error) {

        console.error("Error registering company:", error)
        return res.status(500).json({ success: false, message: "Error Registering Company" })

    }

}

//Company Login
export const loginCompany = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing Details" })
        }

        // Find the company by email
        const company = await Company.findOne({ email })

        //Company Not Found
        if (!company) {
            return res.status(400).json({ success: false, message: "Company Not Found" })
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, company.password)

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }

        // Creates JWT Token for the Company
        const token = genToken(company._id)

        return res.status(200).json({
            success: true,
            company: { _id: company._id, name: company.name, email: company.email, image: company.image },
            token
        })

    } catch (error) {

        console.error("Error logging in company:", error)
        return res.status(500).json({ success: false, message: "Error Logging In Company" })

    }

}

//Get Company Data
export const getCompanyData = async (req, res) => {

    try {

    } catch (error) {

    }

}

//Post A New Job
export const postJob = async (req, res) => {

    const { title, description, location, salary, level, category } = req.body

    const companyId = req.company._id

    try {

        //Create New Job
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            level,
            category,
            companyId,
            date: Date.now()
        })

        await newJob.save()

        return res.status(201).json({
            success: true,
            newJob,
            message: "Job Posted Successfully"
        })

    }
    catch (error) {

        console.error("Error posting job:", error)
        return res.status(500).json({ success: false, message: "Error Posting Job" })

    }

}

//Get Comapany Job Applicants
export const getCompanyJobApplicants = async (req, res) => {

    try {

    } catch (error) {

    }

}

//Get Company Posted Jobs
export const getCompanyPostedJobs = async (req, res) => {

    try {

    } catch (error) {

    }

}

//Change Job Application Status
export const changeJobApplicationStatus = async (req, res) => {

    try {

    } catch (error) {

    }

}

//Job Visibility
export const changeJobVisibility = async (req, res) => {

    try {

    } catch (error) {

    }

}