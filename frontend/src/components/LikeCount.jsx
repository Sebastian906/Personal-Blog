import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useFetch } from '@/hooks/useFetch'
import { useUserStore } from '@/store/useUserStore'
import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'

const LikeCount = ({ props }) => {
    const [likeCount, setLikeCount] = useState(0)
    const [hasLiked, setHasLiked] = useState(false)

    const isLogginIn = useUserStore((state) => state.isLogginIn)
    const currentUser = useUserStore((state) => state.user)

    const userId = isLogginIn ? currentUser._id : ''

    const { data: blogLikeData } = useFetch(
        `${getEnv('VITE_BASE_API_URL')}/blog-like/get-like/${props.blogId}/${userId}`,
        { method: 'GET', credentials: 'include' },
    )

    useEffect(() => {
        if (blogLikeData) {
            setLikeCount(blogLikeData.likeCount)
            setHasLiked(blogLikeData.isUserLiked)
        }
    }, [blogLikeData])

    const handleLike = async () => {
        if (!isLogginIn) {
            return showToast('error', 'Debes iniciar sesión para dar me gusta.')
        }

        try {
            const response = await fetch(`${getEnv('VITE_BASE_API_URL')}/blog-like/do-like`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: currentUser._id, blogId: props.blogId }),
            })

            const responseData = await response.json()

            if (!response.ok) {
                return showToast('error', responseData.message || 'Error al dar me gusta.')
            }

            setLikeCount(responseData.likeCount)
            setHasLiked(prev => !prev)
        } catch (error) {
            showToast('error', error.message || 'Error al dar me gusta.')
        }
    }

    return (
        <button
            onClick={handleLike}
            type='button'
            className='flex justify-between items-center gap-1'
        >
            <FaHeart className={hasLiked ? 'text-red-500' : ''} />
            <span>{likeCount}</span>
        </button>
    )
}

export default LikeCount