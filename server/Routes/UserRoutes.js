import express from 'express'
import { applyForJob, getUserAppliedApplications, getUserData, updateUserProfile } from '../Controllers/UserController.js'
import upload from '../Config/multer.js'

const router = express.Router()

//Get User Data
router.get('/users', getUserData)

//Apply For Job
router.post('/apply', applyForJob)

//Get User Applied Job Data
router.get('/applications', getUserAppliedApplications)

//Update User Profile (Only Resume)
router.post('/update-profile', upload.single('resume'), updateUserProfile)

export default router