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
    loading,
    variant,
    children,
}: {
    loading: boolean
    variant: ButtonVariants
    children: React.ReactNode
}) => {
    return (
        <Button variant={variant} disabled={loading}>
            {loading && <FaSpinner className="animate-spin" />}
            {children}
        </Button>
    )
}
