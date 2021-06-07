import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie/lib";

import {useRouter} from "next/router";
import styles from '../styles/Authenticate.module.css'
import Head from "next/head";
import {Button} from "@material-ui/core";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import submitSignIN from "../utils/submit/SubmitSignIN";
import Alert from "../components/layout/Alert";
import TextField from "../components/inputs/TextField";
import AuthenticatePT from "../packages/locales/authenticate/AuthenticatePT";

export default function authenticate() {
    const router = useRouter()
    const lang = AuthenticatePT
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

    }, [])

    return (
        <>
            <Alert
                type={'error'} message={error.message} render={error.error}
                handleClose={() => setError({error: false, message: ''})}
            />
            <Head>
                <title>{lang.title}</title>

                <link rel="icon" href={"/LOGO.png"} type="image/x-icon"/>
            </Head>

            <div className={styles.pageContainer}>
                <div className={styles.logoHalf}>
                    {/*<div className={styles.logoContainer}>*/}
                    <img src={'/dark.png'} className={styles.logoImage} alt={'logo'}/>
                    {/*</div>*/}
                </div>
                <div className={styles.inputHalf}>
                    <div className={styles.inputContentContainer}>
                        <p style={{fontSize: '1.6rem',}}>
                            {lang.welcome}
                        </p>


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
                            width={'100%'} passwordMask={true}
                            maxLength={undefined}/>


                        <Button
                            onClick={() => submitSignIN({
                                email: data.email,
                                password: data.password,
                                setError: setError
                            }).then(res => {
                                    if (res)
                                        router.push('/', '/', {locale: router.locale})
                                }
                            )}
                            disabled={data.email.length < 12 || data.password.length < 8}
                            style={{
                                textTransform: 'none',
                                backgroundColor: data.email.length < 12 || data.password.length < 8 ? '#f4f5fa' : '#0095ff',
                                color: data.email.length < 12 || data.password.length < 8 ? null : 'white',
                                width: '100%'
                            }}>{lang.authenticate}</Button>
                    </div>
                </div>
            </div>
        </>
    )
}