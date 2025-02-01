import React from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";

function MainCategories() {
  return (
    <div className='hidden md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-6'>
        {/* link */}
        <div className='flex-1 flex items-center  justify-between flex-wrap'>
            <Link to='/posts' className='bg-blue-800 text-white rounded-full px-4 py-2'>All Posts</Link>
            <Link to='/posts?cat=web-design' className='hover:bg-blue-50 rounded-full px-4 py-2'>Web Design</Link>
            <Link to='/posts?cat=web-design' className='hover:bg-blue-50 rounded-full px-4 py-2'>Development</Link>
            <Link to='/posts?cat=web-design' className='hover:bg-blue-50 rounded-full px-4 py-2'>Databases</Link>
            <Link to='/posts?cat=web-design' className='hover:bg-blue-50 rounded-full px-4 py-2'>Search Engine</Link>
            <Link to='/posts?cat=web-design' className='hover:bg-blue-50 rounded-full px-4 py-2'>Marketing</Link>
        </div>
        <span className='text-xl font-medium'>|</span>
        {/* Search */}
        <div className='bg-gray-100 p-2 rounded-full flex items-center gap-2'>
            <CiSearch size={20}/>
            <input type="text" placeholder='Search a post...' className='bg-transparent' />
        </div>
    </div>
  )
}

export default MainCategories