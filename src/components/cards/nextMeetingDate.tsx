'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/src/components/ui/button'
import { Calendar } from '@/src/components/ui/calendar'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/src/components/ui/popover'

function formatDate(date: Date | undefined) {
    if (!date) {
        return ''
    }

    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}

const NextMeetingDate = () => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('Meeting In 2 days')
    const [month, setMonth] = React.useState<Date | undefined>()

    return (
        <div className="relative flex gap-2 w-full">
            <Input
                id="date"
                value={value}
                placeholder="Tomorrow or next week"
                className="bg-background pr-10"
                onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault()
                        setOpen(true)
                    }
                }}
            />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id="date-picker"
                        variant="ghost"
                        className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                    >
                        <CalendarIcon className="size-3.5" />
                        <span className="sr-only">Select date</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="end"
                >
                    <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        month={month}
                        onMonthChange={setMonth}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default NextMeetingDate
