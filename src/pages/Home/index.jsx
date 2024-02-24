import homeCss from "./home.module.css"

import Card from "../../components/Card";
import { useVenuesStore } from "../../store"
import { useEffect } from "react";

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import { shallow } from "zustand/shallow";

const loginSchema = yup
.object({
    searchString: yup
        .string(),
})
.required()

export default () => {
    const {displayVenues, lastPage, getVenues, moreVenues, searchForVenues, searchError} = useVenuesStore((state) => ({
        displayVenues: state.displayVenues,
        lastPage: state.lastPage,
        getVenues: state.getVenues,
        moreVenues: state.moreVenues,
        searchForVenues: state.searchForVenues,
        searchError: state.searchError
        }),
        shallow
    );

    useEffect(() => {console.log(displayVenues)}, [displayVenues])
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm ({
        resolver: yupResolver(loginSchema)
    })

    useEffect(() => {
        getVenues()
        document.title = 'Holidaze'
    }, [])

    return (
        <>  
            <form className={homeCss.search} onSubmit={handleSubmit(searchForVenues)}>
                <label className={homeCss.searchLabel} htmlFor="searchBox" hidden>Search by Name</label>
                <input className={homeCss.searchInput} type="search" id="searchBox" {...register('searchString')} />
                <span className={homeCss.searchError}>{errors.searchString?.message}{searchError ? `\n${searchError}` : ''}</span>
                <input className={homeCss.searchSubmit} type="submit" value="search" />
            </form>
            <section className={homeCss.venuesSection}>
                { searchError ? (<></>) : displayVenues.map((venue) => Card(venue)) }
            </section>
            <button onClick={() => {if (!lastPage) {moreVenues()}}} className="primary" disabled={lastPage}>next page</button>
        </>
    )
}