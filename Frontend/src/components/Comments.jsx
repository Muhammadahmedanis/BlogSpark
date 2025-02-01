import React from 'react'
import Comment from './Comment'

function Comments() {
  return (
    <div className='flex flex-col gap-6 lg:w-3/5'>
        <h1 className='text-xl text-gray-500 underline'>Comments</h1>
        <div className='flex items-center justify-between gap-6 w-full mb-3'>
            <textarea placeholder='write a comment...' className='w-full p-4 rounded-xl bg-white border-none outline-none' />
            <button className='bg-blue-800 rounded text-white px-5 py-2 font-medium'>Send</button>
        </div>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
    </div>
  )
}

export default Comments