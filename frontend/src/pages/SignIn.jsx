import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import { useMutation } from '@tanstack/react-query'
import { useUserStore } from '@/store/useUserStore'
import GoogleLogin from '@/components/GoogleLogin'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Se requiere la contraseña obligatoriamente.'),
})

const SignIn = () => {
    const navigate = useNavigate()
    const setUser = useUserStore((state) => state.setUser)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', password: '' },
    })

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
            navigate(RouteIndex)
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })

    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <Card className='w-100 p-4'>
                <h1 className='text-2xl font-bold text-center mb-5'>Iniciar Sesión</h1>
                <div>
                    <GoogleLogin />
                    <div className='border my-5 flex justify-center items-center'>
                        <span className='absolute bg-white'>O</span>
                    </div>
                </div>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit((values) => loginMutation.mutate(values))} className="w-full max-w-sm space-y-4">
                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium">Email</label>
                            <Input {...form.register("email")} placeholder="Ingrese su correo electrónico" />
                            {form.formState.errors.email && (
                                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium">Contraseña</label>
                            <Input type="password" {...form.register("password")} placeholder="Ingrese su contraseña" />
                            {form.formState.errors.password && (
                                <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                            )}
                        </div>
                        <div className='mt-5'>
                            <Button type="submit" className='w-full' disabled={loginMutation.isPending}>
                                {loginMutation.isPending ? 'Ingresando...' : 'Ingresar'}
                            </Button>
                            <div className='mt-3 text-sm flex justify-center items-center gap-2'>
                                <p>¿No tienes una cuenta?</p>
                                <Link className='text-blue-500 hover:underline' to={RouteSignUp}>Registrate aquí</Link>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}

export default SignIn