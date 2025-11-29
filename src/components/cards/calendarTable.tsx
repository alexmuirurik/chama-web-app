const CalendarTable = () => {
    const month = new Date().getMonth()
    const daysInMonth = new Date(
        new Date().getFullYear(),
        month + 1,
        0
    ).getDate()
    const today = new Date().getDate()
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return (
        <div className="grid grid-cols-7 gap-1 text-sm py-3">
            {weekDays.map((day) => (
                <div
                    key={day}
                    className="bg-neutral-100 flex justify-center items-center border rounded-lg p-3 "
                >
                    {day}
                </div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => (
                <div
                    key={i}
                    className={`flex justify-center items-center border rounded-lg ${
                        i + 1 === today
                            ? 'text-purple-900 border-purple-500'
                            : ''
                    } p-10 cursor-pointer`}
                >
                    {i + 1}
                </div>
            ))}
        </div>
    )
}

export default CalendarTable
