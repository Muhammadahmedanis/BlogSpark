import React, { useEffect, useState } from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useApi } from '../../helper/useApi';
import { format } from "timeago.js"
import { useDispatch } from 'react-redux';
import { getBlog } from '../../redux/getDataSlice';

function Blogs() {
    const dispatch = useDispatch();
    const[posts, setPosts] = useState([]);
    const getAllPost = async () => {
        try {
            const response = await useApi("get", "post/allBlog");
            setPosts(response.data);
            // dispatch(getBlog(response.data));
        } catch (error) {
            toast.error(error.response?.data.message)            
        }
    }

    useEffect(() => {
        getAllPost();
    }, [])
    
    // console.log(posts);
  return (
    <div className="dark:bg-gray-700 border text-white bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-black">All Blogs</h3>
                <div className="overflow-x-auto">
                    <table className='w-full'>
                        <thead className='bg-gray-400'>
                          <tr className='text-center text-gray-500 dark:text-white'>
                            <th className='px-6 py-3 font-medium uppercase'>User ID</th>
                            <th className='px-6 py-3 font-medium uppercase'>Post ID</th>
                            <th className='px-6 py-3 font-medium uppercase'>TITLE</th>
                            <th className='px-6 py-3 font-medium uppercase'>Views</th>
                            <th className='px-6 py-3 font-medium uppercase'>PUBLISH</th>
                            <th className='px-6 py-3 font-medium uppercase'>Action</th>
                          </tr>
                        </thead>
                        <tbody className='divide-y text-center divide-gray-200'>
                          {posts?.map((user, ind) => (
                            <tr key={ind} className='hover-bg-gray-50 text-sm text-gray-900 dark:text-white'>
                              <td className='px-6 py-4'>{user.user}</td>
                              <td className='px-6 py-4'>{user._id}</td>
                              <td className='px-6 py-4'>{user.title}</td>
                              <td className='px-6 py-4'>{user.visit}</td>
                              <td className='px-6 py-4'>{format(user.createdAt)}</td>
                              <td className='text-gray-500'>
                                <button  id={user._id} className='cursor-pointer'>
                                  <MdOutlineDeleteOutline size={25} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
  )
}

export default Blogs