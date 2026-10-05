import { KeyRound } from 'lucide-react';

const PasswordChange = () => {
    return (
        <main className='p-7'>
            <div className="cardBox">
                <div className='flex justify-between flex-col gap-8'>
                    <div className='flex items-center gap-3'>
                        <KeyRound size={24} className='text-primary' />
                        <p className='text-lg font-bold text-primary'>Change Password</p>
                    </div>
                </div>
                <form className='mt-10 flex flex-col gap-6'>
                    <input type="password" placeholder='Current Password' className='w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent' />
                    <input type="password" placeholder='New Password' className='w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent' />
                    <input type="password" placeholder='Confirm New Password' className='w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent' />
                    <button type="submit" className='w-fit rounded-md bg-primary px-4 py-2 text-white font-semibold hover:bg-primary/90 transition-colors'>Change Password</button>
                </form>
            </div>
        </main>
    )
}

export default PasswordChange
