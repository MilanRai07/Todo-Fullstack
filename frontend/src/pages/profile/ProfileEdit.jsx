import { useEffect, useRef, useState } from 'react'
import { UserRound, UserShield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useProfileEdit } from '../../service/users/profileEdit'
import { useProfileImageEdit } from '../../service/users/profileImageEdit'
import { toast } from 'react-toastify'
import { useCurrentUser } from '../../hooks/useCurrentUserHook'

const ProfileEdit = ({ setShowEdit }) => {
    const { mutateAsync: editProfile, isPending: isProfilePending } = useProfileEdit();
    const { mutateAsync: editProfileImage, isPending: isImagePending } = useProfileImageEdit();
    const { data } = useCurrentUser();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: null,
        email: null,
    })
    const [imagePreview, setImagePreview] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)
    const fileInputRef = useRef(null)
    const isPending = isProfilePending || isImagePending;

    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview)
            }
        }
    }, [imagePreview])

    const getProfileImageUrl = () => imagePreview || data?.user?.profileImage?.url || ""

    const handleFileChange = (event) => {
        const image = event.target.files?.[0]
        if (image) {
            setSelectedImage(image)
            setImagePreview(URL.createObjectURL(image))
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const name = (formData.name ?? data?.user?.name ?? '').trim();
        const email = (formData.email ?? data?.user?.email ?? '').trim();

        if (!name || !email) {
            toast.error("Name and email are required")
            return
        }

        try {
            await editProfile({ name, email });
            if (selectedImage) {
                const imageData = new FormData();
                imageData.append('image', selectedImage);
                await editProfileImage(imageData);
            }
            toast.success("Profile updated successfully")
            setShowEdit?.(false)
        } catch (error) {
            toast.error(error?.message || "Unable to edit profile")
        }
    }

    const handleBack = () => {
        if (setShowEdit) {
            setShowEdit(false)
            return
        }

        navigate(-1)
    }

    return (
        <>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-3'>
                    <UserShield size={24} className='text-primary' />
                    <p className='text-lg font-bold text-primary'>Edit Profile</p>
                </div>
                <button
                    type='button'
                    onClick={handleBack}
                    className='rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white'
                >
                    Back
                </button>
            </div>

            <form onSubmit={handleSubmit} className='mt-6 space-y-8 sm:mt-10 sm:space-y-10'>
                <div className='flex justify-center'>
                    <div className='relative h-24 w-24'>
                        <div className='h-full w-full overflow-hidden rounded-full border-2 border-primary'>
                            <img
                                src={getProfileImageUrl()}
                                alt='Profile'
                                className='w-full h-full object-cover overflow-hidden rounded-full'
                            />
                        </div>
                        <button
                            type='button'
                            onClick={() => fileInputRef.current?.click()}
                            aria-label='Choose profile image'
                            className='absolute top-1/2 right-[-13%] z-10 grid h-[40%] w-[40%] -translate-y-1/2 place-items-center rounded-full shadow-md bg-white text-[24px] font-extrabold text-mainBlue'
                        >
                            +
                        </button>
                    </div>
                    <input
                        type='file'
                        accept='image/*'
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className='hidden'
                    />
                </div>

                <div className='flex flex-col gap-5 sm:flex-row sm:gap-6'>
                    <div className='flex-1'>
                        <label htmlFor='profile-name' className='mb-2 block text-sm font-semibold text-gray-800'>
                            Name
                        </label>
                        <input
                            id='profile-name'
                            name='name'
                            type='text'
                            value={formData.name ?? data?.user?.name ?? ''}
                            onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                            className='formInput'
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className='flex-1 '>
                        <label htmlFor='profile-email' className='mb-2 block text-sm font-semibold text-gray-800'>
                            Email Address
                        </label>
                        <input
                            id='profile-email'
                            name='email'
                            type='email'
                            value={formData.email ?? data?.user?.email ?? ''}
                            onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                            className='formInput'
                            placeholder='Enter your email address'
                        />
                    </div>
                </div>

                <div className='flex justify-end'>
                    <button
                        type='submit'
                        disabled={isPending}
                        className='rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-secondary'
                    >
                        {isPending ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default ProfileEdit