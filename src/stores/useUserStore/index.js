import { createWithEqualityFn } from "zustand/traditional"
import { persist } from 'zustand/middleware'

export default createWithEqualityFn(persist((set, get) => ({
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
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(body)
            })
            const json = await response.json()
            
            if (json.errors && json.errors[0].message) {
                throw new Error(json.errors[0].message)
            }
            if (!response.ok) {
                throw new Error('Something went wrong when loging in to your account. Please try again later')
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
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(body)
            })
            const json = await response.json()   

            if (json.errors && json.errors[0].message) {
                throw new Error(json.errors[0].message)
            }
            if (!response.ok) {
                throw new Error('Something went wrong when loging in to your account. Please try again later')
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
                throw new Error('User is not logged in')
            }
            const errors = []
            const setItems = {};
            const name = get().name

            if (data.venueManager !== get().venueManager) {
                const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}`, {
                    method: "PUT",
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `${get().accessToken}`}),
                    body: JSON.stringify({ venueManager: data.venueManager })
                })
                
                if (!response.ok) {
                    errors.push('Something went wrong when updating venue manager status')
                } else {
                    const { venueManager } = await response.json()
                    setItems['venueManager'] = venueManager
                }
            }

            if (data.avatar !== (get().avatar || '') || data.removeAvatar){
                const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/media`, {
                    method: "PUT",
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `${get().accessToken}`}),
                    body: JSON.stringify({ avatar: data.avatar })
                })
                
                if (!response.ok) {
                    errors.push('Something went wrong when updating profile picture status')
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
                set(({formError: 'Something went wrong. Check if you are online and try again later'}))
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
                throw new Error("Something went wrong when posting a new venue. Please try again later")
            }

            set(json)
        } catch (error) {
            console.error(error.message)
        }
    }
}), {
    name: "auth_store",
    partialize: (state) => ({
        id: state.id,
        name: state.name,
        email: state.email,
        avatar: state.avatar,
        venueManager: state.venueManager,
        accessToken: state.accessToken,
        isLoggedIn: state.isLoggedIn,
        isModuleOpen: state.isModuleOpen,
        modulePageOpen: state.modulePageOpen,
        bookings: state.bookings,
        venues: state.venues
    })
}
))