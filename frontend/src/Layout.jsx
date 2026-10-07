import { Outlet } from 'react-router-dom'
import NavbarIndex from './component/navbar/NavbarIndex'

const Layout = () => {
    return (
        <main className='flex justify-between '>
            <aside className='w-[20%]'>
                <NavbarIndex />
            </aside>

            <section className='w-[80%] h-screen overflow-y-auto'>
                <Outlet />
            </section>
        </main>
    )
}

export default Layout
