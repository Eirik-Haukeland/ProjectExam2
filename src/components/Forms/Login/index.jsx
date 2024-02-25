import { shallow } from "zustand/shallow"
import useUserStore from "../../../stores/useUserStore/index.js"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import cssAuth from "../Auth/auth.module.css"

const schema = yup
.object({
    email: yup
        .string()
        .matches(/^[a-zA-Z0-9_]+@(stud.)?noroff.no$/, "Email must be a valid stud.noroff.no or noroff.no email address")
        .required("Please supply a email address"),
    password: yup
        .string()
        .min(8, "Password must be longer than 7 characters")
        .required("Please supply a password"),
})
.required()

export default function LoginForm() {

    const {closeModule, modulePageOpen, loginUser} = useUserStore(status => ({
        closeModule: status.closeModule,
        modulePageOpen: status.modulePageOpen,
        loginUser: status.login
    }), shallow)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm ({
        resolver: yupResolver(schema)
    })

    return (
        <form className={cssAuth.form} target="_blank" onSubmit={handleSubmit(loginUser)}>
            <div className={cssAuth.textInput}>
                <label htmlFor="login_userEmail">Email:</label>
                <input id="login_userEmail" autoComplete="username" autoFocus={modulePageOpen === 'login'} {...register('email')} />
                <span className={cssAuth.error}>{errors.email?.message}</span>
            </div>            
            <div className={cssAuth.textInput}>
                <label htmlFor="login_Password">Password:</label>
                <input id="login_Password" type="password" autoComplete="current-password" {...register('password')} />
                <span className={cssAuth.error}>{errors.password?.message}</span>
            </div>
            <button value="cancel" formMethod="dialog" onClick={closeModule}>Close</button>
            <button type="submit" className="primary" data-dismiss="static">Login</button>
        </form>
    )
}