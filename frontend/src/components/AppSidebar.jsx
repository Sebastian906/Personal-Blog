import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import { IoHomeOutline } from 'react-icons/io5'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaBlog, FaRegComment } from 'react-icons/fa6'
import { LuUsers } from 'react-icons/lu'
import { RouteBlog, RouteBlogByCategory, RouteCategoryDetails, RouteCommentDetails, RouteUsers } from '@/helpers/RouteName'
import { useFetch } from '@/hooks/useFetch'
import { getEnv } from '@/helpers/getEnv'
import { resolveIcon } from '@/helpers/resolveIcon'

const AppSidebar = () => {

    const { data: categoryData } = useFetch(`${getEnv('VITE_BASE_API_URL')}/category/all`, {
        method: 'GET',
        credentials: 'include'
    })

    const sortedCategories = categoryData?.categories?.length > 0
        ? [...categoryData.categories].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        : []

    return (
        <Sidebar>
            <SidebarHeader className='bg-slate-100'>
                <img
                    src={logo}
                    alt="Logo"
                    width={120}
                />
            </SidebarHeader>
            <SidebarContent className='bg-slate-100'>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="">
                                    <IoHomeOutline />
                                    <span>Inicio</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to={RouteCategoryDetails}>
                                    <BiCategoryAlt />
                                    <span>Categorias</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to={RouteBlog}>
                                    <FaBlog />
                                    <span>Blogs</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to={RouteCommentDetails}>
                                    <FaRegComment />
                                    <span>Comentarios</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to={RouteUsers}>
                                    <LuUsers />
                                    <span>Usuarios</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Categorias
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {sortedCategories.length > 0 && sortedCategories.map(category => <SidebarMenuItem key={category.id}>
                            <SidebarMenuButton asChild>
                                <Link to={RouteBlogByCategory(category.slug)}>
                                    {resolveIcon(category.icon)}
                                    <span>{category.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>)}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar