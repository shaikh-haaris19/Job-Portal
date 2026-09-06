import { Webhook } from 'svix'
import UserModel from '../Models/userSchema.js'


//API Controller Function to Manage Clerk User With Database
export const clerkWebhook = async (req, res) => {

    try {

        //Create a webhook instance with your Clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        //Verifying Headers
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        //Getting Data From Request Body
        const { type, data } = req.body

        //Switch Case For Different Events
        switch (type) {
            case 'user.created':

                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url,
                    resume: ''
                }

                //Create a new user in the database
                await UserModel.create(userData)
                res.json({})
                break;

            case 'user.updated':

                //Update the user in the database
                const updatedUserData = {
                    name: data.first_name + " " + data.last_name,
                    email: data.email_addresses[0].email_address,
                    image: data.image_url
                }

                await UserModel.findByIdAndUpdate(data.id, updatedUserData)
                res.json({})
                break;

            case 'user.deleted':
                //Delete the user from the database
                await UserModel.findByIdAndDelete(data.id)
                res.json({})
                break;

            default:
                console.log(`Unhandled event type: ${type}`);
                break;

        }

    } catch (error) {

        console.error('Error handling webhook:', error)
        res.status(500).json({ success: false, message: 'Webhook Error' })

    }


}

