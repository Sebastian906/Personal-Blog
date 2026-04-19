import React from 'react'
import { Input } from './ui/input'

const SearchBox = () => {
    return (
        <form>
            <Input placeholder="Buscar..." className='h-9 rounded-full bg-slate-200 px-6' />
        </form>
    )
}

export default SearchBox