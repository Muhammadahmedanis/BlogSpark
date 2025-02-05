import React from "react";
import { Link, useParams } from "react-router-dom";
import ImageKit from "../utils/imageKit";
import { format } from "timeago.js"

const BlogSection = ({post}) => {
  
  return (
      <div className="container mx-auto flex flex-col xl:flex-row mb-2 overflow-x-hidden">
        <div className="mt-2 lg:-mx-6 lg:flex lg:items-center">
          {post?.img && <ImageKit src={post?.img}  className="object-cover w-full lg:mx-6 lg:w-1/3 rounded-xl h-52 lg:h-64" />}
          <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
            {/* <p className="text-sm text-blue-500 uppercase">category</p> */}
            <Link to={`/${post?.slug}`} className="block mt-4 cursor-pointer text-2xl font-semibold text-gray-800 hover:underline dark:text-white">
              {post?.title}
            </Link>
            <div className="flex items-center gap-2 mt-1 text-gray-400 text-sm">
              <span>Written by</span>
              <Link className="text-blue-800" to={`/posts?author=${post?.user?.userName}`}>{post?.user?.userName?.charAt(0).toUpperCase() + post?.user?.userName?.slice(1)}</Link>
              <span>on</span>
              <Link className="text-blue-800">{post?.category}</Link>
              <span>{format(post?.createdAt)}</span>
            </div>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
              {post?.content}
            </p>

            <Link to={`/${post?.slug}`} className="inline-block mt-2 text-blue-500 underline hover:text-blue-400">
              Read more
            </Link>

            <div className="flex items-center mt-6">
              <img
                className="object-cover object-center w-10 h-10 rounded-full"
                src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                alt="Author"/>

              <div className="mx-4">
                <h1 className="text-sm text-gray-700 dark:text-gray-200">Amelia Anderson</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BlogSection;
