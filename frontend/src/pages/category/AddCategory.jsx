import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { resolveIcon } from '@/helpers/resolveIcon'
import z from 'zod'
import slugify from 'slugify'

const ICON_OPTIONS = [
    { name: 'FaCode', label: 'Fundamentos de Programación' },
    { name: 'GrCycle', label: 'Técnicas de Programación' },
    { name: 'GrCube', label: 'Prog. Orientada a Objetos' },
    { name: 'TbCodeDots', label: 'Lenguajes de Programación' },
    { name: 'TbBinaryTree', label: 'Estructuras de Datos' },
    { name: 'BsServer', label: 'Bases de Datos Relacionales' },
    { name: 'GiStack', label: 'Bases de Datos No Relacionales' },
    { name: 'PiTreeView', label: 'Administración de BD' },
    { name: 'FaLaptopCode', label: 'Desarrollo Frontend' },
    { name: 'FaServer', label: 'Desarrollo Backend' },
    { name: 'FaCodeBranch', label: 'Fundamentos de Ing. de Software' },
    { name: 'GiCubeforce', label: 'Arquitectura de Software' },
    { name: 'FaCheckToSlot', label: 'Calidad en el Desarrollo' },
    { name: 'GrCloudSoftware', label: 'DevSecOps' },
    { name: 'AiFillCode', label: 'Sistemas Operativos' },
    { name: 'FaHexagonNodes', label: 'Análisis y Diseño de Algoritmos' },
    { name: 'FaCodepen', label: 'HPC y Prog. Concurrente' },
]

const formSchema = z.object({
    name: z.string().min(3, 'El nombre debe ser de al menos 3 caracteres.'),
    slug: z.string().min(3, 'La ficha debe ser de al menos 3 caracteres.')
})

const AddCategory = () => {

    const [selectedIcon, setSelectedIcon] = useState(null)

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

    const categoryMutation = useMutation({
        mutationFn: async (values) => {
            const response = await fetch(`${getEnv('VITE_BASE_API_URL')}/category/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, icon: selectedIcon }),
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            return data
        },
        onSuccess: (data) => {
            form.reset()
            setSelectedIcon(null)
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
                                    placeholder="Ingrese la categoria"
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
                            <div className='flex flex-col gap-2'>
                                <label className="text-sm font-medium">
                                    Ícono{' '}
                                    <span className="text-muted-foreground text-xs">(opcional)</span>
                                </label>
                                <div className='grid grid-cols-6 gap-2'>
                                    {ICON_OPTIONS.map(({ name, label }) => (
                                        <button
                                            key={name}
                                            type="button"
                                            title={label}
                                            onClick={() => setSelectedIcon(prev => prev === name ? null : name)}
                                            className={`flex flex-col items-center gap-1 p-2 rounded-md border text-xs transition-colors ${selectedIcon === name
                                                    ? 'bg-primary text-primary-foreground border-primary'
                                                    : 'bg-white border-border hover:bg-slate-200'
                                                }`}
                                        >
                                            {resolveIcon(name, { size: 20 })}
                                        </button>
                                    ))}
                                </div>
                                {selectedIcon && (
                                    <p className="text-xs text-muted-foreground">
                                        Seleccionado:{' '}
                                        <code className="bg-slate-200 px-1 rounded">{selectedIcon}</code>
                                        {' — '}{ICON_OPTIONS.find(i => i.name === selectedIcon)?.label}
                                    </p>
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

export default AddCategory