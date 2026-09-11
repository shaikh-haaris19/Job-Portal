import { useState, useRef, useEffect, useContext } from "react";
import Quill from 'quill';
import { JobCategories, JobLocations } from "../assets/assets";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

const AddJobs = () => {

  const { BackEndUrl, companyToken } = useContext(AppContext);

  const [title, setTitle] = useState('');

  const [location, setLocation] = useState('Bangalore');

  const [category, setCategory] = useState('Programming');

  const [level, setLevel] = useState('Beginner Level');

  const [salary, setSalary] = useState(0);

  // State to hold the job description in rich text format
  const editorRef = useRef(null);

  // Ref to hold the Quill instance
  const quillRef = useRef(null);

  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {

      // Getting the job description from the Quill editor
      const jobDescription = quillRef.current.root.innerHTML;

      // Creating a job object with the form data
      const jobData = {
        title,
        description: jobDescription,
        location,
        salary,
        level,
        category
      };

      const response = await axios.post(`${BackEndUrl}/api/company/post-job`, jobData, { headers: { token: companyToken } });

      if (response.data.success) {

        toast.success("Job posted successfully!");

        // Resetting the form fields after successful submission
        setTitle('');
        setLocation('Bangalore');
        setCategory('Programming');
        setLevel('Beginner Level');
        setSalary(0);
        quillRef.current.root.innerHTML = '';

      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }

  };

  useEffect(() => {

    // Initializing the Quill editor when the component mounts
    if (!quillRef.current && editorRef.current) {

      // Creating a new Quill instance and attaching it to the editorRef
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }

  }, []);

  return (
    <form onSubmit={onSubmitHandler} className="container p-4 flex flex-col w-full items-start gap-3">

      <div className="w-full">
        <p className="mb-2">Job Title</p>
        <input className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter job title" required />
      </div>

      <div className="w-full max-w-lg">
        <p className="my-2">Job Description</p>
        <div ref={editorRef} />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">

        {/* Job Category Dropdown */}
        <div>
          <p className="mb-2">Job Category</p>
          <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" value={category} onChange={(e) => setCategory(e.target.value)}>
            {
              JobCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))
            }
          </select>
        </div>

        {/* Job Location */}
        <div>
          <p className="mb-2">Job Location</p>
          <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" value={location} onChange={(e) => setLocation(e.target.value)}>
            {
              JobLocations.map((location, index) => (
                <option key={index} value={location}>{location}</option>
              ))
            }
          </select>
        </div>

        {/* Job Level */}
        <div>
          <p className="mb-2">Job Level</p>
          <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="Beginner Level">Beginner Level</option>
            <option value="Intermediate Level">Intermediate Level</option>
            <option value="Senior Level">Senior Level</option>
          </select>
        </div>

      </div>

      {/* Salary */}
      <div>
        <p className="mb-2">Salary</p>
        <input min="0" className="w-full sm:w-30 px-3 py-2 border-2 border-gray-300 rounded" type="number" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Enter salary" required />
      </div>

      <button className="w-28 rounded hover:bg-gray-700 py-3 mt-4 bg-black text-white cursor-pointer" type="submit">Add</button>

    </form >
  )
}

export default AddJobs
