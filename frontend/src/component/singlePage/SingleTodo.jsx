import React from 'react'

const data = {
    title: "Attend a Meeting with Client",
    description:
        "Meeting at Annapurna Restaurant at 9:00 AM to discuss the new project requirements and upcoming deliverables.",
    status: "Completed",
    priority: "moderate",
    createdAt: "2026-09-28T05:20:35.808Z",
    category: "Professional Work",
    image: "/img1.jpeg",
}
const SingleTodo = () => {
    return (
        <main className='p-7 grid place-items-center min-h-screen'>
            <div className="cardBox">
                <div className='flex justify-between items-start gap-7'>
                    <div className='w-[40%] aspect-square'>
                        <img src={data.image} alt={data.title} className='w-full h-full rounded-md' />
                    </div>
                    <div className='w-[60%] space-y-3'>
                        <h1 className='text-2xl font-bold text-black/80'>{data.title}</h1>
                        <div className='flex gap-4'>
                            <p className='text-xs text-muted'>Priority: <span>{data.priority}</span></p>
                            <p className={`text-xs ${data.status == "Completed" ? 'text-green-600' : data.status == "In Progress" ? 'text-primary' : 'text-red-600'}`}>{data.status}</p>
                        </div>
                        <p className='text-xs text-muted'>Created At: <span>{new Date(data.createdAt).toLocaleString()}</span></p>
                        <p className='text-xs text-muted'>Category: <span>{data.category}</span></p>
                        <p className='text-sm text-muted'>{data.description}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default SingleTodo
