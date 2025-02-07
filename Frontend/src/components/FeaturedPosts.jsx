import React from 'react'
// import ImageKit from '../utils/ImageKit.jsx'
import { Link } from 'react-router-dom'
import { useApi } from '../helper/useApi';
import { useQuery } from '@tanstack/react-query';
import Loader from "./Loader.jsx";
import { format } from "timeago.js"

const fetchFeaturedPost = async () => {
  const res = await useApi("get", "/post?featured=true&limit=4&sort=newest");
  return res?.data;
}



function FeaturedPosts() {
  const {isPending, error, data} = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchFeaturedPost(),
    // staleTime: 10 * 60 * 1000,  // 10 min
    // cacheTime: 5 * 60 * 1000, // 5 min
    refetchOnWindowFocus: false,
  })
  if (isPending) return <Loader />;
  if(error) return error.message;

  const posts = data?.posts 
  if(!posts || posts.length == 0) {
    return 
  } 

  return (
    <div className='mt-8 flex flex-col lg:flex-row gap-8'>
      {/* first post */}
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        {posts[0]?.img && <img src={posts[0]?.img} className='rounded-3xl object-cover' width="550" height="450"/>}
        <div className='flex items-center gap-4'>
          <h1 className='font-semibold lg:text-lg'>01.</h1>
          <Link className="text-blue-800 lg:text-lg">{posts[0]?.category}</Link>
          <span className='text-gray-500'>{format(posts[0]?.createdAt)}</span>
        </div>
        <Link to={posts[0]?.slug} className="text-xl lg:text-2xl font-semibold lg:font-bold">{posts[0]?.title}</Link>
      </div>
      {/* other post */}
      <div className='w-full lg:w-1/2 flex flex-col gap-4'>
        {posts[1] &&
          <div className='lg:h-1/3 flex justify-between gap-4'>
            <div className='w-1/3 aspect-video'>
              {posts[1]?.img && <img src={posts[1]?.img} className='rounded-2xl object-cover w-full h-full' width='303' />}
            </div>
              <div className='w-2/3'>
                <div className='flex items-center gap-4 text-sm lg:textbase mb-4'>
                  <h1 className='font-semibold'>02.</h1>
                  <Link className='text-blue-800'>{posts[1]?.category}</Link>
                  <span className='text-gray-500 text-sm'>{format(posts[1]?.createdAt)}</span>
                </div>
                <Link to={posts[1]?.slug}className='text-base sm:text-lg md:text-2xl lg:text-xl font-medium'>{posts[1]?.title}</Link>
              </div>
          </div>
        }
        {posts[2] &&
          <div className='lg:h-1/3 flex justify-between gap-4'>
            <div className='w-1/3 aspect-video'>
              {posts[2]?.img && <img src={posts[2]?.img} className='rounded-2xl object-cover w-full h-full' width='303' />}
            </div>
              <div className='w-2/3'>
                <div className='flex items-center gap-4 text-sm lg:textbase mb-4'>
                  <h1 className='font-semibold'>03.</h1>
                  <Link className='text-blue-800'>{posts[2]?.category}</Link>
                  <span className='text-gray-500 text-sm'>{format(posts[2]?.createdAt)}</span>
                </div>
                <Link to={posts[2]?.slug}className='text-base sm:text-lg md:text-2xl lg:text-xl font-medium'>{posts[2]?.title}</Link>
              </div>
          </div>
        }
        {posts[3] &&
          <div className='lg:h-1/3 flex justify-between gap-4'>
            <div className='w-1/3 aspect-video'>
              {posts[3]?.img && <img src={posts[3]?.img} className='rounded-2xl object-cover w-full h-full' width='303' />}
            </div>
              <div className='w-2/3'>
                <div className='flex items-center gap-4 text-sm lg:textbase mb-4'>
                  <h1 className='font-semibold'>04.</h1>
                  <Link className='text-blue-800'>{posts[3]?.category}</Link>
                  <span className='text-gray-500 text-sm'>{format(posts[3]?.createdAt)}</span>
                </div>
                <Link to={posts[3]?.slug}className='text-base sm:text-lg md:text-2xl lg:text-xl font-medium'>{posts[3]?.title}</Link>
              </div>
          </div>
        }
        
      </div>
    </div>
  )
}

export default FeaturedPosts