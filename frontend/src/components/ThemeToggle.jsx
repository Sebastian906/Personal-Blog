import React from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useThemeStore } from '@/store/useThemeStore'

const ThemeToggle = () => {
    const isDark = useThemeStore((state) => state.isDark)
    const toggleTheme = useThemeStore((state) => state.toggleTheme)

    return (
        <button
            type='button'
            onClick={toggleTheme}
            aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className='flex items-center justify-center w-9 h-9 rounded-full border border-border bg-transparent hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-foreground'
        >
            {isDark
                ? <MdLightMode size={20} />
                : <MdDarkMode size={20} />
            }
        </button>
    )
}

export default ThemeToggle