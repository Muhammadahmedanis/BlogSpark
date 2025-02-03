import { useMutation } from '@tanstack/react-query';
import React, { useActionState, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useApi } from '../helper/useApi';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axios';
import { IKContext, IKUpload } from 'imagekitio-react';
import { toast } from 'react-toastify';

function CreateBlog() {
  const navigate = useNavigate();
  const[cover, setCover] = useState('');
  const[value, setValue] = useState('');
  const[progress, setProgres] = useState(0);
  
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      return await useApi("post", "/post/create", newPost);
    },
    onSuccess: (res) => {
      navigate(`/${res.data.slug}`);
    }
  })

  const authenticator =  async () => {
    try {
        const response = await axiosInstance.get("/post/upload-auth");
        
        if (!response.status == 200) {
            const errorText = await response.statusText();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.data;
        console.log(data);
        
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

  const[user, submitAction, isPending] = useActionState(async (previousState, formData) => {
    const payload = {
      title: formData?.get("title"),
      content:  formData?.get("content"),
      category: formData?.get("category"),
      img: formData?.get("img").name,
      desc: value,
    }
    console.log(payload);
    mutation.mutate(payload);
  })


  

  return (
    <>
    <div className='flex flex-col gap-4'>
      <form action={submitAction} className="flex flex-col gap-4 flex-1 mb-6">
      <IKContext 
        publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY} 
        urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT} 
        authenticator={authenticator} 
      >
        <IKUpload
          useUniqueFileName
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
        />
      </IKContext>
          <input type="text" name='title' placeholder='My Awsome Story' className='bg-transparent text-xl border p-2 w-fit rounded font-semibold outline-none'/>
        <div className='flex items-center gap-4'>
          <label className='text-sm'>Choose a category:</label>
          <select className="bg-white border-none outline-none p-2 rounded-xl shadow-md" name="category">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="marketing">Marketing</option>
            <option value="search-engine">Search Engine</option>
          </select>
        </div>
        <textarea name="content" placeholder='A Short Description' className='bg-white border-none outline-none p-2 rounded-xl shadow-md' />
        <ReactQuill name="desc" theme="snow" value={value} onChange={setValue} className='min-h-[300px] flex-1 bg-white border-none outline-none rounded-xl shadow-md' />
        {isPending ? <div className="w-7 h-7 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> : <button type='submit' disabled={isPending || 0 < progress && progress < 100} className='bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-md mx-auto cursor-pointer px-7 py-2 w-max'>Submit Blog</button>}
        {"progress: " + progress} 
      </form>
    </div>
    </>
  )
}

export default CreateBlog