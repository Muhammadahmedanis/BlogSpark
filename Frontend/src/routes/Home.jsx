import { Link } from 'react-router-dom';
import { MdOutlineArrowOutward } from "react-icons/md";
import MainCategories from '../components/MainCategories';
import FeaturedPosts from '../components/FeaturedPosts';
import PostList from '../components/PostList';

function Home() {
  return (
    <div className='mt-4 flex flex-col gap-4'>
      <div className='flex gap-4 justify-center md:justify-start'>
        <Link to="/">Home</Link>
        <span>•</span>
        <span className='text-blue-800'>Blogs and Articles</span>
      </div>
      {/* introduction */}
      <div className='flex items-center justify-center'>
        {/* title */}
        <div>
          <h1 className='text-gray-800 text-xl md:text-4xl lg:text-5xl font-bold'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
          <p className='mt-8 text-md md:text-[15px]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, et cupiditate. Eaque.</p>
        </div>
        {/* animated button */}
        <Link to="/createBlog" className='relative hidden md:block'>
            <svg style={{animationDuration: '2000ms'}} viewBox='0 0 200 200' width='200' height='200' className='text-lg tracking-widest' >
            {/* className='text-lg tracking-widest animate-spin' */}
              <path id='circlePath' fill='none' d='M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0' />
            <text>
              <textPath href='#circlePath' startOffset="0%">Write your story •</textPath>
              <textPath href='#circlePath' startOffset="50%">Share your idea •</textPath>
            </text>
            </svg>
            <button className='absolute top-0 bottom-0 left-0 right-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center'><MdOutlineArrowOutward size={30} className='text-white rounded-full' /></button>
        </Link>
      </div>
      {/*  main categories */}
      <MainCategories />

      {/* featured Post */}
      <FeaturedPosts />

      {/* post list */}
      <div>
        <h1 className='my-4 text-2xl text-gray-600'>Recent Posts</h1>
        <PostList />
      </div>

    </div>
  )
}

export default Home