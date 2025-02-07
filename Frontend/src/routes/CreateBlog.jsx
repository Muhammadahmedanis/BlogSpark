import { useMutation } from '@tanstack/react-query';
import React, { useActionState, useState } from 'react';
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { useApi } from '../helper/useApi.js';
import { useNavigate } from 'react-router-dom';
// import Upload from '../components/upload';

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
      console.log(res);
      navigate(`/${res.data.slug}`);
    }
  })
  
  const[user, submitAction, isPending] = useActionState(async (previousState, formData) => {
    const payload = {
      title: formData?.get("title"),
      content:  formData?.get("content"),
      category: formData?.get("category"),
      img: cover?.filePath || "",
      desc: value,
    }
    console.log(payload);
    mutation.mutate(payload);
    setCover("");
  })

  return (
    <>
    <div className='flex flex-col gap-4'>
      {/* <h1 className='text-cl font-light mt-10'>Create a New Post</h1> */}
        {/* <Upload type="image" setProgres={setProgres} setData={setCover}>
          <img className='p-2 shadow-md text-sm h-28 w-40 mt-2 text-gray-500 object-cover bg-gray-100 rounded-xl' src={ cover.url ?  cover.url : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"} />  
        </Upload>    */}
      <form action={submitAction} className="flex flex-col gap-4 flex-1 mb-6">
        <input type="text" name='title' placeholder='My Awsome Story' className='bg-transparent text-xl border p-2 w-fit rounded font-semibold outline-none'/>
        <div className='flex items-center gap-4'>
          <label className='text-sm'>Choose a category:</label>
          <select className="bg-white border-none outline-none p-2 rounded-xl shadow-md" name="category">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="marketing">Marketing</option>
            <option value="artificial-intelligence">Artificial Intelligence</option>
          </select>
        </div>
        <textarea name="content" placeholder='A Short Description' className='bg-white border-none outline-none p-2 rounded-xl shadow-md' />
        {/* <ReactQuill name="desc" theme="snow" value={value} onChange={setValue} className='min-h-[300px] flex-1 bg-white border-none outline-none rounded-xl shadow-md' /> */}
        {isPending ? <div className="w-7 h-7 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div> : <button type='submit' disabled={isPending || 0 < progress && progress < 100} className='bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-md mx-auto cursor-pointer px-7 py-2 w-max'>Submit Blog</button>}
        {"progress: " + progress} 
      </form>
    </div>
    </>
  )
}

export default CreateBlog