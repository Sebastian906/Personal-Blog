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
import { showToast } from '@/helpers/showToast'
import { useUserStore } from '@/store/useUserStore'
import { useNavigate } from 'react-router-dom'
import { RouteBlog } from '@/helpers/RouteName'

const formSchema = z.object({
    author: z.string().min(1, 'El autor es requerido.'),
    category: z.string().min(1, 'La categoría es requerida.'),
    title: z.string().min(3, 'El título debe ser de al menos 3 caracteres.'),
    slug: z.string().min(3, 'La ficha debe ser de al menos 3 caracteres.'),
    blogContent: z.string().min(3, 'El contenido del blog debe ser de al menos 3 caracteres.'),
})

const AddBlog = () => {

    const navigate = useNavigate()

    const [filePreview, setFilePreview] = useState()
    const [file, setFile] = useState()

    const currentUser = useUserStore((state) => state.user)

    const { data: categoryData, loading, error } = useFetch(`${getEnv('VITE_BASE_API_URL')}/category/all`, {
        method: 'GET',
        credentials: 'include'
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { author: '', category: '', title: '', slug: '', blogContent: '' },
    })

    useEffect(() => {
        if (currentUser?._id && !form.getValues('author')) {
            form.setValue('author', currentUser._id, { shouldValidate: false })
        }
    }, [currentUser?._id])

    const blogTitle = form.watch('title')

    useEffect(() => {
        if (blogTitle) {
            form.setValue('slug', slugify(blogTitle, { lower: true, strict: true }), {
                shouldValidate: true,
            })
        }
    }, [blogTitle, form.setValue])

    const blogMutation = useMutation({
        mutationFn: async (values) => {
            if (!currentUser?._id) {
                throw new Error('Usuario no autenticado');
            }

            const dataToSend = {
                author: currentUser._id,
                category: values.category,
                title: values.title,
                slug: values.slug,
                blogContent: values.blogContent,
            };

            const formData = new FormData();
            formData.append('data', JSON.stringify(dataToSend));
            if (file) formData.append('file', file);

            const response = await fetch(`${getEnv('VITE_BASE_API_URL')}/blogs/add`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            return data;
        },
        onSuccess: (data) => {
            form.reset();
            setFile();
            setFilePreview();
            showToast('success', data.message);
            navigate(RouteBlog)
        },
        onError: (error) => {
            showToast('error', error.message);
        },
    });

    const handleFileSection = (files) => {
        const file = files[0]
        const preview = URL.createObjectURL(file)
        setFile(file)
        setFilePreview(preview)
    }

    const handleEditorData = (event, editor) => {
        const data = editor.getData()
        form.setValue('blogContent', data, { shouldValidate: true })
    }

    return (
        <div>
            <Card className='pt-5 bg-slate-100'>
                <CardContent>
                    <FormProvider {...form}>
                        <form
                            onSubmit={form.handleSubmit((values) => {
                                return blogMutation.mutate(values);
                            })}
                            className="w-full space-y-4"
                        >
                            <div className='flex flex-col gap-2'>
                                <label className="text-sm font-medium">Categoría</label>
                                <Select onValueChange={(value) => form.setValue('category', value, { shouldValidate: true })} defaultValues={form.watch('category')}>
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
                                        props={{ initialData: '', onChange: handleEditorData }}
                                    />
                                    {form.formState.errors.blogContent && (
                                        <p className="text-sm text-red-500">{form.formState.errors.blogContent.message}</p>
                                    )}
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className='w-full'
                                disabled={blogMutation.isPending}
                            >
                                {blogMutation.isPending ? 'Guardando...' : 'Guardar'}
                            </Button>
                        </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </div>
    )
}

export default AddBlog