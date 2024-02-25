import { shallow } from "zustand/shallow"
import useUserStore from "../../../stores/useUserStore/index.js"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import cssAuth from "../Auth/auth.module.css"

const schema = yup
    .object({
        name: yup
            .string()
            .max(20, "Name can't be more than 20 characters")
            .matches(/^[a-zA-Z0-9_]+$/, "Your name must only be letters, number, and underscore(_)")
            .required("Please supply your name"),
        email: yup
            .string()
            .matches(/^[a-zA-Z0-9_]+@(stud.)?noroff.no$/, "Email must be a valid stud.noroff.no or noroff.no email address")
            .required("Please supply a email address"),
        password: yup
            .string()
            .min(8, "Password must be longer than 7 characters")
            .required("Please supply a password"),
        avatar: yup
            .string()
            .url('Must be a valid url'),
        venueManager: yup
            .boolean()
    })
    .required()

export default function RegisterFrom () {

    const {closeModule, modulePageOpen, registerUser, isLoggedIn} = useUserStore(status => ({
        closeModule: status.closeModule,
        modulePageOpen: status.modulePageOpen,
        registerUser: status.register,
        isLoggedIn: status.isLoggedIn
    }), shallow)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm ({
        resolver: yupResolver(schema)
    })

    return (
        <form className={cssAuth.form} onSubmit={(e) => {
            e.preventDefault(); 
            handleSubmit(registerUser)(e);
            if (isLoggedIn) {
                closeModule;
            }
            }}>
            <div className={cssAuth.textInput}>
                <label htmlFor="register_userName">Name:</label>
                <input id="register_userName" autoFocus={modulePageOpen === 'register'} name="name" {...register('name')} />
                <span className={cssAuth.error}>{errors.name?.message}</span>
            </div>
            <div className={cssAuth.textInput}>
                <label htmlFor="register_userEmail">Email:</label>
                <input id="register_userEmail" autoComplete="username" name="email" {...register('email')} />
                <span className={cssAuth.error}>{errors.email?.message}</span>
            </div>            
            <div className={cssAuth.textInput}>
                <label htmlFor="register_Password">Password:</label>
                <input id="register_Password" type="password" autoComplete="new-password" name="password" {...register('password')} />
                <span className={cssAuth.error}>{errors.password?.message}</span>
            </div>
            <div className={cssAuth.textInput}>
                <label htmlFor="register_avatar">Profile picture:</label>
                <input id="register_avatar" name="avatar" {...register('avatar')} />
                <span className={cssAuth.error}>{errors.avatar?.message}</span>
            </div>
            <div className={cssAuth.checkboxInput}>
                <input type="checkbox" id="register_venueManager" name="venueManager" {...register('venueManager')}/>
                <label htmlFor="register_venueManager">I am a venue manager</label>
                <span className={cssAuth.error}>{errors.venueManager?.message}</span>
            </div>
            <button value="cancel" formMethod="dialog" onClick={closeModule}>Close</button>
            <button type="submit" className="primary">Register</button>
        </form>
    )
}