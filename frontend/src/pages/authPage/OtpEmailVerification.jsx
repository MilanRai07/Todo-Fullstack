import { useState } from 'react'

const OtpEmailVerification = ({ email, setView }) => {
    const [otp, setOtp] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        setView('login');
    }

    return (
        <>
            <p className='mb-4 text-center text-sm text-[#606770]'>
                Enter the 6-digit code sent to <span className='font-medium text-[#1c1e21]'>{email}</span>.
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
                        onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder='Enter 6-digit code'
                        className='formInput'
                    />
                </label>
                <button type='submit' className='h-12.5 w-full rounded-md bg-primary text-xl font-bold text-white transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
                    Verify email
                </button>
            </form>
        </>
    )
}

export default OtpEmailVerification
