const PageTitle = ({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) => {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="lg:w-9/12">
                <h4 className="text-xl font-bold">{title}</h4>
            </div>
            <div className="lg:w-3/12">{children}</div>
        </div>
    )
}

export default PageTitle
