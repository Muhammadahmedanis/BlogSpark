import React from 'react'
import { CiSearch } from "react-icons/ci";

function Search() {
  return (
    <div className='bg-gray-100 p-2 rounded-full flex items-center gap-2'>
        <CiSearch size={25}/>
        <input type="text" placeholder='Search a post...' className='bg-transparent'  />
    </div>
  )
}

export default Search