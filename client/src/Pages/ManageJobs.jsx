import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../Context/AppContext"

const ManageJobs = () => {

  const navigate = useNavigate()

  const { BackEndUrl, companyToken } = useContext(AppContext);

  const [jobs, setJobs] = useState([])

  // Function to Fetch Company Job Applications Data
  const fetchCompanyJobApplications = async () => {

    try {

      // Fetching the job applications data from the backend API
      const response = await axios.get(`${BackEndUrl}/api/company/list-jobs`, { headers: { token: companyToken } });

      if (response.data.success) {

        setJobs(response.data.postedJobs.reverse());

      } else {
        toast.error("Failed to fetch job applications!");
      }

    } catch (error) {
      toast.error("Error while fetching job applications:", error);
    }
  }

  const handleChangeVisibility = async (jobId) => {

    try {

      const response = await axios.post(`${BackEndUrl}/api/company/change-visibility`, { jobId }, { headers: { token: companyToken } });

      if (response.data.success) {

        toast.success("Job visibility changed successfully!");
        fetchCompanyJobApplications(); // Refresh the job applications data after changing visibility

      } else {
        toast.error("Failed to change job visibility!");
      }

    } catch (error) {
      toast.error("Error while changing job visibility:", error);
    }

  }

  useEffect(() => {

    if (companyToken) {

      fetchCompanyJobApplications();

    }
  }, [companyToken]);

  return (
    <div className="container p-4 max-w-5xl">

      {/* Manage Jobs Table */}
      <div className="overflow-x-auto">

        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">

          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Date</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 border-b text-center">Applicants</th>
              <th className="py-2 px-4 border-b text-left">Visible</th>
            </tr>
          </thead>

          <tbody>
            {
              jobs.map((job, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="py-2 px-4 border-b max-sm:hidden">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{job.title}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">{new Date(job.date).toLocaleDateString()}</ td>
                  <td className="py-2 px-4 border-b max-sm:hidden">{job.location}</td>
                  <td className="py-2 px-4 border-b text-center">{job.applicants}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <input onChange={() => handleChangeVisibility(job._id)} className="scale-125" type="checkbox" checked={job.visible} />
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>
      </div>

      {/* Add Job Button */}
      <div className="mt-4 flex justify-end">
        <button onClick={() => navigate('/dashboard/add-jobs')} className="w-28 rounded hover:bg-gray-700 py-3 mt-4 bg-black text-white cursor-pointer" type="submit">Add New Job</button>
      </div>


    </div>
  )
}

export default ManageJobs
