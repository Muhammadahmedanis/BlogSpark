import React from 'react'
import ImageKit from '../utils/imageKit'
import { Link } from 'react-router-dom'

function FeaturedPosts() {
  return (
    <div className='mt-8 flex flex-col lg:flex-row gap-8'>
      {/* first post */}
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        <ImageKit src='AI.jpeg' className='rounded-3xl object-cover' width="910"/>
        <div className='flex items-center gap-4'>
          <h1 className='font-semibold lg:text-lg'>01.</h1>
          <Link className="text-blue-800 lg:text-lg">Web Design</Link>
          <span className='text-gray-500'>2 days ago</span>
        </div>
        <Link to='/' className="text-xl lg:text-2xl font-semibold lg:font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Link>
      </div>
      {/* other post */}
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        <div className='lg:h-1/3 flex justify-between gap-4'>
          <div className='w-1/3 aspect-video'>
            <ImageKit src="Content.jpeg" className='rounded-2xl object-cover w-full h-full' width='303' />
          </div>
            <div className='w-2/3'>
              <div className='flex items-center gap-4 text-sm lg:textbase mb-4'>
                <h1 className='font-semibold'>02.</h1>
                <Link className='text-blue-800'>Web Design</Link>
                <span className='text-gray-500 text-sm'>2 days ago</span>
              </div>
              <Link to='/'className='text-base sm:text-lg md:text-2xl lg:text-xl font-medium'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Link>
            </div>
        </div>

        <div className='lg:h-1/3 flex justify-between gap-4'>
           <div className='w-1/3 aspect-video'>
            <ImageKit src="Content.jpeg" className='rounded-2xl object-cover w-full h-full' width='303' />
           </div>
            <div className='w-2/3'>
              <div className='flex items-center gap-4 text-sm lg:textbase mb-4'>
                <h1 className='font-semibold'>02.</h1>
                <Link className='text-blue-800'>Web Design</Link>
                <span className='text-gray-500 text-sm'>2 days ago</span>
              </div>
              <Link to='/'className='text-base sm:text-lg md:text-2xl lg:text-xl font-medium'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Link>
            </div>
        </div>

        <div className='lg:h-1/3 flex justify-between gap-4'>
            <div className='w-1/3 aspect-video'>
             <ImageKit src="Content.jpeg" className='rounded-2xl object-cover w-full h-full' width='303' />
          </div>
            <div className='w-2/3'>
              <div className='flex items-center gap-4 text-sm lg:textbase mb-4'>
                <h1 className='font-semibold'>02.</h1>
                <Link className='text-blue-800'>Web Design</Link>
                <span className='text-gray-500 text-sm'>2 days ago</span>
              </div>
              <Link to='/'className='text-base sm:text-lg md:text-2xl lg:text-xl font-medium'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</Link>
            </div>
        </div>


        
      </div>
    </div>
  )
}

export default FeaturedPosts