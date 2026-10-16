import TodoListShimmer from "../../component/shimmer/TodoListShimmer";
import Error from "../../component/afterQueryState/Error";
import TodoEmpty from "../../component/afterQueryState/TodoEmpty";
import TaskCard from "../../component/card/TaskCard";
import { Zap } from 'lucide-react'
import { useQuery } from "@tanstack/react-query";
import { getMissedTodo } from "../../service/todoList/getTodo";

const VitalTask = () => {
    const todoParams = {
        page: 1,
        limit: 100,
    };
    const { data, isPending, isError } = useQuery({
        queryKey: ['missedTodo', todoParams],
        queryFn: ({ queryKey }) => getMissedTodo(queryKey[1])
    })
    console.log(data)
    return (
        <main className='p-4 sm:p-5 lg:p-7'>
            <div className='cardBox'>
                <div className='flex justify-between items-start'>
                    <div className='flex items-center gap-3'>
                        <Zap size={24} className='text-primary' />
                        <p className='text-lg font-bold text-primary'>Missed Tasks</p>
                    </div>
                </div>
                {
                    isPending ? <TodoListShimmer count={4} col={true} /> :
                        isError ? <Error /> :
                            data?.items.length < 1 ? <TodoEmpty message=" No tasks match your current filters.
                Try changing your search or filters." /> :
                                <div className='mt-6 grid grid-cols-1 gap-4 xl:mt-10 xl:grid-cols-2 xl:gap-5'>
                                    {
                                        data?.items.map((item) => {
                                            return (
                                                <TaskCard key={item._id} item={item} />
                                            )
                                        })
                                    }
                                </div>
                }
            </div>

        </main>
    )
}
export default VitalTask;