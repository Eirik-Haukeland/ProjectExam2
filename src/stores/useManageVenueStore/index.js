import { createWithEqualityFn } from "zustand/traditional"
import useUserStore from "../useUserStore/index.js"

export default createWithEqualityFn((set) => ({
    venueCreationError: '',
    deleteVenue: async (id, onError) => {
        try {
            const accessToken = useUserStore.getState().accessToken
            const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, 
                {
                    method: "DELETE",
                    headers: new Headers({'Authorization': `${accessToken}`})
                })

            if (response.status !== 204) {
                throw new Error('Something went wrong, Please try again later')
            }

            useUserStore.getState().refreshUserData()
        } catch (error) {
            if (error.message === 'Failed to fetch' || error.message === 'accessToken is not defined') {
                onError('Something went wrong. Check if you are online or try again later')
                return
            }

            onError(error.message)
        }
    },
    createVenue: async (body, fetchInfo, onSuccess) => {
        try {
            const isLoggedIn = useUserStore.getState().isLoggedIn
            if (!isLoggedIn) {
                throw new Error("Please login before trying to create a venue")
            }
            const venueManager = useUserStore.getState().venueManager
            if (!venueManager) {
                throw new Error("You must be a venue manager to create a venue")
            }

            const accessToken = useUserStore.getState().accessToken
            const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues${fetchInfo.url}`, {
                method: fetchInfo.method,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `${accessToken}`}),
                body: JSON.stringify(body)
            })                   
            if (!response.ok) {
                throw new Error("Something went wrong, when posting a new venue please try again later")
            }

            set(({venueCreationError: ''}))
            onSuccess()
        } catch (error) {
            if (error.message === 'Failed to fetch') {
                set(({venueCreationError: 'Something went wrong. Check if you are online or try again later'}))
                return
            }

            set(({venueCreationError: error.message}))
        }
    }
}))