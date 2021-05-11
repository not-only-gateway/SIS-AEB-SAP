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

export default function authenticate() {
    const router = useRouter()
    const [lang, setLang] = useState(null)
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
                <Head>
                    <title>{lang.title}</title>
                </Head>

                <div className={styles.pageContainer}>
                    <div className={styles.logoHalf}>
                        {/*<div className={styles.logoContainer}>*/}
                        <img src={'/dark.png'} className={styles.logoImage} alt={'logo'}/>
                        {/*</div>*/}
                    </div>
                    <div className={styles.inputHalf}>
                        <div className={styles.welcomeContainer}>
                            <h5 className={styles.headerContainer}>
                                {lang.welcome}
                            </h5>
                            <h3 className={styles.headerContainer}>
                                {lang.authenticate}
                            </h3>
                        </div>

                        <div className={styles.inputContainer}>

                            <InputLayout inputName={'Email'} dark={false}
                                         handleChange={event => handleObjectChange({event: event, setData: setData})}
                                         inputType={0} disabled={false} size={'100%'} required={false}
                                         name={'email'}
                                         initialValue={data.email} setChanged={undefined}/>
                            <div style={{width: '100%'}}>

                                <FormControl variant="outlined" style={{width: '100%'}}>
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

                                <Button disabled style={{textTransform: 'none'}}>
                                    {lang.forgotPassword}
                                </Button>
                            </div>
                            <div style={{display: 'flex', width: '100%'}}>

                                <Button variant={'contained'}
                                        onClick={() => submitSignIN({
                                            email: data.email,
                                            password: data.password
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
                                <Button style={{color: '#555555', textTransform: 'none', marginLeft: 'auto'}} onClick={() => router.push({pathname: '/'})}>{lang.access}</Button>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        )
    else
        return null
}