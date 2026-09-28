import React from 'react'
import ListIndex from './lists/ListIndex'
import AllStatus from './chart/AllStatus'
import Completed from './completed/Completed'

const HomeIndex = () => {
    return (
        <div className='p-7'>
            <div>
                <h1 className='text-3xl font-semibold'>
                    Welcome Milan
                    <span className='ml-3'>👋</span>
                </h1>
            </div>
            <div className='mt-10 flex justify-between gap-7'>
                <div className='w-1/2'>
                    <ListIndex />
                </div>
                <div className='w-1/2 space-y-7'>
                    <AllStatus />
                    <Completed />
                </div>
            </div>
        </div>
    )
}

export default HomeIndex
