import { JSX } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavPropsTypes {
    show: boolean
}

export default function Nav(props: NavPropsTypes): JSX.Element {
    const { show } = props
    const location = useLocation()

    return <nav className={`nav ${(show || location.pathname.indexOf('details') >= 0) && "nav_black"}`}>
        <ul>
            <li><Link to="/"><h3 className="logo">KFlix &#x2764;</h3></Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><Link to="/search"><div className="search-icon"></div></Link></li>
        </ul>
    </nav>
}