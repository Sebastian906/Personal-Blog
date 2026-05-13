import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getEnv } from '@/helpers/getEnv'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import { useFetch } from '@/hooks/useFetch'
import moment from 'moment'
import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const Comments = () => {

    const [refreshData, setRefreshData] = useState(false)

    const { data, loading, error } = useFetch(`${getEnv('VITE_BASE_API_URL')}/comment/get-all-comments`, {
        method: 'GET',
        credentials: 'include'
    }, [refreshData])

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEnv('VITE_BASE_API_URL')}/comment/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('success', 'Comentario eliminado correctamente.')
        } else {
            showToast('error', 'Error al eliminar el comentario.')
        }
    }

    if (loading) return <Loading />

    return (
        <div>
            <Card className='bg-slate-100 dark:bg-slate-800 dark:ring-slate-700'>
                <CardContent>
                    <Table>
                        <TableCaption className='dark:text-slate-400'>Lista de Comentarios.</TableCaption>
                        <TableHeader>
                            <TableRow className='dark:border-slate-700'>
                                <TableHead className="font-bold dark:text-slate-100">Blog</TableHead>
                                <TableHead className="font-bold dark:text-slate-100">Hecho por</TableHead>
                                <TableHead className="font-bold dark:text-slate-100">Fecha</TableHead>
                                <TableHead className="font-bold dark:text-slate-100">Comentario</TableHead>
                                <TableHead className="font-bold dark:text-slate-100">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.comments?.length > 0 ?
                                data.comments.map(comment => (
                                    <TableRow key={comment._id} className='dark:border-slate-700 dark:text-slate-200'>
                                        <TableCell>{comment?.blogId?.title}</TableCell>
                                        <TableCell>{comment?.author?.name}</TableCell>
                                        <TableCell>{moment(comment?.createdAt).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{comment?.comment}</TableCell>
                                        <TableCell className='flex gap-2'>
                                            <Button
                                                variant='outline'
                                                className='bg-slate-100 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 hover:bg-violet-500 hover:text-white dark:hover:bg-violet-500'
                                                onClick={() => handleDelete(comment._id)}
                                                aria-label={`Eliminar ${comment.author?.name}`}
                                            >
                                                <FaTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell colSpan="5" className='dark:text-slate-300'>
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

export default Comments