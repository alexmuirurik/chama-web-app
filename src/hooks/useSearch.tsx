'use client'

import { createContext, useContext, useState } from 'react'

interface SearchContextProps {
    search: string
    setSearch: (search: string) => void
}

const SearchContext = createContext<SearchContextProps>({
    search: '',
    setSearch: () => {},
})

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [search, setSearch] = useState<string>('')
    return (
        <SearchContext.Provider
            value={{ search: search, setSearch: setSearch }}
        >
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => useContext(SearchContext)
