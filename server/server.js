import "./Config/instrument.js"
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './Config/mongoDB.js'
import * as Sentry from "@sentry/node"
import { clerkWebhook } from "./Controllers/WebHooks.js"
import dns from "dns"
import companyRoutes from "./Routes/CompanyRoutes.js"
import connectCloudinary from "./Config/cloudinary.js"
import { v2 as cloudinary } from "cloudinary"

// Force Node.js to use Cloudflare + Google DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

//Initialize Express
const app = express()

//Port
const port = process.env.PORT || 5000

//Connect to MongoDB
await connectDB()

//Connect to Cloudinary
await connectCloudinary()

//MiddleWare
app.use(cors())             // Enable CORS for all routes
app.use(express.json())     // Parse incoming JSON requests


//Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Sentry error testing route
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

// Webhook route for Clerk
app.post('/webhooks', clerkWebhook )

// Use the company routes for /api/company
app.use('/api/company', companyRoutes) 

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})