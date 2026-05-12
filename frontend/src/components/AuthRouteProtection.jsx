import { RouteSignIn } from '@/helpers/RouteName'
import { useUserStore } from '@/store/useUserStore'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRouteProtection = () => {

    const isLogginIn = useUserStore((state) => state.isLogginIn)

    if (isLogginIn) {
        return (
            <Outlet />
        )
    } else {
        return <Navigate to={RouteSignIn} />
    }
}

export default AuthRouteProtection