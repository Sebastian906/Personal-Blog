import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useFetch } from '@/hooks/useFetch'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import slugify from 'slugify'
import z from 'zod'

const formSchema = z.object({
    name: z.string().min(3, 'El nombre debe ser de al menos 3 caracteres.'),
    slug: z.string().min(3, 'La ficha debe ser de al menos 3 caracteres.'),
})

const EditCategory = () => {
    const { category_id } = useParams()

    const { data: categoryData } = useFetch(
        `${getEnv('VITE_BASE_API_URL')}/category/show/${category_id}`,
        { method: 'GET', credentials: 'include' },
        [category_id],
    )

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { name: '', slug: '' },
    })

    const nameValue = form.watch('name')

    useEffect(() => {
        if (nameValue) {
            form.setValue('slug', slugify(nameValue, { lower: true, strict: true }), {
                shouldValidate: true,
            })
        }
    }, [nameValue])

    useEffect(() => {
        if (categoryData?.category) {
            form.setValue('name', categoryData.category.name)
            form.setValue('slug', categoryData.category.slug)
        }
    }, [categoryData])

    const categoryMutation = useMutation({
        mutationFn: async (values) => {
            const response = await fetch(
                `${getEnv('VITE_BASE_API_URL')}/category/update/${category_id}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(values),
                },
            )
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            return data
        },
        onSuccess: (data) => {
            showToast('success', data.message)
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })

    return (
        <div>
            <Card className='pt-5 max-w-3xl mx-auto bg-slate-100'>
                <CardContent>
                    <FormProvider {...form}>
                        <form
                            onSubmit={form.handleSubmit((values) => categoryMutation.mutate(values))}
                            className="w-full space-y-4"
                        >
                            <div className='flex flex-col gap-2'>
                                <label className="text-sm font-medium">Nombre</label>
                                <Input
                                    {...form.register("name")}
                                    placeholder="Ingrese la categoría"
                                />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
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

export default EditCategory