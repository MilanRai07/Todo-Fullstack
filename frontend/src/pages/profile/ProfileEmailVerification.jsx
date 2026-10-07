import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCurrentUser } from '../../hooks/useCurrentUserHook'
import { useEmailVerify } from '../../service/users/emailVerification'

const ProfileEmailVerification = () => {
    const [otp, setOtp] = useState('')
    const { data } = useCurrentUser()
    const { isPending, mutate } = useEmailVerify()
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        mutate(
            { token: otp.trim() },
            {
                onSuccess: () => {
                    toast.success('Email verified successfully')
                    navigate('/profile', { replace: true })
                },
                onError: (error) => toast.error(error.message)
            }
        )
    }

    return (
        <main className='grid min-h-full place-items-center p-6'>
            <section className='w-full max-w-md rounded-lg bg-white p-6 shadow'>
                <h1 className='mb-4 text-center text-xl font-semibold text-primary'>
                    Verify your email
                </h1>
                <p className='mb-5 text-center text-sm text-gray-600'>
                    Enter the 6-digit code sent to{' '}
                    <span className='font-medium text-gray-900'>{data?.user?.email}</span>.
                </p>
                <form onSubmit={handleSubmit} className='space-y-3'>
                    <label className='block'>
                        <span className='sr-only'>Email verification code</span>
                        <input
                            type='text'
                            name='otp'
                            inputMode='numeric'
                            autoComplete='one-time-code'
                            pattern='[0-9]{6}'
                            maxLength={6}
                            required
                            value={otp}
                            onChange={(event) => setOtp(event.target.value)}
                            placeholder='Enter 6-digit code'
                            className='formInput'
                        />
                    </label>
                    <button
                        type='submit'
                        disabled={isPending}
                        className='h-12.5 w-full rounded-md bg-primary text-lg font-bold text-white transition-colors hover:bg-secondary disabled:cursor-wait disabled:opacity-70'
                    >
                        {isPending ? 'Verifying...' : 'Verify email'}
                    </button>
                    <button
                        type='button'
                        onClick={() => navigate('/profile')}
                        className='w-full py-2 text-sm font-medium text-primary hover:underline'
                    >
                        Back to profile
                    </button>
                </form>
            </section>
        </main>
    )
}

export default ProfileEmailVerification
