import { Outlet } from 'react-router-dom'
import NavbarIndex from './component/navbar/NavbarIndex'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { useLogout } from './service/users/logout'

const Layout = ({ image }) => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const { mutate: logout, isPending: logoutPending } = useLogout()

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: (data) => {
                setOpenDrawer(false)
                toast.success(data.message || 'Logged out successfully.')
            },
            onError: (error) => {
                toast.error(error.message || 'Unable to log out.')
            },
        })
    }

    useEffect(() => {
        if (!openDrawer) return

        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setOpenDrawer(false)
        }

        window.addEventListener('keydown', closeOnEscape)
        return () => window.removeEventListener('keydown', closeOnEscape)
    }, [openDrawer])

    return (
        <main className='flex min-h-dvh'>
            <aside className='w-64 shrink-0 max-[1224px]:hidden'>
                <NavbarIndex
                    onNavigate={() => setOpenDrawer(false)}
                    onLogout={handleLogout}
                    logoutPending={logoutPending}
                    image={image?.url}
                />
            </aside>

            <div className='fixed right-0 top-0 z-40 hidden p-3 max-[1224px]:block'>
                <button
                    type='button'
                    className='rounded-lg bg-primary p-2 shadow-sm'
                    onClick={() => setOpenDrawer(true)}
                    aria-label='Open navigation menu'
                    aria-expanded={openDrawer}
                >
                    <Menu size={24} className='text-white' />
                </button>
            </div>

            <AnimatePresence>
                {openDrawer && (
                    <motion.div
                        className='fixed inset-0 z-50 min-[1225px]:hidden'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button
                            type='button'
                            className='absolute inset-0 h-full w-full cursor-default bg-black/40'
                            onClick={() => setOpenDrawer(false)}
                            aria-label='Close navigation menu'
                        />
                        <motion.aside
                            className='absolute right-0 top-0 h-full w-[min(20rem,85vw)] shadow-xl'
                            role='dialog'
                            aria-modal='true'
                            aria-label='Navigation menu'
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.25 }}
                        >
                            <button
                                type='button'
                                className='absolute right-5 top-5 z-10 rounded-full p-2 text-white hover:bg-white/15'
                                onClick={() => setOpenDrawer(false)}
                                aria-label='Close navigation menu'
                            >
                                <X size={22} />
                            </button>
                            <NavbarIndex
                                onNavigate={() => setOpenDrawer(false)}
                                onLogout={handleLogout}
                                logoutPending={logoutPending}
                                image={image?.url}
                            />
                        </motion.aside>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className='h-dvh min-w-0 flex-1 overflow-y-auto max-[1224px]:w-full max-[1224px]:pt-14'>
                <Outlet />
            </section>
        </main>
    )
}

export default Layout
