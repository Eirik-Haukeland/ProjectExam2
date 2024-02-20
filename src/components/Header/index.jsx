import { Link } from "react-router-dom"
import HeaderCss from "./header.module.css"
import { useAuthenticationInfromation, useVenueCreateStore } from '../../store.js'
import { shallow } from "zustand/shallow"

export default () => {

    const {openModule, isLoggedIn, logout, venueManager} = useAuthenticationInfromation(status => ({
        openModule: status.openModule,
        isLoggedIn: status.isLoggedIn,
        logout: status.logout,
        venueManager: status.venueManager
    }), shallow)

    const {createVenue} = useVenueCreateStore(status => ({
        createVenue: status.createVenue
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
                <Link to="/">home</Link>
                {
                    isLoggedIn
                    ?   (<>
                            { venueManager ? (<Link onClick={createVenue}>create venue</Link>) : (<></>)}
                            <Link to="/profile">profile page</Link>
                            <Link to="/" onClick={logout}>logout</Link>
                        </>)
                    :   (<>
                            <Link onClick={moduleOpener}>login</Link>
                            <Link onClick={moduleOpener}>register</Link>
                        </>)    
                }
            </nav>
        </header>
    )
}