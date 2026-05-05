import React from 'react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { FaRegCalendarAlt } from 'react-icons/fa'
import userIcon from '@/assets/images/user.png'
import { Link } from 'react-router-dom'

const BlogCard = ({ props }) => {

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const getInitials = (name) => {
        return name
            ?.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || 'U'
    }

    return (
        <Link to={`/blog/${props.slug}`}>
            <Card className='pt-5 hover:shadow-lg transition-shadow cursor-pointer bg-slate-100'>
                <CardContent>
                    <div className='flex items-center justify-between mb-2'>
                        <div className='flex items-center gap-2'>
                            <Avatar>
                                <AvatarImage src={props.author?.avatar || userIcon} alt={props.author?.name} />
                                <AvatarFallback>{getInitials(props.author?.name)}</AvatarFallback>
                            </Avatar>
                            <span className='font-medium'>{props.author?.name}</span>
                        </div>
                        {props.author?.role === 'admin' &&
                            <Badge className='bg-violet-500 text-white hover:bg-violet-600'>Admin</Badge>
                        }
                    </div>
                    <div className='my-2'>
                        <img src={props.featuredImage} className='rounded w-full h-48 object-cover' />
                    </div>
                    <div>
                        <p className='flex items-center gap-2 mb-2 text-sm text-gray-500'>
                            <FaRegCalendarAlt />
                            <span>{formatDate(props.createdAt)}</span>
                        </p>
                        <h2 className='text-2xl font-bold line-clamp-2'>
                            {props.title}
                        </h2>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

export default BlogCard