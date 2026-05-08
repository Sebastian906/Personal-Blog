import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import Loading from './Loading'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import userIcon from '@/assets/images/user.png'
import moment from 'moment'

const CommentList = ({ props }) => {
    const { data, loading } = useFetch(
        `${getEnv('VITE_BASE_API_URL')}/comment/get/${props.blogId}`,
        { method: 'GET', credentials: 'include' },
    )

    if (loading) return <Loading />

    const existingComments = data?.comments ?? []

    const allComments = props.newComment
        ? [props.newComment, ...existingComments]
        : existingComments

    return (
        <div>
            <h4 className='text-2xl font-bold mb-5'>
                {allComments.length} Comentarios
            </h4>
            <div className='mt-3 flex flex-col gap-4'>
                {allComments.length > 0
                    ? allComments.map((comment, index) => (
                        <div key={comment._id ?? index} className='flex gap-3'>
                            <Avatar>
                                <AvatarImage src={comment.author?.avatar || userIcon} />
                                <AvatarFallback>
                                    {comment.author?.name?.charAt(0)?.toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='font-bold'>{comment.author?.name}</p>
                                <p className='text-xs text-gray-500'>
                                    {comment.createdAt
                                        ? moment(comment.createdAt).format('DD/MM/YYYY HH:mm')
                                        : 'Ahora'}
                                </p>
                                <p className='mt-1'>{comment.comment}</p>
                            </div>
                        </div>
                    ))
                    : <p className='text-gray-500 text-sm'>Sé el primero en comentar.</p>
                }
            </div>
        </div>
    )
}

export default CommentList