import { shallow } from "zustand/shallow"
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import cssVenueModal from "./venueModal.module.css"
import useUserStore from "../../../stores/useUserStore/index.js"
import useManageVenueStore from '../../../stores/useManageVenueStore/index.js'

const schema = yup
    .object({
        name: yup.string().required('Please give this venue a name'),
        description: yup.string().required('Please give this venue a description'),
        media: yup.array(yup.string().url('Must be a valid URL')),
        price: yup.number().min(1).required('Please tell us how mutch you want to charge'),
        maxGuests: yup.number()
            .min(1, "A venue must at least have room for one guest")
            .max(100, 'A venue can not have more than 100 guests')
            .required('Please tell us how many guests you can have at a time'),
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

export default ({venue, id}) => {

    const refreshUserData = useUserStore((state) => state.refreshUserData)

    const {createVenue, venueCreationError } = useManageVenueStore(state => ({
        createVenue: state.createVenue,
        venueCreationError: state.venueCreationError,
    }), shallow)

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm ({
        resolver: yupResolver(schema),
        defaultValues: {
            name: venue?.name || '',
            description: venue?.description || '',
            media: venue?.media || [],
            price: venue?.price || 1,
            maxGuests: venue?.maxGuests || 1,
            meta: {
                wifi: venue?.meta.wifi || false,
                parking: venue?.meta.parking || false,
                breakfast: venue?.meta.breakfast || false,
                pets: venue?.meta.pets || false
            },
            location: {
                address: venue?.location.address || '',
                city: venue?.location.city || '',
                zip: venue?.location.zip || '',
                country: venue?.location.country || '',
                continent: venue?.location.continent || ''
            }
        }
    })

    const { fields, append, remove, } = useFieldArray ({
        control,
        name: "media"
    })

    return (                   
        <dialog id={id} className={cssVenueModal.module}>
            <h2>{venue ? 'Edit' : 'Create'} venue</h2>
            <span className={cssVenueModal.error}>{venueCreationError}</span>
            <form onSubmit={handleSubmit((data) => createVenue(data, venue ? {method: "PUT", url: `/${venue.id}`} : {method: "POST", url: ''} , () => {document.getElementById(id).close(); refreshUserData()}))}>
                <fieldset className={cssVenueModal.venueBasicInfo}>
                    <legend>Basic information</legend>
                    <div className={`${cssVenueModal.inputText}`}>
                        <label htmlFor={`veneuName${venue?.id}`}><span style={{color: 'red'}}>*</span>Name of venue:</label>
                        <input id={`veneuName${venue?.id}`} {...register('name')} />
                        <span className={cssVenueModal.error}>{errors.name?.message}</span>    
                    </div>
                    <div className={`${cssVenueModal.inputText}`}>
                        <label htmlFor={`veneuDescription${venue?.id}`}><span style={{color: 'red'}}>*</span>Venue description:</label>
                        <input id={`veneuDescription${venue?.id}`} {...register('description')} />
                        <span className={cssVenueModal.error}>{errors.description?.message}</span>    
                    </div>
                    <div className={`${cssVenueModal.inputText}`}>
                        <label htmlFor={`veneuPrice${venue?.id}`}><span style={{color: 'red'}}>*</span>Price for venue:</label>
                        <input id={`veneuPrice${venue?.id}`} type="number" defaultValue={1} {...register('price')} />
                        <span className={cssVenueModal.error}>{errors.price?.message}</span>    
                    </div>
                    <div className={`${cssVenueModal.inputText}`}>
                        <label htmlFor={`veneuMaxGuests${venue?.id}`}><span style={{color: 'red'}}>*</span>Maximum amount of guests:</label>
                        <input id={`veneuMaxGuests${venue?.id}`} type="number" defaultValue={1} {...register('maxGuests')} />
                        <span className={cssVenueModal.error}>{errors.maxGuests?.message}</span>    
                    </div>
                    <div className={cssVenueModal.addImages}>
                        <label>Images of venue:</label>
                        {       
                            fields.map((field, index) => 
                                (
                                    <div key={field.id} className={cssVenueModal.imageInput}>
                                        <input type="url" name="media" placeholder="https://example.com"  {...register(`media[${index}]`)} />
                                        <button type="button" className={cssVenueModal.delBtn} onClick={() => remove(index)}>Remove</button>
                                        <span className={cssVenueModal.error}>{errors.media?.message}</span>     
                                    </div>
                                )
                            )
                        }                               
                    <button type="button" className={`primary`} onClick={() => {append('')}}>Add image</button>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Ameneties</legend>
                    <div className={`${cssVenueModal.inputText}`}>
                        <div className={cssVenueModal.inputCheckbox}>
                            <input id={`wifiSetting${venue?.id}`} type="checkbox" {...register('meta[wifi]')} />
                            <label htmlFor={`wifiSetting${venue?.id}`}>Has wifi</label>
                        </div>
                        <span className={cssVenueModal.error}>{errors.meta?.wifi?.message}</span>
                    </div>
                    <div className={`${cssVenueModal.inputText}`}>
                        <div className={cssVenueModal.inputCheckbox}>
                            <input id={`parikingSetting${venue?.id}`} type="checkbox" {...register('meta[parking]')} />
                            <label htmlFor={`parikingSetting${venue?.id}`}>Has parking</label>
                        </div>
                        <span className={cssVenueModal.error}>{errors.meta?.parking?.message}</span>
                    </div>
                    <div className={`${cssVenueModal.inputText}`}>
                        <div className={cssVenueModal.inputCheckbox}>
                            <input id={`breakfastSetting${venue?.id}`} type="checkbox" {...register('meta[breakfast]')} />
                            <label htmlFor={`breakfastSetting${venue?.id}`}>Serves breakfast</label>
                        </div>
                        <span className={cssVenueModal.error}>{errors.meta?.breakfast?.message}</span>
                    </div>
                    <div className={`${cssVenueModal.inputText}`}>
                        <div className={cssVenueModal.inputCheckbox}>
                            <input id={`petsSetting${venue?.id}`} type="checkbox" {...register('meta[pets]')} />
                            <label htmlFor={`petsSetting${venue?.id}`}>Allow pets</label>
                        </div>
                        <span className={cssVenueModal.error}>{errors.meta?.pets?.message}</span>
                    </div>
                </fieldset>
                <fieldset className={cssVenueModal.venueLocation}>
                    <legend>Location</legend>
                    <div className={`${cssVenueModal.inputText}`}>
                        <label htmlFor={`veneuAddress${venue?.id}`}>Address:</label>
                        <input id={`veneuAddress${venue?.id}`} {...register('location[address]')} />
                        <span className={cssVenueModal.error}>{errors.location?.address?.message}</span>    
                    </div>
                    <div className={`${cssVenueModal.inputText}`}>
                        <label htmlFor={`veneuZip${venue?.id}`}>Zip code:</label>
                        <input id={`veneuZip${venue?.id}`} {...register('location[zip]')} />
                        <span className={cssVenueModal.error}>{errors.location?.zip?.message}</span>    
                    </div>
                    <div className={`${cssVenueModal.inputText}`}>
                        <label htmlFor={`veneuCity${venue?.id}`}>City:</label>
                        <input id={`veneuCity${venue?.id}`} {...register('location[city]')} />
                        <span className={cssVenueModal.error}>{errors.location?.city?.message}</span>    
                    </div>
                    <div className={`${cssVenueModal.inputText}`}>
                        <label htmlFor={`veneuCountry${venue?.id}`}>Country:</label>
                        <input id={`veneuCountry${venue?.id}`} {...register('location[country]')} />
                        <span className={cssVenueModal.error}>{errors.location?.country?.message}</span>    
                    </div>
                    <div className={`${cssVenueModal.inputText}`}>
                        <label htmlFor={`veneuContinent${venue?.id}`}>Continent:</label>
                        <input id={`veneuContinent${venue?.id}`} {...register('location[continent]')} />
                        <span className={cssVenueModal.error}>{errors.location?.continent?.message}</span>    
                    </div>
                </fieldset>
                <span className={cssVenueModal.message}>* is required</span>
                <button type="button" value="cancel" formMethod="dialog" onClick={() => document.getElementById(id).close()}>Close</button>
                <button type="submit" className="primary" data-dismiss="static">{venue ? 'Save' : 'Create'}</button>
           </form>
       </dialog>
    )
}