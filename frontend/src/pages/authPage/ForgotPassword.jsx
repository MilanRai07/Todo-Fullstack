import { Mail } from 'lucide-react'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { requestPasswordReset } from '../../service/users/passwordRecovery'

const ForgotPassword = ({ setView, setResetEmail }) => {
    const [email, setEmail] = useState('')
    const { mutate, isPending } = useMutation({
        mutationFn: requestPasswordReset,
        onSuccess: (data) => {
            setResetEmail(email.trim())
            toast.success(data.message)
            setView('resetPassword')
        },
        onError: (error) => toast.error(error.message || 'Unable to send reset code')
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        mutate(email.trim())
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
                    <input
                        type='email'
                        name='email'
                        autoComplete='email'
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder='Email address'
                        className='formInput pl-12'
                    />
                </label>
                <button type='submit' disabled={isPending} className='h-12.5 w-full rounded-md bg-primary text-xl font-bold text-white transition-colors hover:bg-secondary disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
                    {isPending ? 'Sending...' : 'Send reset code'}
                </button>
            </form>
            <button type='button' onClick={() => setView('login')} className='mt-4 block w-full text-center text-sm font-medium text-primary hover:underline'>
                Back to log in
            </button>
        </>
    )
}

export default ForgotPassword
