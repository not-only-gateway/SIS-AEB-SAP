import styles from '../../styles/pages/auththentication/Auth.module.css'
import {Button, IconButton, InputBase, MenuItem, Paper, Select} from "@material-ui/core";
import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import React from "react";
import Brightness7RoundedIcon from '@material-ui/icons/Brightness7Rounded';
import Brightness3RoundedIcon from '@material-ui/icons/Brightness3Rounded';

import en from "../../locales/signin/SignInEN";
import es from "../../locales/signin/SignInES";
import pt from "../../locales/signin/SignInPT";
import {
    buttonStyle,
    iconStyle,
    inputStyle,
    paperStyle,
    secondaryButtonStyle
} from "../../styles/pages/auththentication/AuthMaterialStyles";
import PropTypes from 'prop-types'
import signIn from "../../utils/authentication/SignIn";
import changeTheme from "../../utils/shared/ChangeTheme";
import changeLanguage from "../../utils/shared/ChangeLanguage";

export default function AuthenticateLayout(props) {

    function disabledAuthenticate() {
        return (props.password === '' || props.password.length < 8 || props.email === '')
    }

    return (
        <div className={styles.forms_container}>

            <div>
                <p style={{fontSize: '1.7rem', fontWeight: '550', textAlign: 'left'}}>{props.lang.signin} </p>
                <p style={{fontSize: '.85rem', textAlign: 'left'}}>{props.lang.signinWelcomeText}</p>
            </div>
            <div className={styles.form_fields_container}>
                <Paper component="form"
                       style={{...paperStyle, ...{backgroundColor: !props.dark ? '#f7f8fa' : '#272e38'}}}>
                    <InputBase
                        placeholder={"Email"}
                        style={{...inputStyle, ...{color: props.dark ? 'white' : 'black'}}}
                        onChange={event => props.setEmail(event.target.value)}
                    />
                </Paper>

                <Paper component="form"
                       style={{...paperStyle, ...{backgroundColor: !props.dark ? '#f7f8fa' : '#272e38'}}}>
                    <InputBase
                        placeholder={props.lang.password}
                        type={props.visible ? 'text' : 'password'}
                        style={{...inputStyle, ...{color: props.dark ? 'white' : 'black'}}}
                        onChange={event => props.setPassword(event.target.value)}
                    />
                    <IconButton aria-label="password"
                                style={{...iconStyle, ...{color: props.dark ? 'white' : '#777777'}}}
                                onClick={() => props.setVisible(!props.visible)}>
                        {props.visible ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                    </IconButton>
                </Paper>

                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant={"outlined"} style={{
                        ...buttonStyle,
                        ...{
                            backgroundColor: disabledAuthenticate() ? (props.dark ? '#272e38' : '#f7f8fa') : '#39adf6',
                            color: disabledAuthenticate() ? (props.dark ? 'white' : '#777777') : 'white'
                        }
                    }}
                            disabled={disabledAuthenticate()}
                            onClick={() => signIn({
                                email: props.email,
                                password: props.password,
                                router: props.router,
                                locale: props.locale
                            })}
                    >
                        {props.lang.signin}
                    </Button>
                    <Button
                        style={{...secondaryButtonStyle, ...{color: props.dark ? 'white' : '#777777'}}}>{props.lang.forgotPassword}</Button>
                </div>
                <div className={styles.footer_container}>
                    <Button style={{height: 'fit-content'}} onClick={() => changeTheme({
                        currentTheme: props.dark,
                        setTheme: props.setDark
                    })}>
                        {!props.dark ? <Brightness7RoundedIcon style={{...iconStyle, ...{color: '#777777'}}}/> :
                            <Brightness3RoundedIcon style={{...iconStyle, ...{color: 'white'}}}/>}
                    </Button>
                    <Button
                        style={{...secondaryButtonStyle, ...{color: props.dark ? 'white' : '#777777'}}}>{props.lang.help}</Button>
                    <Button
                        style={{...secondaryButtonStyle, ...{color: props.dark ? 'white' : '#777777'}}}>{props.lang.about}</Button>
                    <Select
                        labelId="select-id"
                        disableUnderline
                        style={{
                            textTransform: 'none',
                            fontSize: '.8rem',
                            color: props.dark ? 'white' : '#777777',
                            fontWeight: '450'
                        }}
                        value={props.locale}
                        onChange={event => changeLanguage({
                            event: event,
                            setLang: props.setLang,
                            router: props.router,
                            path: '/signin'
                        })}
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

                </div>
            </div>
        </div>
    )
}

AuthenticateLayout.propTypes = {
    dark: PropTypes.bool,
    lang: PropTypes.object,
    locale: PropTypes.string,
    authenticate: PropTypes.func,
    setEmail: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
    setPassword: PropTypes.func,
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    router: PropTypes.object,
    setDark: PropTypes.func,
    setLang: PropTypes.func
}


