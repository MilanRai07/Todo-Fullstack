import { ClipboardCheck, ListPlus } from 'lucide-react'
import { todoList } from '../../../localData/todoList'

const Completed = () => {
    return (
        <div className='cardBox '>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <ClipboardCheck size={24} className='text-primary' />
                    <p className='text-sm font-semibold text-primary'>Completed Tasks</p>
                </div>
            </div>

            {/* xards */}
            <div className='space-y-5 mt-6 '>
                {
                    todoList.slice(0, 5).map((item, index) => {
                        return (
                            <div key={index} className='flex justify-between gap-3 p-3 border border-lightBorder rounded-sm group cursor-pointer'>
                                <div className='w-[70%] flex gap-4 flex-start items-start '>
                                    <div className={`${item.status == "In Progress" ? 'border-primary' : item.status == "Completed" ? 'border-green-600' : 'border-red-600'}
                                    w-[6%] aspect-square rounded-full border-3`}>
                                    </div>
                                    <div className='w-[94%] space-y-2'>
                                        <h1 className='text-base font-bold text-black/80 group-hover:text-primary  transition-all duration-200'>{item.title}</h1>
                                        <p className='line-clamp-3 text-sm'>{item.description}</p>
                                        <div className='flex gap-4'>
                                            <p className='text-xs text-muted'>Priority: <span>{item.priority}</span></p>
                                            <p className={`text-xs ${item.status == "Completed" ? 'text-green-600' : item.status == "In Progress" ? 'text-primary' : 'text-red-600'}`}>{item.status}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[30%] aspect-square rounded-md overflow-hidden'>
                                    <img src={item.image} alt={item.title} className='w-full h-full group-hover:scale-105  transition-all duration-200' />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Completed
