import styles from '../../styles/auththentication/Auth.module.css'
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
} from "../../styles/auththentication/AuthMaterialStyles";
import PropTypes from 'prop-types'
import {getSecondaryColor} from "../../styles/shared/MainStyles";

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
                                style={{...iconStyle, ...getSecondaryColor({dark: props.dark})}}
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
                            onClick={() =>
                                props.authenticate()
                            }
                    >
                        {props.lang.signin}
                    </Button>
                    <Button
                        style={{...secondaryButtonStyle, ...getSecondaryColor({dark: props.dark})}}>{props.lang.forgotPassword}</Button>
                </div>
                <div className={styles.footer_container}>
                    <Button style={{height: 'fit-content'}} onClick={() => props.changeTheme()}>
                        {!props.dark ? <Brightness7RoundedIcon style={{...iconStyle, ...{color: '#777777'}}}/> :
                            <Brightness3RoundedIcon style={{...iconStyle, ...{color: 'white'}}}/>}
                    </Button>
                    <Button
                        style={{...secondaryButtonStyle(), ...getSecondaryColor({dark: props.dark})}}>{props.lang.help}</Button>
                    <Button
                        style={{...secondaryButtonStyle(), ...getSecondaryColor({dark: props.dark})}}>{props.lang.about}</Button>
                    <Select
                        labelId="select-id"
                        disableUnderline
                        style={{
                            textTransform: 'none',
                            fontSize: '.8rem',
                            fontWeight: '450'
                        }}
                        value={props.locale}
                        onChange={event =>
                            props.changeLang(event)
                        }
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
    authenticate: PropTypes.func,
    setEmail: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
    setPassword: PropTypes.func,
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    setDark: PropTypes.func,
    setLang: PropTypes.func,
    changeLang: PropTypes.func,
    locale: PropTypes.string,
    changeTheme: PropTypes.func
}

