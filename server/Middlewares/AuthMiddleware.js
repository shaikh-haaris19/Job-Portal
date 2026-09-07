import jwt from "jsonwebtoken";
import companyModel from "../Models/companySchema.js";

export const protectCompany = async (req, res, next) => {

    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ success: false, message: "Not Authorized, Login Again" })
    }

    try {

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the company data to the request object Excluding The Password
        req.company = await companyModel.findById(decoded.id).select("-password");

        next();

    } catch (error) {

        console.error("Error verifying token:", error.message);
        return res.status(401).json({ success: false, message: "Not Authorized, Invalid Token" });

    }

}