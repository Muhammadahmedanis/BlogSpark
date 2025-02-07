import { useMutation } from '@tanstack/react-query';
import React, { useActionState, useState } from 'react';
import { useApi } from '../helper/useApi.js';
import { useNavigate } from 'react-router-dom';
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

function CreateBlog() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [value, setValue] = useState('');
  const [progress, setProgress] = useState(0);

  // Mutation for API call
  const mutation = useMutation({
    mutationFn: async (formData) => {
      return await useApi("post", "/post/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: (res) => {
      console.log("Blog uploaded:", res);
      navigate(`/${res.data.slug}`);
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  const [user, submitAction, isPending] = useActionState(async (prevState, formData) => {
    const newFormData = new FormData();
    newFormData.append("title", formData.get("title"));
    newFormData.append("content", formData.get("content"));
    newFormData.append("category", formData.get("category"));
    newFormData.append("desc", value); // SunEditor content
    if (file) newFormData.append("img", file);

    console.log("Submitting Data:", Object.fromEntries(newFormData));
    mutation.mutate(newFormData);

    setFile(null);
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Image Upload */}
      <div>
        <label htmlFor="file" className="cursor-pointer">
          <img
            className="w-[200px] p-1 h-[120px] border-none outline-none object-cover"
            src={file ? URL.createObjectURL(file) : "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"}
            alt="Preview"
          />
        </label>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])} // Corrected file handling
        />
      </div>

      {/* Form */}
      <form action={submitAction} className="flex flex-col gap-4 flex-1 mb-6">
        <input type="text" name="title" placeholder="My Awesome Story" className="bg-transparent text-xl border p-2 w-fit rounded font-semibold outline-none" />
        
        <div className="flex items-center gap-4">
          <label className="text-sm">Choose a category:</label>
          <select className="bg-white border-none outline-none p-2 rounded-xl shadow-md" name="category">
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="marketing">Marketing</option>
            <option value="artificial-intelligence">Artificial Intelligence</option>
          </select>
        </div>

        <textarea name="content" placeholder="A Short Description" className="bg-white border-none outline-none p-2 rounded-xl shadow-md" />

        {/* SunEditor */}
        <SunEditor
          defaultValue={value}
          onChange={setValue}
          className="w-full bg-white border-none outline-none rounded-xl shadow-md"
          setOptions={{
            minHeight: "300px",
            placeholder: "Start writing your blog here...",
            buttonList: [
              ["bold", "italic", "underline", "strike"], 
              ["fontSize", "formatBlock", "align"], 
              ["list", "blockquote", "table", "codeView"], 
              ["link", "image", "video"], 
              ["undo", "redo", "removeFormat"]
            ],
          }}
        />

        {/* Submit Button */}
        {isPending ? (
          <div className="w-7 h-7 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        ) : (
          <button type="submit" disabled={isPending || (progress > 0 && progress < 100)} className="bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-md mx-auto cursor-pointer px-7 py-2 w-max">
            Submit Blog
          </button>
        )}

        {"Progress: " + progress}
      </form>
    </div>
  );
}

export default CreateBlog;
