import { Mail, UserRound, LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import { useSignUp } from '../../service/users/signUp'
import { toast } from 'react-toastify'

const initialData = {
    name: '',
    email: '',
    password: ''
}

const Signup = ({ setView }) => {
    const { mutate, isPending } = useSignUp();
    const [formData, setFormData] = useState(initialData)
    const handleSubmit = (event) => {
        event.preventDefault()
        if (!formData.name.trim() || !formData.email || !formData.password) {
            toast.error("All the fields are required")
        }

        mutate({
            name: formData.name,
            email: formData.email,
            password: formData.password
        },
            {
                onSuccess: (data) => {
                    console.log(data);
                    toast.success("Account created successfully");
                    setView('verifyEmail');
                },
                onError: (err) => {
                    toast.error(err.message || 'Account creation failed. Please try again')
                }
            })

    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='space-y-3'>
                <label className='relative block'>
                    <span className='sr-only'>Full name</span>
                    <UserRound size={19} aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8d91]' />
                    <input type='text' name='name' autoComplete='name' required placeholder='Full name' className='formInput pl-12' onChange={handleChange} />
                </label>
                <label className='relative block'>
                    <span className='sr-only'>Email address</span>
                    <Mail size={19} aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8d91]' />
                    <input type='email' name='email' autoComplete='email' required placeholder='Email address' className='formInput pl-12' onChange={handleChange} />
                </label>
                <label className='relative block'>
                    <span className='sr-only'>Password</span>
                    <LockKeyhole size={19} aria-hidden='true' className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8d91]' />
                    <input type='password' name='password' autoComplete='new-password' required placeholder='Create a password' className='formInput pl-12' onChange={handleChange} />
                </label>
                <button type='submit' disabled={isPending} className='h-12.5 w-full rounded-md bg-[#42b72a] text-xl font-bold text-white transition-colors hover:bg-[#36a420] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'>
                    {isPending ? 'Creating' : 'Create An Account'}
                </button>
            </form>
            <button type='button' onClick={() => setView('login')} className='mt-4 block w-full text-center text-sm font-medium text-primary hover:underline'>
                Back to log in
            </button>
        </>
    )
}

export default Signup
