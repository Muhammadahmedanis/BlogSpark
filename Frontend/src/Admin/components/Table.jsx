import React, { useEffect, useState } from 'react'
import { MdOutlineDeleteOutline, MdPublishedWithChanges } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { toast } from 'react-toastify';
import { format } from "timeago.js"
import { useApi } from '../../helper/useApi';
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/getDataSlice.js';

function Table() {
  const[users, setUser] = useState([]);
  const[isEdit, setIsEdit] = useState(null);
  const[isChanges, setIsChanges] = useState({});
  const dispatch = useDispatch();

  const getAllUser = async () => {
    try {
      const response = await useApi("get", "user");
      dispatch(getUser(response.data))
      setUser(response.data);
    } catch (error) {
      toast.error(error.response?.data.message)
    }
  }
  
  const handleDelete = async (e) => {
    const userId = e.currentTarget.id
    try {
      const response = await useApi("delete", `/user/delete/${userId}`)
      toast.success(response.data.message);
      getAllUser();
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  }
  
  const handleUpdate = async (e) => {
    const userId = e.currentTarget.id;
    
    if(userId === isEdit){
      setIsEdit(!isEdit);
      console.log({userName:isChanges[userId]});
      try {
          const response = await useApi("patch", `/user/update/${userId}`, {userName:isChanges[userId]})
          getAllUser();
          toast.success(response.data.message);
        } catch (error) {
          toast.error(error.response?.data.message);
      }
    }else{
      setIsEdit(userId);
      // setIsChanges((prev) => ({
      //   ...prev, 
      //   [userId]: isChanges[userId] || "",
      // }))
    }
    
  }

  const handleEdit = (user) => {
    setIsEdit(user._id); // Set user in edit mode
    setIsChanges((prev) => ({
      ...prev,
      [user._id]: user.userName, // Store the existing username to prevent empty field
    }));
  };
  


  useEffect(() => {
    getAllUser()
  }, [])

  return (
    <div className="dark:bg-gray-700 border text-white bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Beneficiaries</h3>
            <div className="overflow-x-auto">
                <table className='w-full'>
                    <thead className='bg-gray-400'>
                      <tr className='text-center text-gray-500 dark:text-white'>
                        <th className='px-6 py-3 font-medium uppercase'>ID</th>
                        <th className='px-6 py-3 font-medium uppercase'>Name</th>
                        <th className='px-6 py-3 font-medium uppercase'>Join</th>
                        <th className='px-6 py-3 font-medium uppercase'>Status</th>
                        <th className='px-6 py-3 font-medium uppercase'>Action</th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 text-center'>
                      {users.map((user, ind) => (
                        <tr key={ind} className='hover-bg-gray-50 text-sm text-gray-900 dark:text-white'>
                          <td className='px-6 py-4'>{user._id}</td>
                          <td className='px-6 py-4 font-semibold'>{ isEdit === user._id ? <input type="text" className='border rounded p-1 text-center' value={isChanges[user._id] ?? user.userName} onChange={(e) => setIsChanges((prev) => ({...prev, [user._id]:e.target.value }))} /> : <span onClick={handleEdit}>{user.userName}</span> }</td>
                          <td className='px-6 py-4'>{format(user.createdAt)}</td>
                          <td className='px-6 py-4 flex justify-center'>
                            <span className={`px-3 py-1 w-24 rounded-full text-xs ${user.isVerified ? 'bg-green-200 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {user.isVerified? "Verfied" : "Not Verified"}
                            </span>
                          </td>
                          <td className='text-gray-500'>
                            <button onClick={handleDelete}  id={user._id} className='cursor-pointer'>
                              <MdOutlineDeleteOutline size={25} />
                            </button>
                            <button onClick={handleUpdate} id={user._id} className='cursor-pointer'>
                              { isEdit == user._id ? <MdPublishedWithChanges size={25} /> : <TbEdit size={25} />}
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

export default Table