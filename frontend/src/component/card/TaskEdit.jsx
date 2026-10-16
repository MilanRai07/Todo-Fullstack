import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import CustomDropdown from '../filters/CustomDropDown'
import CustomDatePicker from '../filters/CustomDatePicker'
import ImageUploader from '../ImageUploader'
import TiptapEditor from '../textEditor/TiptapEditor'
import { getCategory } from '../../service/category/category'
import { useUpdateTodo } from '../../service/todoList/updateTodo'
import { priority, status } from '../../localData/filterOptions'

const TaskEdit = ({ item, onClose }) => {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['category'],
        queryFn: getCategory,
    })
    const categoryData = data?.data || []

    if (isPending) {
        return <p role='status' className='py-8 text-center text-sm text-gray-600'>Loading categories...</p>
    }

    if (isError) {
        return (
            <p role='alert' className='py-8 text-center text-sm text-red-600'>
                {error.message || 'Unable to load categories.'}
            </p>
        )
    }

    if (categoryData.length === 0) {
        return (
            <p role='alert' className='py-8 text-center text-sm text-gray-600'>
                Add a category before editing this task.
            </p>
        )
    }

    return <TaskEditForm item={item} categoryData={categoryData} onClose={onClose} />
}

const TaskEditForm = ({ item, categoryData, onClose }) => {
    const { mutate, isPending } = useUpdateTodo()
    const itemCategoryId = item?.category?._id || item?.category
    const initialCategory = categoryData.find((category) => category._id === itemCategoryId)
        || categoryData[0]
    const initialPriority = priority.find((option) =>
        option.title.toLowerCase() === item?.priority?.toLowerCase()
    ) || priority[0]
    const initialStatus = status.find((option) => option.title === item?.status)
        || status.find((option) => option.title === 'Pending')
    const initialDate = item?.dueDate
        ? new Date(`${String(item.dueDate).slice(0, 10)}T00:00:00`)
        : null

    const [formData, setFormData] = useState(() => ({
        title: item?.title || '',
        description: item?.description || '',
    }))
    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    const [selectedPriority, setSelectedPriority] = useState(initialPriority)
    const [selectedStatus, setSelectedStatus] = useState(initialStatus)
    const [date, setDate] = useState(initialDate)
    const [image, setImage] = useState(null)

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((currentData) => ({ ...currentData, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!formData.title.trim()) {
            toast.error('Title is required')
            return
        }
        if (!date) {
            toast.error('Date is required')
            return
        }

        mutate(
            {
                id: item._id,
                ...formData,
                category: selectedCategory._id,
                priority: selectedPriority?.title || '',
                status: selectedStatus?.title || '',
                ...(image ? { image } : {}),
                dueDate: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
            },
            {
                onSuccess: (updatedTodo) => {
                    toast.success(updatedTodo?.message || 'Todo updated successfully')
                    onClose?.()
                },
                onError: (updateError) => {
                    toast.error(updateError.message || 'Failed to update todo')
                },
            }
        )
    }

    return (
        <form className='space-y-6' onSubmit={handleSubmit}>
            <h2 className='text-lg font-bold text-primary'>Edit Task</h2>
            <div>
                <label htmlFor='edit-task-title' className='mb-3 block text-sm font-semibold text-gray-800'>
                    Title
                </label>
                <input
                    id='edit-task-title'
                    className='formInput'
                    placeholder='Enter task title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <ImageUploader
                image={image}
                setImage={setImage}
                imageUrl={item?.image?.url}
            />
            <div className='grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-4'>
                <CustomDropdown
                    label='Category'
                    value={selectedCategory}
                    options={categoryData}
                    onChange={setSelectedCategory}
                />
                <CustomDropdown
                    label='Priority'
                    value={selectedPriority}
                    options={priority}
                    onChange={setSelectedPriority}
                />
                <CustomDropdown
                    label='Status'
                    value={selectedStatus}
                    options={status}
                    onChange={setSelectedStatus}
                />
                <CustomDatePicker
                    selected={date}
                    onChange={setDate}
                    canSelectPast
                />
            </div>
            <div>
                <label className='mb-3 block text-sm font-semibold text-gray-800'>
                    Description
                </label>
                <TiptapEditor
                    content={formData.description}
                    placeholder='Write a description...'
                    onChange={(description) =>
                        setFormData((currentData) => ({ ...currentData, description }))
                    }
                />
            </div>
            <div className='flex justify-end gap-3'>
                <button
                    type='button'
                    disabled={isPending}
                    onClick={onClose}
                    className='rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
                >
                    Cancel
                </button>
                <button
                    type='submit'
                    disabled={isPending}
                    className='rounded-md bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60'
                >
                    {isPending ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    )
}

export default TaskEdit
