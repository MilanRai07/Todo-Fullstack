import { useState } from 'react'
import CustomDropdown from '../../component/filters/CustomDropDown'
import CustomDatePicker from '../../component/filters/CustomDatePicker';
import ImageUploader from '../../component/ImageUploader'
import TiptapEditor from '../../component/textEditor/TiptapEditor';
import { usePostTodo } from '../../service/todoList/postTodo';
import { priority } from '../../localData/filterOptions';
import { toast } from 'react-toastify';

let initialData = {
    title: "",
    category: "",
    description: "",
    priority: "",
    image: "",
    dueDate: ""
}

const TaskForm = ({ categoryData }) => {
    const { mutate, isPending } = usePostTodo();
    const [formData, setFormData] = useState(initialData)
    const [selectedPriority, setSelectedPriority] = useState(priority[0]);
    const [selectedCategory, setSelectedCategory] = useState(categoryData[0]);
    const [date, setDate] = useState(null);
    const [image, setImage] = useState(null);
    const [editorKey, setEditorKey] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title) {
            toast.error("Title is required")
            return;
        }
        if (!date) {
            toast.error("Date is required")
            return;
        }
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            toast.error("Due date can't be in the past")
            return;
        }

        if (!image) {
            toast.error("Image is required")
            return;
        }

        mutate(
            {
                ...formData,
                priority: selectedPriority?.title || "",
                category: selectedCategory?._id || "",
                image: image || "",
                dueDate: date
                    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                    : ""
            },
            {
                onSuccess: () => {
                    toast.success("Todo added successfully");
                    setFormData({ ...initialData });
                    setSelectedPriority(priority[0]);
                    setSelectedCategory(categoryData[0]);
                    setDate(null);
                    setImage(null);
                    setEditorKey((key) => key + 1);
                },
                onError: (err) => {
                    toast.error(err.message || "Failed to add todo")
                }
            }
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <form className='space-y-10' onSubmit={handleSubmit}>
            <div>
                <input
                    className="formInput mt-10"
                    placeholder="Enter task title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <ImageUploader
                image={image}
                setImage={setImage}
            />
            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-3">
                {/* <CustomDropdown
                    label="Status"
                    value={selectedStatus}
                    options={statuses}
                    onChange={setSelectedStatus}
                /> */}

                <CustomDropdown
                    label="Category"
                    value={selectedCategory}
                    options={categoryData}
                    onChange={setSelectedCategory}
                />

                <CustomDropdown
                    label="Priority"
                    value={selectedPriority}
                    options={priority}
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
                    key={editorKey}
                    content={formData.description}
                    placeholder="Write a description..."
                    onChange={(description) =>
                        setFormData((currentData) => ({
                            ...currentData,
                            description
                        }))
                    }
                />
            </div>

            <button type='submit'
                disabled={isPending}
                className='px-3 py-2 w-fit rounded-md bg-primary text-sm font-bold text-white transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
                {isPending ? 'Adding...' : 'Add Todo'}
            </button>
        </form>
    )
}

export default TaskForm
