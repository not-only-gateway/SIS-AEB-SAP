import React, {useEffect, useState} from "react";
import Cookies from "universal-cookie/lib";
import submitSignOUT from "../utils/submit/SubmitSignOUT";
import ClearStorage from "../utils/authentication/ClearStorage";
import {getLanguage} from "../utils/shared/PageLanguage";
import {useRouter} from "next/router";
import styles from '../styles/Authenticate.module.css'
import Head from "next/head";
import InputLayout from "../components/modules/InputLayout";
import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import submitSignIN from "../utils/submit/SubmitSignIN";
import Alert from "../components/layout/Alert";

export default function authenticate() {
    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [error, setError] = useState({
        error: false,
        message: ''
    })
    const [visible, setVisible] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if ((new Cookies()).get('jwt') !== undefined)
            submitSignOUT().then(() => {
                ClearStorage()
            })

        setLang(getLanguage(router.locale, router.pathname))


        if (router.isReady && (new Cookies()).get('lang') !== undefined && (new Cookies()).get('lang') !== router.locale) {
            router.push('/authenticate', '/authenticate', {locale: (new Cookies()).get('lang')}).catch(r => console.log(r))
            setLang(getLanguage(router.locale, router.pathname))
        } else
            setLang(getLanguage(router.locale, router.pathname))

    }, [router.locale, router.isReady])

    if (lang !== null)
        return (
            <>
                <Alert
                    type={'error'} message={error.message} render={error.error} duration={5000}
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
                        <div className={styles.welcomeContainer}>
                            <h3 className={styles.headerContainer}>
                                {lang.welcome}
                            </h3>

                        </div>

                        <div className={styles.inputContainer}>
                            <InputLayout inputName={'Email'} dark={false}
                                         handleChange={event => handleObjectChange({event: event, setData: setData})}
                                         inputType={0} disabled={false} size={'65%'} required={false}
                                         name={'email'}
                                         initialValue={data.email} setChanged={undefined}/>

                            <FormControl variant="outlined" style={{width: '65%'}}>
                                <InputLabel htmlFor="password">{lang.password}</InputLabel>
                                <OutlinedInput

                                    id="password"
                                    type={visible ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={event => handleObjectChange({
                                        event: {
                                            name: 'password',
                                            value: event.target.value
                                        }, setData: setData
                                    })}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setVisible(!visible)}

                                                edge="end"
                                            >
                                                {visible ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>
                            <div style={{display: 'flex', width: '65%'}}>

                                <Button variant={'contained'}
                                        onClick={() => submitSignIN({
                                            email: data.email,
                                            password: data.password,
                                            setError: setError
                                        }).then(res => {
                                                if (res)
                                                    router.push('/', '/', {locale: router.locale})
                                            }
                                        )}
                                        disabled={data.email.length < 12 || data.password < 8}
                                        style={{
                                            textTransform: 'none',
                                            backgroundColor: data.email.length < 12 || data.password < 8 ? null : '#0095ff',
                                            color: data.email.length < 12 || data.password < 8 ? null : 'white'
                                        }}>{lang.authenticate}</Button>
                                <Button style={{color: '#555555', textTransform: 'none', marginLeft: 'auto'}}
                                        onClick={() => router.push({pathname: '/'})}>{lang.access}</Button>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    else
        return null
}