import { JSX, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import './Nav.scss'
import { useTheme } from "../context/ThemeContext";

interface NavPropsTypes {
    show: boolean
}

export default function Nav(props: NavPropsTypes): JSX.Element {
    const { show } = props
    const location = useLocation()
    const { theme, setTheme } = useTheme()
    const [showMenu, setShowMenu] = useState<boolean>(false)

    const toggleMenu = () => {
        setShowMenu((prev) => !prev)
    }

    return <nav className={`nav ${(show || location.pathname.indexOf("details") >= 0 || location.pathname.indexOf("favorites") >= 0 || location.pathname.indexOf("search") >= 0) && "nav-bg"} ${showMenu ? 'show-mobile-menu' : ''}`}>
        <ul>
            <li  onClick={toggleMenu}><Link to="/"><h3 className="logo">KFlix &#x2764;</h3></Link></li>
            <li  onClick={toggleMenu}><Link to="/favorites">Favorites</Link></li>
            <li  onClick={toggleMenu}><Link to="/search"><div className="search-icon"></div></Link></li>
            <li className="close"><div className="close-button" onClick={() => setShowMenu((prev) => !prev)}></div></li>
        </ul>

        <div className="right">
            <div className="hamburger-menu" onClick={toggleMenu}></div>

            <div className="toggle-mode">
                <input type="checkbox" name="toggle" id="toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} checked={theme === 'light' ? true : false} />
                <label htmlFor="toggle">
                    <div className="light-icon"></div>
                    <div className="dark-icon"></div>
                </label>
            </div>
        </div>
    </nav>
}