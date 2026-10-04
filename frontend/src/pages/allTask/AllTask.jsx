import AllTaskList from "./AllTaskList";
import CustomDropdown from '../../component/filters/CustomDropDown'
import CustomDatePicker from '../../component/filters/CustomDatePicker';
import { todoList } from '.././../localData/todoList'
import { ListTodo } from 'lucide-react'
import { useState } from "react";

const AllTask = () => {
    const statuses = ["All", "In Progress", "Completed", "Pending"];
    const priorities = ["All", "High", "Medium", "Low"];
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedPriority, setSelectedPriority] = useState("All");
    const [date, setDate] = useState(null);
    const data = todoList;
    return (
        <main className='p-7'>
            <div className="cardBox">
                <div className='flex justify-between flex-col gap-8'>
                    <div className='flex items-center gap-3'>
                        <ListTodo size={24} className='text-primary' />
                        <p className='text-lg font-bold text-primary'>All Tasks</p>
                    </div>
                    <div className='flex items-center gap-7'>
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

                        <CustomDropdown
                            label="Priority"
                            value={selectedPriority}
                            options={priorities}
                            onChange={setSelectedPriority}
                        />

                        <CustomDatePicker
                            selected={date}
                            onChange={(d) => setDate(d)}
                        />
                    </div>
                </div>
                <AllTaskList data={data} />
            </div>
        </main>
    )
}
export default AllTask;