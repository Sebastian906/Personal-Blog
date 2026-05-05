import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useParams } from 'react-router-dom'
import { decode } from 'entities'
import Loading from '@/components/Loading'

const SingleBlogDetails = () => {
    const { category, slug } = useParams()
    const { data, loading, error } = useFetch(`${getEnv('VITE_BASE_API_URL')}/blogs/get-blog/${slug}`,
        { method: 'GET', credentials: 'include' },
        [slug]
    )

    if (loading) return <Loading />

    return (
        <div className='flex justify-between gap-20'>
            {data && data.blog && <>
                <div className='border rounded w-[70%] p-5'>
                    <h1 className='text-2xl font-bold mb-5'>{data.blog.title}</h1>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-5'>
                            <Avatar>
                                <AvatarImage src={data.blog.author?.avatar} alt={data.blog.author?.name} />
                                <AvatarFallback>{data.blog.author?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{data.blog.author?.name}</span>
                        </div>
                    </div>
                    <div className='my-5'>
                        <img src={data.blog.featuredImage} alt={data.blog.title} className='rounded' />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent || '') }} />
                </div>
            </>}
            <div className='border rounded w-[30%]'>

            </div>
        </div>
    )
}

export default SingleBlogDetails