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
        <div className='grid grid-cols-3 gap-10'>
            {blogData && blogData?.blogs?.length > 0
                ?
                blogData.blogs.map(blog => <BlogCard key={blog._id} props={blog} />)
                :
                <div>Datos no encontrados.</div>
            }
        </div>
    )
}

export default Index