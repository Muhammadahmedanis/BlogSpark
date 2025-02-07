import React from 'react'
import Search from './Search'
import { Link, useSearchParams } from 'react-router-dom'

function SideMenu() {
    const[searchParams, setSearchParams] = useSearchParams();
    const handleFilterChange = (e) => {
        if (searchParams.get("sort") !== e.target.value) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                sort: e.target.value,
            })
        }
    }

    const handleCategoryChange = (category) => {
        if (searchParams.get("cat") !== category) {
            setSearchParams({
                ...Object.fromEntries(searchParams.entries()),
                cat: category
            })
        }
    }

  return (
    <div className='h-max sticky top-20'>
        <h1 className='mb-4 text-sm font-medium'>Search</h1>
        <Search />
        <h1 className='mt-8 mb-4 text-sm font-medium'>Filters</h1>
        <div className='flex flex-col gap-2 text-sm'>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" name='sort' onChange={handleFilterChange} value="newest" className="appearance-none bg-white w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800" />Newest
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" name='sort' onChange={handleFilterChange} value="popular" className="appearance-none bg-white w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800" />Most Popular
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" name='sort' onChange={handleFilterChange} value="trending" className="appearance-none bg-white w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800" />Trending
            </label>
            <label className='flex items-center gap-2 cursor-pointer'>
                <input type="checkbox" name='sort' onChange={handleFilterChange} value="oldest" className="appearance-none bg-white w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800" />Oldest
            </label>
        </div>
        <h1 className='mt-8 mb-4 text-sm font-medium'>Categories</h1>
        <div className='flex flex-col text-sm gap-2'>
            <Link className="underline cursor-pointer" onClick={() => handleCategoryChange("general")}>All</Link>
            <Link className="underline cursor-pointer" onClick={() => handleCategoryChange("web-design")}>Web Deisgn</Link>
            <Link className="underline cursor-pointer" onClick={() => handleCategoryChange("marketing")}>Marketing</Link>
            <Link className="underline cursor-pointer" onClick={() => handleCategoryChange("development")}>Development</Link>
            <Link className="underline cursor-pointer" onClick={() => handleCategoryChange("database")}>Database</Link>
            <Link className="underline cursor-pointer" onClick={() => handleCategoryChange("artificial-intelligence")}>Artificial Intelligence</Link>
        </div>
    </div>
  )
}

export default SideMenu