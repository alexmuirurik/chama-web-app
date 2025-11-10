'use client'

import { navItems } from '@/src/lib/lists'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AppSidebarList = () => {
    const pathname = usePathname()
    return (
        <ul className="flex flex-col gap-2 mt-2">
            {navItems.map((item) => {
                const active = item.url === pathname
                return (
                    <li
                        key={item.url}
                        className={`${active && 'bg-purple-900'} hover:bg-purple-700 rounded-md`}
                    >
                        <Link
                            href={item.url}
                            className={`flex items-center px-5 py-3 text-white mt-1`}
                        >
                            <item.icon className="w-6 h-6 mr-3" />
                            <span className="font-mono text-nowrap text-sm font-bold">
                                {item.title}
                            </span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default AppSidebarList
