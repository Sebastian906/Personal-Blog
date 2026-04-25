import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Card } from '@/components/ui/card'
import { Link, useNavigate } from 'react-router-dom'
import { RouteSignIn } from '@/helpers/RouteName'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import GoogleLogin from '@/components/GoogleLogin'
import { useMutation } from '@tanstack/react-query'

const formSchema = z.object({
    name: z.string().min(3, 'El nombre debe ser de al menos 3 caracteres.'),
    email: z.string().email(),
    password: z.string().min(8, 'La contraseña debe ser de al menos 8 caracteres.'),
    confirmPassword: z.string().min(8, 'La confirmación debe tener al menos 8 caracteres.'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
})

const SignUp = () => {
    const navigate = useNavigate()

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    })

    const registerMutation = useMutation({
        mutationFn: async (values) => {
            const response = await fetch(`${getEnv('VITE_BASE_API_URL')}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            return data
        },
        onSuccess: (data) => {
            showToast('success', data.message)
            navigate(RouteSignIn)
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })

    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <Card className='w-100 p-4'>
                <h1 className='text-2xl font-bold text-center mb-5'>Crear Cuenta</h1>
                <div>
                    <GoogleLogin />
                    <div className='border my-5 flex justify-center items-center'>
                        <span className='absolute bg-white'>O</span>
                    </div>
                </div>
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) => registerMutation.mutate(values))}
                        className="w-full max-w-sm space-y-4"
                    >
                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium">Nombre</label>
                            <Input
                                {...form.register("name")}
                                placeholder="Ingrese su nombre"
                            />
                            {form.formState.errors.name && (
                                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                {...form.register("email")}
                                placeholder="Ingrese su correo electrónico"
                            />
                            {form.formState.errors.email && (
                                <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium">Contraseña</label>
                            <Input
                                type="password"
                                {...form.register("password")}
                                placeholder="Ingrese su contraseña"
                            />
                            {form.formState.errors.password && (
                                <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                            )}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium">Confirmar Contraseña</label>
                            <Input
                                type="password"
                                {...form.register("confirmPassword")}
                                placeholder="Confirme su contraseña"
                            />
                            {form.formState.errors.confirmPassword && (
                                <p className="text-sm text-red-500">{form.formState.errors.confirmPassword.message}</p>
                            )}
                        </div>
                        <div className='mt-5'>
                            <Button
                                type="submit"
                                className='w-full'
                                disabled={registerMutation.isPending}
                            >
                                {registerMutation.isPending ? 'Creando cuenta...' : 'Crear Cuenta'}
                            </Button>
                            <div className='mt-3 text-sm flex justify-center items-center gap-2'>
                                <p>¿Ya tienes una cuenta?</p>
                                <Link className='text-blue-500 hover:underline' to={RouteSignIn}>Inicia sesión aquí</Link>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}

export default SignUp