import { UserShield } from 'lucide-react'

const ProfileInfo = ({ setShowEdit }) => {
    return (
        <>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-3'>
                    <UserShield size={24} className='text-primary' />
                    <p className='text-lg font-bold text-primary'>Profile Information</p>
                </div>
                <button
                    onClick={() => setShowEdit(true)}
                    className='rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transiiton-all duration-200 ease-in-out'
                >
                    Edit
                </button>
            </div>
            <div className='mt-10 w-full rounded-[10px] bg-linear-to-r from-secondary to-primary p-10 flex flex-col items-center gap-6 max-sm:gap-4 '>
                <div
                    className={` relative z-0 grid place-items-center w-24 h-24 max-md:w-16 max-md:h-16 max-sm:w-14 max-sm:h-14 border-3 border-white rounded-full cursor-not-allowed opacity-70'
                        `}
                >
                    <img
                        src='/img1.jpeg'
                        alt="Profile"
                        className='w-full h-full object-cover overflow-hidden rounded-full'
                    />
                </div>

                <p className='text-[20px] font-bold text-white max-sm:text-[18px]'>Milan Rai</p>
                <div className='text-center text-white'>
                    <p className='text-xs font-medium mb-1'>
                        Email Address
                        <span className='cursor-pointer ml-2 font-medium text-xs hover:underline'>
                            (Click to verify)
                        </span>
                    </p>
                    <p className='text-sm font-medium'>milan@gmail.com</p>
                </div>
            </div>
        </>
    )
}

export default ProfileInfo
