import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { decode } from 'entities'
import Loading from '@/components/Loading'
import Comment from '@/components/Comment'
import CommentCount from '@/components/CommentCount'
import moment from 'moment'
import LikeCount from '@/components/LikeCount'
import RelatedBlog from '@/components/RelatedBlog'
import { useUserStore } from '@/store/useUserStore'
import { RouteEditBlog } from '@/helpers/RouteName'
import { FiEdit } from 'react-icons/fi'

const SingleBlogDetails = () => {
    const { category, slug } = useParams()
    const currentUser = useUserStore((state) => state.user)

    const { data, loading } = useFetch(`${getEnv('VITE_BASE_API_URL')}/blogs/get-blog/${slug}`,
        { method: 'GET', credentials: 'include' },
        [slug, category],
    )

    if (loading) return <Loading />

    const isAuthor = currentUser?._id && data?.blog?.author?._id === currentUser._id

    return (
        <div className='md:flex-nowrap flex-wrap flex justify-between gap-20'>
            {data?.blog && (
                <>
                    <div className='border dark:border-slate-700 rounded md:w-[70%] w-full p-5 dark:bg-slate-800'>
                        <h1 className='text-2xl font-bold mb-5 dark:text-slate-100'>{data.blog.title}</h1>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-5'>
                                <Avatar>
                                    <AvatarImage src={data.blog.author?.avatar} alt={data.blog.author?.name} />
                                    <AvatarFallback>{data.blog.author?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className='font-bold dark:text-slate-100'>{data.blog.author?.name}</p>
                                    <p className='text-xs text-gray-500 dark:text-slate-400'>
                                        {moment(data.blog.createdAt).format('DD/MM/YYYY')}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center gap-5 dark:text-slate-100'>
                                {isAuthor && (
                                    <Link to={RouteEditBlog(data.blog._id)} title="Editar blog">
                                        <FiEdit className='text-violet-500 hover:text-violet-700 cursor-pointer' size={18} />
                                    </Link>
                                )}
                                <LikeCount props={{ blogId: data.blog._id }} />
                                <CommentCount props={{ blogId: data.blog._id }} />
                            </div>
                        </div>
                        <div className='my-5'>
                            <img src={data.blog.featuredImage} alt={data.blog.title} className='rounded' />
                        </div>
                        <div
                            className='dark:text-slate-100 prose dark:prose-invert max-w-none'
                            dangerouslySetInnerHTML={{ __html: decode(data.blog.blogContent || '') }}
                        />
                        <div className='border-t dark:border-slate-700 mt-5 pt-5'>
                            <Comment props={{ blogId: data.blog._id }} />
                        </div>
                    </div>
                    <div className='border dark:border-slate-700 rounded md:w-[30%] w-full p-5 dark:bg-slate-800'>
                        <RelatedBlog props={{
                            category: data.blog.category?.slug ?? category,
                            currentBlog: slug,
                        }} />
                    </div>
                </>
            )}
        </div>
    )
}

export default SingleBlogDetails