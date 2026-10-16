import { ClipboardCheck, ListPlus } from 'lucide-react'
import { useMemo } from 'react';
import { getTodo } from '../../../service/todoList/getTodo';
import { useQuery } from '@tanstack/react-query';
import TaskCard from '../../../component/card/TaskCard';
import TodoListShimmer from '../../../component/shimmer/TodoListShimmer';
import Error from '../../../component/afterQueryState/Error';
import TodoEmpty from '../../../component/afterQueryState/TodoEmpty';
import { Link } from 'react-router-dom';

const RecentTask = () => {

    const todoParams = {
        limit: 7
    }

    const { data, isPending, isError } = useQuery({
        queryKey: ['todoList', todoParams],
        queryFn: ({ queryKey }) => getTodo(queryKey[1])
    })

    return (
        <div className='cardBox '>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <ClipboardCheck size={24} className='text-primary' />
                    <p className='text-sm font-semibold text-primary'>Recently Added Tasks</p>
                </div>
            </div>

            {/* xards */}
            <div className='space-y-5 mt-6 '>
                {isPending ? <TodoListShimmer count={3} /> :
                    isError ? <Error /> :
                        !data?.items?.length ? <TodoEmpty message="There is no any task." /> :
                            data.items.map((item) => {
                                return (
                                    <TaskCard key={item._id} item={item} />
                                )
                            })
                }
            </div>
        </div>
    )
}
export default RecentTask;
