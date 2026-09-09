import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const BackEndUrl = import.meta.env.VITE_BACKEND_URL;

    const [searchFilter, setSearchFilter] = useState({
        title: "",
        location: "",
    });

    const [isSearched, setIsSearched] = useState(false);

    const [Jobs, setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

    const [companyToken, setCompanyToken] = useState(null);

    const [companyData, setCompanyData] = useState(null);

    //Function To Fetch Jobs Data From Assets
    const fetchJobsData = () => {

        setJobs(jobsData);

    }


    //Function To Fetch Company Data From Backend 
    const fetchCompanyData = async () => {

        try {

            const response = await axios.get(`${BackEndUrl}/api/company/company`, { headers: { token: companyToken } });

            if (response.data.success) {
                setCompanyData(response.data.company);
                console.log(response.data.company);
            }
            else {
                toast.error("Failed to fetch company data");
            }

        } catch (error) {
            toast.error(error.message);
        }

    }

    // Fetching Company Data When The Company Token Changes
    useEffect(() => {

        if (companyToken) {
            fetchCompanyData();
        }

    }, [companyToken]);

    // Fetching Jobs Data and Checking For Company Token When The Component Mounts
    useEffect(() => {

        fetchJobsData();

        //If User Is Already Logged In, Then Get The Token From Local Storage
        const token = localStorage.getItem('companyToken');
        if (token) {
            setCompanyToken(token);
        }

    }, []);

    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        Jobs, setJobs,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        showRecruiterLogin, setShowRecruiterLogin,
        BackEndUrl
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}; 