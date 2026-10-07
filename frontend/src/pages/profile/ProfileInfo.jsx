import { UserShield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCurrentUser } from '../../hooks/useCurrentUserHook'
import ProfileShimmer from '../../component/shimmer/ProfileShimmer';
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { sendEmailToken } from '../../service/users/sendEmailToken'

const ProfileInfo = ({ setShowEdit }) => {
    const { data, isPending } = useCurrentUser();
    const navigate = useNavigate();
    const { mutate, isPending: isSendingVerification } = useMutation({
        mutationFn: sendEmailToken,
        onSuccess: (response) => {
            toast.success(response.message);
            navigate('/verify-email');
        },
        onError: (error) => toast.error(error.message || 'Unable to send verification email')
    });

    return (
        <>
            <div className='flex items-center justify-between gap-3'>
                <div className='flex items-center gap-3'>
                    <UserShield size={24} className='text-primary' />
                    <p className='text-lg font-bold text-primary'>Profile Information</p>
                </div>

                {isPending ?
                    <div className='rounded-md w-14 h-10 bg-slate-400 animate-pulse'></div>
                    :
                    <button
                        onClick={() => setShowEdit(true)}
                        className='rounded-md border border-primary px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white transiiton-all duration-200 ease-in-out'
                    >
                        Edit
                    </button>}
            </div>
            {
                isPending ?
                    <ProfileShimmer />
                    :
                    <div className='mt-10 w-full rounded-[10px] bg-linear-to-r from-secondary to-primary p-10 flex flex-col items-center gap-6 max-sm:gap-4 '>
                        <div
                            className={` relative z-0 grid place-items-center w-24 h-24 max-md:w-16 max-md:h-16 max-sm:w-14 max-sm:h-14 border-3 border-white rounded-full cursor-not-allowed opacity-70'
                        `}
                        >
                            <img
                                src={data?.user?.profileImage?.url || '/img1.jpeg'}
                                alt="Profile"
                                className='w-full h-full object-cover overflow-hidden rounded-full'
                            />
                        </div>

                        <p className='text-[20px] font-bold text-white max-sm:text-[18px]'>{data?.user?.name}</p>
                        <div className='text-center text-white'>
                            <p className='text-xs font-medium mb-1'>
                                Email Address
                                {
                                    !data?.user?.isVerified && (
                                        <button
                                            type='button'
                                            disabled={isSendingVerification}
                                            onClick={() => mutate()}
                                            className='ml-2 cursor-pointer font-medium text-xs hover:underline disabled:cursor-wait disabled:opacity-70'
                                        >
                                            (Click to verify)
                                        </button>
                                    )
                                }
                            </p>
                            {isSendingVerification && (
                                <p role='status' className='mb-1 text-xs'>Sending verification code...</p>
                            )}
                            <p className='text-sm font-medium'>{data?.user.email}</p>
                        </div>
                    </div>
            }
        </>
    )
}

export default ProfileInfo
