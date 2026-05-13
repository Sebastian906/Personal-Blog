import React from 'react'
import { Link } from 'react-router-dom'
import { RouteIndex } from '@/helpers/RouteName'
import { TbError404 } from 'react-icons/tb'

const NotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center'>
            <TbError404 size={100} className='text-violet-400 dark:text-violet-500' />
            <div className='flex flex-col gap-2'>
                <h1 className='text-3xl font-bold dark:text-slate-100'>
                    Página no encontrada
                </h1>
                <p className='text-gray-500 dark:text-slate-400 max-w-sm'>
                    La URL que ingresaste no corresponde a ninguna página existente.
                    Puede que tenga un error de escritura.
                </p>
            </div>
            <Link
                to={RouteIndex}
                className='bg-violet-500 hover:bg-violet-600 text-white font-medium px-6 py-2 rounded-full transition-colors'
            >
                Volver al inicio
            </Link>
        </div>
    )
}

export default NotFound