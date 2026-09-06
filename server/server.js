import "./Config/instrument.js"
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './Config/mongoDB.js'
import * as Sentry from "@sentry/node"
import { clerkWebhook } from "./Middlewares/WebHooks.js"

//Initialize Express
const app = express()

//Port
const port = process.env.PORT || 5000

//Connect to MongoDB
await connectDB()

//MiddleWare
app.use(cors())             // Enable CORS for all routes
app.use(express.json())     // Parse incoming JSON requests


//Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.post('/webhooks', clerkWebhook )

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})