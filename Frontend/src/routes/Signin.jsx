import React, { useState } from "react";
import Input from "../components/Input";
import { FaRegEnvelope, FaRegEyeSlash, FaRegUser } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Label from "../components/Label";
import ImageKit from "../utils/imageKit";
import { FaGoogle } from "react-icons/fa";
const Signin = () => {
  const[passIcon, setPassIcon] = useState("password");
  const navigate = useNavigate();
  const handlePass = () => {
    if (passIcon === "password") {
      setPassIcon("text");
    }else{
      setPassIcon("password")
    }
   }

  return (
      <div className="container h-full p-10">
        <div className="flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container*/}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                  <div className="text-center flex flex-col items-center text-xl font-bold">
                  <ImageKit src='logo.png' alt="logo" className="h-16 w-16" />
                    <span className="mt-2"> Blog Spark</span>
                  </div>
                  <a className="flex items-center cursor-pointer justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <svg class="w-6 h-6" viewBox="0 0 40 40">
                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                    <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                    <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                </svg>
                  <span className="w-5/6 px-4 py-3 font-bold text-center">Sign in with Google</span>
                  </a>
                  <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                  <a className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or Signin with email</a>
                  <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                </div>
                    
                    <form>
                      <div className='my-4'>
                        <Label htmlFor="LoggingEmailAddress" labelName="Email Address" />
                        <div className="relative flex items-center mt-2">
                          <span className="absolute right-1">
                            <FaRegEnvelope className="w-5 h-5 mx-3 text-gray-300 dark:text-gray-500" />
                          </span>
                          <Input type="email" name="email" placeholder="abc@gmail.com" />
                        </div>
                          {/* {errors?.email && <p className="error text-red-700">{errors.email}</p>} */}
                      </div>

                      <div className='my-2 relative'>
                        <Label htmlFor="LoggingPassword" labelName="Password" />
                        <div className="relative flex items-center mt-2">
                        <span onClick={handlePass} className="absolute right-1">
                            {passIcon === "password" ? <FaRegEyeSlash className="w-5 h-5 mx-3 cursor-pointer font-bold text-gray-400 dark:text-gray-500" /> : <IoEyeOutline className="w-5 h-5 mx-3 cursor-pointer text-gray-400 dark:text-gray-500" />}
                          </span>
                          <Input type={passIcon === "password" ? "password" : "text" } name="password" placeholder="••••••••" />
                        </div>
                        <Link to="/forgotPass" className="text-xs font-semibold absolute right-1 mt-2 mb-8 text-gray-500 dark:text-gray-300 hover:underline">
                          Forget Password?
                        </Link>
                        {/* {errors?.password && <p className="error text-red-700">{errors.password}</p>} */}
                      </div>
                      <button
                        type='submit'
                        className="mt-6 w-full inline-flex cursor-pointer justify-center whitespace-nowrap rounded-lg bg-[#7f75dd] hover:bg-[#a09de8] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10  focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150">
                        { !"isPending" ? <div className="w-7 h-7 border-4  border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> : <div className='text-[17px] font-semibold'> Sign In</div>} 
                      </button>
                    </form>
                      <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    <Link to='/signup'>
                      <div className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"> or sign up </div>
                    </Link>
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  </div>  
                  </div>
                </div>

                {/* Right column container with background and description */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none"
                  style={{ background: "linear-gradient(to right, #4b399e, #7f75dd, #6b57d0, #5a45bc)" }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">Welcome to Our Platform</h4>
                    <p className="text-sm">
                      Join us today and explore a world of opportunities. Our platform provides seamless
                      access to exclusive features that help you stay ahead in your journey. Sign up now
                      and be part of an amazing community!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Signin;
