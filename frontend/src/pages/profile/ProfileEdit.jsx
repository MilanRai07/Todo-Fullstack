import { useEffect, useRef, useState } from 'react'
import { UserShield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useProfileEdit } from '../../service/users/profileEdit'
import { useProfileImageEdit } from '../../service/users/profileImageEdit'
import { toast } from 'react-toastify'
import { useCurrentUser } from '../../hooks/useCurrentUserHook'

const inputClassName = `w-full min-h-[46px] sm:min-h-[50px] min-w-[200px] px-3.5 sm:px-4 bg-white border
    rounded-xl text-left transition-all duration-200 outline-none
    focus:outline-none focus-visible:outline-none focus:ring-0 border-gray-300 focus:border-primary hover:border-gray-400`

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

    const getProfileImageUrl = () => imagePreview || data?.user?.profileImage?.url || '/img1.jpeg'

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

            <form onSubmit={handleSubmit} className='mt-10 space-y-10'>
                <div className='flex justify-center'>
                    <div className='relative h-24 w-24'>
                        <div className='h-full w-full overflow-hidden rounded-full border-3 border-primary'>
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
                            className='absolute top-1/2 right-[-13%] z-10 grid h-[40%] w-[40%] -translate-y-1/2 place-items-center rounded-full bg-white text-[24px] font-extrabold text-mainBlue'
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

                <div className='flex space-between gap-6'>
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
                            className={inputClassName}
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
                            className={inputClassName}
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