import Head from 'next/head'
import Cookies from 'universal-cookie/lib'
import styles from '../styles/auth/Auth.module.css'
import {Button, createMuiTheme, IconButton, InputBase, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import {SearchRounded, VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import {useEffect, useState} from "react";
import Brightness7RoundedIcon from '@material-ui/icons/Brightness7Rounded';
import Brightness3RoundedIcon from '@material-ui/icons/Brightness3Rounded';
import {setTheme} from "../config/Theme";
import {ThemeProvider} from "@material-ui/styles";

import AuthLayout from "../components/AuthLayout";
import setCookiesLanguage from "../config/Language";
import {useRouter} from "next/router";
import en from "../locales/auth/en";
import es from "../locales/auth/es";
import pt from "../locales/auth/pt";
import {
    buttonStyle,
    deactivatedButtonStyle,
    iconStyle,
    inputStyle,
    paperStyle,
    secondaryButtonStyle
} from "../styles/auth/AuthMaterialStyles";

const cookies = new Cookies()


export default function SignIn() {
    const [dark, setDark] =  useState(false)
    const router = useRouter()
    const { locale } = router
    const [lang, setLang] = useState(en)
    const theme = createMuiTheme({
        palette: {
            type: dark ? "dark" : 'light'
        }
    });

    useEffect(() => {
        setDark(cookies.get('theme') === '0')
        if (locale === cookies.get('lang') && typeof cookies.get('lang') !== 'undefined'){
            setCookiesLanguage(locale)
            setLanguage(locale)
        }
        else{
            const locale = cookies.get('lang')
            router.push('/signup', '/signup', {locale}).catch(r => console.log(r))
        }
    }, [])

    const setLanguage = (value) => {
        switch (value){
            case 'en': {
                setLang(en)
                break
            }
            case 'es': {
                setLang(es)
                break
            }
            case 'pt': {
                setLang(pt)
                break
            }
            default:{
                setLang(en)
                break
            }
        }
    }
    const changeTheme = () => {
        setDark(!dark)
        setTheme()
    }

    const changeLang = (event) => {
        setLanguage(event.target.value)
        const locale = event.target.value
        setCookiesLanguage(locale)
        setLanguage(locale)
        router.push('/signin', '/signin', {locale}).catch(r => console.log(r))
    }

    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState(null)
    const [email, setEmail] = useState(null)

    const handleChange = (event) =>{
        if (event.target.name === 'email')
            setEmail(event.target.value)
        else
            setPassword(event.target.value)
    }

    return (
        <AuthLayout dark={dark} lang={lang}>
            <div className={styles.forms_container}>
                <div className={styles.form_content_container} >
                    <div>
                        <p style={{fontSize: '.9rem', marginTop: 'auto'}}>{lang.signinWelcomeText}</p>
                        <p style={{fontSize:'1.7rem', fontWeight:'550', textAlign:'left', marginTop: 'auto'}}>{lang.signin}</p>
                    </div>
                </div>
                <div className={styles.form_fields_container}>
                    <Paper component="form" style={{...paperStyle, ...{backgroundColor: !dark ? '#f7f8fa' : '#272e38'}}} >
                        <InputBase
                            placeholder={"Email"}
                            style={{...inputStyle, ...{color: dark ? 'white' : 'black'}}}
                            name={'email'}
                            onChange={handleChange}
                        />
                    </Paper>

                    <Paper component="form" style={{...paperStyle, ...{backgroundColor: !dark ? '#f7f8fa' : '#272e38'}}} >
                        <InputBase
                            placeholder={lang.password}
                            type={visible ? 'text':'password'}
                            style={{...inputStyle, ...{color: dark ? 'white' : 'black'}}}
                            name={'password'}
                            onChange={handleChange}
                        />
                        <IconButton aria-label="password" style={{...iconStyle, ...{color: dark ? 'white' : '#777777'}}} onClick={() => setVisible(!visible)}>
                            {visible ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                        </IconButton>
                    </Paper>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button variant={"outlined"} style={{...buttonStyle, ...{backgroundColor: (password === null || password === '' || email === null || email === '') ? (dark ? '#272e38' : '#f7f8fa') : '#39adf6', color: (password === null || password === '' || email === null || email === '') ? (dark ? 'white' : '#777777') : 'white'}}} disabled={password === null || password === '' || email === null || email === ''}>{lang.signin}</Button>
                        <Button style={{...secondaryButtonStyle, ...{color: dark ? 'white' : '#777777'}}}>{lang.forgotPassword}</Button>
                    </div>
                    <div className={styles.footer_container}>
                        <Button style={{height: 'fit-content'}} onClick={() => changeTheme()}>
                            {!dark ? <Brightness7RoundedIcon  style={{...iconStyle, ...{color: dark ? 'white' : 'black'}}}/> : <Brightness3RoundedIcon style={{...iconStyle, ...{color: dark ? 'white' : 'black'}}}/>}
                        </Button>
                        <Button style={{...secondaryButtonStyle, ...{color: dark ? 'white' : '#777777'}}}>{lang.help}</Button>
                        <Button style={{...secondaryButtonStyle, ...{color: dark ? 'white' : '#777777'}}}>{lang.about}</Button>
                        <ThemeProvider theme={theme}>
                            <Select
                                labelId="select-id"
                                disableUnderline
                                style={{
                                    textTransform: 'none',
                                    fontSize: '.8rem',
                                    color: dark ? 'white' : '#777777',
                                    fontWeight: '450'
                                }}
                                value={locale}
                                onChange={event => changeLang(event)}
                            >
                                <MenuItem key={"pt"} value="pt">
                                    Português
                                </MenuItem>
                                <MenuItem key={"en"} value="en">
                                    English
                                </MenuItem>
                                <MenuItem key={"es"} value="es">
                                    Español
                                </MenuItem>
                            </Select>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}
