import React from 'react'
import Post from './Post'
import { useQuery } from '@tanstack/react-query'
import { useApi } from '../helper/useApi'

const fetchData = async () => {
  const data =  await useApi("get", "/post");
  console.log(data);
  return data;
}
// fetchData()
function PostLists () {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => fetchData(),
  })

  if(isPending) return 'Loading...'
  // if (isPending) return `Loading ${<img src='https://img.icons8.com/?size=100&id=I2EAeOMEYXQj&format=png&color=000000' />}`
  
  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className='flex flex-col gap-12 mb-4'>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
    </div>
  )
}

export default PostLists