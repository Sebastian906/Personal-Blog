import Loading from '@/components/Loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getEnv } from '@/helpers/getEnv'
import { deleteData } from '@/helpers/handleDelete'
import { showToast } from '@/helpers/showToast'
import { useFetch } from '@/hooks/useFetch'
import moment from 'moment'
import userIcon from '@/assets/images/user.png'
import React, { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

const User = () => {
    const [refreshData, setRefreshData] = useState(false)

    const { data, loading, error } = useFetch(`${getEnv('VITE_BASE_API_URL')}/users/get-all-users`, {
        method: 'GET',
        credentials: 'include'
    }, [refreshData])

    const handleDelete = async (id) => {
        const response = await deleteData(`${getEnv('VITE_BASE_API_URL')}/users/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('success', 'Usuario eliminado correctamente.')
        } else {
            showToast('error', 'Error al eliminar el usuario.')
        }
    }

    if (loading) return <Loading />

    return (
        <div>
            <Card className='bg-slate-100'>
                <CardContent>
                    <Table>
                        <TableCaption>Lista de Usuarios.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold">Rol</TableHead>
                                <TableHead className="font-bold">Nombre</TableHead>
                                <TableHead className="font-bold">Correo</TableHead>
                                <TableHead className="font-bold">Avatar</TableHead>
                                <TableHead className="font-bold">Registro</TableHead>
                                <TableHead className="font-bold">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.users?.length > 0 ?
                                data.users.map(user => (
                                    <TableRow key={user._id}>
                                        <TableCell>{user?.role}</TableCell>
                                        <TableCell>{user?.name}</TableCell>
                                        <TableCell>{user?.email}</TableCell>
                                        <TableCell>
                                            <img src={user?.avatar || userIcon} alt={user?.name} className="w-10 h-10 rounded-full" />
                                        </TableCell>
                                        <TableCell>{moment(user?.createdAt).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell className='flex gap-2'>
                                            <Button
                                                variant='outline'
                                                className='bg-slate-100 hover:bg-violet-500 hover:text-white'
                                                onClick={() => handleDelete(user._id)}
                                                aria-label={`Eliminar ${user.name}`}
                                            >
                                                <FaTrashAlt />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                                :
                                <TableRow>
                                    <TableCell colSpan="6">
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

export default User