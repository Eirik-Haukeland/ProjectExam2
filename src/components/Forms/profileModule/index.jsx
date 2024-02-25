import { shallow } from "zustand/shallow"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'

import useUserStore from "../../../stores/useUserStore/index.js"

import { forwardRef } from "react";
import cssProfileModule from "./profileModule.module.css"

const profileSchema = yup
    .object({
        avatar: yup
            .string()
            .url('Must be a valid url'),
        venueManager: yup
            .boolean()
    }).required()

export default forwardRef(({}, ref) => {

    const { avatar, venueManager, changeProfile, formError } = useUserStore((state) => ({
        avatar: state.avatar,
        venueManager: state.venueManager,
        changeProfile: state.changeProfile,
        formError: state.formError,
    }), shallow)

    const {
        register: profileInputs,
        handleSubmit: profileSubmit,
        formState: { errors: profileErrors },
    } = useForm ({
        resolver: yupResolver(profileSchema)
    })

    return (
        <dialog ref={ref} className={cssProfileModule.module}>
            {formError ? (<div className={cssProfileModule.error}>{formError}</div>): (<></>)}
            <form onSubmit={profileSubmit((data) => changeProfile(data, () => ref.current?.close()))}>
                <div className={cssProfileModule.inputText}>
                    <label htmlFor="avatar">url to image (empty unsets image)</label>
                    <input id="avatar" type="url" placeholder="https://example.com"  defaultValue={avatar} {...profileInputs('avatar')} />
                    <span className={cssProfileModule.error}>{profileErrors.avatar?.message}</span>    
                </div>
                <div className={cssProfileModule.inputText}>
                    <div className={cssProfileModule.inputCheckbox}>
                        <input id="venueManager" type="checkbox" defaultChecked={venueManager} {...profileInputs('venueManager')} />
                        <label htmlFor="venueManager">Become a venue manager</label>
                    </div>
                    <span className={cssProfileModule.error}>{profileErrors.venueManager?.message}</span>
                </div>
                <button type="button" value="cancel" formMethod="dialog" onClick={() => ref.current?.close()}>close dialog</button>
                <button type="submit" className="primary">update profile</button>
            </form>
        </dialog>
    )
})