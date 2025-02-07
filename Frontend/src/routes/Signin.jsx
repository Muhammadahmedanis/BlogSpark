import React, { useActionState, useState } from "react";
import Input from "../components/Input";
import { FaRegEnvelope, FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Label from "../components/Label";
// import ImageKit from "../utils/ImageKit";
import { toast } from "react-toastify"
import { useApi } from "../helper/useApi";
import { useDispatch } from "react-redux";
import { signinFailed, signinSuccess } from "../redux/userSlice";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[passIcon, setPassIcon] = useState("password");
  const handlePass = () => {
    if (passIcon === "password") {
      setPassIcon("text");
    }else{
      setPassIcon("password")
    }
   }

   const handleGoogleLogin = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google User Data:", decoded);
      const payload = {
        email: decoded.email,
        userName: decoded.name.toLowerCase().replace(/\s+/g, ""),
        isVerified: decoded.email_verified
      };
      
      const data = await useApi("post", "auth/google-signin", payload);
      let role = payload.userName === "ahmedanis" ? "admin" : "user";
      if (data) {
        dispatch(signinSuccess({ name: decoded.name, role }));
        navigate("/");
      } else {
        dispatch(signinFailed());
      }
    }
  };

   const[user, submitAction, isPending] = useActionState(async (previousState, formData) => {
       const email = formData.get("email");
       const password = formData.get("password");
      
       // Field Validations       
       if (!email) {
           toast.error("Email is required");
           return null;
       } else if (!/\S+@\S+\.\S+/.test(email)) {
           toast.error("Invalid email format");
           return null;
       }
   
       if (!password) {
           toast.error("Password is required");
           return null;
       } else if (password.length < 8) {
           toast.error("Password must be at least 8 characters");
           return null;
       }
       
       // Api calling
       const payload = { email, password};
       if(payload.email.length && payload.password.length){
         const data = await useApi("post", "auth/signin", payload);
         console.log(data);
         if(data){
          const userInfo = {name: data.data.user.userName, role: data.data.user.role};
           dispatch(signinSuccess(userInfo));
           navigate("/");
         }else{
          dispatch(signinFailed());
         }
       }
   
     })

  return (
      <div className="h-full p-10">
        <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container*/}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                  <div className="text-center flex flex-col items-center text-xl font-bold">
                  {/* <ImageKit src='logo.png' alt="logo" className="h-16 w-16" /> */}
                    <span className="mt-2"> Blog Spark</span>
                  </div>

                  <div className="flex justify-center mt-4">
                  {/* <div className="w-full max-w-xs"> */}
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={() => toast.error("Google Sign-In failed")}
                    />
                  {/* </div> */}
                </div>
                  
                  <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                  <a className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or Signin with email</a>
                  <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                </div>
                    
                    <form action={submitAction}>
                      <div className='my-4'>
                        <Label htmlFor="LoggingEmailAddress" labelName="Email Address" />
                        <div className="relative flex items-center mt-2">
                          <span className="absolute right-1">
                            <FaRegEnvelope className="w-5 h-5 mx-3 text-gray-300 dark:text-gray-500" />
                          </span>
                          <Input type="email" name="email" placeholder="abc@gmail.com" />
                        </div>
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
                      </div>
                      <button
                        type='submit'
                        disabled={isPending}
                        className="mt-6 w-full inline-flex cursor-pointer justify-center whitespace-nowrap rounded-lg bg-[#7f75dd] hover:bg-[#a09de8] px-3.5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150">
                        { isPending ? <div className="w-7 h-7 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> : <div className='text-[17px] font-semibold'> Sign In</div>} 
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
                  style={{ background: "linear-gradient(to right, #4b399e, #7f75dd, #6b57d0, #5a45bc)" }}>
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
