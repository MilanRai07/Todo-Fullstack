import { useState } from 'react'
import { Check, Pencil, Trash2, X } from 'lucide-react'

const CategoriesList = ({ categories, onEdit, onDelete }) => {
    const [editingIndex, setEditingIndex] = useState(null)
    const [draftTitle, setDraftTitle] = useState("")

    const startEditing = (index, title) => {
        setEditingIndex(index)
        setDraftTitle(title)
    }

    const saveEdit = (index) => {
        const title = draftTitle.trim()
        if (!title) return

        onEdit(index, title)
        setEditingIndex(null)
        setDraftTitle("")
    }

    const cancelEdit = () => {
        setEditingIndex(null)
        setDraftTitle("")
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
                    {categories.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-4 py-10 text-center text-sm text-gray-500">
                                No categories to display.
                            </td>
                        </tr>
                    ) : categories.map((category, index) => (
                        <tr key={`${category}-${index}`} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70">
                            <td className="px-4 py-3 text-sm text-gray-500">{String(index + 1).padStart(2, "0")}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {editingIndex === index ? (
                                    <input
                                        autoFocus
                                        value={draftTitle}
                                        onChange={(event) => setDraftTitle(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") saveEdit(index)
                                            if (event.key === "Escape") cancelEdit()
                                        }}
                                        aria-label="Category name"
                                        className="w-full max-w-sm rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                                    />
                                ) : category}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex justify-end gap-1">
                                    {editingIndex === index ? (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => saveEdit(index)}
                                                disabled={!draftTitle.trim()}
                                                title="Save category"
                                                aria-label={`Save ${category}`}
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
                                                onClick={() => startEditing(index, category)}
                                                title="Edit category"
                                                aria-label={`Edit ${category}`}
                                                className="rounded-md p-2 text-gray-500 transition hover:bg-blue-50 hover:text-primary"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onDelete(index)}
                                                title="Delete category"
                                                aria-label={`Delete ${category}`}
                                                className="rounded-md p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
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