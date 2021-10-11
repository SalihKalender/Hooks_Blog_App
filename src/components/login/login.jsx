import { useState ,useRef, useContext } from 'react'
import { useHistory } from "react-router-dom";
import '../../styles/login_form.css'
import axios from 'axios'
import appContext from '../../context/index'

export default function Login () {
    let history = useHistory();
    const { dispatch, user_data } = useContext(appContext)
    const api_key = 'FIREBASE_API_KEY'   // email password returnSecureToken
    const signUp_endpoint = `FIREBASE_API`  // Kayit
    const signIn_endpoint = `FIREBASE_API`  // login
    const [ authUser, setauthUser ] = useState({password: '', email: ''})
    const login_form = useRef(null)
    const register_form = useRef(null)
    const wrong_inf = useRef(null)
    const change_form = () => {
        if(login_form.current.style.display == 'none') {
            register_form.current.style.display = 'none'
            login_form.current.style.display = 'block'
        }
        else {
           login_form.current.style.display = 'none'
           register_form.current.style.display = 'block'
        }
    }
    const submited_form = async (e) => {
        e.preventDefault()
        const type = login_form.current.style.display == 'none' ? 'REGISTER' : 'LOGIN'
        dispatch({type: 'CLEAR_STATE'})
        if( !authUser.password && !authUser.email ) {
        }
        else {
            if(type == 'REGISTER') {
                try {
                    const registered_user = await axios.post(signUp_endpoint, { email: authUser.email, password: authUser.password, returnSecureToken: true })
                    dispatch({ type: 'REGISTER', registered_user: registered_user, email: authUser.email })
                    history.push("/posts?registered=true");
                }
                catch(err) {
                    wrong_inf.current.style.display = 'block'
                    return console.log(err)
                }
                
            }
            else if(type == 'LOGIN') {
                try {
                    const signed_user = await axios.post(signIn_endpoint, { email: authUser.email, password: authUser.password, returnSecureToken: true })
                    history.push('/posts?signed=true')
                    dispatch({ type: 'REGISTER', registered_user: signed_user, email: signed_user.data.email })
                }
                catch(err) {
                    wrong_inf.current.style.display = 'block'
                    return console.log(err)
                }
            }
        }
    }
    const setPassword = (e) => {
        const value = e.target.value
        setauthUser((prev) => {
            return {
                ...prev,
                password: value
            }
        })
    }
    const setEmail = (e) => {
        const value = e.target.value
        setauthUser((prev) => {
            return {
                ...prev,
                email: value
            }
        })
    }
    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={submited_form} ref={login_form}>
                    <input type="text" placeholder="email address" onBlur={setEmail}/>
                    <input type="password" placeholder="password" onBlur={setPassword}/>
                    <button type="submit" className="button_form">login</button>
                    <p className="message">Not registered? <button type="button" className="under_button" onClick={change_form}>Create an account</button></p>
                </form>
                <form className="register-form" onSubmit={submited_form} ref={register_form}>
                    <input type="text" placeholder="email address" onBlur={setEmail}/>
                    <input type="password" placeholder="password" onBlur={setPassword}/>
                    <button type="submit" className="button_form">create</button>
                    <p className="message">Already registered? <button type="button" className="under_button" onClick={change_form}>Login an Account</button></p>
                </form>
                <p className="wrong_inf" ref={wrong_inf}>Wrong Informations</p>
            </div>
        </div>
    )
}

//
