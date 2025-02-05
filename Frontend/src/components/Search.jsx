import React from 'react'
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const[searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      const query = e.target.value;
      if (location.pathname === "/posts") {
        setSearchParams({...Object.fromEntries(searchParams), search: query});  // means already query h too add karo is ka aaga se search=input query
      }else{
        navigate(`/posts?search=${query}`)
      }
    }
  }

  return (
    <div className='bg-gray-100 p-2 rounded-full flex items-center gap-2'>
        <CiSearch size={25}/>
        <input type="text" placeholder='Search a post...' className='bg-transparent border-none outline-none' onKeyDown={handleKeyPress}  />
    </div>
  )
}

export default Search