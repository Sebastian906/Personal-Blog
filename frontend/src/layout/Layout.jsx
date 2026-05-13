import AppSidebar from '@/components/AppSidebar'
import Footer from '@/components/Footer'
import Topbar from '@/components/Topbar'
import ThemeProvider from '@/components/ThemeProvider'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <ThemeProvider>
            <SidebarProvider>
                <Topbar />
                <AppSidebar />
                <main className='w-full dark:bg-slate-900'>
                    <div className='w-full min-h-[calc(100vh-45px)] py-28 px-10'>
                        <Outlet />
                    </div>
                    <Footer />
                </main>
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default Layout