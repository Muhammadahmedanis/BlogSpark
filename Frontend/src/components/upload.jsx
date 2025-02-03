import React from 'react'

function upload({setProgres, setData}) {
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
    setProgres(Math.round((progress.loaded/progress.total) * 100));
    };

  return (
    <div>upload</div>
  )
}

export default upload