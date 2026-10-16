
import AllStatus from './chart/AllStatus'
import TodaysTask from './lists/TodaysTask'
import RecentTask from './lists/RecentTask'
import CompletedTask from './lists/CompletedTask'

const HomeIndex = ({name}) => {
    return (
        <div className='p-4 sm:p-5 lg:p-7'>
            <div>
                <h1 className='text-2xl font-semibold sm:text-3xl'>
                    {`Welcome ${name}`}
                    <span className='ml-3'>👋</span>
                </h1>
            </div>
            <div className='mt-6 grid grid-cols-1 gap-5 xl:mt-10 xl:grid-cols-2 xl:gap-7'>
                <div className='min-w-0 space-y-5 xl:space-y-7'>
                    <TodaysTask />
                    <RecentTask />
                </div>
                <div className='min-w-0 space-y-5 xl:space-y-7'>
                    <AllStatus />
                    <CompletedTask />
                </div>
            </div>
        </div>
    )
}

export default HomeIndex
