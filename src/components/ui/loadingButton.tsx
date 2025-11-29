import { FaSpinner } from 'react-icons/fa'
import { Button } from './button'

export type ButtonVariants =
    | 'secondary'
    | 'destructive'
    | 'link'
    | 'default'
    | 'outline'
    | 'ghost'
    | null
    | undefined

export const LoadingButton = ({
    loading = false,
    variant = 'default',
    onClick,
    children,
}: {
    loading?: boolean
    variant?: ButtonVariants
    onClick?: () => void
    children: React.ReactNode
}) => {
    return (
        <Button
            className="cursor-pointer"
            variant={variant}
            disabled={loading}
            onClick={onClick}
        >
            {loading && <FaSpinner className="animate-spin" />}
            {children}
        </Button>
    )
}
