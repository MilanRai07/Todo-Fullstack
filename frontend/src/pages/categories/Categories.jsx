import { useState } from 'react'
import { Plus, Tags } from 'lucide-react'
import { toast } from 'react-toastify'
import CategoriesList from './CategoriesList';
import { useQuery } from '@tanstack/react-query';
import { getCategory, useAddCategory } from '../../service/category/category';

const Categories = () => {
    const { data } = useQuery({
        queryFn: getCategory,
        queryKey: ['category']
    })
    const { mutate, isPending } = useAddCategory();
    const [title, setTitle] = useState("")

    let categories = data?.data;

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedTitle = title.trim();
        if (!trimmedTitle) return;

        mutate(
            { title: trimmedTitle },
            {
                onSuccess: (data) => {
                    toast.success(data?.message || "Category added successfully");
                    setTitle("");
                },
                onError: (error) => {
                    toast.error(error?.message || "Failed to add category");
                }
            }
        );
    };

    return (
        <main className='p-4 sm:p-5 lg:p-7'>
            <div className="cardBox">
                <div className='flex flex-col justify-between gap-6 sm:flex-row sm:items-center'>
                    <div className='flex items-center gap-3'>
                        <Tags size={24} className='text-primary' />
                        <p className='text-lg font-bold text-primary'>Categories</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                        <input
                            type="text"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="New category name"
                            aria-label="New category name"
                            className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                        />
                        <button
                            type="submit"
                            disabled={!title.trim() || isPending}
                            className="flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Plus size={16} />
                            {isPending ? 'Adding...' : 'Add Category'}
                        </button>
                    </form>
                </div>
                <CategoriesList
                    categories={categories}
                />
            </div>
        </main>
    )
}

export default Categories
