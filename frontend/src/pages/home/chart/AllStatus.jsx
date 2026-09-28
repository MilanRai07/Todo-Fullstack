import React from 'react'
import PieChart from '../../../component/stats/PieChart'
import { PieChartIcon } from 'lucide-react'

const AllStatus = () => {
    return (
        <div className='cardBox '>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <PieChartIcon size={24} className='text-primary' />
                    <p className='text-sm font-semibold text-primary'>Task Status</p>
                </div>
            </div>
            <div className='mt-6'>
                <PieChart />
            </div>
        </div>
    )
}

export default AllStatus
