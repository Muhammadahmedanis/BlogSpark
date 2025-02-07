import React, { useEffect, useState } from 'react'
import { useApi } from '../helper/useApi';
import Post from "../components/Post.jsx"

function MyBlog() {
    const[blog, setBlog] = useState([]);
    const myBlog = async () => {
        const response = await useApi("get", "/post/myBlog");
        setBlog(response?.data);
    }
    useEffect(() => {
        myBlog();
    }, [])
    
    console.log(blog);
  return (
    <>
       {blog?.length > 0 ? (
        blog.map((post) => (
          <Post key={post?._id} post={post} /> // Ensure Post component handles the post prop
        ))
      ) : (
        <p>No posts available.</p> // Display message when no saved posts
      )}
    </>
  )
}

export default MyBlog