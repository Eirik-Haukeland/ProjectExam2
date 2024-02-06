import homeCss from "./home.module.css"

import Card from "../../components/Card";
import { useVenuesStore } from "../../store"
import { useEffect } from "react";

export default () => {
    const venues = useVenuesStore((state) => state.venues);
    const getVenues = useVenuesStore((state) => state.getVenues);
    const lastPage = useVenuesStore((store) => store.lastPage)

    useEffect(() => {getVenues()}, [])

    return (
        <>  
            <section className={homeCss.venuesSection}>
                { venues.map((venue) => Card(venue)) }
            </section>
            <button onClick={() => {if (!lastPage) {getVenues()}}} disabled={lastPage}>next page</button>
        </>
    )
}