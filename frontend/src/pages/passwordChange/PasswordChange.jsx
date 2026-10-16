import { KeyRound } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { changePassword } from '../../service/users/changePassword';

const PasswordChange = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { mutate, isPending } = useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            toast.success(data.message);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        },
        onError: (error) => toast.error(error.message || 'Unable to change password')
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error('New password and confirmation do not match');
            return;
        }
        if (currentPassword === newPassword) {
            toast.error('New password must be different from your current password');
            return;
        }
        mutate({ currentPassword, newPassword });
    };

    return (
        <main className='p-4 sm:p-5 lg:p-7'>
            <div className="cardBox">
                <div className='flex justify-between flex-col gap-8'>
                    <div className='flex items-center gap-3'>
                        <KeyRound size={24} className='text-primary' />
                        <p className='text-lg font-bold text-primary'>Change Password</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='mt-6 flex max-w-2xl flex-col gap-4 sm:mt-10 sm:gap-6'>
                    <input
                        type="password"
                        autoComplete="current-password"
                        placeholder='Current Password'
                        required
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        className='formInput'
                    />
                    <input
                        type="password"
                        autoComplete="new-password"
                        placeholder='New Password'
                        required
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        className='formInput'
                    />
                    <input
                        type="password"
                        autoComplete="new-password"
                        placeholder='Confirm New Password'
                        required
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className='formInput'
                    />
                    <button
                        type="submit"
                        disabled={isPending}
                        className='w-fit max-w-full rounded-md bg-primary px-4 py-2 text-white font-semibold hover:bg-primary/90 transition-colors disabled:cursor-wait disabled:opacity-70'
                    >
                        {isPending ? 'Changing...' : 'Change Password'}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default PasswordChange
