import { NavbarItem } from '../../localData/Navbar'
import RecursiveItem from '../RecursiveItem'

const NavbarIndex = () => {
    return (
        <nav className='gradientToRight text-white p-7 h-screen'>
            <div className='w-20 aspect-square '>
                <img src="/logo.webp" className='w-full h-full' />
            </div>

            <div className='space-y-6 mt-10'>
                {
                    NavbarItem.map((item, index) => {
                        return (
                            <RecursiveItem key={index} item={item} />
                        )
                    })
                }
            </div>
        </nav>
    )
}

export default NavbarIndex
