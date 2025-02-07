import React from 'react'
// import ImageKit from '../utils/imageKit'
import { Link, useParams } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import PostMenuAction from '../components/PostMenuAction';
import Search from '../components/Search';
import Comments from '../components/Comment';
import { useQuery } from "@tanstack/react-query";
import {format} from "timeago.js";
import { useApi } from '../helper/useApi';
import Loader from '../components/Loader';

const fetchPosts = async(slug) => {
  const res = await useApi("get", `/post/${slug}`);
  return res?.data;
}

function SinglePost() {
  const { slug } = useParams();
  const {isPending, error, data} = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPosts(slug),
    refetchOnWindowFocus: false,
  })

  if (isPending) return <Loader />;
  if(error) return error.message;
  if(!data) return "Post not found!";
  console.log(data);
  

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex gap-8'>
        <div className='lg:w-3/5 flex flex-col gap-8'>
          <h1 className='text-xl md:text3xl xl:text-3xl 2xl:text-4xl font-semibold'>{data?.title}</h1>
          <div className='flex items-center gap-2 text-gray-400 text-sm'>
            <span>Written By</span>
            <Link className='text-blue-800'>{data?.user?.userName.charAt(0).toUpperCase() + data?.user?.userName?.slice(1)}</Link>
            <span>on</span>
            <Link className='text-blue-800'>{data?.category}</Link>
            <span>{format(data?.createdAt)}</span>
            
          </div>
          <p className='text-gray-500 font-medium'>{data?.content}</p>
        </div>
        <div className='hidden lg:block w-2/6'>
          { data?.img && <img src={data.img} width='500' height='300' className='rounded-2xl'/>}
        </div>
      </div>

      <div className='flex flex-col md:flex-row gap-10'>
        <div className='lg:text-lg flex flex-col gap-6 text-justify font-sans '>
          <p className='text-[16px]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repellat molestiae voluptate quisquam ipsam commodi sit laudantium, mollitia quis dolores eius placeat ducimus modi veritatis temporibus assumenda pariatur aliquam illum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis cupiditate delectus fuga impedit similique nesciunt autem aut qui, velit iusto numquam nulla soluta incidunt iste doloribus in sint ratione quo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deserunt cupiditate, facere eligendi natus, totam inventore libero vel ratione sunt corrupti fuga voluptas aliquam minus neque quibusdam. Voluptatem, hic aliquid! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis vero corrupti quia placeat dolorem distinctio a similique ipsa. Vitae repellendus voluptatem molestiae sed sit! Atque ea magnam pariatur accusantium illum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio voluptas alias laborum quisquam doloribus voluptatibus, quam temporibus non accusantium a consequatur veniam, maxime recusandae atque eveniet quis natus dicta! Ad.
          </p>
          <p className='text-[16px]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repellat molestiae voluptate quisquam ipsam commodi sit laudantium, mollitia quis dolores eius placeat ducimus modi veritatis temporibus assumenda pariatur aliquam illum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis cupiditate delectus fuga impedit similique nesciunt autem aut qui, velit iusto numquam nulla soluta incidunt iste doloribus in sint ratione quo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deserunt cupiditate, facere eligendi natus, totam inventore libero vel ratione sunt corrupti fuga voluptas aliquam minus neque quibusdam. Voluptatem, hic aliquid! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid, fuga? Omnis veniam eum non tempore pariatur explicabo aut sint dolores quia. Deserunt harum quibusdam natus illum doloremque et ullam a! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum nostrum debitis, assumenda deserunt aperiam tenetur, dolore ratione veritatis exercitationem libero minus. Nesciunt repellat quos dolor quae saepe debitis ipsam voluptatum?
          </p>
          <p className='text-[16px]'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repellat molestiae voluptate quisquam ipsam commodi sit laudantium, mollitia quis dolores eius placeat ducimus modi veritatis temporibus assumenda pariatur aliquam illum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis cupiditate delectus fuga impedit similique nesciunt autem aut qui, velit iusto numquam nulla soluta incidunt iste doloribus in sint ratione quo. Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta deserunt cupiditate, facere eligendi natus, totam inventore libero vel ratione sunt corrupti fuga voluptas aliquam minus neque quibusdam. Voluptatem, hic aliquid! Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur id excepturi porro quod, veniam ipsa itaque magnam molestiae sint voluptates ducimus vitae omnis tempora ipsam sunt, aliquam incidunt similique. Fuga? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum fuga labore natus nihil aliquid! Unde, repudiandae laboriosam suscipit laudantium perferendis atque quae, illo voluptatibus reprehenderit facilis eveniet quis cumque officia? Lorem ipsum dolor sit amet consectetur adipisicing elit. Id facilis nobis, debitis incidunt blanditiis voluptas fugit impedit ullam, aliquam non libero. Doloremque eaque dicta dolore. Nemo fugiat illo iure unde. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia odio autem dignissimos sint ab error expedita, mollitia consectetur saepe atque. Quibusdam, eius dicta? Corporis earum in qui est, iure reiciendis.
          </p>
        </div>

        <div className='px-4 h-max sticky top-20'>
          <h1 className='mb-3 text-sm font-medium'>Author</h1>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-4 items-center'>
              <img src={data?.user?.img} className='w-12 h-12 rounded-full object-cover' width='48' height='48' />
              <Link className='text-blue-800'>{data?.user?.userName.charAt(0).toUpperCase() + data?.user?.userName?.slice(1)}</Link>
            </div>
            <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className='flex gap-2'>
              <Link> <FaFacebook size={25} className='text-blue-700' /> </Link>
              <Link> <GrInstagram size={25} className='text-pink-600' /> </Link>
            </div>
          </div>
          <PostMenuAction post={data} />
          <h1 className='mt-6 mb-3 text-sm font-medium'>Categories</h1>
          <div className='flex flex-col gap-2 text-sm '>
            <Link className='underline' to='/'>All</Link>
            <Link className='underline' to='/'>Web Design</Link>
            <Link className='underline' to='/'>Databases</Link>
            <Link className='underline' to='/'>Search Engines</Link>
            <Link className='underline' to='/'>Marketing</Link>
          </div>
          <h1 className='mt-8 mb-3 text-sm font-medium'>Search</h1>
          <Search />
        </div>
      </div>

    <Comments postId={data._id} />
    </div>
  )
}

export default SinglePost