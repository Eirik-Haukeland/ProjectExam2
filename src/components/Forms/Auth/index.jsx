import { shallow } from "zustand/shallow"
import useUserStore from "../../../stores/useUserStore/index.js"
import { useEffect, useRef } from 'react'
import cssAuth from "./auth.module.css"
import RegisterFrom from "../Register/index.jsx"
import LoginForm from "../Login/index.jsx"

export default function Auth() {
    const moduleRef = useRef(null)

    const {isModuleOpen, modulePageOpen, openModule, formError, clearErrors} = useUserStore(status => ({
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