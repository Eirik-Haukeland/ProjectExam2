import { createWithEqualityFn } from "zustand/traditional"
import isCounty from "./utils/isCounty"

export const useErrorStore = createWithEqualityFn((set) => ({

   errors: [],
   setError: (newErrors) =>  {
        if (typeof newErrors === "string" && newErrors.trim().length > 0) {
            newErrors = [newErrors]
        }

        if (!Array.isArray(newErrors)) {
            return
        }

        set((state) => ({ errors: [...state.errors, ...newErrors.map(error => typeof error === "string")]}))
   },
   clearErrors: () => {
        set({ errors: []})
   }
}))

export const useVenuesStore = createWithEqualityFn((set, get) => ({
    venues: [],
    offset: 0,
    lastPage: false,
    clearVenues: () => set(() => ({venues: []})),
    getVenues: async () => {
        try {
            
            const limit = 12
            const offset = get().offset
            const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues?offset=${offset}&limit=${limit}`)

            if (response.ok) {
                const json = await response.json()
                set((state) => ({venues: [...state.venues, ...json]}))
                
                if (json.length < limit) {
                    set(() => ({ lastPage: true}))
                } else {
                    set((state) => ({ offset: state.offset + limit }))
                }
            } else {
                throw new Error("Something went wrong when fetching list of venues")
            }
        } catch (error) {
            console.error(error)
            useErrorStore.getState().setError(['an error occured when trying to get venues. pleace try again'])
        }
    }
}))

export const useCurrentVenue = createWithEqualityFn((set, get) => ({
    id: "",
    name: "",
    description: "",
    media: [],
    price: 0,
    maxGuests: 0,
    rating: 0,
    created: "",
    updated: "",
    hasWifi: false,
    hasParking: false,
    servesBreakfast: false,
    allowsPets: false,
    address: "",
    city: "",
    zip: "",
    country: "",
    continent: "",
    bookings: [],
    updateVenue: async (id) => {
        try {

        } catch (error) {
            useErrorStore.getState().setError(['an error occured when trying to get the venue. pleace try again'])
        }
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true`)
        
        const json =  await response.json()

        if (response.ok) {
            const { 
                id: newId,
                name: newName,
                description: newDescription,
                media: newMedia,
                price: newPrice,
                maxGuests: newMaxGuests,
                rating: newRating,
                created: newCreated,
                updated: newUpdated,
                hasWifi: newHasWifi,
                hasParking: newHasParking,
                servesBreakfast: newServesBreakfast,
                allowsPets: newAllowsPets,
                address: newAddress,
                city: newCity,
                zip: newZip,
                country: newCountry,
                continent: newContinent,
                bookings: newBookings } = json
            const { 
                id: oldId,
                name: oldName,
                description: oldDescription,
                media: oldMedia,
                price: oldPrice,
                maxGuests: oldMaxGuests,
                rating: oldRating,
                created: oldCreated,
                updated: oldUpdated,
                hasWifi: oldHasWifi,
                hasParking: oldHasParking,
                servesBreakfast: oldServesBreakfast,
                allowsPets: oldAllowsPets,
                address: oldAddress,
                city: oldCity,
                zip: oldZip,
                country: oldCountry,
                continent: oldContinent,
                bookings: oldBookings } = get()
                
            if (newId !== oldId && typeof newId === "string") { 
                set(({ id: newId }))
            }
            if (newName !== oldName && typeof newName === "string") { 
                set(({ name: newName }))
            }
            if (newDescription !== oldDescription && typeof newDescription === "string") { 
                set(({ description: newDescription }))
            }
            if (newMedia !== oldMedia && Array.isArray(newMedia)) { 
                set(({ media: newMedia }))
            }
            if (newPrice !== oldPrice && typeof newPrice === "number") { 
                set(({ price: newPrice }))
            }
            if (newMaxGuests !== oldMaxGuests && typeof newMaxGuests === "number") { 
                set(({ maxGuests: newMaxGuests }))
            }
            if (newRating !== oldRating && typeof newRating === "number") { 
                set(({ rating: newRating }))
            }
            if (newCreated !== oldCreated && typeof newCreated === "string") { 
                set(({ created: newCreated }))
            }
            if (newUpdated !== oldUpdated && typeof newUpdated === "string") { 
                set(({ updated: newUpdated }))
            }
            if (newHasWifi !== oldHasWifi && typeof newHasWifi === "boolean") { 
                set(({ hasWifi: newHasWifi }))
            }
            if (newHasParking !== oldHasParking && typeof newHasParking === "boolean") { 
                set(({ hasParking: newHasParking }))
            }
            if (newServesBreakfast !== oldServesBreakfast && typeof newServesBreakfast === "boolean") { 
                set(({ servesBreakfast: newServesBreakfast }))
            }
            if (newAllowsPets !== oldAllowsPets && typeof newAllowsPets === "boolean") { 
                set(({ allowsPets: newAllowsPets }))
            }
            if (newAddress !== oldAddress && typeof newAddress === "string") { 
                set(({ address: newAddress }))
            }
            if (newCity !== oldCity && typeof newCity === "string") { 
                set(({ city: newCity }))
            }
            if (newCountry !== oldCountry && typeof newCountry === "string" && isCounty(newCountry)) { 
                set(({ country: newCountry }))
            }
            if (newContinent !== oldContinent && typeof newContinent === "string") { 
                set(({ continent: newContinent }))
            }
            if (newZip !== oldZip && typeof newZip === "string") { 
                set(({ zip: newZip }))
            }
            if (newBookings !== oldBookings && Array.isArray(newBookings)) { 

                const bookingsToSet = newBookings.reduce((newList, booking) => {
                    if (typeof booking.dateTo === 'undefined') {
                        return newList
                    }
                    
                    const toDay = new Date()
                    const dateTo = new Date(booking.dateTo.split('T')[0])
                    // milliseconds * seconds * minutes * hours
                    const dayInMillisecounds = 1000 * 60 * 60 * 24 

                    // to get all the dates between dateFrom and dateTo on the booking
                    for (let newDate = new Date(booking.dateFrom.split('T')[0]); newDate.valueOf() <= dateTo.valueOf(); newDate = new Date(newDate.getTime() + dayInMillisecounds)) {
                        if (newDate.valueOf() > toDay.valueOf() && !newList.includes(newDate.toISOString())) {
                            newList = [...newList, newDate]
                        }
                    }
                  
                    return newList
                }, [])


                set(({ bookings: bookingsToSet }))
            }
        }
    }
}))

export const useNewBooking = createWithEqualityFn((set, get) => ({
    dateFrom: new Date(),
    dateTo: new Date(),
    guests: 1,
    venueId: "",
    numberOfDates: 1,
    createABooking: async () => {

        const [dateFrom, dateTo, guests, venueId] = get()

        const timeStampCheck = RegExp('^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$')

        if ( !(timeStampCheck.test(dateFrom) || timeStampCheck.test(dateTo)) ) {
            useErrorStore.getState().setError(['Pleace select the dates you want to stay'])
        }

        if ( guests > 0 && guests < useCurrentVenue.getState().maxGuests ) {
            useErrorStore.getState().setError([`Pleace select an apropiate number of guests. This establishment takes 1 - ${useCurrentVenue.getState().maxGuests} guests)`])
        }

        if ( venueId.length > 0 && typeof venueId === 'string' ) {
            useErrorStore.getState().setError(['an error occured when trying make a booking. pleace try again'])
        }

        const response = await fetch("https://api.noroff.dev/api/v1/holidaze/bookings", 
            {
                method: "POST",
                body: {
                    dateFrom,
                    dateTo,
                    guests,
                    venueId
                },
                headers: {
                    Authorization: `Bearer asdfasdf23asdvah2qw344aab....`
                }
            })

        if (response.ok === false) {
            useErrorStore.getState().setError(['an error occured when trying make a booking. pleace try again'])
        }

        console.warn("you are not done here: store.js: useNewBooking.createABooking")
    },
    setDates: ({dateFrom, dateTo}) => {
        set(({
            dateFrom: new Date(dateFrom),
            dateTo: new Date(dateTo)
        }))

        if (dateFrom === dateTo) {
            set(({numberOfDates: 1}))
            return
        }

        let nthDate = new Date(dateFrom)
        // milliseconds * seconds * minutes * hours
        const dayInMillisecounds = 1000 * 60 * 60 * 24 
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
        if (numberOfGuests <= useCurrentVenue.getState().maxGuests) {
            set(({ guests: numberOfGuests }))
        }
    }
}))

export const useAuthenticationInfromation = createWithEqualityFn((set, get) => ({
    id: "",
    name: "",
    email: "",
    avatar: null,
    venueManager: false,
    accessToken: "",
    formErrors: [],
    isLoggedIn: false,
    isModuleOpen: false,
    modulePageOpen: 'register',
    openModule: (modulepage) => {
        set(({
            isModuleOpen: true,
            modulePageOpen: modulepage
        }))
    },
    closeModule: () => set(({isModuleOpen: false})),
    register: (body) => {
        console.log("asdfasdf")
        console.log(body)
        
        fetch('https://api.noroff.dev/api/v1/holidaze/auth/register', {
            method: "POST",
            body
        })
        .then(response => {
            console.log(body, response)
            if (!response.ok) {
                throw new Error('something went wrong when regitering account please try again later')
            }
            
            return response.json})
        .then(json => {
            console.log('asdfasf')
            console.log(json)

            if (json.errors.length > 0) {
                json.errors.forEach(errorObj => {
                    set(status => ({
                        formErrors: [...status.formErrors, {filed: errorObj?.path[0]||"general error", errorText: errorObj.message}]
                    }))
                })

                return
            }

            set(({
                id: json.id,
                name: json.name,
                email: json.email,
                avatar: json.avatar,
                venueManager: json.venueManager,
            }))

            get().login(password) 
        })
        .catch(error => {
            set(status => ({
                formErrors: [...status.formErrors, {filed: "general error", errorText: error.message}]
            }))
        })
    },
    login: (body) => {
        fetch('https://api.noroff.dev/api/v1/holidaze/auth/login', {
            method: "POST",
            body
        })
        .then(response => {
            console.log(body)
            if (!response.ok) {
                throw new Error('something went wrong when loging in to your account please try again later')
            }
            
            return response.json})
        .then(json => {
            if (json.errors.length > 0) {
                json.errors.forEach(errorObj => {
                    set(status => ({
                        formErrors: [...status.formErrors, {filed: errorObj.path[0], errorText: errorObj.message}]
                    }))
                })
            }

            set(({
                name: json.name,
                email: json.email,
                avatar: json.avatar,
                venueManager: json.venueManager,
                accessToken: `Bearer ${json.accessToken}`
            }))
        })
        .catch(error => {
            set(status => ({
                formErrors: [...status.formErrors, {filed: "general error", errorText: error.message}]
            }))
        })
    }
}))