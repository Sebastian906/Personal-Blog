import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'

const Index = () => {

    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_BASE_API_URL')}/blogs/all`, {
            method: 'GET',
            credentials: 'include'
    })

    if (loading) return <Loading />

    return (
        <div className='grid md:grid-cols-3 sm:grid-cols-1 grid-cols-1 gap-10'>
            {blogData && blogData?.blogs?.length > 0
                ?
                blogData.blogs.map(blog => <BlogCard key={blog._id} props={blog} />)
                :
                <div className='dark:text-slate-100'>Datos no encontrados.</div>
            }
        </div>
    )
}

export default Index