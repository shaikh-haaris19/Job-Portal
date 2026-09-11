import logo from "./logo.svg";
import search_icon from "./search_icon.svg";
import company_icon from "./company_icon.svg";
import microsoft_logo from "./microsoft_logo.svg";
import walmart_logo from "./walmart_logo.svg";
import accenture_logo from "./accenture_logo.png";
import profile_img from "./profile_img.png";
import app_main_img from "./app_main_img.png";
import cross_icon from './cross_icon.svg';
import location_icon from './location_icon.svg';
import money_icon from './money_icon.svg';
import suitcase_icon from './suitcase_icon.svg';
import person_icon from './person_icon.svg';
import upload_area from './upload_area.svg';
import resume_selected from './resume_selected.svg';
import resume_not_selected from './resume_not_selected.svg';
import play_store from './play_store.svg';
import app_store from './app_store.svg';
import back_arrow_icon from './back_arrow_icon.svg';
import left_arrow_icon from './left_arrow_icon.svg';
import right_arrow_icon from './right_arrow_icon.svg';
import facebook_icon from './facebook_icon.svg'
import instagram_icon from './instagram_icon.svg'
import twitter_icon from './twitter_icon.svg'
import home_icon from './home_icon.svg'
import add_icon from './add_icon.svg'
import profile_upload_icon from './profile_upload_icon.svg'
import person_tick_icon from './person_tick_icon.svg'
import resume_download_icon from './resume_download_icon.svg'
import delete_icon from './delete_icon.svg'
import email_icon from './email_icon.svg'
import lock_icon from './lock_icon.svg'
import samsung_logo from './samsung_logo.png'
import adobe_logo from './adobe_logo.png'
import amazon_logo from './amazon_logo.png'

export const assets = {
    logo,
    search_icon,
    cross_icon,
    upload_area,
    company_icon,
    resume_not_selected,
    resume_selected,
    microsoft_logo,
    walmart_logo,
    accenture_logo,
    app_main_img,
    play_store,
    app_store,
    back_arrow_icon,
    left_arrow_icon,
    right_arrow_icon,
    location_icon,
    money_icon,
    suitcase_icon,
    person_icon,
    facebook_icon,
    instagram_icon,
    twitter_icon,
    home_icon,
    add_icon,
    person_tick_icon,
    resume_download_icon,
    profile_img,
    delete_icon,
    profile_upload_icon,
    email_icon,
    lock_icon,
    samsung_logo,
    adobe_logo,
    amazon_logo
}

export const JobCategories = [
    "Programming",
    "Data Science",
    "Designing",
    "Networking",
    "Management",
    "Marketing",
    "Cybersecurity",
]

export const JobLocations = [
    "Bangalore",
    "Washington",
    "Hyderabad",
    "Mumbai",
    "California",
    "Chennai",
    "New York"
]

// Sample data for Manage Jobs Page
export const manageJobsData = [
    { _id: 1, title: "Full Stack Developer", date: 1729102298497, location: "Bangalore", applicants: 20 },
    { _id: 2, title: "Data Scientist", date: 1729102298497, location: "San Francisco", applicants: 15 },
    { _id: 3, title: "Marketing Manager", date: 1729102298497, location: "London", applicants: 2 },
    { _id: 4, title: "UI/UX Designer", date: 1729102298497, location: "Dubai", applicants: 25 }
];

// Sample data for Profile Page
export const jobsApplied = [
    {
        company: 'Amazon',
        title: 'Full Stack Developer',
        location: 'Bangalore',
        date: '22 Aug, 2024',
        status: 'Pending',
        logo: company_icon,
    },
    {
        company: 'Meta',
        title: 'Data Scientist',
        location: 'San Francisco',
        date: '22 Aug, 2024',
        status: 'Rejected',
        logo: company_icon,
    },
    {
        company: 'Google',
        title: 'Marketing Manager',
        location: 'London',
        date: '25 Sep, 2024',
        status: 'Accepted',
        logo: company_icon,
    },
    {
        company: 'Qualcomm',
        title: 'UI/UX Designer',
        location: 'Dubai',
        date: '15 Oct, 2024',
        status: 'Pending',
        logo: company_icon,
    },
    {
        company: 'Microsoft',
        title: 'Full Stack Developer',
        location: 'Hyderabad',
        date: '25 Sep, 2024',
        status: 'Accepted',
        logo: company_icon,
    },
];

export const viewApplicationsPageData = [
    { _id: 1, name: "Richard Sanford", jobTitle: "Full Stack Developer", location: "Bangalore", imgSrc: profile_img },
    { _id: 2, name: "Enrique Murphy", jobTitle: "Data Scientist", location: "San Francisco", imgSrc: profile_img },
    { _id: 3, name: "Alison Powell", jobTitle: "Marketing Manager", location: "London", imgSrc: profile_img },
    { _id: 4, name: "Richard Sanford", jobTitle: "UI/UX Designer", location: "Dubai", imgSrc: profile_img },
    { _id: 5, name: "Enrique Murphy", jobTitle: "Full Stack Developer", location: "Hyderabad", imgSrc: profile_img },
    { _id: 6, name: "Alison Powell", jobTitle: "Data Scientist", location: "New Delhi", imgSrc: profile_img },
    { _id: 7, name: "Richard Sanford", jobTitle: "Marketing Manager", location: "Chennai", imgSrc: profile_img },
];

