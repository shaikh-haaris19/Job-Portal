import express from 'express'
import { changeJobApplicationStatus, changeJobVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../Controllers/CompanyController.js'

const router = express.Router()

//Register Company
router.post('/register', registerCompany)

//Company Login
router.post('/login', loginCompany)

//Get Company Data
router.get('/company', getCompanyData)

//Post A New Job
router.post('/post-job', postJob)

//Get Applicants Data For Company
router.get('/applicants', getCompanyJobApplicants)

//Get Company Jobs List
router.get('/list-jobs', getCompanyPostedJobs)

//Change Applicant Status
router.post('/change-status', changeJobApplicationStatus)

//Change Application Visibility
router.post('/change-visibility', changeJobVisibility)

export default router

