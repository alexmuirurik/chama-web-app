import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from '@/src/components/ui/sidebar'
import Image from 'next/image'
import AppSidebarList from './appSidebarList'

const AppSidebar = () => {
    return (
        <Sidebar className="bg-purple-800 w-52 border-2 rounded-md overflow-hidden">
            <SidebarHeader className="border-b py-2">
                <span className="flex items-center ">
                    <Image
                        src="/images/logo.png"
                        width={45}
                        height={45}
                        alt="Olive Jikuze"
                    />
                    <span className="text-white text-xl font-russo-one text-nowrap mt-2">
                        Olive Jikuze
                    </span>
                </span>
            </SidebarHeader>
            <SidebarContent>
                <AppSidebarList />
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar
