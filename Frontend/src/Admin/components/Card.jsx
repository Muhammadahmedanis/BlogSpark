import React from 'react'

function Card({icon, title, value, trend, color}) {
  return (
    <div className={`bg-white dark:bg-gray-600 dark:border dark:text-white p-6 rounded-xl shadow-sm`}>
        <div className=''>
            <div className={`${color} p-3 rounded-lg`}>
                {icon}
            </div>
        </div>
        <div className='mt-4'>
            <h4 className='text-sm text-gray-400 dark:text-gray-50'>{title}</h4>
            <p className='text-2xl font-semibold mt-1 dark:text-gray-50'>{value}</p>
            <span className='text-sm text-gray-500 dark:text-gray-50'>{trend}</span>
        </div>
    </div>
   
  )
}
export default Card