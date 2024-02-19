import { Link } from "react-router-dom"
import HeaderCss from "./header.module.css"
import { useAuthenticationInfromation } from '../../store.js'
import { shallow } from "zustand/shallow"

export default () => {

    const {openModule, isLoggedIn, logout} = useAuthenticationInfromation(status => ({
        openModule: status.openModule,
        isLoggedIn: status.isLoggedIn,
        logout: status.logout
    }), shallow)

    

    const moduleOpener = (e) => {
        e.prevetDefault

        const {target: {innerText: modulePage}} = e
        openModule(modulePage)
    }

    return (
        <header className={HeaderCss.headerContainer}>
            <Link to="/" className={HeaderCss.logo}>Holidaze</Link>

            <nav className={HeaderCss.menu}>
                {
                    isLoggedIn
                    ?   (<>
                            <Link to="/" onClick={logout}>logout</Link>
                            <Link to="/profile">profile page</Link>
                        </>)
                    :   (<>
                            <Link onClick={moduleOpener}>login</Link>
                            <Link onClick={moduleOpener}>register</Link>
                        </>)    
                }
                <Link to="/">home</Link>
            </nav>
        </header>
    )
}