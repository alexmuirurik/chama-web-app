import { auth } from '@/auth'
import NavbarMenu from './navbarMenu'
import { getChamaById } from '@/actions/chamaController'
import { Avatar, AvatarImage } from '../ui/avatar'

const Navbar = async () => {
    const session = await auth()
    const user = session?.user
    const chama = user?.chamaId ? await getChamaById(user.chamaId) : null
    console.log(user)
    return (
        <nav className="border w-full h-12 rounded-md ps-2 py-3">
            <div className="flex justify-between items-center w-full h-full">
                <div className="flex items-center gap-2 ms-3">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={user?.image ?? ''} />
                    </Avatar>
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
