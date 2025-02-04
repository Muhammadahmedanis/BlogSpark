import React from 'react'
import Post from './Post'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useApi } from '../helper/useApi'
import InfiniteScroll from "react-infinite-scroll-component";

const fetchPosts = async (pageParam) => {
  const data =  await useApi("get", "/post", {
    params: {page: pageParam, limit: 2},
  });
  // console.log(data);
  return data?.data;
}
// fetchData()
function PostLists () {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({pageParam = 1}) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage?.hasMore ? pages?.length + 1 : undefined,
  })

  if (status === "pending") return <div className='flex gap-2 items-center justify-center'><p className='text-[23px] font-semibold'>Loading</p> <img src="https://img.icons8.com/?size=100&id=I2EAeOMEYXQj&format=png&color=000000" /> </div>;
  
  if (status === "error") return 'An error has occurred: ' + error.message

  const allPosts = data?.pages?.flatMap(pages => pages?.posts) || [];

  return (
    <InfiniteScroll
    dataLength={allPosts.length}
    next={fetchNextPage}
    hasMore={!!hasNextPage}
    loader={<h4>Loading more posts...</h4>}
    endMessage={
      <p>
        <b>All posts loaded!</b>
      </p>
    }
  >
    {allPosts.map((post) => (
      <Post key={post._id} post={post} />
    ))}
  </InfiniteScroll>
  )
}

export default PostLists