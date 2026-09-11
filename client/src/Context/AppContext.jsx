import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const { getToken } = useAuth();
    const { user } = useUser();

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

    const [userData, setUserData] = useState(null);

    const [userApplications, setUserApplications] = useState([]);

    //Function To Fetch Jobs Data 
    const fetchJobsData = async () => {

        try {

            const response = await axios.get(`${BackEndUrl}/api/jobs`);

            if (response.data.success) {

                setJobs(response.data.allJobs.reverse());

            }

        } catch (error) {
            console.error("Error while fetching jobs data:", error);
            toast.error("Error while fetching jobs data");
        }

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

    //Function To Fetch User Data From Backend
    const fetchUserData = async () => {

        try {

            const token = await getToken();

            const response = await axios.get(`${BackEndUrl}/api/users/user`, { headers: { Authorization: `Bearer ${token}` } });

            if (response.data.success) {

                setUserData(response.data.user);

            } else {
                toast.error("Failed to fetch user data");
            }

        } catch (error) {
            toast.error(error.message);
            console.error("Error while fetching user data:", error);
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

    useEffect(() => {

        // Fetch User Applications When User Data is Available
        if (user) {
            fetchUserData();
        }

    }, [user]);

    const value = {
        searchFilter, setSearchFilter,
        isSearched, setIsSearched,
        Jobs, setJobs,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        showRecruiterLogin, setShowRecruiterLogin,
        BackEndUrl,
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUserData
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}; 