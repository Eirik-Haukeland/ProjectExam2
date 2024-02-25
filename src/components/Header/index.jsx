import { Link } from "react-router-dom"
import HeaderCss from "./header.module.css"
import useUserStore from "../../stores/useUserStore/index.js"
import { shallow } from "zustand/shallow"

export default () => {

    const {openModule, isLoggedIn, logout} = useUserStore(status => ({
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
                <Link to="/">Home</Link>
                {
                    isLoggedIn
                    ?   (<>
                            <Link to="/profile">Profile page</Link>
                            <Link to="/" onClick={logout}>Logout</Link>
                        </>)
                    :   (<>
                            <Link onClick={authModuleOpener}>Login</Link>
                            <Link onClick={authModuleOpener}>Register</Link>
                        </>)    
                }
            </nav>
        </header>
    )
}