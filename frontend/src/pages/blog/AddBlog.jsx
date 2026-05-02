import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getEnv } from '@/helpers/getEnv'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import z from 'zod'
import slugify from 'slugify'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFetch } from '@/hooks/useFetch'
import Dropzone from 'react-dropzone'
import Editor from '@/components/Editor'

const formSchema = z.object({
    category: z.string().min(3, 'La Categoría debe ser de al menos 3 caracteres.'),
    title: z.string().min(3, 'El título debe ser de al menos 3 caracteres.'),
    slug: z.string().min(3, 'La ficha debe ser de al menos 3 caracteres.'),
    blogContent: z.string().min(3, 'El contenido del blog debe ser de al menos 3 caracteres.'),
})

const AddBlog = () => {

    const [filePreview, setFilePreview] = useState()
    const [file, setFile] = useState()

    const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_BASE_API_URL')}/category/all`, {
        method: 'GET',
        credentials: 'include'
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { category: '', title: '', slug: '', blogContent: '' },
    })

    const blogTitle = form.watch('title')

    useEffect(() => {
        if (blogTitle) {
            form.setValue('slug', slugify(blogTitle, { lower: true, strict: true }), {
                shouldValidate: true,
            })
        }
    }, [blogTitle])

    const categoryMutation = useMutation({
        // mutationFn: async (values) => {
        //     const response = await fetch(`${getEnv('VITE_BASE_API_URL')}/category/add`, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ ...values, icon: selectedIcon }),
        //     })
        //     const data = await response.json()
        //     if (!response.ok) throw new Error(data.message)
        //     return data
        // },
        // onSuccess: (data) => {
        //     form.reset()
        //     setSelectedIcon(null)
        //     showToast('success', data.message)
        // },
        // onError: (error) => {
        //     showToast('error', error.message)
        // },
    })

    const handleFileSection = (files) => {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFile(file)
        setFilePreview(preview)
    }

    const handleEditorData = (event, editor) => {
        const data = editor.getData()
        form.setValue('blogContent', data)
    }

    return (
        <div>
            <Card className='pt-5 bg-slate-100'>
                <CardContent>
                    <FormProvider {...form}>
                        <form
                            onSubmit={form.handleSubmit((values) => categoryMutation.mutate(values))}
                            className="w-full space-y-4"
                        >
                            <div className='flex flex-col gap-2'>
                                <label className="text-sm font-medium">Categoría</label>
                                <Select onValueChange={form.setValue('category')} defaultValues={form.watch('category')}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categoryData?.categories?.length > 0 ?
                                            categoryData.categories.map(category => (
                                                <SelectItem key={category._id} value={category._id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))
                                            :
                                            <SelectItem>
                                                No se encontraron categorías.
                                            </SelectItem>
                                        }
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.category && (
                                    <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
                                )}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className="text-sm font-medium">Título</label>
                                <Input
                                    {...form.register("title")}
                                    placeholder="Ingrese el título"
                                />
                                {form.formState.errors.title && (
                                    <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                                )}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label className="text-sm font-medium">Ficha</label>
                                <Input
                                    {...form.register("slug")}
                                    placeholder="Ingrese la ficha"
                                />
                                {form.formState.errors.slug && (
                                    <p className="text-sm text-red-500">{form.formState.errors.slug.message}</p>
                                )}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span className='mb-2 block'>Imagen</span>
                                <Dropzone onDrop={acceptedFiles => handleFileSection(acceptedFiles)}>
                                    {({ getRootProps, getInputProps }) => (
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <div className='flex justify-center items-center w-36 h-36 border-2 border-dashed rounded'>
                                                <img src={filePreview} />
                                            </div>
                                        </div>
                                    )}
                                </Dropzone>
                            </div>
                            <div className='mb-3'>
                                <div className='flex flex-col gap-2'>
                                    <label className="text-sm font-medium">Contenido</label>
                                    <Editor
                                        {...form.register("blogContent")}
                                        props={{ initialData: '', onchange: handleEditorData }}
                                    />
                                    {form.formState.errors.blogContent && (
                                        <p className="text-sm text-red-500">{form.formState.errors.blogContent.message}</p>
                                    )}
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className='w-full'
                                disabled={categoryMutation.isPending}
                            >
                                {categoryMutation.isPending ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddBlog