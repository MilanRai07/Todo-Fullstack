import { useState } from 'react'
import { LockKeyhole, TicketCheck } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { resetPassword } from '../../service/users/passwordRecovery'

const ResetPassword = ({ setView, email }) => {
    const [token, setToken] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isReset, setIsReset] = useState(false)
    const { mutate, isPending } = useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            toast.success(data.message)
            setIsReset(true)
        },
        onError: (error) => toast.error(error.message || 'Unable to reset password')
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
            return
        }
        mutate({ token: token.trim(), password })
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
                Enter the reset token sent to {email ? <span className='font-medium text-[#1c1e21]'>{email}</span> : 'your email'} and choose a new password.
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
                        value={token}
                        onChange={(event) => setToken(event.target.value)}
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
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder='New password'
                        className='formInput pl-12'
                    />
                </label>
                <label className='relative block'>
                    <span className='sr-only'>Confirm new password</span>
                    <LockKeyhole size={19} aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8d91]' />
                    <input
                        type='password'
                        name='confirmPassword'
                        autoComplete='new-password'
                        minLength={8}
                        required
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        placeholder='Confirm new password'
                        className='formInput pl-12'
                    />
                </label>
                <button
                    type='submit'
                    disabled={isPending}
                    className='h-12.5 w-full rounded-md bg-primary text-xl font-bold text-white transition-colors hover:bg-secondary disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                >
                    {isPending ? 'Resetting...' : 'Reset password'}
                </button>
            </form>
            <button type='button' onClick={() => setView('login')} className='mt-4 block w-full text-center text-sm font-medium text-primary hover:underline'>
                Back to log in
            </button>
        </>
    )
}

export default ResetPassword
