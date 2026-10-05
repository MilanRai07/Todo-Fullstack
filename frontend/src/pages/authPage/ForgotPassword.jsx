import { Mail } from 'lucide-react'
import { useState } from 'react'

const ForgotPassword = ({ setView }) => {
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setView('resetPassword')
    }

    return (
        <>
            <p className='mb-4 text-center text-sm text-[#606770]'>
                Enter your email address and we’ll help you reset your password.
            </p>
            <form onSubmit={handleSubmit} className='space-y-3'>
                <label className='relative block'>
                    <span className='sr-only'>Email address</span>
                    <Mail size={19} aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8d91]' />
                    <input type='email' name='email' autoComplete='email' required placeholder='Email address' className='formInput pl-12' />
                </label>
                <button type='submit' disabled={isSubmitting} className='h-12.5 w-full rounded-md bg-primary text-xl font-bold text-white transition-colors hover:bg-secondary disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
                    {isSubmitting ? 'Sending...' : 'Send reset code'}
                </button>
            </form>
            {error && <p role='alert' className='mt-3 text-sm text-red-600'>{error}</p>}
            <button type='button' onClick={() => setView('login')} className='mt-4 block w-full text-center text-sm font-medium text-primary hover:underline'>
                Back to log in
            </button>
        </>
    )
}

export default ForgotPassword
