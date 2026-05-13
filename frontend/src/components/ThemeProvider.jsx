import { useEffect } from 'react'
import { useThemeStore } from '@/store/useThemeStore'

const ThemeProvider = ({ children }) => {
    const isDark = useThemeStore((state) => state.isDark)

    useEffect(() => {
        const root = document.documentElement
        if (isDark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [isDark])

    return children
}

export default ThemeProvider