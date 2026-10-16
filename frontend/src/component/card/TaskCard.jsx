import { useState } from 'react'
import { Edit, Trash2 } from 'lucide-react'
import { useDeleteTodo } from '../../service/todoList/deleteTodo'
import { toast } from 'react-toastify';
import Modal from '../modal/Modal'
import TaskDelete from './TaskDelete';
import TaskEdit from './TaskEdit';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ item }) => {
    const { mutate, isPending } = useDeleteTodo();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDelete = () => {
        mutate({ id: item._id },

            {
                onSuccess: (data) => {
                    toast.success(data.message || "Item deleted successfuly")
                    setIsDeleteModalOpen(false)
                },
                onError: (error) => {
                    toast.error(error.message || "Failed to delete item")
                }
            }
        )
    }
    const navigate = useNavigate();
    const toSinglePage = (id) => {
        navigate(`/single-todo/${id}`)
    }
    return (
        <div className='grid min-w-0 grid-cols-1 gap-3 rounded-sm border border-lightBorder p-3 group sm:grid-cols-[minmax(0,1fr)_minmax(110px,25%)] sm:gap-4 cursor-pointer'>
            <div onClick={() => toSinglePage(item?._id)}>
                <div className='flex min-w-0 items-start gap-3 sm:gap-4'>
                    <div className={`${item?.status == "In Progress" ? 'border-primary' : item?.status == "Completed" ? 'border-green-600' : 'border-red-600'}
                                    mt-1 h-3 w-3 shrink-0 rounded-full border-3`}>
                    </div>
                    <div className='min-w-0 flex-1 space-y-2'>
                        <h1 className='break-words text-sm font-bold text-black/80 transition-all duration-200 group-hover:text-primary sm:text-base'>{item?.title}</h1>
                        <div
                            className='line-clamp-2 wrap-break-word text-[13px] leading-relaxed text-gray-600 [&_a]:text-primary [&_a]:underline [&_ol]:ml-4 [&_ol]:list-decimal [&_p]:mb-1 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_ul]:ml-4 [&_ul]:list-disc'
                            dangerouslySetInnerHTML={{ __html: item?.description }}
                        />
                        <div className='flex flex-wrap gap-x-4 gap-y-1'>
                            <p className='text-xs text-muted'>Priority: <span>{item?.priority}</span></p>
                            <p className={`text-xs ${item?.status == "Completed" ? 'text-green-600' : item?.status == "In Progress" ? 'text-primary' : 'text-red-600'}`}>{item?.status}</p>
                        </div>
                        <div className='flex items-center gap-4 mt-3'>
                            <button
                                type='button'
                                aria-label='Edit task'
                                className='transition-all duration-200 ease-in-out hover:scale-110'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditModalOpen(true)
                                }}
                            >
                                <Edit size={16} className='text-primary' />
                            </button>
                            <button
                                type='button'
                                aria-label='Delete task'
                                disabled={isPending}
                                className={`flex items-center justify-center transition-all duration-200 ease-in-out ${isPending ? 'cursor-not-allowed opacity-60' : 'hover:scale-110'}`}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsDeleteModalOpen(true)
                                }}
                            >
                                <Trash2 size={16} className='text-red-500' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='aspect-[16/7] min-w-0 overflow-hidden rounded-md sm:aspect-4/3'>
                <img src={item.image?.url} alt={item?.title} className='w-full h-full group-hover:scale-105  transition-all duration-200' />
            </div>

            {/* deleting the task */}
            {isDeleteModalOpen && (
                <Modal onClose={isPending ? undefined : () => setIsDeleteModalOpen(false)}>
                    <TaskDelete
                        isPending={isPending}
                        item={item}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDelete={handleDelete}
                    />
                </Modal>
            )}

            {/* editing the task */}
            {
                isEditModalOpen && (
                    <Modal
                        maxWidthClassName='max-w-6xl'
                        ariaLabel='Edit task'
                        onClose={() => setIsEditModalOpen(false)}
                    >
                        <TaskEdit
                            item={item}
                            onClose={() => setIsEditModalOpen(false)}
                        />
                    </Modal>
                )
            }
        </div>
    )
}

export default TaskCard
