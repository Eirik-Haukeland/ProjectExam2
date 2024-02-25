import homeCss from "./home.module.css"

import Card from "../../components/Card";
import Search from "../../components/Search/index.jsx";
import { useVenuesStore } from "../../stores/useVenueListStore/index.js"
import { useEffect } from "react";

import { shallow } from "zustand/shallow";

export default () => {
    const {displayVenues, lastPage, getVenues, moreVenues } = useVenuesStore((state) => ({
        displayVenues: state.displayVenues,
        lastPage: state.lastPage,
        getVenues: state.getVenues,
        moreVenues: state.moreVenues,
        }),
        shallow
    );

    useEffect(() => {
        getVenues()
        document.title = 'Holidaze'
    }, [])

    return (
        <>  
            <Search />
            <section className={homeCss.venuesSection}>
                { displayVenues.map((venue) => Card(venue)) }
            </section>
            <button onClick={() => {if (!lastPage) {moreVenues()}}} className="primary" disabled={lastPage}>next page</button>
        </>
    )
}