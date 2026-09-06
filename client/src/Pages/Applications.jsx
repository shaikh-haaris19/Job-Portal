import { useEffect, useState } from 'react';
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { assets, jobsApplied } from '../assets/assets';

const Applications = () => {

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    if (resume) {
      console.log(resume)
    }
  }, [resume]);

  const statusColors = {
    "Accepted": "bg-green-100",
    "Rejected": "bg-red-100",
    "Pending": "bg-yellow-100"
  };

  return (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-2xl font-semibold'>Your Resume</h2>
        <div className='flex gap-2 mb-6 mt-4'>
          {
            isEdit ?
              <>
                <label className="flex items-center cursor-pointer" htmlFor="resumeUpload">

                  <p className="bg-blue-100 text-blue-600 mr-2 px-4 py-2 rounded-lg">Select Resume</p>

                  <input id="resumeUpload" onChange={(e) => setResume(e.target.files[0])} accept="application/pdf" type="file" hidden />

                  <img src={assets.profile_upload_icon} alt="" />

                </label>

                <button onClick={() => setIsEdit(false)} className="bg-green-100 border border-green-400 px-4 py-2 rounded-lg">Save</button>
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
              jobsApplied.map((job, index) => (
                <tr key={index}>
                  <td className="py-3 px-4 border-b">
                    <div className="flex items-center gap-2">
                      <img className="w-8 h-8" src={job.logo} alt="" />
                      {job.company}
                    </div>
                  </td>

                  <td className='py-2 px-4 border-b'>{job.title}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{job.date}</td>
                  <td className='py-2 px-4 border-b'>
                    <span className={`${statusColors[job.status]} px-4 py-1.5 rounded`}>
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
