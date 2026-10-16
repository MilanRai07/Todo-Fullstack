import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteProfile } from '../../service/users/deleteProfile'

const confirmationPhrase = 'DELETE MY PROFILE'

const DeleteProfile = () => {
    const [confirmationText, setConfirmationText] = useState('')
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const isConfirmationValid = confirmationText === confirmationPhrase
    const { mutate, isPending } = useMutation({
        mutationFn: deleteProfile,
        onSuccess: (data) => {
            queryClient.setQueryData(['currentUser'], { success: false })
            toast.success(data.message)
            navigate('/login', { replace: true })
        },
        onError: (error) => toast.error(error.message || 'Unable to delete profile')
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!isConfirmationValid) return

        mutate()
    }

    return (
        <main className='p-4 sm:p-5 lg:p-7'>
            <div className='cardBox'>
                <div className='flex items-center gap-3'>
                    <AlertTriangle size={24} className='text-red-600' />
                    <h1 className='text-lg font-bold text-red-600'>Delete Profile</h1>
                </div>

                <div className='mt-6 rounded-md border border-red-300 bg-red-50 p-4 sm:mt-8 sm:p-5'>
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
                            onChange={(event) => setConfirmationText(event.target.value)}
                            className='formInput'
                            autoComplete='off'
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={!isConfirmationValid || isPending}
                        className='rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        {isPending ? 'Deleting Profile...' : 'Delete Profile'}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default DeleteProfile