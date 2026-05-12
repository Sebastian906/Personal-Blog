import { RouteSignIn } from '@/helpers/RouteName'
import { useUserStore } from '@/store/useUserStore'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const OnlyAdminAllowed = () => {

    const user = useUserStore((state) => state.user)
    const isLogginIn = useUserStore((state) => state.isLogginIn)

    if (isLogginIn && user?.role === 'admin') {
        return (
            <Outlet />
        )
    } else {
        return <Navigate to={RouteSignIn} />
    }
}

export default OnlyAdminAllowed