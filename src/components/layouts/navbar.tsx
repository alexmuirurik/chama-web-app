import { auth } from '@/auth'
import NavbarMenu from './navbarMenu'
import { getChamaById } from '@/src/actions/chamaController'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { MdGroupWork } from 'react-icons/md'

const Navbar = async () => {
    const session = await auth()
    const user = session?.user
    const chama = user?.chamaId ? await getChamaById(user.chamaId) : null
    return (
        <nav className="border w-full h-12 rounded-md ps-2 py-3">
            <div className="flex justify-between items-center w-full h-full">
                <div className="flex items-center gap-2 ms-3">
                    <MdGroupWork className="text-purple-900 h-6 w-6" />
                    <h3 className="font-mono font-bold text-sm">
                        {chama?.name ?? 'No Chama'}
                    </h3>
                </div>
                <NavbarMenu user={user} />
            </div>
        </nav>
    )
}

export default Navbar
