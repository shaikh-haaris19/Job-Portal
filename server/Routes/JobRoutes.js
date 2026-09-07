import express from "express";
import { getJobById, getJobs } from "../Controllers/JobController.js";

// Create a new router instance
const router = express.Router();

//Routes To Get all Jobs Data
router.get('/', getJobs)

//Routes To Get Single Job By ID
router.get('/:id', getJobById)


export default router;