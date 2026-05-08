import { getEnv } from '@/helpers/getEnv'
import { useFetch } from '@/hooks/useFetch'
import React from 'react'
import { FaRegComment } from 'react-icons/fa'

const CommentCount = ({ props }) => {
    const { data } = useFetch(
        `${getEnv('VITE_BASE_API_URL')}/comment/get-count/${props.blogId}`,
        { method: 'GET', credentials: 'include' },
    )

    return (
        <button type='button' className='flex justify-between items-center gap-1'>
            <FaRegComment />
            <span>{data?.commentCount ?? 0}</span>
        </button>
    )
}

export default CommentCount