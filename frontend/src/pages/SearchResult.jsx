import BlogCard from '@/components/BlogCard'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchResult = () => {
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')
    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_BASE_API_URL')}/blogs/search?q=${q}`, {
        method: 'GET',
        credentials: 'include'
    }, [q])

    return (
        <>
            <div className='flex items-center gap-3 text-2xl font-bold text-violet-700 border-b pb-3 mb-5'>
                <h4>Resultados de búsqueda: {q}</h4>
            </div>
            <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
                {blogData?.blogs?.length > 0
                    ?
                    blogData.blogs.map(blog => <BlogCard key={blog._id} props={blog} />)
                    :
                    <div className='col-span-3'>Datos no encontrados.</div>
                }
            </div>
        </>
    )
}

export default SearchResult