import './GlobalStyles.scss'
import { useState, createContext, useEffect } from "react"

export const ThemeContext = createContext()

function GlobalStyles({ children }) {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('theme')
        return storedTheme ? JSON.parse(storedTheme) : 'dark'
    })

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme))
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    }

    const value = {
        theme,
        toggleTheme,
    }

    return (
        <ThemeContext.Provider value={value}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export default GlobalStyles 