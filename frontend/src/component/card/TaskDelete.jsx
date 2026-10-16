import { LoaderCircle } from 'lucide-react'

const TaskDelete = ({ isPending, item, setIsDeleteModalOpen, handleDelete }) => {
    return (
        <>
            <h2 className='text-lg font-semibold text-gray-900'>Delete task?</h2>
            <p className='mt-2 text-sm text-gray-600'>
                Are you sure you want to delete "{item?.title}"? This action cannot be undone.
            </p>
            <div className='mt-6 flex justify-end gap-3'>
                <button
                    type='button'
                    disabled={isPending}
                    className='rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60'
                    onClick={() => setIsDeleteModalOpen(false)}
                >
                    Cancel
                </button>
                <button
                    type='button'
                    disabled={isPending}
                    className='flex min-w-24 items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60'
                    onClick={handleDelete}
                >
                    {isPending && <LoaderCircle size={16} className='animate-spin' />}
                    {isPending ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </>
    )
}

export default TaskDelete
