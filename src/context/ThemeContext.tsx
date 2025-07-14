import { createContext, useEffect, useState, useContext, useMemo } from "react";

type Theme = "light" | "dark"

interface ThemeContextTypes {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextTypes | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {

        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme") as Theme | null
            if (saved) return saved
            const prefersDark = (window.matchMedia("(prefers-color-scheme: dark)").matches)
            return prefersDark ? "dark" : "light"
        }

        return "light"
    })

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
        localStorage.setItem("theme", theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => prev === "light" ? "dark" : "light")
    }

    const values = useMemo(() => {
        return { theme, toggleTheme }
    }, [theme])

    return <ThemeContext.Provider value={values}>
        {children}
    </ThemeContext.Provider>
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error("use only in context")
    return context
}