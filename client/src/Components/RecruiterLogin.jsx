import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const RecruiterLogin = () => {

    const { setShowRecruiterLogin } = useContext(AppContext);

    // State to toggle between login and signup 
    const [state, setState] = useState('Login');

    // State to hold the credentials of the recruiter
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: ''
    });

    // State to hold the Logo For Company Of the Recruiter
    const [image, setImage] = useState(false);

    // State to Tell the text data of the recruiter Is Submitted or Not
    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

    const handleOnChange = (e) => {

        // Getting the name and value of the input field That is being changed
        let name = e.target.name;
        let value = e.target.value;

        // Updating the credentials state with the new value
        setCredentials({ ...credentials, [name]: value });

    }

    const handleOnSubmit = (e) => {

        e.preventDefault();

        // Checking if the state is SignUp and the text data is not submitted, then set the text data as submitted
        if (state === 'SignUp' && !isTextDataSubmitted) {
            setIsTextDataSubmitted(true);
        }

    }

    useEffect(() => {

        // Disabling the scroll of the body when the component is mounted
        document.body.style.overflow = 'hidden';

        return () => {
            // Enabling the scroll of the body when the component is unmounted
            document.body.style.overflow = 'unset';
        }

    }, []);

    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            <form className="relative bg-white p-10 rounded-xl text-slate-500" onSubmit={handleOnSubmit}>
                <h1 className="text-2xl font-medium text-center text-neutral-700">Recruiter {state}</h1>
                <p className="text-sm">Welcome Back! Please {state === 'Login' ? 'sign-in' : 'sign-up'} to Continue</p>

                {
                    state === 'SignUp' && isTextDataSubmitted
                        ? <>

                            {/* Displaying the Logo Upload Section After The Credentials Are Submitted */}

                            <div className="flex items-center gap-4 my-10">
                                <label htmlFor="CompanyLogo">
                                    <img className="w-16 rounded-full" src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="CompanyLogo" hidden />
                                </label>
                                <p className="text-sm">Upload Your Company Logo</p>
                            </div>

                        </>
                        : <>

                            {state === 'SignUp' && (
                                <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                                    <img src={assets.person_icon} alt="" />
                                    <input className="outline-none text-sm" onChange={handleOnChange} name="name" value={credentials.name} type="text" placeholder="Company Name" required />
                                </div>
                            )}

                            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                                <img src={assets.email_icon} alt="" />
                                <input className="outline-none text-sm" onChange={handleOnChange} name="email" value={credentials.email} type="email" placeholder="Email" required />
                            </div>

                            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                                <img src={assets.lock_icon} alt="" />
                                <input className="outline-none text-sm" onChange={handleOnChange} name="password" value={credentials.password} type="password" placeholder="Password" required />
                            </div>


                        </>
                }

                { state === 'Login' && <p className="text-sm text-blue-600 mt-4 ml-1 cursor-pointer">Forgot Password?</p> }

                <button className={`bg-blue-600 w-full text-white py-2 rounded-full cursor-pointer mt-4`} type="submit">
                    {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create Account' : 'Next'}
                </button>

                <p className="text-sm text-center mt-5">
                    {state === 'Login' ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={() => setState(state === 'Login' ? 'SignUp' : 'Login')} className="text-blue-600 cursor-pointer hover:underline"> {state === 'Login' ? 'Sign Up' : 'Login'}</span>
                </p>

                <img onClick={() => setShowRecruiterLogin(false)} className="absolute top-5 right-5 w-3 h-3 cursor-pointer" src={assets.cross_icon} alt="" />

            </form>
        </div>
    )
}

export default RecruiterLogin
