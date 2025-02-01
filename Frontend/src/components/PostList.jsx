import React from 'react'
import Post from './Post'

function PostList() {
  return (
    <div className='flex flex-col gap-12 mb-4'>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
    </div>
  )
}

export default PostList