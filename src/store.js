import { createWithEqualityFn } from "zustand/traditional"
import { persist } from 'zustand/middleware'
import isCounty from "./utils/isCounty"

export const useVenuesStore = createWithEqualityFn((set, get) => ({
    venues: [],
    offset: 0,
    lastPage: false,
    venueListErrors: '',
    clearVenues: () => set(() => ({
        venues: [],
        offset: 0,
        lastPage: false
    })),
    getVenues: async () => {
        try {
            const limit = 12
            const offset = get().offset
            const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues?offset=${offset}&limit=${limit}`)

            if (!response.ok) {
                throw new Error()
            }
            
            const json = await response.json()
            set((state) => ({venues: [...state.venues, ...json]}))
            
            if (json.length < limit) {
                set(() => ({ lastPage: true}))
            } else {
                set((state) => ({ offset: state.offset + limit }))
            }
            
        } catch (error) {
            set(({venueListErrors: 'an error occured when trying to get venues. pleace try again'}))
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
    fetchErrors: '',
    ownerName: '',
    updateVenue: async (id) => {
        try {
            const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true`)
            const json =  await response.json()

            if (!response.ok) {
                throw new Error('problem occured when trying to get venues. plese try again later')
            }

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
                bookings: newBookings,
                owner: {name: newOwnerName} } = json
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
                bookings: oldBookings,
                ownerName: oldOwnerName } = get()
                
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
            if (newOwnerName !== oldOwnerName && typeof newOwnerName === "string") { 
                set(({ ownerName: newOwnerName }))
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
           
        } catch (error) {
            set('an error occured when trying to get the venue. pleace try again')
        }
        
    }
}))

export const useNewBooking = createWithEqualityFn((set, get) => ({
    dateFrom: new Date(),
    dateTo: new Date(),
    guests: 1,
    venueId: "",
    numberOfDates: 1,
    bookingErrors: '',
    createABooking: async () => {
        try {
            const isLoggedIn = useAuthenticationInfromation.getState().isLoggedIn
            
            if (!isLoggedIn) {
                throw new Error("Pleace login to place a booking")
            }

            const accessToken = useAuthenticationInfromation.getState().accessToken
            const {dateFrom, dateTo, guests, venueId} = get()
            
            // ensure that booking last to end of day
            const editedDateTo = new Date(`${dateTo.toISOString().split('T')[0]}T23:59:59:000Z`)

            
            const timeStampCheck = RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
            
            if ( !(timeStampCheck.test(dateFrom.toISOString()) || timeStampCheck.test(editedDateTo.toISOString())) ) {
                throw new Error('Pleace select the dates you want to stay')
            }
            
            if ( guests <= 0 || guests > useCurrentVenue.getState().maxGuests ) {
                throw new Error(`Pleace select an apropiate number of guests. This establishment takes 1 - ${useCurrentVenue.getState().maxGuests} guests)`)
            }
            
            if ( venueId.length <= 0 || typeof venueId !== 'string' ) {
                throw new Error('an error occured when trying make a booking. pleace try again')
            }
            
            const response = await fetch("https://api.noroff.dev/api/v1/holidaze/bookings", 
                {
                    method: "POST",
                    body: JSON.stringify({
                        dateFrom,
                        dateTo: editedDateTo,
                        guests,
                        venueId
                    }),
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Authorization': `${accessToken}`})
                })

            if (!response.ok) {
                throw new Error ('an error occured when trying make a booking. pleace try again')
            }

            console.warn("you are not done here: store.js: useNewBooking.createABooking")
            useCurrentVenue.updateVenue(venueId)
        } catch (error) {
            set(({bookingErrors: error.message }))
        }
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

export const useAuthenticationInfromation = createWithEqualityFn(persist((set, get) => ({
    id: "",
    name: "",
    email: "",
    avatar: null,
    venueManager: false,
    accessToken: '',
    formError: "",
    isLoggedIn: false,
    isModuleOpen: false,
    modulePageOpen: 'register',
    bookings: [],
    venues: [],
    clearErrors: () => set(({formError: ''})), 
    openModule: (modulepage) => {
        set(({
            isModuleOpen: true,
            modulePageOpen: modulepage
        }))
    },
    closeModule: () => set(({isModuleOpen: false})),
    register: async (body = {}) => {
        try {
            const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/register', {
                method: "POST",
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify(body)
            })
            const json = await response.json()
            
            if (json.errors && json.errors[0].message === "Profile already exists") {
                throw new Error(json.errors[0].message)
            }
            if (!response.ok) {
                throw new Error('something went wrong when loging in to your account please try again later')
            }

            set(({
                id: json.id,
                name: json.name,
                email: json.email,
                avatar: json.avatar,
                venueManager: json.venueManager,
            }))

            get().login({
                email: body.email,
                password: body.password
            }) 
        } catch (error) {
            set(({
                formError: error.message
            }))
        }
    },
    login: async (body) => {
        try {
            const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/login', {
                method: "POST",
                headers: new Headers({'content-type': 'application/json'}),
                body: JSON.stringify(body)
            })
            const json = await response.json()   
            
            if (json.errors && json.errors[0].message === "Invalid email or password") {
                throw new Error(json.errors[0].message)
            }
            if (!response.ok) {
                throw new Error('something went wrong when loging in to your account please try again later')
            }

            set(({
                name: json.name,
                email: json.email,
                avatar: json.avatar,
                venueManager: json.venueManager,
                accessToken: `Bearer ${json.accessToken}`,
                isLoggedIn: true
            }))
            get().closeModule()
        } catch (error) {
            console.log(error)
            set(({
                formError: error.message
            }))
        }
    },
    logout: () => set({
        id: "",
        name: "",
        email: "",
        avatar: null,
        venueManager: false,
        accessToken: "",
        isLoggedIn: false
    }),
    changeProfile: async (data, onSuccess) => {
        try {
            if (!get().accessToken.length > 0) {
                throw new Error('user is not logged in')
            }
            const errors = []
            const setItems = {};

            if (data.venueManager !== get().venueManager) {
                const response = await fetch('https://api.noroff.dev/api/v1/holidaze/profiles/test_ebh', {
                    method: "PUT",
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Authorization': `${get().accessToken}`}),
                    body: JSON.stringify({ venueManager: data.venueManager })
                })
                
                if (!response.ok) {
                    errors.push('something went wrong when updating venue manager status')
                } else {
                    const { venueManager } = await response.json()
                    setItems['venueManager'] = venueManager
                }
            }

            if (data.avatar !== (get().avatar || '') || data.removeAvatar){
                const response = await fetch('https://api.noroff.dev/api/v1/holidaze/profiles/test_ebh/media', {
                    method: "PUT",
                    headers: new Headers({
                        'content-type': 'application/json',
                        'Authorization': `${get().accessToken}`}),
                    body: JSON.stringify({ avatar: data.avatar })
                })
                
                if (!response.ok) {
                    errors.push('something went wrong when updating profile picture status')
                } else {
                    const { avatar } = await response.json()
                    setItems['avatar'] = avatar
                }
            }

            set(({ ...setItems }))
            if (errors.length > 0) {
                throw new Error(errors.join("\n"))
            }

            set(({formError: ''}))
            onSuccess()
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                set(({formError: 'something went wrong. check if you are online or try again later'}))
                return
            }


            set(({formError: error.message}))
        }
    },
    refreshUserData: async () => {
        try {
            const userName = get().name

            const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${userName}?_venues=true&_bookings=true`, {
                method: "GET",
                headers: new Headers({'Authorization': `${get().accessToken}`}),
            })
            const json = await response.json()

            if (!response.ok) {
                throw new Error("something went wrong when posting a new venue please try again later")
            }

            console.log(response, json)

            set(json)
        } catch (error) {
            console.error(error.message)
        }
    }
}), {
    name: "auth store",
    partialize: (state) => ({
        id: state.id,
        name: state.name,
        email: state.email,
        avatar: state.avatar,
        venueManager: state.venueManager,
        accessToken: state.accessToken,
        formError: state.formError,
        isLoggedIn: state.isLoggedIn,
        isModuleOpen: state.isModuleOpen,
        modulePageOpen: state.modulePageOpen,
        bookings: state.bookings,
        venues: state.venues
    })
}
))

export const useVenueCreateStore = createWithEqualityFn((set) => ({
    venueCreationError: '',
    createVenue: async (body, onSuccess) => {
        try {
            const isLoggedIn = useAuthenticationInfromation.getState().isLoggedIn
            if (!isLoggedIn) {
                throw new Error("please login before trying to create a venue")
            }
            const venueManager = useAuthenticationInfromation.getState().venueManager
            if (!venueManager) {
                throw new Error("you must be a venue manager to create a venue")
            }

            const accessToken = useAuthenticationInfromation.getState().accessToken
            const response = await fetch('https://api.noroff.dev/api/v1/holidaze/venues', {
                method: "POST",
                headers: new Headers({
                    'content-type': 'application/json',
                    'Authorization': `${accessToken}`}),
                body: JSON.stringify(body)
            })                   
            if (!response.ok) {
                throw new Error("something went wrong when posting a new venue please try again later")
            }

            set(({venueCreationError: ''}))
            onSuccess()
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                set(({venueCreationError: 'something went wrong. check if you are online or try again later'}))
                return
            }

            set(({venueCreationError: error.message}))
        }
    }
}))