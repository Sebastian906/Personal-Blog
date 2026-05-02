import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { RouteAddBlog } from '@/helpers/RouteName'
import { Table } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const BlogDetails = () => {
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
                            {/* {categoryData?.categories?.length > 0 ?
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
                            } */}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default BlogDetails