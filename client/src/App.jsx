import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import ApplyJob from './Pages/ApplyJob'
import Applications from './Pages/Applications'
import RecruiterLogin from './Components/RecruiterLogin'
import { useContext } from 'react'
import { AppContext } from './Context/AppContext'
import Dashboard from './Pages/Dashboard'
import AddJobs from './Pages/AddJobs'
import ManageJobs from './Pages/ManageJobs'
import ViewApplications from './Pages/ViewApplications'
import { ToastContainer } from 'react-toastify';

// Importing the Quill CSS for the rich text editor
import 'quill/dist/quill.snow.css';

const App = () => {

  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <div>

      <ToastContainer />

      {/* Displaying the Recruiter Login Component Based on the State of recruiterLogin */}
      {showRecruiterLogin && <RecruiterLogin />}

      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/apply-job/:id' element={<ApplyJob />} />
        <Route path='/applications' element={<Applications />} />
        <Route path='/dashboard' element={<Dashboard />} >
          {companyToken ?
            <>
              <Route path='add-jobs' element={<AddJobs />} />
              <Route path='manage-jobs' element={<ManageJobs />} />
              <Route path='view-applications' element={<ViewApplications />} />
            </> : null
          }
        </Route>

      </Routes>

    </div>
  )
}

export default App
