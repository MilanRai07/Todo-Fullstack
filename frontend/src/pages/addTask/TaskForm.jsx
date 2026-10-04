import { useState } from 'react'
import CustomDropdown from '../../component/filters/CustomDropDown'
import CustomDatePicker from '../../component/filters/CustomDatePicker';
import ImageUploader from '../../component/ImageUploader'
import TiptapEditor from '../../component/textEditor/TiptapEditor';

const TaskForm = () => {
    const statuses = ["All", "In Progress", "Completed", "Pending"];
    const priorities = ["All", "High", "Medium", "Low"];
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [selectedPriority, setSelectedPriority] = useState("All");
    const [date, setDate] = useState(null);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");


    return (
        <form className='space-y-10'>
            <div>
                <input
                    className="mt-10 w-full min-h-[46px] sm:min-h-[50px] min-w-[200px] px-3.5 sm:px-4 bg-white border 
                    rounded-xl text-left transition-all duration-200 outline-none 
                    focus:outline-none focus-visible:outline-none focus:ring-0 border-gray-300 focus:border-primary hover:border-gray-400"
                    placeholder="Enter task title"
                />
            </div>
            <ImageUploader
                image={image}
                setImage={setImage}
            />
            <div className="flex justify-between gap-5 p-5 bg-white border border-gray-200 rounded-xl">
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
            <div>
                <label className="mb-3 block text-sm font-semibold text-gray-800">
                    Description
                </label>
                <TiptapEditor
                    content=""
                    placeholder="Write a description..."
                    onChange={setDescription}
                />
                <input type="hidden" name="description" value={description} />
            </div>
        </form>
    )
}

export default TaskForm
