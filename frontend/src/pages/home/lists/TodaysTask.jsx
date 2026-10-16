import { ClipboardCheck, ListPlus } from 'lucide-react'
import { useMemo } from 'react';
import { getTodo } from '../../../service/todoList/getTodo';
import { useQuery } from '@tanstack/react-query';
import TaskCard from '../../../component/card/TaskCard';
import TodoListShimmer from '../../../component/shimmer/TodoListShimmer';
import Error from '../../../component/afterQueryState/Error';
import TodoEmpty from '../../../component/afterQueryState/TodoEmpty';
import { Link } from 'react-router-dom'

const TodaysTask = () => {
    const todayLabel = useMemo(
        () => new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long' }).format(new Date()),
        []
    );
    const todoParams = useMemo(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return {
            dueDate: `${year}-${month}-${day}`,
            dueDateOffset: today.getTimezoneOffset(),
        };
    }, []);

    const { data, isPending, isError } = useQuery({
        queryKey: ['todoList', todoParams],
        queryFn: ({ queryKey }) => getTodo(queryKey[1])
    })

    return (
        <div className='cardBox '>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <ClipboardCheck size={24} className='text-primary' />
                    <p className='text-sm font-semibold text-primary'>Today's Tasks</p>
                </div>
                <div className='flex items-center gap-3 cursor-pointer group'>
                    <ListPlus size={16} className='text-primary group-hover:text-dark' />
                    <Link to='/add-new-task' className='text-xs font-semibold text-primary group-hover:text-dark'>Add Task</Link>
                </div>
            </div>
            <p className='text-[13px] font-medium text-muted mt-3'>{todayLabel}</p>

            {/* xards */}
            <div className='space-y-5 mt-6 '>
                {isPending ? <TodoListShimmer count={3} /> :
                    isError ? <Error /> :
                        !data?.items?.length ? <TodoEmpty message="There is no any task for today to do." /> :
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
export default TodaysTask;
