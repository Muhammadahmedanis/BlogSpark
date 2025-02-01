import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

function CreateBlog() {
  return (
    <>
    <div className='flex flex-col gap-4'>
      <h1 className='text-xl font-light'>Create a New Post</h1>
      <form className="flex flex-col gap-4 flex-1 mb-6">
        <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">Add a cover image</button>
        <input type="text" placeholder='My Awsome Story' className='bg-transparent text-2xl font-semibold outline-none border-none'/>
        <div className='flex items-center gap-4'>
          <label className='text-sm'>Choose a category:</label>
          <select className="bg-white border-none outline-none p-2 rounded-xl shadow-md" name="category">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="search-engine">Search Engine</option>
            <option value="search-engine">Search Engine</option>
          </select>
        </div>
        <textarea name="desc" placeholder='A Short Description' className='bg-white border-none outline-none p-2 rounded-xl shadow-md' />
        <ReactQuill theme="snow" className='min-h-[300px] flex-1 bg-white border-none outline-none rounded-xl shadow-md' />
        <button className='bg-blue-800 text-white font-medium rounded-md mx-auto cursor-pointer px-7 py-2 w-max'>Send</button>
      </form>
    </div>
    </>
  )
}

export default CreateBlog