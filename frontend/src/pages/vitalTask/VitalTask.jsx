import { useState } from "react";
import VitalTaskList from "./VitalTaskList";
import CustomDropdown from '../../component/filters/CustomDropDown'
import CustomDatePicker from '../../component/filters/CustomDatePicker';
import { todoList } from '.././../localData/todoList'
import {  Zap } from 'lucide-react'

const VitalTask = () => {
    const statuses = ["All", "In Progress", "Completed", "Pending"];
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [date, setDate] = useState(null);
    const data = todoList;
    return (
        <main className='p-7'>
            <div className='cardBox'>
                <div className='flex justify-between items-start'>
                    <div className='flex items-center gap-3'>
                        <Zap size={24} className='text-primary' />
                        <p className='text-lg font-bold text-primary'>Vital Tasks</p>
                    </div>
                    <div className='flex items-center gap-7'>
                        <CustomDropdown
                            label="Status"
                            value={selectedStatus}
                            options={statuses}
                            onChange={setSelectedStatus}
                        />

                        <CustomDatePicker
                            selected={date}
                            onChange={(d) => setDate(d)}
                        />
                    </div>
                </div>
                <VitalTaskList data={data} />
            </div>

        </main>
    )
}
export default VitalTask;