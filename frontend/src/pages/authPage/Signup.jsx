import { Mail, UserRound, LockKeyhole } from 'lucide-react'



const Signup = ({ onSubmit, setView }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(new FormData(event.currentTarget).get('email'));
        setView('verifyEmail')
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='space-y-3'>
                <label className='relative block'>
                    <span className='sr-only'>Full name</span>
                    <UserRound size={19} aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8d91]' />
                    <input type='text' name='name' autoComplete='name' required placeholder='Full name' className='formInput pl-12' />
                </label>
                <label className='relative block'>
                    <span className='sr-only'>Email address</span>
                    <Mail size={19} aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8d91]' />
                    <input type='email' name='email' autoComplete='email' required placeholder='Email address' className='formInput pl-12' />
                </label>
                <label className='relative block'>
                    <span className='sr-only'>Password</span>
                    <LockKeyhole size={19} aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8d91]' />
                    <input type='password' name='password' autoComplete='new-password' required placeholder='Create a password' className='formInput pl-12' />
                </label>
                <button type='submit' className='h-12.5 w-full rounded-md bg-[#42b72a] text-xl font-bold text-white transition-colors hover:bg-[#36a420] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
                    Create Account
                </button>
            </form>
            <button type='button' onClick={() => setView('login')} className='mt-4 block w-full text-center text-sm font-medium text-primary hover:underline'>
                Back to log in
            </button>
        </>
    )
}

export default Signup
