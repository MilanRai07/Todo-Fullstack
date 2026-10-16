import { useState } from 'react'
import { UserRound } from 'lucide-react'
import { NavbarItem } from '../../localData/Navbar'
import RecursiveItem from '../RecursiveItem'

const NavbarIndex = ({ onNavigate, onLogout, logoutPending, image }) => {
    const [failedImage, setFailedImage] = useState(null)

    return (
        <nav className='gradientToRight h-dvh overflow-y-auto p-5 text-white sm:p-7'>
            <div className='grid aspect-square w-16 place-items-center overflow-hidden rounded-full bg-white/15 sm:w-20'>
                {image && failedImage !== image ? (
                    <img
                        src={image}
                        alt='Profile'
                        className='h-full w-full object-cover'
                        onError={() => setFailedImage(image)}
                    />
                ) : (
                    <UserRound size={36} aria-hidden='true' className='text-white/80' />
                )}
            </div>

            <div className='space-y-6 mt-10'>
                {
                    NavbarItem.map((item, index) => {
                        return (
                            <RecursiveItem
                                key={index}
                                item={item}
                                onNavigate={onNavigate}
                                onLogout={onLogout}
                                logoutPending={logoutPending}
                            />
                        )
                    })
                }
            </div>
        </nav>
    )
}

export default NavbarIndex
