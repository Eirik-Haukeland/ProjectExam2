import { Link } from "react-router-dom"
import HeaderCss from "./header.module.css"

export default () => {
    return (
        <header className={HeaderCss.headerContainer}>
            <Link className={HeaderCss.logo}>Holidaze</Link>

            <nav className={HeaderCss.menu}>
                <Link>login</Link>
                <Link>register</Link>
                <Link>home</Link>
            </nav>
        </header>
    )
}