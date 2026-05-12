import BlogCard from '@/components/BlogCard'
import Loading from '@/components/Loading'
import { getEnv } from '@/helpers/getEnv'
import { resolveIcon } from '@/helpers/resolveIcon'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useParams } from 'react-router-dom'

const BlogByCategory = () => {
    const { category } = useParams()
    const { data: blogData, loading } = useFetch(`${getEnv('VITE_BASE_API_URL')}/blogs/get-blog-by-category/${category}`,
        { method: 'GET', credentials: 'include' },
        [category]
    )

    if (loading) return <Loading />

    return (
        <>
            <div className='flex items-center gap-3 text-2xl font-bold text-violet-700 border-b pb-3 mb-5'>
                {resolveIcon(blogData?.categoryData?.icon, { size: 28 })}
                <h4>{blogData?.categoryData?.name}</h4>
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

export default BlogByCategory