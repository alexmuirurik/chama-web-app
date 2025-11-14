import { auth } from '@/auth'
import { Avatar, AvatarImage } from '../ui/avatar'
import NavbarMenu from './navbarMenu'

const Navbar = async () => {
    const session = await auth()
    const user = session?.user
    return (
        <nav className="border w-full h-12 rounded-md ps-2 py-3">
            <div className="flex justify-between items-center w-full h-full">
                <Avatar className="h-12 w-12 rounded-full cursor-pointer">
                    <AvatarImage src={'/images/colored-logo.png'} />
                </Avatar>
                <NavbarMenu user={user} />
            </div>
        </nav>
    )
}

export default Navbar
