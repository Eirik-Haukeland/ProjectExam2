import { createWithEqualityFn } from "zustand/traditional"
import useUserStore from "../useUserStore/index.js"
import useCurrentVenueStore from "../useCurrentVenueStore/index.js"

export default createWithEqualityFn((set, get) => ({
    dateFrom: new Date(),
    dateTo: new Date(),
    guests: 1,
    venueId: "",
    numberOfDates: 1,
    bookingErrors: '',
    createABooking: async () => {
        try {
            const isLoggedIn = useUserStore.getState().isLoggedIn
            
            if (!isLoggedIn) {
                throw new Error("Please login to place a booking")
            }

            const accessToken = useUserStore.getState().accessToken
            const {dateFrom, dateTo, guests, venueId} = get()
            
            const timeStampCheck = RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
            if ( !(timeStampCheck.test(dateFrom.toISOString()) || timeStampCheck.test(dateTo.toISOString())) ) {
                throw new Error('Please select the dates you want to stay')
            }
            
            if ( guests <= 0 || guests > useCurrentVenueStore.getState().maxGuests ) {
                throw new Error(`Please select an appropriate number of guests. This venue accepts 1 - ${useCurrentVenueStore.getState().maxGuests} guests)`)
            }
            
            const response = await fetch("https://api.noroff.dev/api/v1/holidaze/bookings", 
                {
                    method: "POST",
                    body: JSON.stringify({
                        dateFrom,
                        dateTo,
                        guests,
                        venueId
                    }),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `${accessToken}`})
                })

            if (!response.ok) {
                throw new Error ('An error occured when trying make a booking. Please try again')
            }

            useCurrentVenueStore.getState().loadVenue(venueId)
        } catch (error) {
            set(({bookingErrors: error.message }))
        }
    },
    setDates: ({dateFrom, dateTo}) => {
        // milliseconds * seconds * minutes * hours
        const dayInMillisecounds = 1000 * 60 * 60 * 24 

        set(({
            dateFrom: new Date(dateFrom.valueOf() + dayInMillisecounds),
            dateTo: new Date(dateTo.valueOf() + dayInMillisecounds)
        }))

        if (dateFrom === dateTo) {
            set(({numberOfDates: 1}))
            return
        }

        let nthDate = new Date(dateFrom)
        let dateCount = 1
        
        for (let days = 0; nthDate <= dateTo; days++ && (nthDate = new Date(dateFrom.valueOf() + (dayInMillisecounds * days))) ) {
            dateCount = days +1
        }

        set(({numberOfDates: dateCount}))
    },
    clearBooking: () => set(({
        dateFrom: new Date(),
        dateTo: new Date(),
        guests: 1,
        venueId: "",
        numberOfDates: 1,
    })),
    setVenueId: (venueId) => set(({venueId})),
    setGuests: (numberOfGuests) => {
        if (numberOfGuests <= useCurrentVenueStore.getState().maxGuests) {
            set(({ guests: numberOfGuests }))
        }
    }
}))
