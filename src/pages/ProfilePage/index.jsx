import { shallow } from "zustand/shallow"
import { useForm } from 'react-hook-form'
import { useRef } from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import cssProfilePage from "./profilePage.module.css"
import { useAuthenticationInfromation } from "../../store.js"
import noProfile from "../../assets/no_profile.svg"
import wrench from "../../assets/wrench.svg"

const schema = yup
    .object({
        avatar: yup
            .string()
            .url('Must be a valid url'),
        venueManager: yup
            .boolean()
    })
    .required()

export default () => {
    const moduleRef = useRef(null)

    const { avatar, name, email, venueManager, changeProfile, formError } = useAuthenticationInfromation((state) => ({
        avatar: state.avatar,
        name: state.name,
        email: state.email,
        venueManager: state.venueManager,
        changeProfile: state.changeProfile,
        formError: state.formError
    }), shallow)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm ({
        resolver: yupResolver(schema)
    })

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
                    <button className={cssProfilePage.changeTool} onClick={() => moduleRef.current?.showModal()}>
                        <img src={wrench} alt="change image" />
                    </button>
                </div>
                <dialog ref={moduleRef} className={cssProfilePage.module}>
                    {formError ? (<div className={cssProfilePage.error}>{formError}</div>): (<></>)}
                    <form onSubmit={e => {
                        e.preventDefault();

                        // clearing away any stray error messges
                        useAuthenticationInfromation.setState(({formError: ''}))


                        const requestOk = handleSubmit(changeProfile)(e)
                        
                        if (requestOk) {
                            moduleRef.current?.close()
                        }
                        }}>
                        <div className={`${cssProfilePage.inputText} ${cssProfilePage.avatarInput}`}>
                            <label htmlFor="avatar">url to image (empty unsets image)</label>
                            <input id="avatar" defaultValue={avatar} {...register('avatar')} />
                            <span className={cssProfilePage.error}>{errors.avatar?.message}</span>    
                        </div>
                        <div className={`${cssProfilePage.inputText} ${cssProfilePage.venueManagerInput}`}>
                            <div className={cssProfilePage.inputCheckbox}>
                                <input id="venueManager" type="checkbox" defaultChecked={venueManager} {...register('venueManager')} />
                                <label htmlFor="venueManager">Become a venue manager</label>
                            </div>
                            <span className={cssProfilePage.error}>{errors.venueManager?.message}</span>
                        </div>
                        <button type="button" value="cancel" formMethod="dialog" onClick={() => moduleRef.current?.close()}>close dialog</button>
                        <button type="submit" className="primary">update profile</button>
                    </form>
                </dialog>
            </section>

            <section>
                <h2>Your bookings</h2>
                <div>
                    <span>vanue name</span>
                    <span>datefrom</span>
                    <span>dateTo</span>
                    <span>price</span>
                </div>
            </section>
        </>
    )
}