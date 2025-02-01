import React from 'react'
import ImageKit from '../utils/imageKit'

function Comment() {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-5">
        <div className="flex items-center gap-4">
            <ImageKit src="default-image.jpg" className="w-10 h-10 rounded-full object-cover" width="40"/>
            <span className="font-medium">John Doe</span>
            <span className="text-sm text-gray-500">2 days ago</span>
        </div>
        <div className="mt-2">
            <p className='text-[15px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, earum accusantium? Esse impedit maxime obcaecati delectus, consequuntur, quisquam eos veniam illo mollitia fugit perferendis minima aut doloribus assumenda, iusto labore.</p>
        </div>
    </div>
  )
}

export default Comment