import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { useParams } from 'react-router-dom'
import { decode } from 'entities'
import Loading from '@/components/Loading'
import Comment from '@/components/Comment'
import CommentCount from '@/components/CommentCount'
import moment from 'moment'
import LikeCount from '@/components/LikeCount'

const SingleBlogDetails = () => {
    const { category, slug } = useParams()
    const { data, loading } = useFetch(`${getEnv('VITE_BASE_API_URL')}/blogs/get-blog/${slug}`,
        { method: 'GET', credentials: 'include' },
        [slug]
    )

    if (loading) return <Loading />

    return (
        <div className='flex justify-between gap-20'>
            {data?.blog && (
                <div className='border rounded w-[70%] p-5'>
                    <h1 className='text-2xl font-bold mb-5'>{data.blog.title}</h1>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-5'>
                            <Avatar>
                                <AvatarImage src={data.blog.author?.avatar} alt={data.blog.author?.name} />
                                <AvatarFallback>{data.blog.author?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='font-bold'>{data.blog.author?.name}</p>
                                <p className='text-xs text-gray-500'>
                                    {moment(data.blog.createdAt).format('DD/MM/YYYY')}
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5'>
                            <LikeCount props={{ blogId: data.blog._id }} />
                            <CommentCount props={{ blogId: data.blog._id }} />
                        </div>
                    </div>
                    <div className='my-5'>
                        <img src={data.blog.featuredImage} alt={data.blog.title} className='rounded' />
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent || '') }} />
                    <div className='border-t mt-5 pt-5'>
                        <Comment props={{ blogId: data.blog._id }} />
                    </div>
                </div>
            )}
            <div className='border rounded w-[30%]' />
        </div>
    )
}

export default SingleBlogDetails