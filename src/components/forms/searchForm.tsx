'use client'

import { useSearch } from '@/src/hooks/useSearch'
import { Input } from '../ui/input'

const SearchForm = () => {
    const { search, setSearch } = useSearch()
    return (
        <Input
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
        />
    )
}

export default SearchForm
