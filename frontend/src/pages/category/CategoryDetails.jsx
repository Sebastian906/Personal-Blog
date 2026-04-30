import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { RouteAddCategory, RouteEditCategory } from '@/helpers/RouteName'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCaption,
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

const CategoryDetails = () => {

    const [refreshData, setRefreshData] = useState(false)

    const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_BASE_API_URL')}/category/all`, {
        method: 'GET',
        credentials: 'include'
    }, [refreshData])

    const handleDelete = (id) => {
        const response = deleteData(`${getEnv('VITE_BASE_API_URL')}/category/delete/${id}`)
        if (response) {
            setRefreshData(!refreshData)
            showToast('success', 'Categoría eliminada correctamente.')
        } else {
            showToast('error', 'Error al eliminar la categoría.')
        }
    }

    if (loading) return <Loading />

    return (
        <div>
            <Card className='bg-slate-100'>
                <CardHeader>
                    <div>
                        <Button asChild>
                            <Link to={RouteAddCategory}>
                                Agregar Categoría
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>Lista de Categorías.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="font-bold">Categoría</TableHead>
                                <TableHead className="font-bold">Ficha</TableHead>
                                <TableHead className="font-bold">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categoryData?.categories?.length > 0 ?
                                categoryData.categories.map(category => (
                                    <TableRow key={category._id}>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.slug}</TableCell>
                                        <TableCell className='flex gap-2'>
                                            <Button
                                                variant='outline'
                                                className='bg-slate-100 hover:bg-violet-500 hover:text-white'
                                                asChild
                                            >
                                                <Link to={RouteEditCategory(category._id)}>
                                                    <FiEdit />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant='outline'
                                                className='bg-slate-100 hover:bg-violet-500 hover:text-white'
                                                onClick={() => handleDelete(category._id)}
                                                aria-label={`Eliminar ${category.name}`}
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

export default CategoryDetails