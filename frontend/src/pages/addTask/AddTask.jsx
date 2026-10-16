import { ListPlus, ClipboardList, LoaderCircle } from 'lucide-react'
import TaskForm from './TaskForm'
import { getCategory } from '../../service/category/category';
import { useQuery } from '@tanstack/react-query';
import Error from '../../component/afterQueryState/Error';

const AddTask = () => {
    const { data, isPending, isError } = useQuery({
        queryFn: getCategory,
        queryKey: ['category']
    })
    let categoryData = data?.data
    return (
        <main className='p-4 sm:p-5 lg:p-7'>
            <div className="cardBox">
                <div className='flex justify-between flex-col gap-8'>
                    <div className='flex items-center gap-3'>
                        <ListPlus size={24} className='text-primary' />
                        <p className='text-lg font-bold text-primary'>Add New Task</p>
                    </div>
                </div>
                {
                    isPending ?
                        <div className="mt-10">
                            <LoaderCircle size={24} className='animate-spin text-primary' />
                        </div>
                        :
                        isError ?
                            <Error />
                            :
                            categoryData.length === 0 ?
                                <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center">
                                    <ClipboardList size={40} className="text-gray-400" />

                                    <h2 className="text-lg font-semibold text-gray-700">
                                        No Category Found
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Please add category before adding a task
                                    </p>
                                </div>
                                :
                                <TaskForm categoryData={categoryData} />
                }
            </div>
        </main>
    )
}

export default AddTask
