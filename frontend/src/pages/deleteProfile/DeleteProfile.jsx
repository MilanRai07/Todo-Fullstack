import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

const confirmationPhrase = 'DELETE MY PROFILE'

const DeleteProfile = () => {
    const [confirmationText, setConfirmationText] = useState('')
    const [message, setMessage] = useState('')
    const isConfirmationValid = confirmationText === confirmationPhrase

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!isConfirmationValid) return

        setMessage('Profile deletion is not connected to the server yet.')
    }

    return (
        <main className='p-7'>
            <div className='cardBox'>
                <div className='flex items-center gap-3'>
                    <AlertTriangle size={24} className='text-red-600' />
                    <h1 className='text-lg font-bold text-red-600'>Delete Profile</h1>
                </div>

                <div className='mt-8 rounded-md border border-red-300 bg-red-50 p-5'>
                    <h2 className='font-semibold text-red-800'>This action is permanent</h2>
                    <p className='mt-2 text-sm text-red-700'>
                        Deleting your profile will permanently remove your account and associated data.
                        This action cannot be undone.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='mt-8 space-y-5'>
                    <div>
                        <label htmlFor='delete-confirmation' className='mb-2 block text-sm font-semibold text-gray-800'>
                            Type <span className='font-bold'>{confirmationPhrase}</span> to confirm
                        </label>
                        <input
                            id='delete-confirmation'
                            type='text'
                            value={confirmationText}
                            onChange={(event) => {
                                setConfirmationText(event.target.value)
                                setMessage('')
                            }}
                            className='w-full min-h-11.5 sm:min-h-12.5 min-w-50 px-3.5 sm:px-4 bg-white border rounded-xl text-left transition-all duration-200 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 border-gray-300 focus:border-primary hover:border-gray-400'
                            autoComplete='off'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={!isConfirmationValid}
                        className='rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        Delete Profile
                    </button>

                    {message && <p role='alert' className='text-sm font-medium text-red-700'>{message}</p>}
                </form>
            </div>
        </main>
    )
}

export default DeleteProfile