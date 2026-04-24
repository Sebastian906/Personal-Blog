import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from 'react-icons/fc'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/helpers/firebase'
import { RouteIndex } from '@/helpers/RouteName'
import { getEnv } from '@/helpers/getEnv'
import { showToast } from '@/helpers/showToast'
import { useNavigate } from 'react-router-dom'

const GoogleLogin = () => {

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const googleResponse = await signInWithPopup(auth, provider)
            const user = googleResponse.user
            const bodyData = {
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL
            }
            const response = await fetch(`${getEnv('VITE_BASE_API_URL')}/auth/google-login`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(bodyData)
            })
            const data = await response.json()
            if (!response.ok) {
                return showToast('error', data.message)
            }
            showToast('success', data.message)
            navigate(RouteIndex)
        } catch (error) {
            showToast('error', error.message)
        }
    }

    return (
        <Button variant='outline' className='w-full' onClick={handleLogin}>
            <FcGoogle />
            Continuar con Google
        </Button>
    )
}

export default GoogleLogin