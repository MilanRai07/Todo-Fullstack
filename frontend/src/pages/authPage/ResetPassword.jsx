import { useState } from 'react'
import { LockKeyhole, TicketCheck } from 'lucide-react'



const ResetPassword = ({ setView }) => {
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isReset, setIsReset] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        setError('')
        setView('login')
    }

    if (isReset) {
        return (
            <div className='text-center'>
                <p className='text-sm text-[#606770]'>Your password has been reset successfully.</p>
                <button type='button' onClick={() => setView('login')} className='mt-4 font-medium text-primary hover:underline'>
                    Back to log in
                </button>
            </div>
        )
    }

    return (
        <>
            <p className='mb-4 text-center text-sm text-[#606770]'>
                Enter the reset token from your email and choose a new password.
            </p>
            <form onSubmit={handleSubmit} className='space-y-3'>
                <label className='relative block'>
                    <span className='sr-only'>Email reset token</span>
                    <TicketCheck size={19} aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8d91]' />
                    <input
                        type='text'
                        name='token'
                        autoComplete='one-time-code'
                        required
                        placeholder='Reset token'
                        className='formInput pl-12'
                    />
                </label>
                <label className='relative block'>
                    <span className='sr-only'>New password</span>
                    <LockKeyhole size={19} aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8d91]' />
                    <input
                        type='password'
                        name='password'
                        autoComplete='new-password'
                        minLength={8}
                        required
                        placeholder='New password'
                        className='formInput pl-12'
                    />
                </label>
                <button
                    type='submit'
                    disabled={isSubmitting}
                    className='h-12.5 w-full rounded-md bg-primary text-xl font-bold text-white transition-colors hover:bg-secondary disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                >
                    {isSubmitting ? 'Resetting...' : 'Reset password'}
                </button>
            </form>
            {error && <p role='alert' className='mt-3 text-sm text-red-600'>{error}</p>}
            <button type='button' onClick={() => setView('login')} className='mt-4 block w-full text-center text-sm font-medium text-primary hover:underline'>
                Back to log in
            </button>
        </>
    )
}

export default ResetPassword
