import React, { useState } from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'
import { RouteSearch } from '@/helpers/RouteName'

const SearchBox = () => {

    const navigate = useNavigate()
    const [query, setQuery] = useState()

    const getInput = (e) => {
        setQuery(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(RouteSearch(query))
    }

    return (
        <form onSubmit={handleSubmit}>
            <Input
                onChange={getInput}
                placeholder="Buscar..."
                className='h-9 rounded-full bg-slate-200 px-6'
            />
        </form>
    )
}

export default SearchBox