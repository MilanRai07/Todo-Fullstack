import { Tags } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import CategoriesList from './CategoriesList';

const Categories = () => {
    const [categories, setCategories] = useState(["Work", "Personal", "Shopping", "Health"]);

    const updateCategory = (index, title) => {
        setCategories((currentCategories) =>
            currentCategories.map((category, categoryIndex) =>
                categoryIndex === index ? title : category
            )
        );
    };

    const deleteCategory = (index) => {
        setCategories((currentCategories) =>
            currentCategories.filter((_, categoryIndex) => categoryIndex !== index)
        );
    };

    return (
        <main className='p-7'>
            <div className="cardBox">
                <div className='flex justify-between flex-col gap-8'>
                    <div className='flex items-center gap-3'>
                        <Tags size={24} className='text-primary' />
                        <p className='text-lg font-bold text-primary'>Categories</p>
                    </div>
                </div>
                <CategoriesList
                    categories={categories}
                    onEdit={updateCategory}
                    onDelete={deleteCategory}
                />
            </div>
        </main>
    )
}

export default Categories
