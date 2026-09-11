import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import Loading from '../Components/Loading';
import Navbar from '../Components/Navbar';
import { assets } from '../assets/assets';
import kconvert from 'k-convert';
import Footer from '../Components/Footer';
import JobCard from '../Components/JobCard';
import axios from 'axios';
import { toast } from 'react-toastify';

const ApplyJob = () => {

  //Take job id from url params
  const { id } = useParams();

  const [jobData, setJobData] = useState(null);

  const { Jobs, BackEndUrl } = useContext(AppContext);

  const fetchJobData = async () => {

    try {
      
      const response = await axios.get(`${BackEndUrl}/api/jobs/${id}`);

      if (response.data.success) {
        setJobData(response.data.job);
      }

    } catch (error) {
      console.error("Error while fetching job data:", error);
      toast.error("Error while fetching job data");
    }

  }

  useEffect(() => {

    fetchJobData();

  }, [id]);

  return jobData ? (
    <>
      <Navbar />

      {/* Job Details Page */}
      <div className="min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto">
        <div className="bg-white text-black rounded-lg w-full">

          {/* Job Details Section */}
          <div className="flex justify-center md:justify-between flex-wrap gap-8 px-14 py-20 mb-6 bg-sky-50 border border-sky-400 rounded-xl">

            {/* Job Image and Details */}
            <div className="flex flex-col md:flex-row items-center">

              <img className='h-24 bg-white rounded-lg p-4 mr-4 max-md:mb-4 border' src={jobData.companyId.image} alt="" />

              <div className="text-center md:text-left text-neutral-700">

                <h1 className='text-2xl sm:text-4xl font-medium'>{jobData.title}</h1>

                {/* Job Details */}
                <div className="flex flex-wrap max-md:justify-center gap-y-2 gap-6 items-center text-gray-600 mt-2">

                  {/* Company Name */}
                  <span className='flex items-center gap-1'>
                    <img src={assets.suitcase_icon} alt="" />
                    <p>{jobData.companyId.name}</p>
                  </span>

                  {/* Company Location */}
                  <span className='flex items-center gap-1'>
                    <img src={assets.location_icon} alt="" />
                    <p>{jobData.location}</p>
                  </span>

                  {/* Job Level */}
                  <span className='flex items-center gap-1'>
                    <img src={assets.person_icon} alt="" />
                    <p>{jobData.level}</p>
                  </span>

                  {/* Job Salary */}
                  <span className='flex items-center gap-1'>
                    <img src={assets.money_icon} alt="" />
                    <p>{kconvert.convertTo(jobData.salary)}</p>
                  </span>

                </div>
              </div>
            </div>

            {/* Apply Now Button and Posted Date */}
            <div className="flex flex-col text-end text-sm max-md:mx-auto max-md:text-center justify-center">
              <button className='bg-blue-600 p-2.5 px-10 text-white rounded'>Apply Now</button>
              <p className="mt-1 text-gray-600">Posted On : {new Date(jobData.date).toLocaleDateString()}</p>
            </div>

          </div>

          {/* Job Description Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start">

            {/* Job Description and Apply Now Button */}
            <div className="w-full lg:w-2/3">
              <h2 className="font-bold text-2xl mb-4">Job Description</h2>
              <div className='rich-text' dangerouslySetInnerHTML={{ __html: jobData.description }} />
              <button className='bg-blue-600 p-2.5 px-10 text-white rounded mt-10'>Apply Now</button>
            </div>

            {/* More Jobs */}
            <div className='w-full lg:w-1/3 mt-8 lg:mt-0 lg:ml-8 space-y-5'>
              <h2>More Jobs From - {jobData.companyId.name}</h2>
              {
                Jobs.filter(job => job.companyId._id === jobData.companyId._id && job._id !== jobData._id)
                  .slice(0, 3)
                  .map((job, index) => (
                    <JobCard key={index} job={job} />
                  ))
              }
            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  )
    : (
      <Loading />
    )
}

export default ApplyJob
