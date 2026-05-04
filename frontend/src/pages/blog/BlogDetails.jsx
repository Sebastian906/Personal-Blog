import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteAddBlog, RouteEditBlog } from '@/helpers/RouteName'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getEnv'
import Loading from '@/components/Loading'
import { FiEdit } from "react-icons/fi";
import { FaTrashAlt } from "react-icons/fa";
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import moment from 'moment'

const BlogDetails = () => {

    const [refreshData, setRefreshData] = useState(false)

    const renderCellValue = (value) => {
        if (value && typeof value === 'object') {
            return value.name ?? value.title ?? value._id ?? ''
        }
        return value
    }

    const renderDateValue = (value) => {
        const dateValue = moment(value)
        return dateValue.isValid() ? dateValue.format('DD/MM/YYYY') : '—'
    }

    const { data: blogData, loading, error } = useFetch(`${getEnv('VITE_BASE_API_URL')}/blogs/all`, {
        method: 'GET',
        credentials: 'include'
    }, [refreshData])

    const handleDelete = (id) => {
        const response = deleteData(`${getEnv('VITE_BASE_API_URL')}/blogs/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('success', 'Blog eliminado correctamente.')
        } else {
            showToast('error', 'Error al eliminar el blog.')
        }
    }

    if (loading) return <Loading />

    return (
        <div>
            <Card className='bg-slate-100'>
                <CardHeader>
                    <div>
                        <Button asChild>
                            <Link to={RouteAddBlog}>
                                Agregar Blog
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold">Autor</TableHead>
                                <TableHead className="font-bold">Categoría</TableHead>
                                <TableHead className="font-bold">Título</TableHead>
                                <TableHead className="font-bold">Ficha</TableHead>
                                <TableHead className="font-bold">Fecha</TableHead>
                                <TableHead className="font-bold">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {blogData?.blogs?.length > 0 ?
                                blogData.blogs.map(blog => (
                                    <TableRow key={blog._id}>
                                        <TableCell>{renderCellValue(blog.author)}</TableCell>
                                        <TableCell>{renderCellValue(blog.category)}</TableCell>
                                        <TableCell>{blog.title}</TableCell>
                                        <TableCell>{blog.slug}</TableCell>
                                        <TableCell>{renderDateValue(blog.createdAt ?? blog.date)}</TableCell>
                                        <TableCell className='flex gap-2'>
                                            <Button
                                                variant='outline'
                                                className='bg-slate-100 hover:bg-violet-500 hover:text-white'
                                                asChild
                                            >
                                                <Link to={RouteEditBlog(blog._id)}>
                                                    <FiEdit />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant='outline'
                                                className='bg-slate-100 hover:bg-violet-500 hover:text-white'
                                                onClick={() => handleDelete(blog._id)}
                                                aria-label={`Eliminar ${blog.title}`}
                                            >
                                                <FaTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell colSpan="3">
                                        No se encontraron datos.
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default BlogDetails