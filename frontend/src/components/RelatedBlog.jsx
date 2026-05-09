import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { Link } from 'react-router-dom'
import { RouteBlogDetails } from '@/helpers/RouteName'

const RelatedBlog = ({ props }) => {
    console.log('RelatedBlog props:', props)
    const { data, loading } = useFetch(`${getEnv('VITE_BASE_API_URL')}/blogs/get-related-blogs/${props.category}/${props.currentBlog}`,
        { method: 'GET', credentials: 'include' },
        [props.category, props.currentBlog],
    )
    console.log('RelatedBlog data:', data)

    if (loading || !props.category) return null

    return (
        <div>
            <h2 className='text-2xl font-bold mb-5'>Blogs Relacionados</h2>
            <div>
                {data?.relatedBlog?.length > 0
                    ? data.relatedBlog.map(blog => (
                        <Link key={blog._id} to={RouteBlogDetails(props.category, blog.slug)}>
                            <div className='flex items-center gap-2 mb-3'>
                                <img
                                    className='w-25 h-17.5 object-cover rounded-md'
                                    src={blog.featuredImage}
                                    alt={blog.title}
                                />
                                <h4 className='line-clamp-2 text-lg font-semibold'>{blog.title}</h4>
                            </div>
                        </Link>
                    ))
                    : <p className='text-gray-500 text-sm'>Sin blogs relacionados.</p>
                }
            </div>
        </div>
    )
}

export default RelatedBlog