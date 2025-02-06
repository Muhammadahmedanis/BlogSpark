import { IKContext, IKUpload } from 'imagekitio-react';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';
import { axiosInstance } from '../api/axios';

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

function Upload({ type, children, setProgres=null, setData }) {

    const ref = useRef(null);

    const onError = err => {
    console.log("Error", err);
    toast.error(err);
    };
    
    const onSuccess = res => {
    console.log("Success", res);
    setData(res);
    };

    const onUploadProgress = (progress) => {
    console.log(progress);
    {setProgres != null && setProgres(Math.round((progress.loaded/progress.total) * 100));}
    };

  return (
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
          className='hidden'
          ref={ref}
          accept={`${type}/*`}
        />
        <div className='cursor-pointer' onClick={() => ref.current.click()}>{ children }</div>
    </IKContext>
  )
}

export default Upload