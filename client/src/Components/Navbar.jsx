import { assets } from '../assets/assets'
import { useClerk, UserButton } from '@clerk/react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'

const Navbar = () => {

    const { openSignIn } = useClerk()
    const { user } = useClerk()
    const navigate = useNavigate()

    const { setShowRecruiterLogin } = useContext(AppContext);

    return (
        <div className='shadow py-4'>

            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center '>
                <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="" />
                {
                    user
                        ?
                        <div className='flex items-center gap-3'>
                            <Link to={'/applications'}>Applied Jobs</Link>
                            <p>|</p>
                            <p className='max-sm:hidden'>Hi, {user.firstName + " " + user.lastName}</p>
                            <UserButton />
                        </div>
                        :
                        <div className='flex gap-4 max-sm:text-xs'>
                            <button onClick={() => setShowRecruiterLogin(true)} className='text-gray-600 cursor-pointer hover:underline hover:underline-offset-2'>Recruiter Login</button>
                            <button onClick={() => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full hover:underline hover:underline-offset-2 cursor-pointer'>Login</button>
                        </div>
                }
            </div>

        </div>
    )
}

export default Navbar
