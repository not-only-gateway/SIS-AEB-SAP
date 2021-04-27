import Cookies from 'universal-cookie/lib'
import styles from '../styles/auththentication/Auth.module.css'
import {
    Button,
    createMuiTheme,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    ThemeProvider
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import {getLanguage} from "../utils/shared/Language";
import signIn from "../utils/authentication/SignIn";
import signOut from "../utils/authentication/SignOut";
import ClearStorage from "../utils/authentication/ClearStorage";
import mainStyles from '../styles/shared/Main.module.css'
import InputLayout from "../components/modules/InputLayout";
import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import {getTertiaryColor} from "../styles/shared/MainStyles";

const cookies = new Cookies()
export default function Signin() {

    const [dark, setDark] = useState(false)
    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if ((new Cookies()).get('jwt') !== undefined)
            signOut().then(res => {
                if (res)
                    ClearStorage()
                else
                    router.push('/', '/', {locale: router.locale})
            })
        else
            ClearStorage()
        setLang(getLanguage(router.locale, router.pathname))

        setDark(cookies.get('theme') === '0')

        if (router.isReady && (new Cookies()).get('lang') !== undefined && (new Cookies()).get('lang') !== router.locale) {
            router.push('/signin', '/signin', {locale: (new Cookies()).get('lang')}).catch(r => console.log(r))
            setLang(getLanguage(router.locale, router.pathname))
        } else
            setLang(getLanguage(router.locale, router.pathname))


    }, [router.locale, router.isReady])

    function handleChange(event) {

        if (event.name === 'email')
            setEmail(event.value)
        else
            setPassword(event.value)
    }

    async function authenticate() {
        await signIn({
            email: email,
            password: password,
            locale: router.locale
        }).then(() => router.push('/', '/', {locale: router.locale}))
    }

    if (lang !== null)
        return (
            <div className={styles.pageContainer}>
                <Head>
                    <title>{lang.signin}</title>
                </Head>

                <div className={styles.signInContainer}>
                    <div style={{
                        display: 'grid',
                        justifyItems: 'center',
                        height: 'fit-content',
                        gap: '10px',
                    }}>
                        <img src={'./newnew.png'} style={{width: '50%'}}/>
                        <div style={{
                            display: 'grid',
                            justifyItems: 'center',
                            gap: '5px',

                        }}>
                            <span style={{fontSize: '1.5rem'}}>{lang.signin}</span>
                            <span className={mainStyles.tertiaryParagraph}
                                  style={getTertiaryColor({dark: false})}>{lang.signinWelcomeText}</span>
                        </div>
                    </div>
                    <InputLayout inputName={'Email'} dark={false}
                                 handleChange={handleChange} name={'email'}
                                 inputType={0} disabled={false} size={'100%'} required={false}
                                 initialValue={email} key={"1-1"} setChanged={undefined}/>
                    <div style={{width: '100%'}}>

                        <FormControl variant="outlined" style={{width: '100%'}}>
                            <InputLabel htmlFor="password">{lang.password}</InputLabel>
                            <OutlinedInput

                                id="password"
                                type={visible ? 'text' : 'password'}
                                value={password}
                                onChange={event => handleChange({name: 'password', value: event.target.value})}
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
                    <Button variant={'contained'} onClick={authenticate} disabled={email.length < 12 || password < 8}
                            style={{
                                textTransform: 'none',
                                backgroundColor: email.length < 12 || password < 8 ? null : '#0095ff',
                                color: email.length < 12 || password < 8 ? null : 'white'
                            }}>{lang.signin}</Button>
                </div>
            </div>
        )
    else
        return <></>
}
