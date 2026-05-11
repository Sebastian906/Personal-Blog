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
            <Card className='bg-slate-100'>
                <CardContent>
                    <Table>
                        <TableCaption>Lista de Comentarios.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold">Blog</TableHead>
                                <TableHead className="font-bold">Hecho por</TableHead>
                                <TableHead className="font-bold">Fecha</TableHead>
                                <TableHead className="font-bold">Comentario</TableHead>
                                <TableHead className="font-bold">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.comments?.length > 0 ?
                                data.comments.map(comment => (
                                    <TableRow key={comment._id}>
                                        <TableCell>{comment?.blogId?.title}</TableCell>
                                        <TableCell>{comment?.author?.name}</TableCell>
                                        <TableCell>{moment(comment?.createdAt).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell>{comment?.comment}</TableCell>
                                        <TableCell className='flex gap-2'>
                                            <Button
                                                variant='outline'
                                                className='bg-slate-100 hover:bg-violet-500 hover:text-white'
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
                                    <TableCell colSpan="5">
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