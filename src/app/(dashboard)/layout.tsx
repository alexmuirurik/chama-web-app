import { SidebarProvider } from '@/src/components/ui/sidebar'
import AppSidebar from '@/src/components/layouts/appSidebar'
import Navbar from '@/src/components/layouts/navbar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth() 
    if(!session?.user) redirect('/login')
    return (
        <SidebarProvider className="w-full">
            <AppSidebar />
            <main className="space-y-4 w-full mt-2 px-5 font-nunito">
                <Navbar />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout
