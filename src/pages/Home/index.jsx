import homeCss from "./home.module.css"

import Card from "../../components/Card";
import { useVenuesStore } from "../../store"
import { useEffect } from "react";
import { shallow } from "zustand/shallow";

export default () => {
    const {venues, lastPage, getVenues, clearVenues} = useVenuesStore((state) => ({
        venues: state.venues,
        lastPage: state.lastPage,
        getVenues: state.getVenues,
        clearVenues: state.clearVenues
        }),
        shallow
    );
    
    useEffect(() => {
        clearVenues()
        getVenues()
    }, [])

    return (
        <>  
            <section className={homeCss.venuesSection}>
                { venues.map((venue) => Card(venue)) }
            </section>
            <button onClick={() => {if (!lastPage) {getVenues()}}} disabled={lastPage}>next page</button>
        </>
    )
}