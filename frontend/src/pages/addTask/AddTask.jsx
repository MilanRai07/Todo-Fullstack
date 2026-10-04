import { ListPlus } from 'lucide-react'
import TaskForm from './TaskForm'

const AddTask = () => {
    return (
        <main className='p-7'>
            <div className="cardBox">
                <div className='flex justify-between flex-col gap-8'>
                    <div className='flex items-center gap-3'>
                        <ListPlus size={24} className='text-primary' />
                        <p className='text-lg font-bold text-primary'>Add New Task</p>
                    </div>
                </div>
                <TaskForm />
            </div>
        </main>
    )
}

export default AddTask
