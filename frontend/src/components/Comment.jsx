import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { FaComments } from 'react-icons/fa'
import { Button } from './ui/button'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Textarea } from './ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { useUserStore } from '@/store/useUserStore'
import { Link } from 'react-router-dom'
import { RouteSignIn } from '@/helpers/RouteName'
import CommentList from './CommentList'

const formSchema = z.object({
    comment: z.string().min(8, 'El comentario debe ser de al menos 8 caracteres.')
})

const Comment = ({ props }) => {
    const [ newComment, setNewComment ] = useState()
    const isLogginIn = useUserStore((state) => state.isLogginIn)
    const currentUser = useUserStore((state) => state.user)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { comment: '' },
    })

    const commentMutation = useMutation({
        mutationFn: async (values) => {
            const newValues = { ...values, blogId: props?.blogId, author: currentUser._id }
            const response = await fetch(`${getEnv('VITE_BASE_API_URL')}/comment/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(newValues),
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            return data
        },
        onSuccess: (data) => {
            setNewComment(data.comment)
            form.reset()
            showToast('success', data.message)
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })

    return (
        <div>
            <h4 className='flex items-center gap-2 text-2xl font-bold dark:text-slate-100'>
                <FaComments className='text-violet-500' /> Comentarios
            </h4>
            {isLogginIn ?
                <FormProvider {...form}>
                    <form
                        onSubmit={form.handleSubmit((values) => commentMutation.mutate(values))}
                        className="w-full space-y-4 mt-4"
                    >
                        <div className='flex flex-col gap-2'>
                            <label className="text-sm font-medium dark:text-slate-100">Comentario</label>
                            <Textarea
                                {...form.register('comment')}
                                placeholder="Escribe tu comentario aquí..."
                                className='dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-400'
                            />
                            {form.formState.errors.comment && (
                                <p className="text-sm text-red-500">{form.formState.errors.comment.message}</p>
                            )}
                        </div>
                        <Button type="submit" disabled={commentMutation.isPending} className='dark:bg-violet-500 dark:hover:bg-violet-600'>
                            {commentMutation.isPending ? 'Guardando...' : 'Publicar'}
                        </Button>
                    </form>
                </FormProvider>
                :
                <div className='mt-4'>
                    <Button asChild>
                        <Link to={RouteSignIn}>Iniciar Sesión para comentar</Link>
                    </Button>
                </div>
            }
            <div className='mt-5'>
                <CommentList props={{ blogId: props.blogId, newComment }} />
            </div>
        </div>
    )
}

export default Comment