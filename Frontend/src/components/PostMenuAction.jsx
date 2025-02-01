import React from 'react'
import { MdOutlineDelete } from "react-icons/md";
import Search from './Search';

function PostMenuAction() {
  return (
    <div className=''>
        <h1 className='mt-6 mb-3 text-sm font-medium'>Actions</h1>
        <div className='flex items-center gap-2 py-2 text-sm cursor-pointer'>
            <MdOutlineDelete size={22} className='text-pink-600' />
            <span>Save this post</span>
        </div>
        <div className='flex items-center gap-2 py-2 text-sm cursor-pointer'>
            <MdOutlineDelete size={22} className='text-pink-600' />
            <span>Delete this post</span>
        </div>
    </div>
  )
}

export default PostMenuAction