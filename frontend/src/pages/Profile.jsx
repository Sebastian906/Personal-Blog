import { Card, CardContent } from '@/components/ui/card'
import React, { useEffect } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { FormProvider, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useUserStore } from '@/store/useUserStore'
import { useMutation } from '@tanstack/react-query'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useFetch } from '@/hooks/useFetch'
import Loading from '@/components/Loading'
import { IoCameraOutline } from 'react-icons/io5'

const formSchema = z.object({
    name: z.string().min(3, 'El nombre debe ser de al menos 3 caracteres.'),
    email: z.string().email(),
    bio: z.string().min(8, 'La sección sobre mi debe tener al menos 8 caracteres.'),
    password: z.string(),
    confirmPassword: z.string()
})

const Profile = () => {

    const currentUser = useUserStore((state) => state.user)

    const { data: userData, loading, error } = useFetch(`${getEnv('VITE_BASE_API_URL')}/users/get-user/${currentUser?._id || currentUser?.user?._id}`,
        { method: 'GET', credentials: 'include' }
    )

    const setUser = useUserStore((state) => state.setUser)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { name: '', email: '', bio: '', password: '', confirmPassword: '' },
    })

    useEffect(() => {
        if (userData && userData.success) {
            form.reset({
                name: userData.user.name,
                email: userData.user.email,
                bio: userData.user.bio || '',
            })
        }
    }, [userData])

    const loginMutation = useMutation({
        mutationFn: async (values) => {
            const response = await fetch(`${getEnv('VITE_BASE_API_URL')}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values),
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            return data
        },
        onSuccess: (data) => {
            setUser(data.user)
            showToast('success', data.message)
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })

    if (loading) return <Loading />

    return (
        <Card className='max-w-3xl mx-auto bg-slate-100'>
            <CardContent>
                <div className='flex justify-center items-center mt-10'>
                    <Avatar className='w-28 h-28 relative group'>
                        <AvatarImage src={userData?.user?.avatar || currentUser?.avatar} alt={currentUser?.name} />
                        <AvatarFallback className='text-2xl font-bold'>
                            {currentUser?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                        <div className='absolute z-50 w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center bg-black bg-opacity-20 border-2 border-violet-500 rounded-full group-hover:flex hidden cursor-pointer'>
                            <IoCameraOutline color='#7c3aed'/>
                        </div>
                    </Avatar>
                </div>
                <div>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit((values) => loginMutation.mutate(values))}>
                            <div className='mb-3'>
                                <label className="text-sm font-medium">Nombre</label>
                                <Input {...form.register("name")} placeholder="Ingrese su nombre" />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label className="text-sm font-medium">Email</label>
                                <Input {...form.register("email")} placeholder="Ingrese su correo electrónico" />
                                {form.formState.errors.email && (
                                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label className="text-sm font-medium">Sobre mí</label>
                                <Textarea {...form.register("bio")} placeholder="Cuéntanos sobre ti" />
                                {form.formState.errors.bio && (
                                    <p className="text-sm text-red-500">{form.formState.errors.bio.message}</p>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label className="text-sm font-medium">Contraseña</label>
                                <Input type="password" {...form.register("password")} placeholder="Ingrese su contraseña" />
                                {form.formState.errors.password && (
                                    <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label className="text-sm font-medium">Confirmar Contraseña</label>
                                <Input type="password" {...form.register("confirmPassword")} placeholder="Confirme su contraseña" />
                                {form.formState.errors.confirmPassword && (
                                    <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
                                )}
                            </div>
                            <Button type="submit" className='w-full' disabled={loginMutation.isPending}>
                                Guardar Cambios
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </CardContent>
        </Card>
    )
}

export default Profile