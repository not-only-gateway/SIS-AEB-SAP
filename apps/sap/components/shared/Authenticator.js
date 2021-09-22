import styles from "../../styles/Authenticate.module.css";
import {TextField} from "sis-aeb-core";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import {Button} from "@material-ui/core";
import submitAuthentication from "../../utils/submit/SubmitAuthentication";
import React, {useEffect, useState} from "react";
import AuthenticatePT from "../../packages/locales/AuthenticatePT";
import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'

export default function Authenticator(props) {
    const lang = AuthenticatePT
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {

        (new Cookies()).remove('jwt')
        sessionStorage.removeItem('profile')
        sessionStorage.removeItem('accessProfile')
    }, [])

    return (
        <div className={styles.inputContainer}>
            <img src={'/light.png'} className={styles.logoImage} alt={'logo'}/>
            <h4 style={{fontWeight: 575}}>
                {lang.welcome}
            </h4>
            <TextField
                placeholder={'Email'} label={'Email'}
                handleChange={event => handleObjectChange({
                    event: {
                        name: 'email',
                        value: event.target.value
                    }, setData: setData
                })}  value={data.email}
                width={'100%'}
                maxLength={undefined}/>

            <TextField
                placeholder={lang.password} label={lang.password}
                handleChange={event => handleObjectChange({
                    event: {
                        name: 'password',
                        value: event.target.value
                    }, setData: setData
                })} value={data.password}
                width={'100%'} passwordMask={true} type={'password'}
                maxLength={undefined}/>

            <Button
                onClick={() => submitAuthentication({
                    email: data.email,
                    password: data.password,
                    setLoading: setLoading
                }).then(res => {
                        if (res)
                            props.redirect()
                    }
                )}
                disabled={data.email.length < 12 || data.password.length < 8 || loading}
                style={{
                    textTransform: 'none',
                    backgroundColor: data.email.length < 12 || data.password.length < 8 || loading ? '#f4f5fa' : '#0095ff',
                    color: data.email.length < 12 || data.password.length < 8 || loading ? null : 'white',
                    width: '100%'
                }}>{lang.authenticate}</Button>
        </div>
    )
}

Authenticator.propTypes={
    redirect: PropTypes.func
}