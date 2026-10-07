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
        <main className='p-7'>
            <div className="cardBox">
                <div className='flex justify-between flex-col gap-8'>
                    <div className='flex items-center gap-3'>
                        <KeyRound size={24} className='text-primary' />
                        <p className='text-lg font-bold text-primary'>Change Password</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-6'>
                    <input
                        type="password"
                        autoComplete="current-password"
                        placeholder='Current Password'
                        required
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        className='w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    />
                    <input
                        type="password"
                        autoComplete="new-password"
                        placeholder='New Password'
                        required
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        className='w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    />
                    <input
                        type="password"
                        autoComplete="new-password"
                        placeholder='Confirm New Password'
                        required
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        className='w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
                    />
                    <button
                        type="submit"
                        disabled={isPending}
                        className='w-fit rounded-md bg-primary px-4 py-2 text-white font-semibold hover:bg-primary/90 transition-colors disabled:cursor-wait disabled:opacity-70'
                    >
                        {isPending ? 'Changing...' : 'Change Password'}
                    </button>
                </form>
            </div>
        </main>
    )
}

export default PasswordChange
