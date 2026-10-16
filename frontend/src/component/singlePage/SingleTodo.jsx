import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getSingleTodo } from '../../service/todoList/getTodo'
import Error from '../afterQueryState/Error'

const SingleTodo = () => {
    const { id } = useParams()
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['todo', id],
        queryFn: () => getSingleTodo(id),
        enabled: Boolean(id),
    })

    if (isPending) {
        return (
            <main className='p-4 sm:p-5 lg:p-7'>
                <div className='cardBox w-full animate-pulse'>
                    <div className='flex flex-col gap-5 md:flex-row md:gap-7'>
                        <div className='aspect-video w-full rounded-md bg-gray-200 md:aspect-square md:w-[40%]' />
                        <div className='min-w-0 flex-1 space-y-4'>
                            <div className='h-7 w-2/3 rounded bg-gray-200' />
                            <div className='h-4 w-1/2 rounded bg-gray-200' />
                            <div className='h-4 w-3/4 rounded bg-gray-200' />
                            <div className='h-20 w-full rounded bg-gray-200' />
                        </div>
                    </div>
                </div>
            </main>
        )
    }

    if (isError) {
        return (
            <Error />
        )
    }

    const category = typeof data.category === 'object'
        ? data.category?.title
        : data.category
    const imageUrl = data.image?.url

    return (
        <main className='grid min-h-full place-items-center p-4 sm:p-5 lg:p-7'>
            <div className="cardBox w-full">
                <div className='flex flex-col items-start gap-5 md:flex-row md:gap-7'>
                    {imageUrl && (
                        <div className='aspect-video w-full overflow-hidden rounded-md md:aspect-square md:w-[40%]'>
                            <img src={imageUrl} alt={data.title} className='h-full w-full rounded-md object-cover' />
                        </div>
                    )}
                    <div className={`min-w-0 space-y-3 ${imageUrl ? 'md:w-[60%]' : 'w-full'}`}>
                        <h1 className='break-words text-xl font-bold text-black/80 sm:text-2xl'>{data.title}</h1>
                        <div className='flex flex-wrap gap-x-4 gap-y-1'>
                            <p className='text-xs text-muted'>Priority: <span>{data.priority}</span></p>
                            <p className={`text-xs ${data.status == "Completed" ? 'text-green-600' : data.status == "In Progress" ? 'text-primary' : 'text-red-600'}`}>{data.status}</p>
                        </div>
                        <p className='text-xs text-muted'>Due Date: <span>{new Date(data.dueDate).toLocaleDateString()}</span></p>
                        <p className='text-xs text-muted'>Created At: <span>{new Date(data.createdAt).toLocaleString()}</span></p>
                        <p className='text-xs text-muted'>Category: <span>{category || 'Uncategorized'}</span></p>
                        <div
                            className='break-words text-sm text-muted [&_a]:text-primary [&_a]:underline [&_ol]:ml-4 [&_ol]:list-decimal [&_p]:mb-2 [&_ul]:ml-4 [&_ul]:list-disc'
                            dangerouslySetInnerHTML={{ __html: data.description || '' }}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SingleTodo
