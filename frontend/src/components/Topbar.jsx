import React, { useState } from 'react'
import logo from '@/assets/images/logo.png'
import logoDark from '@/assets/images/logo-dark.png'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { MdLogin } from 'react-icons/md'
import SearchBox from './SearchBox'
import { RouteAddBlog, RouteIndex, RouteProfile, RouteSignIn } from '@/helpers/RouteName'
import { useUserStore } from '@/store/useUserStore'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import usericon from '@/assets/images/user.png'
import { FaRegUser } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa6'
import { IoLogOutOutline } from 'react-icons/io5'
import { useMutation } from '@tanstack/react-query'
import { showToast } from '@/helpers/showToast'
import { getEnv } from '@/helpers/getEnv'
import { IoMdSearch } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import { useSidebar } from './ui/sidebar'
import ThemeToggle from './ThemeToggle'
import { useThemeStore } from '@/store/useThemeStore'

const Topbar = () => {

    const [showSearch, setShowSearch] = useState(false)
    const { toggleSidebar } = useSidebar()
    const user = useUserStore((state) => state.user)
    const isLogginIn = useUserStore((state) => state.isLogginIn)
    const navigate = useNavigate()
    const isDark = useThemeStore((state) => state.isDark)

    const removeUser = useUserStore((state) => state.removeUser)

    const handleLogout = useMutation({
        mutationFn: async () => {
            const response = await fetch(`${getEnv('VITE_BASE_API_URL')}/auth/logout`, {
                method: 'GET',
                credentials: 'include',
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message)
            return data
        },
        onSuccess: (data) => {
            removeUser()
            showToast('success', data.message)
            navigate(RouteIndex)
        },
        onError: (error) => {
            showToast('error', error.message)
        },
    })

    const toggleSearch = () => {
        setShowSearch(!showSearch)
    }

    return (
        <div className='flex justify-between items-center h-16 fixed w-full z-20 px-5 border-b bg-slate-100 dark:bg-slate-900 dark:border-slate-700'>
            <div className='flex justify-center items-center gap-2'>
                <button
                    type='button'
                    className='md:hidden'
                    onClick={toggleSidebar}
                >
                    <AiOutlineMenu size={25} className='dark:text-slate-100' />
                </button>
                <Link to={RouteIndex}>
                    <img
                        src={isDark ? logoDark : logo}
                        alt="Logo"
                        className='md:w-auto w-48'
                    />
                </Link>
            </div>
            <div className='w-125'>
                <div className={`md:relative md:block absolute bg-slate-100 dark:bg-slate-900 left-0 w-full md:top-0 top-10 md:p-3.5 p-4 border-b border-slate-300 dark:border-slate-700 ${showSearch ? 'block' : 'hidden'}`}>
                    <SearchBox />
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <button
                    onClick={toggleSearch}
                    type='button'
                    className='md:hidden block dark:text-slate-100'
                >
                    <IoMdSearch size={25} />
                </button>
                <ThemeToggle />
                {!isLogginIn ?
                    <Button asChild className='rounded-full h-10'>
                        <Link to={RouteSignIn}>
                            <MdLogin />
                            Iniciar Sesión
                        </Link>
                    </Button>
                    : <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="!after:border-transparent bg-slate-100 dark:bg-slate-900 hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer">
                                    <Avatar variant="muted">
                                        <AvatarImage src={user.avatar || usericon} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="flex flex-col gap-1 py-2">
                                        <p className="font-semibold truncate">{user.name}</p>
                                        <p className='text-xs text-gray-600 dark:text-gray-400 truncate'>{user.email}</p>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild className='cursor-pointer'>
                                        <Link to={RouteProfile}>
                                            <FaRegUser className='mr-2' />
                                            <span>Perfil</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className='cursor-pointer'>
                                        <Link to={RouteAddBlog}>
                                            <FaPlus className='mr-2' />
                                            <span>Crear Blog</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild className='cursor-pointer'>
                                        <button onClick={() => handleLogout.mutate()} className='w-full text-left flex items-center'>
                                            <IoLogOutOutline color='red' className='mr-2' />
                                            <span className='text-red-600'>Cerrar Sesión</span>
                                        </button>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                }
            </div>
        </div>
    )
}

export default Topbar