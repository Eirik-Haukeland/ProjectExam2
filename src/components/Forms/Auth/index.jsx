import { shallow } from "zustand/shallow"
import { useAuthenticationInfromation } from '../../../store.js'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import cssAuth from "./auth.module.css"

const loginSchema = yup
.object({
    email: yup
        .string()
        .matches(/^[a-zA-Z0-9_]+@(stud.)?noroff.no$/, "email must be a valid stud.noroff.no or noroff.no email address")
        .required("Please supply a email address"),
    password: yup
        .string()
        .min(8, "Password must be longer than 7 characters")
        .required("Please supply a password"),
})
.required()

function LoginForm() {

    const {closeModule, modulePageOpen, loginUser} = useAuthenticationInfromation(status => ({
        closeModule: status.closeModule,
        modulePageOpen: status.modulePageOpen,
        loginUser: status.login
    }), shallow)

    const {
        register: loginData,
        handleSubmit,
        formState: { errors },
    } = useForm ({
        resolver: yupResolver(loginSchema)
    })

    return (
        <form className={cssAuth.form} target="_blank" onSubmit={handleSubmit(loginUser)}>
            <div className={cssAuth.textInput}>
                <label htmlFor="login_userEmail">Email:</label>
                <input id="login_userEmail" autoComplete="username" autoFocus={modulePageOpen === 'login'} {...loginData('email')} />
                <span className={cssAuth.error}>{errors.email?.message}</span>
            </div>            
            <div className={cssAuth.textInput}>
                <label htmlFor="login_Password">Password:</label>
                <input id="login_Password" type="password" autoComplete="current-password" {...loginData('password')} />
                <span className={cssAuth.error}>{errors.password?.message}</span>
            </div>
            <button value="cancel" formMethod="dialog" onClick={closeModule}>close dialog</button>
            <button type="submit" className="primary" data-dismiss="static">Login</button>
        </form>
    )
}

const registerSchema = yup
    .object({
        name: yup
            .string()
            .max(20, "Name can't be more than 20 characters")
            .matches(/^[a-zA-Z0-9_]+$/, "your name must only be letters, number, and underscore(_)")
            .required("Please supply your name"),
        email: yup
            .string()
            .matches(/^[a-zA-Z0-9_]+@(stud.)?noroff.no$/, "email must be a valid stud.noroff.no or noroff.no email address")
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

function RegisterFrom () {

    const {closeModule, modulePageOpen, registerUser, isLoggedIn} = useAuthenticationInfromation(status => ({
        closeModule: status.closeModule,
        modulePageOpen: status.modulePageOpen,
        registerUser: status.register,
        isLoggedIn: status.isLoggedIn
    }), shallow)

    const {
        register: registerData,
        handleSubmit,
        formState: { errors },
    } = useForm ({
        resolver: yupResolver(registerSchema)
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
                <input id="register_userName" autoFocus={modulePageOpen === 'register'} name="name" {...registerData('name')} />
                <span className={cssAuth.error}>{errors.name?.message}</span>
            </div>
            <div className={cssAuth.textInput}>
                <label htmlFor="register_userEmail">Email:</label>
                <input id="register_userEmail" autoComplete="username" name="email" {...registerData('email')} />
                <span className={cssAuth.error}>{errors.email?.message}</span>
            </div>            
            <div className={cssAuth.textInput}>
                <label htmlFor="register_Password">Password:</label>
                <input id="register_Password" type="password" autoComplete="new-password" name="password" {...registerData('password')} />
                <span className={cssAuth.error}>{errors.password?.message}</span>
            </div>
            <div className={cssAuth.textInput}>
                <label htmlFor="register_avatar">Profile picture:</label>
                <input id="register_avatar" name="avatar" {...registerData('avatar')} />
                <span className={cssAuth.error}>{errors.avatar?.message}</span>
            </div>
            <div className={cssAuth.checkboxInput}>
                <input type="checkbox" id="register_venueManager" name="venueManager" {...registerData('venueManager')}/>
                <label htmlFor="register_venueManager">I am a venue manager</label>
                <span className={cssAuth.error}>{errors.venueManager?.message}</span>
            </div>
            <button value="cancel" formMethod="dialog" onClick={closeModule}>close dialog</button>
            <button type="submit" className="primary">Register</button>
        </form>
    )
}



export default function Auth() {
    const moduleRef = useRef(null)

    const {isModuleOpen, modulePageOpen, openModule, formError, clearErrors} = useAuthenticationInfromation(status => ({
        isModuleOpen: status.isModuleOpen,
        modulePageOpen: status.modulePageOpen,
        openModule: status.openModule,
        formError: status.formError,
        clearErrors: status.clearErrors
    }), shallow)

    useEffect(() => {
        if (isModuleOpen) {
            moduleRef?.current?.showModal()
        } else {
            moduleRef?.current?.close()
        }
    }, [isModuleOpen])

    return (
        <dialog ref={moduleRef} className={cssAuth.dialog}>
            <div className={cssAuth.formSwitchButtons} >
                <button 
                    type="button"
                    onClick={({target: {innerText}}) => {if (modulePageOpen !== innerText) {
                        openModule(innerText)
                        clearErrors()
                    }}}
                    className={(modulePageOpen === 'login' ? "primary" : '')}>login</button>
                <button 
                    type="button"
                    onClick={({target: {innerText}}) => {if (modulePageOpen !== innerText) {
                        openModule(innerText)
                        clearErrors()
                    }}}
                    className={(modulePageOpen === 'register' ? "primary" : '')}>register</button>
            </div>
            {formError ? (<div className={cssAuth.error}>{formError}</div>): (<></>)}
            {
                modulePageOpen === 'register'
                ? <RegisterFrom />
                : <LoginForm />
            }
        </dialog>
    )
}