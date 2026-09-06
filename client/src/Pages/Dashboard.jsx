import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"

const Dashboard = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen">

            {/* Navbar For Recruiter Dashboard */}
            <div className="shadow py-4">

                <div className="flex items-center justify-between px-5">

                    {/* Logo  */}
                    <img onClick={() => navigate("/")} className="max-sm:w-32 cursor-pointer" src={assets.logo} alt="" />

                    {/* Right Side Of The Navbar For Recruiter Dashboard */}
                    <div className="flex items-center gap-3">

                        <p className="max-sm:hidden">Welcome, Recruiter</p>

                        {/* Company Logo With Dropdown */}
                        <div className="relative group">
                            <img className="w-8 border rounded-full cursor-pointer" src={assets.company_icon} alt="" />

                            {/* DropDown Menu */}
                            <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                                <ul className="list-none m-0 p-2 bg-white rounded border text-sm">
                                    <li className="py-2 px-2 cursor-pointer pr-1">Logout</li>
                                </ul>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

            <div className="flex items-start">

                {/* Sidebar With Options Such As Add Jobs, Manage Jobs, View Applications */}
                <div className="inline-block min-h-screen border-r-2">

                    <ul className="flex flex-col items-start pt-5 text-gray-800">

                        <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`} to="/dashboard/add-jobs">
                            <img className="min-w-4" src={assets.add_icon} alt="" />
                            <p className="max-sm:hidden">Add Jobs</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`} to="/dashboard/manage-jobs">
                            <img className="min-w-4" src={assets.home_icon} alt="" />
                            <p className="max-sm:hidden">Manage Jobs</p>
                        </NavLink>

                        <NavLink className={({ isActive }) => `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive ? 'bg-blue-100 border-r-4 border-blue-500' : ''}`} to="/dashboard/view-applications">
                            <img className="min-w-4" src={assets.person_tick_icon} alt="" />
                            <p className="max-sm:hidden">View Applications</p>
                        </NavLink> 

                    </ul>

                </div>

                {/* Outlet For The Nested Routes */}
                <div>
                    <Outlet />
                </div>

            </div>

        </div >
    )
}

export default Dashboard
