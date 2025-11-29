const DashTitleCard = ({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode
    title: string
    description: string
}) => {
    return (
        <div className="flex items-center gap-3 rounded-md border p-2">
            {icon}
            <div className="w-full space-y-0">
                <span className="text-xs text-neutral-400">{title}</span>
                <p className="text-sm text-muted-foreground font-bold">{description}</p>
            </div>
        </div>
    )
}

export default DashTitleCard
