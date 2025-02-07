import React from 'react'
import Comment from './Comment'
import { useApi } from '../helper/useApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux'

const fetchComments = async(postId) => {
  const res = await useApi("get", `/comment/${postId}`);
  return res?.data;
}

function Comments({postId}) {
  const { user } = useSelector((state) => state.auth);
  
  const {isPending, error, data} = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  })

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      return await useApi("post", `/comment/${postId}`, newComment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["comments", postId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });



  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      desc: formData.get("desc"),
    };
    // console.log(payload);
    mutation.mutate(payload);
  };


  return (
    <div className='flex flex-col gap-6 lg:w-3/5 mb-6'>
        <h1 className='text-xl text-gray-500 underline'>Comments</h1>
        <form onSubmit={handleSubmit} className='flex items-center justify-between gap-6 w-full mb-3'>
            <textarea placeholder='write a comment...' name='desc' className='w-full p-4 rounded-xl hover:border-green-500 bg-white hover:border outline-none' />
            <button className='bg-blue-800 rounded cursor-pointer text-white px-5 py-2 font-medium'>Send</button>
        </form>
        {isPending ? (<div className='flex gap-2 items-center justify-center text-sm'><p className='text-sm font-semibold'>Loading</p> <img src="https://img.icons8.com/?size=100&id=I2EAeOMEYXQj&format=png&color=000000" /> </div>) : error ? 'Error loading comments...' : 
        <>
        {
          mutation?.isPending && (
            <Comment comment={{
              desc: `${mutation?.variables?.desc}(Sending....)`,
              createdAt: new Date(),
              user: user?.name,
            }} />
          )
        }
        {
          data.map(comment => (
            <Comment key={comment._id} comment={comment} postId={postId} />
          ))
        }
        </>
        }
    </div>
  )
}

export default Comments