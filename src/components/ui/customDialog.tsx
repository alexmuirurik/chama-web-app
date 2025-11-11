'use client'

import { Dialog } from '@radix-ui/react-dialog'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { DialogContent, DialogTrigger } from './dialog'
import { Button } from './button'
import { ButtonVariants } from './loadingButton'

export const CustomDialog = ({
    open,
    setOpen,
    title,
    variant,
    children,
}: {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    title: string
    variant: ButtonVariants
    children: ReactNode
}) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={variant}>
                    <span className="text-sm text-nowrap">{title}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full">{children}</DialogContent>
        </Dialog>
    )
}

export default CustomDialog
