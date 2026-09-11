import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets"
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import Loading from "../Components/Loading";

const ViewApplications = () => {

    const { BackEndUrl, companyToken } = useContext(AppContext);

    const [applicants, setApplicants] = useState([]);

    const fetchJobApplications = async () => {

        try {

            const response = await axios.get(`${BackEndUrl}/api/company/applicants`, { headers: { token: companyToken } });

            if (response.data.success) {

                setApplicants(response.data.jobApplicants.reverse());
                console.log("Fetched job applications:", response.data.jobApplicants.reverse());

            }

        } catch (error) {
            console.error("Error fetching job applications:", error);
            toast.error("Failed to fetch job applications");
        }
    }

    const handleChangeStatus = async (id, newStatus) => {

        try {

            console.log(id, newStatus)

            const response = await axios.post(`${BackEndUrl}/api/company/change-status`, { id, status: newStatus }, { headers: { token: companyToken } });

            if (response.data.success) {

                fetchJobApplications(); // Refresh the list of applicants after status change

            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.error("Error updating application status:", error);
            toast.error("Failed to update application status");
        }
    }

    useEffect(() => {

        // Fetch Job Applications Data From Backend
        fetchJobApplications();

    }, [companyToken]);

    return applicants ? applicants.length === 0 ? (<Loading />) : (
        <div className="container mx-auto p-4">
            <div>

                {/* Table Head  */}
                <table className="w-full max-w-4xl bg-white border border-gray-200 max-sm:text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 px-4 text-left">#</th>
                            <th className="py-2 px-4 text-left">User Name</th>
                            <th className="py-2 px-4 text-left max-sm:hidden">Job Title</th>
                            <th className="py-2 px-4 text-left max-sm:hidden">Location</th>
                            <th className="py-2 px-4 text-left">Resume</th>
                            <th className="py-2 px-4 text-left">Action</th>
                        </tr>
                    </thead>

                    {/* Table Body  */}
                    <tbody>
                        {applicants.filter(applicant => applicant.userId && applicant.jobId).map((application, index) => (

                            /* Individual Row For Each Job Application */
                            <tr className="text-gray-700" key={index}>
                                <td className="py-2 px-4 border-b text-center">{index + 1}</td>

                                {/* Job Applicant Name With Profile Picture */}
                                <td className="py-2 px-4 border-b text-center flex items-center">
                                    <img className="w-10 h-10 rounded-full mr-3 max-sm:hidden" src={application.userId.image} alt="" />
                                    <span>{application.userId.name}</span>
                                </td>

                                {/* Job Title */}
                                <td className="py-2 px-4 border-b max-sm:hidden">{application.jobId.title}</td>

                                {/* Job Location */}
                                <td className="py-2 px-4 border-b max-sm:hidden">{application.jobId.location}</td>

                                {/* Resume Download Option */}
                                <td className="py-2 px-4 border-b">
                                    <a href={application.userId.resume} target="_blank" className="bg-blue-50 text-blue-400 px-3 py-1 rounded inline-flex gap-2 items-center ">
                                        Resume
                                        <img src={assets.resume_download_icon} alt="" />
                                    </a>
                                </td>

                                {/* Action Buttons For Accepting Or Rejecting The Application */}
                                <td className="py-2 px-4 border-b relative">
                                    {application.status === "pending" ?
                                        <div className="relative inline-block text-left group">
                                            <button className="text-gray-500 action-button">...</button>

                                            {/* Dropdown Menu For Accepting Or Rejecting The Application */}
                                            <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block">
                                                <button onClick={() => handleChangeStatus(application._id, "accepted")} className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100">Accept</button>
                                                <button onClick={() => handleChangeStatus(application._id, "rejected")} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">Reject</button>
                                            </div>

                                        </div> : <div>{application.status}</div>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    ) : <div className="flex items-center justify-around min-h-screen">
        <p className="text-xl sm:text-2xl">No Application's Yet.</p>
    </div>
}

export default ViewApplications
