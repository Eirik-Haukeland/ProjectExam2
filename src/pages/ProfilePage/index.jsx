import { shallow } from "zustand/shallow"
import { useFieldArray, useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import cssProfilePage from "./profilePage.module.css"
import { useAuthenticationInfromation, useVenueCreateStore } from "../../store.js"
import noProfile from "../../assets/no_profile.svg"
import wrench from "../../assets/wrench.svg"

const profileSchema = yup
    .object({
        avatar: yup
            .string()
            .url('Must be a valid url'),
        venueManager: yup
            .boolean()
    }).required()

const venueSchema = yup
    .object({
        name: yup.string().required('Please give this venue a name'),
        description: yup.string().required('Please give this venue a description'),
        media: yup.array(yup.string().url('must be a valid url')),
        price: yup.number().min(1).required('Please tell us how mutch you want to charge'),
        maxGuests: yup.number().min(1).required('Please tell us how many guests you can have at a time'),
        meta: yup.object({
            wifi: yup.boolean(),
            parking: yup.boolean(),
            breakfast: yup.boolean(),
            pets: yup.boolean(),
        }),
        location: yup.object({
            address: yup.string(),
            city: yup.string(),
            zip: yup.string(),
            country: yup.string(),
            continent: yup.string(),
        }) 
    }).required()



export default () => {
    const ProfileModuleRef = useRef(null)
    const venueModuleRef = useRef(null)
        
    const { avatar, name, email, venueManager, changeProfile, formError } = useAuthenticationInfromation((state) => ({
        avatar: state.avatar,
        name: state.name,
        email: state.email,
        venueManager: state.venueManager,
        changeProfile: state.changeProfile,
        formError: state.formError
    }), shallow)

    const {createVenue, venueCreationError} = useVenueCreateStore(status => ({
        createVenue: status.createVenue,
        venueCreationError: status.venueCreationError
    }), shallow)

    const {
        register: profileInputs,
        handleSubmit: profileSubmit,
        formState: { errors: profileErrors },
    } = useForm ({
        resolver: yupResolver(profileSchema)
    })
    const {
        control: venueControl,
        register: venueInputs,
        handleSubmit: venueSubmit,
        formState: { errors: venueErrors },
    } = useForm ({
        resolver: yupResolver(venueSchema)
    })

    const { fields, append, remove, } = useFieldArray ({
        control: venueControl,
        name: "media"
    })

    useEffect(() => {
        document.title = 'Holidaze - Profile page'
    }, [])

    return (
        <>
            <h1 hidden>Profile Page</h1>
            <section className={cssProfilePage.container}>
                <h2 hidden>profile information</h2>
                <div className={cssProfilePage.profileInformation}>
                    <div className={cssProfilePage.profilePicture}>
                        {
                            avatar === null || avatar === ''
                            ?   (<img src={noProfile} alt="you currently have no profile picture" />)
                            :   (<img src={avatar} alt="your profile picture" />)
                        }
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>user name:</td>
                                <td>{name}</td>
                            </tr>
                            <tr>
                                <td>email:</td>
                                <td>{email}</td>
                            </tr>
                            <tr className={cssProfilePage.table_row_venue_manager}>
                                <td>venue manager:</td>
                                <td>{venueManager ? 'Yes' : 'No'}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className={cssProfilePage.changeTool} onClick={() => ProfileModuleRef.current?.showModal()}>
                        <img src={wrench} alt="change image" />
                    </button>
                </div>
                <dialog ref={ProfileModuleRef} className={cssProfilePage.module}>
                    {formError ? (<div className={cssProfilePage.error}>{formError}</div>): (<></>)}
                    <form onSubmit={profileSubmit((data) => changeProfile(data, () => ProfileModuleRef.current?.close()))}>
                        <div className={cssProfilePage.inputText}>
                            <label htmlFor="avatar">url to image (empty unsets image)</label>
                            <input id="avatar" type="url" placeholder="https://example.com"  defaultValue={avatar} {...profileInputs('avatar')} />
                            <span className={cssProfilePage.error}>{profileErrors.avatar?.message}</span>    
                        </div>
                        <div className={cssProfilePage.inputText}>
                            <div className={cssProfilePage.inputCheckbox}>
                                <input id="venueManager" type="checkbox" defaultChecked={venueManager} {...profileInputs('venueManager')} />
                                <label htmlFor="venueManager">Become a venue manager</label>
                            </div>
                            <span className={cssProfilePage.error}>{profileErrors.venueManager?.message}</span>
                        </div>
                        <button type="button" value="cancel" formMethod="dialog" onClick={() => ProfileModuleRef.current?.close()}>close dialog</button>
                        <button type="submit" className="primary">update profile</button>
                    </form>
                </dialog>
            </section>
            
            <div className={cssProfilePage.section}>
                <section>
                    <h2>Your bookings</h2>
                    <div>
                        <span>vanue name</span>
                        <span>datefrom</span>
                        <span>dateTo</span>
                        <span>price</span>
                    </div>
                </section>
                { venueManager ? (
                <section>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <h2>Your venues</h2>
                        <button onClick={() => venueModuleRef.current?.showModal()}>create venue</button>
                    </div>
                    <div>
                        <span>vanue name</span>
                        <span>datefrom</span>
                        <span>dateTo</span>
                        <span>price</span>
                    </div>
                    <dialog ref={venueModuleRef} className={cssProfilePage.module}>
                        <h2>create venue</h2>
                        <span className={cssProfilePage.error}>{venueCreationError}</span>
                        <form onSubmit={venueSubmit((data) => createVenue(data, () => venueModuleRef.current?.close()))}>
                            <fieldset className={cssProfilePage.venueBasicInfo}>
                                <legend>basic information</legend>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <label htmlFor="veneuName"><span style={{color: 'red'}}>*</span>name of venue:</label>
                                    <input id="veneuName" {...venueInputs('name')} />
                                    <span className={cssProfilePage.error}>{venueErrors.name?.message}</span>    
                                </div>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <label htmlFor="veneuDescription"><span style={{color: 'red'}}>*</span>venue description:</label>
                                    <input id="veneuDescription" {...venueInputs('description')} />
                                    <span className={cssProfilePage.error}>{venueErrors.description?.message}</span>    
                                </div>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <label htmlFor="veneuPrice"><span style={{color: 'red'}}>*</span>price for venue:</label>
                                    <input id="veneuPrice" type="number" defaultValue={1} {...venueInputs('price')} />
                                    <span className={cssProfilePage.error}>{venueErrors.price?.message}</span>    
                                </div>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <label htmlFor="veneuMaxGuests"><span style={{color: 'red'}}>*</span>maximum amount of guests:</label>
                                    <input id="veneuMaxGuests" type="number" defaultValue={1} {...venueInputs('maxGuests')} />
                                    <span className={cssProfilePage.error}>{venueErrors.maxGuests?.message}</span>    
                                </div>
                                <div className={cssProfilePage.addImages}>
                                    <label>images of venue:</label>
                                    {       
                                        fields.map((field, index) => 
                                            (
                                                <div key={field.id}>
                                                    <input type="url" name="media" placeholder="https://example.com"  {...venueInputs(`media[${index}]`)} />
                                                    <button type="button" className={cssProfilePage.delBtn} onClick={() => remove(index)}>remove</button>
                                                    <span className={cssProfilePage.error}>{venueErrors.media?.message}</span>     
                                                </div>
                                            )
                                        )
                                    }                               
                                <button type="button" className={`primary`} onClick={({target}) => {append('')}}>add image</button>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>ameneties</legend>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <div className={cssProfilePage.inputCheckbox}>
                                        <input id="wifiSetting" type="checkbox" {...venueInputs('meta[wifi]')} />
                                        <label htmlFor="wifiSetting">has Wifi</label>
                                    </div>
                                    <span className={cssProfilePage.error}>{venueErrors.meta?.wifi?.message}</span>
                                </div>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <div className={cssProfilePage.inputCheckbox}>
                                        <input id="parikingSetting" type="checkbox" {...venueInputs('meta[parking]')} />
                                        <label htmlFor="parikingSetting">has parking</label>
                                    </div>
                                    <span className={cssProfilePage.error}>{venueErrors.meta?.parking?.message}</span>
                                </div>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <div className={cssProfilePage.inputCheckbox}>
                                        <input id="breakfastSetting" type="checkbox" {...venueInputs('meta[breakfast]')} />
                                        <label htmlFor="breakfastSetting">serves breakfast</label>
                                    </div>
                                    <span className={cssProfilePage.error}>{venueErrors.meta?.breakfast?.message}</span>
                                </div>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <div className={cssProfilePage.inputCheckbox}>
                                        <input id="petsSetting" type="checkbox" {...venueInputs('meta[pets]')} />
                                        <label htmlFor="petsSetting">allows pets</label>
                                    </div>
                                    <span className={cssProfilePage.error}>{venueErrors.meta?.pets?.message}</span>
                                </div>
                            </fieldset>
                            <fieldset className={cssProfilePage.venueLocation}>
                                <legend>location</legend>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <label htmlFor="veneuAddress">venue address:</label>
                                    <input id="veneuAddress" {...venueInputs('location[address]')} />
                                    <span className={cssProfilePage.error}>{venueErrors.location?.address?.message}</span>    
                                </div>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <label htmlFor="veneuZip">zip code:</label>
                                    <input id="veneuZip" {...venueInputs('location[zip]')} />
                                    <span className={cssProfilePage.error}>{venueErrors.location?.zip?.message}</span>    
                                </div>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <label htmlFor="veneuCity">venue city:</label>
                                    <input id="veneuCity" {...venueInputs('location[city]')} />
                                    <span className={cssProfilePage.error}>{venueErrors.location?.city?.message}</span>    
                                </div>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <label htmlFor="veneuCountry">venue country:</label>
                                    <input id="veneuCountry" {...venueInputs('location[country]')} />
                                    <span className={cssProfilePage.error}>{venueErrors.location?.country?.message}</span>    
                                </div>
                                <div className={`${cssProfilePage.inputText}`}>
                                    <label htmlFor="veneuContinent">venue continent:</label>
                                    <input id="veneuContinent" {...venueInputs('location[continent]')} />
                                    <span className={cssProfilePage.error}>{venueErrors.location?.continent?.message}</span>    
                                </div>
                            </fieldset>
                            <span className={cssProfilePage.message}>* is required</span>
                            <button type="button" value="cancel" formMethod="dialog" onClick={() => venueModuleRef.current?.close()}>close dialog</button>
                            <button type="submit" className="primary" data-dismiss="static">create venue</button>
                        </form>
                    </dialog>
                </section>
                ) : (<></>)}
            </div>
        </>
    )
}

{

}