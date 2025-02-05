import React from 'react'
import Post from './Post'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useApi } from '../helper/useApi'
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from 'react-router-dom';
import Loader from './Loader';

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamObj = Object?.fromEntries([...searchParams])
  console.log(searchParamObj);
  
  const data =  await useApi("get", "/post", {
    params: {page: pageParam, limit: 10, ...searchParamObj},
  });
  return data?.data;
}

function PostLists () {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts', searchParams.toString()],
    refetchOnWindowFocus: false,
    queryFn: ({pageParam = 1}) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage?.hasMore ? pages?.length + 1 : undefined,
  })

  if (status === "pending") return<Loader />;
  
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
    {allPosts?.map((post) => (
      <Post key={post?._id} post={post} />
    ))}
  </InfiniteScroll>
  )
}

export default PostLists