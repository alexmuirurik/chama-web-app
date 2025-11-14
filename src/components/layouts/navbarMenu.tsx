'use client'

import { signOut } from 'next-auth/react'
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/src/components/ui/menubar'
import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { Avatar, AvatarImage } from '../ui/avatar'
import { User } from 'next-auth'
import Link from 'next/link'

const MenubarDemo = ({ user }: { user: User | undefined }) => {
    const [loading, setLoading] = useState(false)
    const onSignOut = async () => {
        setLoading(true)
        signOut({
            callbackUrl: '/',
        })
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }
    return (
        <Menubar className="border-0 shadow-none">
            <MenubarMenu>
                <MenubarTrigger className="hover:bg-neutral-300 px-4">
                    File
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        New Window <MenubarShortcut>⌘N</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled>New Incognito Window</MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Share</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Email link</MenubarItem>
                            <MenubarItem>Messages</MenubarItem>
                            <MenubarItem>Notes</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>
                        Print... <MenubarShortcut>⌘P</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarSub>
                        <MenubarSubTrigger>Find</MenubarSubTrigger>
                        <MenubarSubContent>
                            <MenubarItem>Search the web</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Find...</MenubarItem>
                            <MenubarItem>Find Next</MenubarItem>
                            <MenubarItem>Find Previous</MenubarItem>
                        </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSeparator />
                    <MenubarItem>Cut</MenubarItem>
                    <MenubarItem>Copy</MenubarItem>
                    <MenubarItem>Paste</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>View</MenubarTrigger>
                <MenubarContent>
                    <MenubarCheckboxItem>
                        Always Show Bookmarks Bar
                    </MenubarCheckboxItem>
                    <MenubarCheckboxItem checked>
                        Always Show Full URLs
                    </MenubarCheckboxItem>
                    <MenubarSeparator />
                    <MenubarItem inset>
                        Reload <MenubarShortcut>⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem disabled inset>
                        Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Toggle Fullscreen</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem inset>Hide Sidebar</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger className="px-4 py-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={user?.image ?? ''} />
                    </Avatar>
                </MenubarTrigger>
                <MenubarContent align="end">
                    <MenubarItem
                        className="flex items-center gap-2 py-2 cursor-pointer"
                        inset
                        asChild
                    >
                        <Link href="/profile">Profile</Link>
                    </MenubarItem>
                    <MenubarItem
                        className="flex items-center gap-2 py-2 cursor-pointer"
                        inset
                        asChild
                    >
                        <Link href="/chamas">Chamas</Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem
                        className="flex items-center gap-2 py-2 cursor-pointer"
                        inset
                        asChild
                    >
                        <Link href="#" onClick={onSignOut}>
                            {loading && (
                                <FaSpinner className="h-8 w-8 animate-spin" />
                            )}
                            Sign Out
                        </Link>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default MenubarDemo
