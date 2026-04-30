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
import { GoDot } from 'react-icons/go'
import { RouteCategoryDetails } from '@/helpers/RouteName'

const AppSidebar = () => {
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
                                <Link to="">
                                    <FaBlog />
                                    <span>Blogs</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="">
                                    <FaRegComment />
                                    <span>Comentarios</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="">
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
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link to="">
                                    <GoDot />
                                    <span>Item</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar