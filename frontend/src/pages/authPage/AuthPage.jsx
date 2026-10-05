import { useState } from 'react'
import { CheckSquare } from 'lucide-react'
import Login from './Login'
import Signup from './Signup'
import ForgotPassword from './ForgotPassword'
import OtpEmailVerification from './OtpEmailVerification'
import ResetPassword from './ResetPassword'

const AuthPage = () => {
    const [view, setView] = useState('login')
    const [signupEmail, setSignupEmail] = useState('')

    const viewTitles = {
        login: 'Log in to ToDo',
        signup: 'Create your account',
        forgotPassword: 'Find your account',
        verifyEmail: 'Verify your email',
        resetPassword: 'Reset your password',
    }

    const handleSignup = (email) => {
        setSignupEmail(email)
        setView('verifyEmail')
    }

    return (
        <main className='min-h-screen bg-[#f0f2f5] px-6 py-12 sm:px-10'>
            <div className='mx-auto flex min-h-[calc(100vh-6rem)] max-w-245 items-center justify-between gap-14 max-md:flex-col max-md:justify-center max-md:gap-10'>
                <section className='max-w-120 max-md:text-center'>
                    <div className='mb-5 flex items-center gap-3 max-md:justify-center'>
                        <span className='grid h-12 w-12 place-items-center rounded-xl bg-primary text-white'>
                            <CheckSquare size={28} strokeWidth={2.5} />
                        </span>
                        <span className='text-4xl font-bold tracking-tight text-primary'>ToDo</span>
                    </div>
                    <h1 className='text-[28px] leading-snug text-[#1c1e21] max-sm:text-2xl'>
                        Make space for what matters.
                    </h1>
                    <p className='mt-3 text-lg leading-relaxed text-[#606770]'>
                        Sign in to organize your tasks and keep your day moving.
                    </p>
                </section>

                <section className='w-full max-w-99'>
                    <div className='rounded-lg bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.16)] sm:p-5'>
                        <h2 className='mb-5 text-center text-xl font-semibold text-primary'>
                            {viewTitles[view]}
                        </h2>
                        {view === 'login' && (
                            <Login
                                onForgotPassword={() => setView('forgotPassword')}
                                onCreateAccount={() => setView('signup')}
                            />
                        )}
                        {view === 'signup' && (
                            <Signup onSubmit={handleSignup} setView={setView} />
                        )}
                        {view === 'forgotPassword' && (
                            <ForgotPassword
                                setView={setView}
                            />
                        )}
                        {view === 'verifyEmail' && (
                            <OtpEmailVerification
                                email={signupEmail}
                                setView={setView}
                            />
                        )}
                        {view === 'resetPassword' && (
                            <ResetPassword setView={setView} />
                        )}
                    </div>
                    {view === 'login' && (
                        <p className='mt-7 text-center text-sm text-[#606770]'>
                            A little progress each day adds up to big results.
                        </p>
                    )}
                </section>
            </div>
        </main>
    )
}

export default AuthPage
