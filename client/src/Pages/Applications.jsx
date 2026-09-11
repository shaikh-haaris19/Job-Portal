import { useContext, useState } from 'react';
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';
import { useAuth } from "@clerk/react";
import axios from 'axios';
import { toast } from 'react-toastify';

const Applications = () => {

  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const { userData, userApplications, BackEndUrl, fetchUserData } = useContext(AppContext);

  const editResume = async () => {

    try {

      const formData = new FormData();
      formData.append('resume', resume);

      const token = await getToken();

      const response = await axios.post(`${BackEndUrl}/api/users/update-profile`, formData, { headers: { Authorization: `Bearer ${token}` } });

      if (response.data.success) {

        toast.success("Resume Updated Successfully");
        await fetchUserData(); // Refresh user data after updating resume

        // After updating the resume, show the edit button again and hide the file input
        setIsEdit(false);

      }
      else {
        toast.error("Error while updating resume");
      }

    } catch (error) {
      toast.error("Error while updating resume");
      console.error("Error while updating resume:", error);
    }

  }

  const statusColors = {
    "accepted": "bg-green-100",
    "rejected": "bg-red-100",
    "pending": "bg-yellow-100"
  };

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-2xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-4'>
          {
            isEdit || userData && userData.resume === "" ?
              <>
                <label className="flex items-center cursor-pointer" htmlFor="resumeUpload">

                  <p className="bg-blue-100 text-blue-600 mr-2 px-4 py-2 rounded-lg">{resume ? resume.name : "Select Resume"}</p>

                  <input id="resumeUpload" onChange={(e) => setResume(e.target.files[0])} accept="application/pdf" type="file" hidden />

                  <img src={assets.profile_upload_icon} alt="" />

                </label>

                <button onClick={() => editResume()} className="bg-green-100 border border-green-400 px-4 py-2 rounded-lg cursor-pointer">Save</button>
              </>
              :
              <div className='flex gap-2'>

                <a href="#" className='text-blue-600 bg-blue-100 px-4 py-2 rounded-lg'>Resume</a>

                <button className="text-gray-500 border border-gray-300 px-4 py-2 rounded-lg" onClick={() => setIsEdit(true)}>Edit</button>

              </div>
          }
        </div>

        <h2 className='text-xl font-semibold mb-4'>Jobs Applied</h2>
        <table className='min-w-full bg-white border rounded-lg'>

          {/* Table Headers */}
          <thead>

            <tr>
              <th className='py-3 px-4 border-b text-left'>Company</th>
              <th className='py-3 px-4 border-b text-left'>Job Title</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Location</th>
              <th className='py-3 px-4 border-b text-left max-sm:hidden'>Date</th>
              <th className='py-3 px-4 border-b text-left'>Status</th>
            </tr>

          </thead>

          {/* Table Body */}
          <tbody>
            {
              userApplications.map((job, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 border-b">
                    <div className="flex items-center gap-2">
                      <img className="w-8 h-8" src={job.companyId.image} alt="" />
                      {job.companyId.name}
                    </div>
                  </td>

                  <td className='py-2 px-4 border-b'>{job.jobId.title}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{job.jobId.location}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{new Date(job.date).toLocaleDateString()}</td>
                  <td className='py-2 px-4 border-b'>
                    <span className={`${statusColors[job.status]} p-2 rounded`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </table>

      </div>
      <Footer />
    </>
  )
}

export default Applications
