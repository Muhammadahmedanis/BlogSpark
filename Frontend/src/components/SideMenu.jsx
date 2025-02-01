import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'

function SideMenu() {
  return (
    <div className='h-max sticky top-20'>
        <h1 className='mb-4 text-sm font-medium'>Search</h1>
        <Search />
        <h1 className='mt-8 mb-4 text-sm font-medium'>Filters</h1>
        <div className='flex flex-col gap-2 text-sm'>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" name='sort' value="newest" className="appearance-none bg-white w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800" />Newest
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" name='sort' value="popular" className="appearance-none bg-white w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800" />Most Popular
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" name='sort' value="trending" className="appearance-none bg-white w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800" />Trending
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" name='sort' value="oldest" className="appearance-none bg-white w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800" />Oldest
            </label>
        </div>
        <h1 className='mt-8 mb-4 text-sm font-medium'>Categories</h1>
        <div className='flex flex-col text-sm gap-2'>
            <Link to="/posts" className="underline">All</Link>
            <Link to="/posts?cat=web-design" className="underline">Web Deisgn</Link>
            <Link to="/posts?cat=marketing" className="underline">Marketing</Link>
            <Link to="/posts?cat=design" className="underline">Design</Link>
            <Link to="/posts?cat=database" className="underline">Database</Link>
        </div>
    </div>
  )
}

export default SideMenu