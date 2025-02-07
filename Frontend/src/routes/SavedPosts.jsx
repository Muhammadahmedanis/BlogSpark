import React, { useEffect, useState } from 'react';
import { useApi } from '../helper/useApi.js'; // Make sure this is correctly imported
import Post from "../components/Post.jsx"
function SavedPosts() {
  const [savePost, setSavePost] = useState([]);

  const savedMyBlog = async () => {
    try {
      const response = await useApi("get", "/post/mySaveBlog");
      if (response?.data?.savedPosts) {
        const users = response?.data
        const user = {
          userName: users?.userName,
          img: users?.img,
        }
        const postUserWithInfo = users?.savedPosts?.map(post => ({
          ...post, 
          user,
        })) 
        
        setSavePost(postUserWithInfo); // Make sure the response structure is correct
      } else {
        console.error("No saved posts found");
      }
    } catch (error) {
      console.error("Error fetching saved posts:", error);
    }
  };

  useEffect(() => {
    savedMyBlog();
  }, []);

  return (
    <>
      {savePost.length > 0 ? (
        savePost.map((post) => (
          <Post key={post?._id} post={post} /> // Ensure Post component handles the post prop
        ))
      ) : (
        <p>No saved posts available.</p> // Display message when no saved posts
      )}
    </>
  );
}

export default SavedPosts;
