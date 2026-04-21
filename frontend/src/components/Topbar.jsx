import React from 'react'
import logo from '@/assets/images/logo.png'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { MdLogin } from 'react-icons/md'
import SearchBox from './SearchBox'
import { RouteSignIn } from '@/helpers/RouteName'

const Topbar = () => {
    return (
        <div className='flex justify-between items-center h-16 fixed w-full z-20 px-5 border-b bg-slate-100'>
            <div>
                <img src={logo} alt="Logo" />
            </div>
            <div className='w-125'>
                <SearchBox />
            </div>
            <div>
                <Button asChild className='rounded-full h-10'>
                    <Link to={RouteSignIn}>
                        <MdLogin />
                        Iniciar Sesión
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default Topbar