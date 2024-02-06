import { create } from "zustand"

export const useErrorStore = create((set) => ({
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

export const useVenuesStore = create((set, get) => ({
    venues: [],
    offset: 0,
    lastPage: false,
    getVenues: async () => {
        try {
            
            const limit = 12
            const offset = get().offset
            const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues?offset=${offset}&limit=${limit}`)
            console.log(response)
    
            if (response.ok) {
                const json = await response.json()
                set((state) => ({venues: [...state.venues, ...json]}))
                
                if (json.length < limit) {
                    set(() => ({ lastPage: true}))
                } else {
                    set((state) => ({ offset: state.offset + limit }))
                }
            } else {
                throw new Error("Something went wrong with the fetch request")
            }
        } catch (error) {
            console.log(error)
            // useErrorStore.setError(['an error occured when trying to get venues pleace try again'])
        }
    }
}))
