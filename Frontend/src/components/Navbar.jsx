import React, { useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";
import { SiSimplelogin } from "react-icons/si";
import ImageKit from "../utils/imageKit";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../helper/useApi";
import { logout } from "../redux/userSlice";

function Nvabar() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const isUser = user?.name;

  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "Write Blog",
      slug: "/write",
    },
    {
      name: 'Most Popular',
      slug: '/mostpopular',
    },
    {
      name: 'Category',
      slug: '/about',
    },
  ]

  
  const handleTheme = () => {
  } 
  const handleLogout = async () => {
    const isLogout = await useApi("post", "auth/logout");
    if(isLogout){
      dispatch(logout());
    }
  }

  return (
    <div className={isOpen ? '' : 'w-full bg-[#b6b6ef] sticky top-0 z-10 drop-shadow-md '}>
      <div className='flex flex-wrap justify-between place-items-center px-2 py-3 pl-5 pr-4 dark:bg-gray-900 dark:text-white'>
        <div className='sm:hidden'>
          { isOpen ? '' : <FaBars onClick={() => setIsOpen(!isOpen)} />}
        </div>
        <div className="flex gap-2 items-center">
          <ImageKit src='logo.png' alt="logo" className="h-[35px] w-[40px]" />
          <Link to='/' className='font-bold text-2xl'>
            Blog <span className='text-gray-100'>Spark</span>
          </Link>
        </div>
        <div className={`${isOpen ? "transform translate-x-0" : 'transform -translate-x-full'} sm-flex bg-[#b3b3e6] fixed inset-y-0 left-0 z-50  w-64 overflow-y-auto transition-transform ease-in-out duration-300`} style={{zIndex: '11111'}}>
          <FaTimes onClick={() => setIsOpen(!isOpen)} className='absolute top-3 right-3' />
          <ul className='flex flex-col p-4 m-8 font-medium'>
          {
            navItems?.map((nav) => (
              <li key={nav?.name}>
                <NavLink
                  to={nav.slug}
                  className={({ isActive }) => `px-2.5 py-2 ${isActive && 'bg-[#837fd3]'} block text-gray-100 hover:bg-gray-100 hover:text-[#837fd3] cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200  dark:hover:bg-gray-700 md:mx-2`}>
                  {nav.name}
                </NavLink>
              </li>
            ))
          }
          </ul>
        </div>

        <div className='hidden sm:flex '>
        <ul className='flex font-semibold text-[15px]'>
          {
            navItems?.map((nav) => (
              <li key={nav.name}>
                <NavLink
                  to={nav.slug}
                  className={({ isActive }) => `px-4 py-2 ${isActive && 'bg-[#837fd3]'} block text-gray-100 hover:bg-gray-100 hover:text-[#837fd3] cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200  dark:hover:bg-gray-700 md:mx-2`}>
                  {nav.name}
                </NavLink>
              </li>
            ))
          }

          </ul>
        </div>

        { isUser ?
          ( <div className='padding: 10px flex items-center gap-x-2 cursor-pointer'>
            <button onClick={() => setOpenModal(!openModal)} type="button" className="relative size-11 cursor-pointer font-bold text-[22px] rounded-full flex items-center justify-center bg-[#e6e6ff] text-sm focus:outline-none focus:ring-white">
                {isUser?.slice(0, 1).toUpperCase() || "A"}
            </button>
            <div className={` ${openModal ? "block" : "hidden"} absolute right-1  top-14 z-10 mt-1 w-[132px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none`}>
            <button onClick={handleTheme}
              className="flex items-center justify-center w-full font-semibold cursor-pointer gap-2 px-4 py-2 text-sm hover:bg-gray-300 rounded text-gray-700">
              {"theme"}
              { "theme" == "light" ? <IoSunnyOutline className="font-bold w-12" size={23} />  :  <IoSunny className="font-bold w-12" size={23}/> }      
            </button>
            <button onClick={handleLogout}
              className="flex items-center justify-center w-full font-semibold cursor-pointer gap-2 px-4 py-2 text-sm hover:bg-gray-300 rounded text-gray-700">
              Log Out
              <RiLogoutCircleRLine className="font-bold w-9" size={19} />
            </button>
            {user.admin && <button
              className="flex flex-1 items-center justify-center w-full font-semibold gap-2 px-4 py-2 text-sm hover:bg-gray-300 rounded text-gray-700">
                <Link to="/dashboard">Dashboard</Link>
              <MdOutlineDashboard className="font-bold w-9" size={19} />
            </button>}
            </div>
          </div> ) :
          ( 
            <Link to='/signin'>
              <button className="cursor-pointer inline-flex gap-1 items-center whitespace-nowrap rounded-lg bg-[#7f75dd] hover:bg-[#a09de8] px-5 py-2.5 text-sm font-medium text-white shadow-smfocus:ring-indigo-300 focus-visible:outline-none focus-visible:ring transition-colors duration-150">Sign In <SiSimplelogin className="font-bold" size={25} /> </button>
            </Link>
          )
        }
      </div>
    </div>
  )
}

export default Nvabar