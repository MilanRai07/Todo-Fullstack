import { LockKeyhole, Mail } from 'lucide-react'



const Login = ({ onForgotPassword, onCreateAccount }) => {
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='space-y-3'>
                <label className='relative block'>
                    <span className='sr-only'>Email address</span>
                    <Mail size={19} aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8d91]' />
                    <input type='email' name='email' autoComplete='email' required placeholder='Email address' className='formInput pl-12' />
                </label>
                <label className='relative block'>
                    <span className='sr-only'>Password</span>
                    <LockKeyhole size={19} aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8d91]' />
                    <input type='password' name='password' autoComplete='current-password' required placeholder='Password' className='formInput pl-12' />
                </label>
                <button type='submit' className='h-12.5 w-full rounded-md bg-primary text-xl font-bold text-white transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
                    Log In
                </button>
            </form>
            <button type='button' onClick={onForgotPassword} className='mt-4 block w-full text-center text-sm font-medium text-primary hover:underline'>
                Forgot password?
            </button>
            <div className='my-5 border-t border-[#dadde1]' />
            <button type='button' onClick={onCreateAccount} className='mx-auto block rounded-md bg-[#42b72a] px-5 py-3 font-bold text-white transition-colors hover:bg-[#36a420]'>
                Create new account
            </button>
        </>
    )
}

export default Login
