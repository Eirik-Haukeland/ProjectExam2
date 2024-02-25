import { createWithEqualityFn } from "zustand/traditional"
import isCountry from "../../utils/isCountry"

export default createWithEqualityFn((set, get) => ({
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
    bookingDates: [],
    bookings: [],
    fetchErrors: '',
    ownerName: '',
    venueNotFound: false,
    loadVenue: async (id) => {
        try {
            set({
                venueNotFound: false,
                fetchErrors: ''
            })

            const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}?_bookings=true&_owner=true`)
            const json =  await response.json()
            
            if (response.status === 404) {
                throw new Error('Venue not found')    
            }
            if (!response.ok) {
                throw new Error('Problem occured when trying to get venues. Please try again later')
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
                meta: {
                    wifi: newHasWifi,
                    parking: newHasParking,
                    breakfast: newServesBreakfast,
                    pets: newAllowsPets,
                },
                location: {
                    address: newAddress,
                    city: newCity,
                    zip: newZip,
                    country: newCountry,
                    continent: newContinent,
                },
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
            if (newCountry !== oldCountry && typeof newCountry === "string" && isCountry(newCountry)) { 
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
                const today = new Date()

                const bookingsToSet = newBookings.reduce((newList, booking) => {
                    if (!booking.dateTo) {
                        return newList
                    }
                    
                    const dateTo = new Date(booking.dateTo.split('T')[0])

                    // to get all the dates between dateFrom and dateTo on the booking
                    for (let newDate = new Date(booking.dateFrom.split('T')[0]);
                        newDate.valueOf() <= dateTo.valueOf();
                        newDate.setUTCDate(newDate.getUTCDate() + 1)
                        ) {
                        if (newDate.valueOf() >= today.valueOf() && !newList.includes(newDate.toISOString())) {
                            newList = [...newList, newDate.toISOString()]
                        }
                    }

                    return newList
                }, []).map(date => new Date(date))

                set({
                    bookings: newBookings, 
                    bookingDates: bookingsToSet 
                })
            }
           
        } catch (error) {
            if (error.message === 'Venue not found') {
                set(({
                    fetchErrors: error.message,
                    venueNotFound: true
                }))

            }

            set({fetchErrors: 'An error occured when trying to get the venue. Please try again'})
        }
        
    }
}))