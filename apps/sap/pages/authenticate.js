import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie/lib";

import {useRouter} from "next/router";
import styles from '../styles/Authenticate.module.css'
import Head from "next/head";
import {Button} from "@material-ui/core";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import {Alert} from "sis-aeb-misc";
import AuthenticatePT from "../packages/locales/AuthenticatePT";
import submitAuthentication from "../utils/submit/SubmitAuthentication";
import {TextField} from "sis-aeb-inputs";
import DropDownField from "../components/shared/inputs/dropdown/DropDownField";
import DateField from "../components/shared/inputs/date/DateField";
import Selector from "../components/shared/misc/selector/Selector";

export default function authenticate() {
    const router = useRouter()
    const lang = AuthenticatePT
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        error: false,
        message: ''
    })

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
        <>
            <Alert
                type={'error'} message={error.message} render={error.error} rootElementID={'root'}
                handleClose={() => setError({error: false, message: ''})}
            />
            <Head>
                <title>{lang.title}</title>

                <link rel="icon" href={"/LOGO.png"} type="image/x-icon"/>
            </Head>

            <div className={styles.pageContainer}>

                <div className={[styles.inputContainer, loading ? styles.loading : ''].join(' ')}>
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
                        })} locale={router.locale} value={data.email}
                        width={'100%'}
                        maxLength={undefined}/>

                    <TextField
                        placeholder={lang.password} label={lang.password}
                        handleChange={event => handleObjectChange({
                            event: {
                                name: 'password',
                                value: event.target.value
                            }, setData: setData
                        })} locale={router.locale} value={data.password}
                        width={'100%'} passwordMask={true} type={'password'}
                        maxLength={undefined}/>

                    <Button
                        onClick={() => submitAuthentication({
                            email: data.email,
                            password: data.password,
                            setError: setError,
                            setLoading: setLoading
                        }).then(res => {
                                if (res)
                                    router.push('/', '/', {locale: router.locale})
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
            </div>
        </>
    )
}