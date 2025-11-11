import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth()
    if (session?.user) redirect('/')
    return <div className="min-h-screen">{children}</div>
}

export default AuthLayout
