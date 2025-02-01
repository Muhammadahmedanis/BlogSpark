import React from 'react'
import ImageKit from '../utils/imageKit'
import { Link } from 'react-router-dom'

function Post() {
  return (
    <div className='flex flex-col xl:flex-row gap-8'>
        <div className='md:hidden xl:block xl:w-1/3'>
            <ImageKit src="deisgn.jpeg" className='rounded-2xl object-cover' width='735' />
        </div>
        <div className='flex flex-col gap-4 xl:w-2/3'>
            <Link to='/' className='text-2xl font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque sit Lorem ipsum dolor sit amet</Link>
            <div className='flex items-center gap-2 text-gray-400 text-sm'>
                <span>Written by</span>
                <Link className='text-blue-800'>John Doe</Link>
                <span>on</span>
                <Link className='text-blue-800'>Web Design</Link>
                <span>2 days ago</span>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi dicta nostrum natus earum esse assumenda voluptate nihil. Molestiae praesentium sed atque itaque deserunt ut, illo corporis facilis sapiente consequatur. Quo!</p>
            <Link to='/test' className='underline text-sm text-blue-800 '>Read More</Link>
        </div>
    </div>
  )
}

export default Post