import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext';
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {

    const { searchFilter, isSearched, setSearchFilter, Jobs } = useContext(AppContext);

    const [showFilters, setShowFilters] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    const [filteredJobs, setFilteredJobs] = useState(Jobs);

    const handleCategoryChange = (category) => {

        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    }

    const handleLocationChange = (location) => {

        if (selectedLocations.includes(location)) {
            setSelectedLocations(selectedLocations.filter(l => l !== location));
        } else {
            setSelectedLocations([...selectedLocations, location]);
        }
    }

    useEffect(() => {

        // Filter the jobs based on selected categories and locations
        const matchesCategory = (job) => selectedCategories.length === 0 || selectedCategories.includes(job.category);

        const matchesLocation = (job) => selectedLocations.length === 0 || selectedLocations.includes(job.location);

        // Filter the jobs based on search filter
        const matchesTitle = (job) => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase()); 

        const matchesLocationSearch = (job) => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

        // Filter the jobs based on all criteria
        const filteredJobs = Jobs.slice().reverse().filter(job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesLocationSearch(job));

        setFilteredJobs(filteredJobs);
        setCurrentPage(1); // Reset to first page whenever filters change

    }, [selectedCategories, selectedLocations, searchFilter, Jobs]);

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>

            {/* Side bar with filters */}
            <div className='w-full lg:w-1/4 bg-white px-4'>

                {/* Search Filter From Hero Component will be used here to filter the job listings. */}
                {
                    isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (

                        <>
                            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
                            <div className='mb-4 text-gray-600'>
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                                        {searchFilter.title}
                                        <img className='cursor-pointer' onClick={() => setSearchFilter(prev => ({ ...prev, title: '' }))} src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                                        {searchFilter.location}
                                        <img className='cursor-pointer' onClick={() => setSearchFilter(prev => ({ ...prev, location: '' }))} src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                            </div>
                        </>

                    )
                }

                <button className="px-6 py-1.5 rounded border border-gray-400 lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                    {showFilters ? "Hide Filters" : "Show Filters"}
                </button>

                {/* Category Filter  */}
                <div className={showFilters ? "" : "max-lg:hidden"}>
                    <h4 className="font-medium text-lg py-4">Search By Categories</h4>
                    <ul className='text-gray-600 ml-2 space-y-4'>
                        {
                            JobCategories.map((category, index) => (
                                <li className="flex items-center gap-3" key={index}>
                                    <input className="scale-125" type="checkbox" onChange={() => handleCategoryChange(category)} id={`category-${index}`} />

                                    <label htmlFor={`category-${index}`}>{category}</label>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* Loaction Filter  */}
                <div className={showFilters ? "" : "max-lg:hidden"}>
                    <h4 className="font-medium text-lg py-4 pt-14">Search By Location</h4>
                    <ul className='text-gray-600 ml-2 space-y-4'>
                        {
                            JobLocations.map((location, index) => (
                                <li className="flex items-center gap-3" key={index}>
                                    <input className="scale-125" type="checkbox" onChange={() => handleLocationChange(location)} id={`location-${index}`} />
                                    <label htmlFor={`location-${index}`}>{location}</label>
                                </li>
                            ))
                        }
                    </ul>
                </div>

            </div>

            {/* Job Listings */}
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>

                <h3 className='font-medium text-3xl py-2' id="job-list">Latest Jobs</h3>
                <p className='mb-8'>Get Your Desired Job From Top Companies</p>

                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {
                        filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                            <JobCard key={index} job={job} />
                        ))
                    }
                </div>

                {/* Pagination */}
                {
                    filteredJobs.length > 0 && (
                        <div className='flex items-center justify-center space-x-2 mt-10'>
                            <a href="#job-list">
                                <img onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} src={assets.left_arrow_icon} alt="" />
                            </a>
                            {
                                Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                                    <a key={index} href="#job-list">
                                        <button onClick={() => setCurrentPage(index + 1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}>{index + 1}</button>
                                    </a>
                                ))
                            }
                            <a href="#job-list">
                                <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt="" />
                            </a>

                        </div>
                    )
                }

            </section>

        </div>
    )
}

export default JobListing
