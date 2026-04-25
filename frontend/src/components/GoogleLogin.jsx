import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from 'react-icons/fc'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/helpers/firebase'
import { RouteIndex } from '@/helpers/RouteName'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useUserStore } from '@/store/useUserStore'

const GoogleLogin = () => {
    const navigate = useNavigate()
    const setUser = useUserStore((state) => state.setUser)

    const googleMutation = useMutation({
        mutationFn: async () => {
            const googleResponse = await signInWithPopup(auth, provider)
            const user = googleResponse.user
            const response = await fetch(`${getEnv('VITE_BASE_API_URL')}/auth/google-login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    name: user.displayName,
                    email: user.email,
                    avatar: user.photoURL,
                }),
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
        <Button
            variant='outline'
            className='w-full'
            onClick={() => googleMutation.mutate()}
            disabled={googleMutation.isPending}
        >
            <FcGoogle />
            {googleMutation.isPending ? 'Conectando...' : 'Continuar con Google'}
        </Button>
    )
}

export default GoogleLogin