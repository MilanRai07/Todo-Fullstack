import CustomDropdown from '../../component/filters/CustomDropDown'
import CustomDatePicker from '../../component/filters/CustomDatePicker';
import { ListTodo } from 'lucide-react'
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTodo } from "../../service/todoList/getTodo";
import { priorities, statuses } from "../../localData/filterOptions";
import { getCategory } from "../../service/category/category";
import TodoListShimmer from "../../component/shimmer/TodoListShimmer";
import Error from "../../component/afterQueryState/Error";
import TodoEmpty from "../../component/afterQueryState/TodoEmpty";
import TaskCard from "../../component/card/TaskCard";
import Pagination from '../../component/pagination/Pagination';

const AllTask = () => {

    const { data: categoryData, isPending: categoryPending, isError: isCategoryError } = useQuery({
        queryKey: ['category'],
        queryFn: getCategory
    })

    let categories = [{ _id: 'all', title: "All" }, ...categoryData?.data || []]
    console.log(categoryData)
    const [selectedStatus, setSelectedStatus] = useState(statuses[0]);
    const [selectedPriority, setSelectedPriority] = useState(priorities[0]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [date, setDate] = useState(null);
    const [page, setPage] = useState(1);

    const dueDate = date
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
        : "";
    const todoParams = {
        page: page,
        limit: 20,
        sort: "desc",
        status: selectedStatus.title === "All" ? "" : selectedStatus.title,
        priority: selectedPriority.title === "All" ? "" : selectedPriority.title,
        dueDate,
        dueDateOffset: date?.getTimezoneOffset() ?? new Date().getTimezoneOffset(),
        category: selectedCategory.title == "All" ? "" : selectedCategory._id
    };

    const { data, isPending, isError } = useQuery({
        queryKey: ['todoList', todoParams],
        queryFn: ({ queryKey }) => getTodo(queryKey[1])
    })

    return (
        <main className='p-4 sm:p-5 lg:p-7'>
            <div className="cardBox">
                <div className='flex justify-between flex-col gap-8'>
                    <div className='flex items-center gap-3'>
                        <ListTodo size={24} className='text-primary' />
                        <p className='text-lg font-bold text-primary'>All Tasks</p>
                    </div>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5'>
                        <CustomDropdown
                            label="Status"
                            value={selectedStatus}
                            options={statuses}
                            onChange={setSelectedStatus}
                        />

                        <CustomDropdown
                            label="Priority"
                            value={selectedPriority}
                            options={priorities}
                            onChange={setSelectedPriority}
                        />

                        {
                            categoryData?.data.length > 0 && !isCategoryError && (
                                <CustomDropdown
                                    label="Category"
                                    value={selectedCategory}
                                    options={categories}
                                    onChange={setSelectedCategory}
                                />
                            )
                        }

                        <CustomDatePicker
                            selected={date}
                            onChange={(d) => setDate(d)}
                            canSelectPast={true}
                        />
                    </div>
                </div>
                {
                    isPending ? <TodoListShimmer count={4} col={true} /> :
                        isError ? <Error /> :
                            data?.items.length < 1 ? <TodoEmpty message=" No tasks match your current filters.
                Try changing your search or filters." /> :
                                <div>
                                    <div className='grid grid-cols-2 mt-10 gap-5 max-lg:grid-cols-1 '>
                                        {
                                            data?.items.map((item) => {
                                                return (
                                                    <TaskCard key={item._id} item={item} />
                                                )
                                            })
                                        }
                                    </div>
                                    {
                                        data?.pagination?.totalPage > 1 && (
                                            <Pagination currentPage={page} setPage={setPage} totalPages={data?.pagination?.totalPage} />
                                        )
                                    }
                                </div>
                }
            </div>
        </main>
    )
}
export default AllTask;