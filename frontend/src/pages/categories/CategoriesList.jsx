import { useState } from 'react'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import { useDeleteCategory, useUpdateCategory } from '../../service/category/category'
import { toast } from 'react-toastify';

const CategoriesList = ({ categories }) => {
    const { mutate, isPending } = useUpdateCategory();
    const { mutate: deleteMutation, isPending: isDeletePending } = useDeleteCategory();
    const [editingId, setEditingId] = useState(null)
    const [draftTitle, setDraftTitle] = useState("")

    const startEditing = (id, title) => {
        setEditingId(id)
        setDraftTitle(title)
    }

    const saveEdit = () => {
        const title = draftTitle.trim()
        if (!title) return
        mutate({
            id: editingId,
            title
        },
            {
                onSuccess: (data) => {
                    toast.success(data?.message || "Category update succesfully");
                    setEditingId(null)
                    setDraftTitle("")
                },
                onError: (err) => {
                    toast.error(err?.message || "Failed to update category")
                }
            }
        )
    }

    const cancelEdit = () => {
        setEditingId(null)
        setDraftTitle("")
    }

    const handleDeleteCategory = (id) => {
        deleteMutation(
            { id },
            {
                onSuccess: (data) => {
                    toast.success(data?.message || "Category deleted successfully");
                },
                onError: (error) => {
                    toast.error(error?.message || "Failed to delete category");
                }
            }
        )
    }

    return (
        <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-105 border-collapse text-left">
                <thead>
                    <tr className="border-b border-gray-200 bg-secondary text-xs uppercase text-white">
                        <th scope="col" className="w-16 px-4 py-3 font-semibold">#</th>
                        <th scope="col" className="px-4 py-3 font-semibold">Category</th>
                        <th scope="col" className="w-32 px-4 py-3 text-right font-semibold">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-4 py-10 text-center text-sm text-gray-500">
                                No categories to display.
                            </td>
                        </tr>
                    ) : categories?.map((category, index) => (
                        <tr key={category._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70">
                            <td className="px-4 py-3 text-sm text-gray-500">{String(index + 1).padStart(2, "0")}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {editingId === category?._id ? (
                                    <input
                                        autoFocus
                                        value={draftTitle}
                                        onChange={(event) => setDraftTitle(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") saveEdit()
                                            if (event.key === "Escape") cancelEdit()
                                        }}
                                        aria-label="Category name"
                                        className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                                    />
                                ) : category?.title}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex justify-end gap-1">
                                    {editingId === category._id ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => saveEdit()}
                                                disabled={!draftTitle.trim() || isPending}
                                                title="Save category"
                                                aria-label={`Save ${category.title}`}
                                                className="rounded-md p-2 text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <Check size={17} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={cancelEdit}
                                                title="Cancel editing"
                                                aria-label="Cancel editing"
                                                className="rounded-md p-2 text-gray-500 transition hover:bg-gray-100"
                                            >
                                                <X size={17} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => startEditing(category?._id, category?.title)}
                                                title="Edit category"
                                                aria-label={`Edit ${category?.title}`}
                                                className="rounded-md p-2 text-gray-500 transition hover:bg-blue-50 hover:text-primary"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteCategory(category._id)}
                                                disabled={isDeletePending}
                                                title="Delete category"
                                                aria-label={`Delete ${category.title}`}
                                                className="rounded-md p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CategoriesList