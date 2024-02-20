import { Link } from "react-router-dom"
import HeaderCss from "./header.module.css"
import { useAuthenticationInfromation } from '../../store.js'
import { shallow } from "zustand/shallow"

export default () => {

    const {openModule, isLoggedIn, logout} = useAuthenticationInfromation(status => ({
        openModule: status.openModule,
        isLoggedIn: status.isLoggedIn,
        logout: status.logout,
    }), shallow)

    const authModuleOpener = (e) => {
        const {target: {innerText: modulePage}} = e
        openModule(modulePage)
    }

    return (
        <header className={HeaderCss.headerContainer}>
            <Link to="/" className={HeaderCss.logo}>Holidaze</Link>

            <nav className={HeaderCss.menu}>
                <Link to="/">home</Link>
                {
                    isLoggedIn
                    ?   (<>
                            <Link to="/profile">profile page</Link>
                            <Link to="/" onClick={logout}>logout</Link>
                        </>)
                    :   (<>
                            <Link onClick={authModuleOpener}>login</Link>
                            <Link onClick={authModuleOpener}>register</Link>
                        </>)    
                }
            </nav>
        </header>
    )
}