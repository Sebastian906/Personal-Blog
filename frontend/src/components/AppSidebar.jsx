import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import logoDark from '@/assets/images/logo-dark.png'
import { IoHomeOutline } from 'react-icons/io5'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaBlog, FaRegComment } from 'react-icons/fa6'
import { LuUsers } from 'react-icons/lu'
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteIndex, RouteUsers } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getEnv'
import { resolveIcon } from '@/helpers/resolveIcon'
import { useUserStore } from '@/store/useUserStore'
import { useThemeStore } from '@/store/useThemeStore'

const AppSidebar = () => {

    const user = useUserStore((state) => state.user)
    const isLogginIn = useUserStore((state) => state.isLogginIn)
    const isDark = useThemeStore((state) => state.isDark)

    const { data: categoryData } = useFetch(`${getEnv('VITE_BASE_API_URL')}/category/all`, {
        method: 'GET',
        credentials: 'include'
    })

    const sortedCategories = categoryData?.categories?.length > 0
        ? [...categoryData.categories].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        : []

    return (
        <Sidebar>
            <SidebarHeader className='bg-slate-100 dark:bg-slate-900'>
                <img
                    src={isDark ? logoDark : logo}
                    alt="Logo"
                    width={120}
                />
            </SidebarHeader>
            <SidebarContent className='bg-slate-100 dark:bg-slate-900'>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to={RouteIndex} className='dark:text-slate-100 dark:hover:bg-slate-700'>
                                    <IoHomeOutline />
                                    <span>Inicio</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        {isLogginIn && user?.role === 'admin'
                            ? <>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link to={RouteBlog} className='dark:text-slate-100 dark:hover:bg-slate-700'>
                                            <FaBlog />
                                            <span>Blogs</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link to={RouteCommentDetails} className='dark:text-slate-100 dark:hover:bg-slate-700'>
                                            <FaRegComment />
                                            <span>Comentarios</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </>
                            :
                            <></>
                        }
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to={RouteCategoryDetails} className='dark:text-slate-100 dark:hover:bg-slate-700'>
                                    <BiCategoryAlt />
                                    <span>Categorias</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to={RouteUsers} className='dark:text-slate-100 dark:hover:bg-slate-700'>
                                    <LuUsers />
                                    <span>Usuarios</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className='dark:text-slate-400'>
                        Categorias
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {sortedCategories.length > 0 && sortedCategories.map(category => (
                            <SidebarMenuItem key={category.id}>
                                <SidebarMenuButton asChild>
                                    <Link to={RouteBlogByCategory(category.slug)} className='dark:text-slate-100 dark:hover:bg-slate-700'>
                                        {resolveIcon(category.icon)}
                                        <span>{category.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar