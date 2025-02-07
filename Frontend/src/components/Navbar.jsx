import React, { useEffect, useState } from "react";
import { RiLogoutCircleRLine, RiBloggerLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineDashboard, MdPublishedWithChanges } from "react-icons/md";
import { FaBars, FaRegUser, FaRegEdit } from "react-icons/fa";
import { SiSimplelogin } from "react-icons/si";
// import ImageKit from "../utils/ImageKit.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useApi } from "../helper/useApi";
import { logout } from "../redux/userSlice";
import { toast } from "react-toastify";
// import Upload from "./upload";

function Navbar() {
  const dispatch = useDispatch();
  const[isEdit, setIsEdit] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const[isChanges, setIsChanges] = useState(user?.userName);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    setIsChanges(userInfo?.userName);
  }, [userInfo]);

  const handleUpdate = async() => {
    setIsEdit(!isEdit);
    if (isChanges !== userInfo?.userName) {
      try {
        const response = await useApi("patch", "/auth/updateUser", { userName: isChanges});
        getUser();
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  // Function to upload image
  const uploadImg = async () => {
    if (!cover?.filePath) return; // Prevent unnecessary API calls
  
    try {
      const response = await useApi("post", "/auth/uploadImage", { img: cover.filePath });
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  useEffect(() => {
    if (cover?.filePath) {
      uploadImg();
    }
  }, [cover]); // Only runs when `cover` changes
  
  
  
  const navItems =
    user?.role === "admin"
      ? [
          { name: "Dashboard", slug: "/dashboard" },
          { name: "Blogs", slug: "/blogs" },
        ]
      : [
          { name: "Home", slug: "/" },
          { name: "Write Blog", slug: "/write" },
          { name: "Saved Posts", slug: "/savedPosts" },
          { name: "All Blogs", slug: "/allBlogs" },
        ];

  const getUser = async () => {
    try {
      const response = await useApi("get", "/auth/isUser");
      if (response?.data) {
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const isLogout = await useApi("post", "/auth/logout");
      if (isLogout) {
        dispatch(logout());
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  

  return (
    <>
      <div className={isOpen ? "" : "w-full bg-[#b6b6ef] sticky top-0 z-10 drop-shadow-md"}>
        <div className="flex flex-wrap justify-between place-items-center px-2 py-3 pl-5 pr-4 dark:bg-gray-900 dark:text-white">
          <div className="sm:hidden">
            {!isOpen && <FaBars onClick={() => setIsOpen(!isOpen)} />}
          </div>
          <div className="flex gap-2 items-center">
            {/* <ImageKit src="logo.png" alt="logo" className="h-[35px] w-[40px]" /> */}
            <Link to="/" className="font-bold text-2xl">
              Blog <span className="text-gray-100">Spark</span>
            </Link>
          </div>
          <div className="hidden sm:flex">
            <ul className="flex font-semibold text-[15px]">
              {navItems.map((nav) => (
                <li key={nav.name}>
                  <NavLink
                    to={nav.slug}
                    className={({ isActive }) =>
                      `px-4 py-2 ${isActive && "bg-[#837fd3]"} block text-gray-100 hover:bg-gray-100 hover:text-[#837fd3] cursor-pointer transition-colors duration-300 transform rounded-lg dark:text-gray-200 dark:hover:bg-gray-700 md:mx-2`
                    }>
                    {nav.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {user ? (
            <div className="flex items-center gap-x-2 cursor-pointer">
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="relative size-11 cursor-pointer font-bold text-[22px] rounded-full flex items-center justify-center bg-[#e6e6ff] text-sm focus:outline-none">
                {user.name.charAt(0).toUpperCase() || "N"}
              </button>
            </div>
          ) : (
            <Link to="/signin">
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
          <div className="relative px-4 pb-7 pt-4 w-[380px] max-w-md bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-end px-2 rounded-t dark:border-gray-600 border-gray-200">
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 bg-transparent cursor-pointer hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8">
                ✖
              </button>
            </div>
              <div>
              {/* <Upload type="image" setData={setCover}>
                { !cover?.url ? 
                  <ImageKit
                  className="w-[110px] h-[110px] mx-auto object-cover border border-gray-600 rounded-full"
                  src={userInfo?.img || "icon.jpg"} 
                /> : 
                <img
                  className="w-[110px] h-[110px] mx-auto rounded-full object-cover border border-gray-600"
                  src={`${cover?.url || "icon.jpg"}?tr=w-110,h-110,c-at-max`}
                  alt="Profile"
                />
              }

              </Upload> */}
              </div>
              <div className="text-center">
                <div className="flex justify-center items-center gap-1">
                  {
                    isEdit ? 
                    <input onChange={(e) => setIsChanges(e.target.value)} type="text" className="border w-32 border-gray-300 outline-none p-1 my-1 rounded" value={isChanges} /> :
                    <h2 className="my-2 flex items-center text-xl justify-center gap-2 font-bold"> {userInfo?.userName?.charAt(0).toUpperCase() + userInfo?.userName?.slice(1)} </h2>
                  }
                  <button onClick={handleUpdate}>
                  { !isEdit ? <FaRegEdit className="cursor-pointer" size={18} /> : <MdPublishedWithChanges className="cursor-pointer" size={20} />}
                  </button>
                </div>
                <p className="mb-2 bg-purple-300 text-white w-fit mx-auto px-6 py-1.5 rounded">{userInfo?.email}</p>
              </div>
              <Link to='/myBlog'>
              <button className="flex items-center cursor-pointer justify-center w-[250px] mx-auto border bg-purple-300 border-none outline-none font-semibold gap-2 px-4 py-2 text-sm hover:bg-[#e2b0eac4] rounded text-white mb-2">
                My Blog
                <RiBloggerLine className="font-bold" size={19} />
              </button>
              </Link>
              {user?.role === "admin" && (
                <Link to="/dashboard">
                  <button className="flex items-center cursor-pointer justify-center w-[250px] mx-auto font-semibold gap-2 px-4 py-2 text-sm border bg-gray-100 border-gray-300 hover:bg-gray-300 rounded text-gray-700 mb-2">
                    Dashboard <MdOutlineDashboard className="font-bold w-6" size={19} />
                  </button>
                </Link>
              )}
              <button onClick={handleLogout} className="flex items-center justify-center mx-auto w-[250px] font-semibold cursor-pointer gap-2 px-4 py-2 text-sm bg-red-400 hover:bg-red-500 rounded text-gray-100">
                Log Out <RiLogoutCircleRLine className="font-bold w-6" size={19} />
              </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
