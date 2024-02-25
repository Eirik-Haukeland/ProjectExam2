import cssSearch from "./search.module.css"

import { useVenuesStore } from "../../stores/useVenueListStore/index.js"

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

export default function Search() {
    const {searchForVenues, searchError, searchText} = useVenuesStore((state) => ({
        searchForVenues: state.searchForVenues,
        searchError: state.searchError,
        searchText: state.searchText
        }),
        shallow
    );
        
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm ({
        resolver: yupResolver(loginSchema)
    })
    
    return (
        <form className={cssSearch.search} onSubmit={handleSubmit(searchForVenues)}>
            <label className={cssSearch.searchLabel} htmlFor="searchBox" hidden>Search by Name</label>
            <input className={cssSearch.searchInput} defaultValue={searchText} type="search" id="searchBox" {...register('searchString')} />
            <span className={cssSearch.searchError}>{errors.searchString?.message}{searchError ? `\n${searchError}` : ''}</span>
            <button type="submit" className={`${cssSearch.searchSubmit} primary`}>Submit</button>
        </form>
    )
}