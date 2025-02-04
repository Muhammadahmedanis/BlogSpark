import React from 'react'
import ImageKit from '../utils/imageKit';
import { format } from 'timeago.js'
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from '../helper/useApi';
import { toast } from 'react-toastify';

function Comment({ comment, postId }) {
  const {user} = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      return await useApi("delete", `/comment/${comment._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["comments", postId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-5">
        <div className="flex items-center gap-4">
            <ImageKit src="default-image.jpg" className="w-10 h-10 rounded-full object-cover" width="40"/>
            <span className="font-medium">{comment?.user?.userName}</span>
            <span className="text-sm text-gray-500">{format(comment?.createdAt)}</span>
            {user && (comment?.user?.userName === user.name || user.role === "admin") && 
            <span onClick={() => mutation.mutate()} className='text-sm text-red-300 hover:text-red-500 cursor-pointer'>Delete
              {mutation.isPending && <span>In progress</span> }
            </span>}
        </div>
        <div className="mt-2">
            <p className='text-[15px]'>{comment?.desc}</p>
        </div>
    </div>
  )
}

export default Comment