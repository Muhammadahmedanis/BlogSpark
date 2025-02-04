import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { MdBookmark } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useApi } from '../helper/useApi';
import { MdBookmarkBorder } from "react-icons/md";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IoStar } from "react-icons/io5";
import { IoMdStarOutline } from "react-icons/io";

function PostMenuAction({post}) {
  const navigate = useNavigate()
  const {user} = useSelector((state) => state.auth);

  const {isPending, error, data: savedPosts} = useQuery({
    queryKey: ["savedPost"],
    queryFn: async () => {
      const res = await useApi("get", "/user/saved");
      return res?.data;
    },
  })
  console.log(savedPosts);
  

  const isSaved = savedPosts?.includes(post._id) || false;
  console.log(isSaved);


  const isAdmin = user?.role === "admin" || false
  

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await useApi("delete", `/post/${post._id}`)
      return res.data;
    },
    onSuccess: (res) => {
      toast.success(res?.data.message)
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data);
    }
  })
  const handleDelete = () => {
    deleteMutation.mutate();
  }



  const queryClient = useQueryClient();
  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await useApi("patch", "/user/save", { postId: post._id});
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["savedPost"]});
    },
    onError: (error) => {
      toast.error(error.response.data);
    }
  })
  const handleSave = () => {
    if(!user){
      return navigate("/signin");
    }
    saveMutation.mutate();
  }



  const featuredMutation = useMutation({
    mutationFn: async () => {
      const res = await useApi("patch", "/post/featured", { postId: post._id});
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["post", post.slug]});
    },
    onError: (error) => {
      toast.error(error.response.data);
    }
  })
  const handleFeatured = () => {
    featuredMutation.mutate();
  }

  return (
    <div className=''>
        <h1 className='mt-6 mb-3 text-sm font-medium'>Actions</h1>
        {
          isPending ? 
          (<div className='flex gap-2 items-center'><p className='text-sm font-semibold'>Loading</p> <img src="https://img.icons8.com/?size=50&id=I2EAeOMEYXQj&format=png&color=000000" /></div>) : 
          error ? 
          "Saved post fetching fail" : 
          <div className='flex items-center justify-start gap-2 py-2 text-sm cursor-pointer' onClick={handleSave}>
           { saveMutation.isPending ? isSaved ? <MdBookmarkBorder size={22} /> : <MdBookmark size={22} className='text-black' /> :  isSaved ? <MdBookmark size={22} className='text-black' /> : <MdBookmarkBorder size={22} />  }
            <span>Save this post</span>
            {saveMutation.isPending && <span className='text-sm'>In progress</span> }
          </div>
        }
        {
          !isAdmin && <div onClick={handleFeatured} className='flex gap-2 items-center cursor-pointer'>
            {featuredMutation.isPending ? post.isFeatured ? <IoMdStarOutline size={20} /> : <IoStar size={22} /> : post.isFeatured ? <IoStar size={20} /> : <IoMdStarOutline size={22} />} <span>Featured</span>
            {featuredMutation.isPending && <span className='text-sm'>In progress</span> }
          </div>
        }
        { user && (post.user.userName === user.name || isAdmin) && 
            <div onClick={handleDelete} className='flex items-center justify-start gap-2 py-2 text-sm cursor-pointer'>
              <MdOutlineDelete size={22} className='text-pink-600' />
              <span>Delete this post</span>
              {deleteMutation?.isPending && <span className='text-sm'>In progress</span> }
             </div>
        }
    </div>
  )
}

export default PostMenuAction