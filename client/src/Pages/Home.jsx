import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import JobListing from '../Components/JobListing'
import AppDownload from '../Components/AppDownload'
import Footer from '../Components/Footer'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {

    if( localStorage.getItem('companyToken') ){
      navigate('/dashboard');
    }

  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <JobListing />
      <AppDownload />
      <Footer />
    </div>
  )
}

export default Home
