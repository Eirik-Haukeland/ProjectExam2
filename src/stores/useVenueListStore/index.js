import { createWithEqualityFn } from "zustand/traditional"

export const useVenuesStore = createWithEqualityFn((set, get) => ({
    allVenues: [],
    searchVenues: [],
    searchError: '',
    searchText: '',
    displayVenues: [],
    offset: 0,
    limit: 12,
    lastPage: false,
    venueListErrors: '',
    clearVenues: set({
        displayVenues: [],
        offset: 0,
        lastPage: false
    }),
    getVenues: async () => {
        const moreVenues = get().moreVenues
        try {
            if (get().allVenues.length > 0) {
                return
            }

            const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues?limit=100`)

            if (!response.ok) {
                throw new Error()
            }
            
            const json = await response.json()

            set({
                allVenues: json,
                offset: 0
            })
            

            moreVenues()
        } catch (error) {
            set(({venueListErrors: 'an error occured when trying to get venues. pleace try again'}))
        }
    },
    moreVenues: () => {
        const limit = get().limit
        const offset = get().offset
        const allVenues = get().allVenues
        const searchVenues = get().searchVenues

        let venueList = allVenues
        if (searchVenues.length >= 1) {
            venueList= searchVenues
        }

        const nextVenues = venueList.slice(offset, offset + limit)

        if (nextVenues.length < limit) {
            set((state) => ({
                lastPage: true,
                displayVenues: [...state.displayVenues, ...nextVenues]
            }))
        } else {
            set((state) => ({ 
                offset: state.offset + limit,
                displayVenues: [...state.displayVenues, ...nextVenues]
            }))
        }
    },
    searchForVenues: ({searchString}) => {
        const allVenues = get().allVenues

        const searchRegex = RegExp(searchString.toLowerCase())
        const searchResult = allVenues.filter(({name}) => searchRegex.test(name.toLowerCase()))
        const searchError = searchResult.length >= 1 || searchString.length < 1 ? '' : 'there is no venue matching search'
        
        set({
            searchText: searchString,
            searchVenues: searchResult,
            displayVenues: [],
            searchError: searchError,
            offset: 0,
            lastPage: false,
            lastpage: searchResult > get().limit
        })
        
        const moreVenues = get().moreVenues
        moreVenues()
    }
}))

