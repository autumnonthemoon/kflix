import { createContext, useEffect, useState, useContext } from "react";

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(() =>{
        const saved = localStorage.getItem('theme')
        return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    })

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    },[theme])

    return <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
    </ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)