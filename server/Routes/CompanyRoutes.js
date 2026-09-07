import express from 'express'
import { changeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../Controllers/CompanyController.js'
import upload from '../Config/multer.js'
import { protectCompany } from '../Middlewares/AuthMiddleware.js'

const router = express.Router()

//Register Company
router.post('/register', upload.single('image'), registerCompany)

//Company Login
router.post('/login', loginCompany)

//Get Company Data
router.get('/company', protectCompany, getCompanyData)

//Post A New Job
router.post('/post-job', protectCompany, postJob)

//Get Applicants Data For Company
router.get('/applicants', protectCompany, getCompanyJobApplicants)

//Get Company Jobs List
router.get('/list-jobs', protectCompany, getCompanyPostedJobs)

//Change Applicant Status
router.post('/change-status', protectCompany, changeJobApplicationStatus)

//Change Application Visibility
router.post('/change-visibility', protectCompany, changeJobVisibility)

export default router

