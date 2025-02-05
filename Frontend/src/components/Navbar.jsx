import React, { useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { IoSunnyOutline, IoSunny } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { SiSimplelogin } from "react-icons/si";
import ImageKit from "../utils/imageKit";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../helper/useApi";
import { logout } from "../redux/userSlice";
import { FaRegUser } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const isUser = user?.name;
  const[file, setFile] = useState("");

  const navItems = user?.role === "admin" ? 
  [
    { name: "Dashboard", slug: "/dashboard" },
    { name: "Blogs", slug: "/blogs" }
  ] :
  [
    { name: "Home", slug: "/" },
    { name: "Write Blog", slug: "/write" },
    { name: "Most Popular", slug: "/mostpopular" },
    { name: "Category", slug: "/about" }
  ];

  const handleLogout = async () => {
    const isLogout = await useApi("post", "auth/logout");
    if (isLogout) {
      dispatch(logout());
      setIsModalOpen(false); // Close modal on logout
    }
  };

  return (
    <>
      <div className={isOpen ? '' : 'w-full bg-[#b6b6ef] sticky top-0 z-10 drop-shadow-md '}>
        <div className='flex flex-wrap justify-between place-items-center px-2 py-3 pl-5 pr-4 dark:bg-gray-900 dark:text-white'>
          <div className='sm:hidden'>
            {!isOpen && <FaBars onClick={() => setIsOpen(!isOpen)} />}
          </div>
          <div className="flex gap-2 items-center">
            <ImageKit src='logo.png' alt="logo" className="h-[35px] w-[40px]" />
            <Link to='/' className='font-bold text-2xl'>
              Blog <span className='text-gray-100'>Spark</span>
            </Link>
          </div>
          <div className='hidden sm:flex'>
            <ul className='flex font-semibold text-[15px]'>
              {navItems.map((nav) => (
                <li key={nav.name}>
                  <NavLink
                    to={nav.slug}
                    className={({ isActive }) => `px-4 py-2 ${isActive && 'bg-[#837fd3]'} block text-gray-100 hover:bg-gray-100 hover:text-[#837fd3] cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200 dark:hover:bg-gray-700 md:mx-2`}>
                    {nav.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {isUser ? (
            <div className='flex items-center gap-x-2 cursor-pointer'>
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="relative size-11 cursor-pointer font-bold text-[22px] rounded-full flex items-center justify-center bg-[#e6e6ff] text-sm focus:outline-none">
                {isUser?.slice(0, 1).toUpperCase() || "N"}
              </button>
            </div>
          ) : (
            <Link to='/signin'>
              <button className="cursor-pointer inline-flex gap-1 items-center whitespace-nowrap rounded-lg bg-[#7f75dd] hover:bg-[#a09de8] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150">
                Sign In <SiSimplelogin className="font-bold" size={25} />
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Authentication Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.64)] bg-opacity-10">
          <div className="relative p-4 w-[380px] max-w-md bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-end p-2 rounded-t dark:border-gray-600 border-gray-200">
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 bg-transparent cursor-pointer hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8">
                ✖
              </button>
            </div>
            <div className="md:p-3">
              <div>
                <label htmlFor="file" className='flex items-center mb-2 gap-2 cursor-pointer'>
                  <img className='w-[110px] h-[110px] mx-auto rounded-full object-contain border border-gray-600' src={file ? URL.createObjectURL(file[0]) : "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"} alt="" />
                </label>
                <input type="file" multiple onChange={e => setFile(e.target.files)}  id='file' style={{display: "none"}} />
              </div>
              <div className="text-center">
                <h2 className="my-2 flex items-center text-xl justify-center gap-2 font-bold">Ahmed <FaRegEdit className="cursor-pointer" size={18} /> </h2>
                <p className="my-2">ahmedanis4546@gmail.com</p>
              </div>
              <button className="flex items-center cursor-pointer justify-center w-full border bg-gray-100 border-gray-300 font-semibold gap-2 px-4 py-2 text-sm hover:bg-gray-300 rounded text-gray-700 mb-2">
                Update Profile
                <FaRegUser className="font-bold" size={19} />
              </button>
              {user.role === "admin" && (
                <button className="flex items-center cursor-pointer justify-center w-full font-semibold gap-2 px-4 py-2 text-sm border bg-gray-100 border-gray-300 hover:bg-gray-300 rounded text-gray-700 mb-2">
                  <Link to="/dashboard">Dashboard</Link>
                  <MdOutlineDashboard className="font-bold w-10" size={19} />
                </button>
              )}
              <button onClick={handleLogout}
                className="flex items-center justify-center w-full font-semibold cursor-pointer gap-2 px-4 py-2 text-sm bg-red-400 hover:bg-red-500 rounded text-gray-100">
                Log Out <RiLogoutCircleRLine className="font-bold w-13" size={19} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
