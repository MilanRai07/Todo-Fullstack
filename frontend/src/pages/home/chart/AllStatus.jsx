import PieChart from '../../../component/stats/PieChart'
import { PieChartIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getTodoStatus } from '../../../service/todoList/getTodoStatus'
import Error from '../../../component/afterQueryState/Error'
import TodoEmpty from '../../../component/afterQueryState/TodoEmpty'

const AllStatus = () => {
    const { data, isPending, isError } = useQuery({
        queryKey: ['todoStatus'],
        queryFn: getTodoStatus
    })
    let isEmpty = data?.data?.totalCompleted == 0 && data?.data?.totalInProgress == 0 && data?.data?.totalPending == 0
    return (
        <div className='cardBox '>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <PieChartIcon size={24} className='text-primary' />
                    <p className='text-sm font-semibold text-primary'>Task Status</p>
                </div>
            </div>
            <div className='mt-6'>
                {
                    isPending ?
                        <div
                            role='status'
                            aria-label='Loading task status'
                            className='flex h-64 animate-pulse flex-col items-center justify-center gap-5'
                        >
                            <div className='h-40 w-40 rounded-full border-[18px] border-gray-200' />
                            <div aria-hidden='true' className='flex items-center gap-4'>
                                {['w-16', 'w-20', 'w-16'].map((width, index) => (
                                    <div key={index} className='flex items-center gap-2'>
                                        <div className='h-3 w-3 rounded-full bg-gray-200' />
                                        <div className={`h-3 ${width} rounded bg-gray-200`} />
                                    </div>
                                ))}
                            </div>
                        </div> :
                        isError ?
                            <Error />
                            : isEmpty ?
                                <TodoEmpty />
                                :
                                <PieChart item={data?.data} />
                }
            </div>
        </div>
    )
}

export default AllStatus
