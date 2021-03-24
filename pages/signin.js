import Head from 'next/head'
import Cookies from 'universal-cookie/lib'
import styles from '../styles/auth/Auth.module.css'
import {Button, IconButton, InputBase, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import {useEffect, useState} from "react";
import Brightness7RoundedIcon from '@material-ui/icons/Brightness7Rounded';
import Brightness3RoundedIcon from '@material-ui/icons/Brightness3Rounded';
import {setTheme} from "../config/Theme";
import {ThemeProvider} from "@material-ui/styles";
import AuthLayout from "../components/layout/AuthLayout";
import setCookiesLanguage from "../config/Language";
import {useRouter} from "next/router";
import en from "../locales/auth/en";
import es from "../locales/auth/es";
import pt from "../locales/auth/pt";
import {
    buttonStyle,
    iconStyle,
    inputStyle,
    paperStyle,
    secondaryButtonStyle
} from "../styles/auth/AuthMaterialStyles";
import axios from 'axios'
import React from 'react'
import ClearStorage from "../config/ClearStorage";

const cookies = new Cookies()

export default class SignIn extends React.Component {
    state={
        visible: false,
        password: null,
        email: null,
    }

    render() {
        return (
            <AuthLayout>
                {props => (
                    <div className={styles.forms_container}>
                        <Head>
                            <title>{props.lang.signin}</title>
                        </Head>
                        <div className={styles.form_content_container} >
                            <div>
                                <p style={{fontSize: '.9rem', marginTop: 'auto'}}>{props.lang.signinWelcomeText}</p>
                                <p style={{fontSize:'1.7rem', fontWeight:'550', textAlign:'left'}}> {props.lang.signin} </p>
                            </div>
                        </div>
                        <div className={styles.form_fields_container}>
                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !props.dark ? '#f7f8fa' : '#272e38'}}} >
                                <InputBase
                                    placeholder={"Email"}
                                    style={{...inputStyle, ...{color: props.dark ? 'white' : 'black'}}}
                                    onChange={event => this.setState({
                                        email: event.target.value
                                    })}
                                />
                            </Paper>

                            <Paper component="form" style={{...paperStyle, ...{backgroundColor: !props.dark ? '#f7f8fa' : '#272e38'}}} >
                                <InputBase
                                    placeholder={props.lang.password}
                                    type={this.state.visible ? 'text':'password'}
                                    style={{...inputStyle, ...{color: props.dark ? 'white' : 'black'}}}
                                    onChange={event => this.setState({
                                        password: event.target.value
                                    })}
                                />
                                <IconButton aria-label="password" style={{...iconStyle, ...{color: props.dark ? 'white' : '#777777'}}} onClick={() => this.setState({
                                    visible: !this.state.visible
                                })}>
                                    {this.state.visible ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                                </IconButton>
                            </Paper>

                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button variant={"outlined"} style={{...buttonStyle,
                                    ...{backgroundColor: (this.state.password === null || this.state.password === '' ||this.state.password.length < 8 || this.state.email === null || this.state.email === '') ? (props.dark ? '#272e38' : '#f7f8fa') : '#39adf6',
                                        color: (this.state.password === null || this.state.password === '' || this.state.password.length < 8 || this.state.email === null || this.state.email === '') ? (props.dark ? 'white' : '#777777') : 'white'}}}
                                        disabled={this.state.password === null || this.state.password === '' || this.state.password.length < 8 || this.state.email === null || this.state.email === ''}
                                        onClick={() => props.authenticate(this.state.email, this.state.password)}
                                >
                                    {props.lang.signin}
                                </Button>
                                <Button style={{...secondaryButtonStyle, ...{color: props.dark ? 'white' : '#777777'}}}>{props.lang.forgotPassword}</Button>
                            </div>
                            <div className={styles.footer_container}>
                                <Button style={{height: 'fit-content'}} onClick={() => props.changeTheme()}>
                                    {!props.dark ? <Brightness7RoundedIcon  style={{...iconStyle, ...{color: '#777777'}}}/> : <Brightness3RoundedIcon style={{...iconStyle, ...{color: 'white'}}}/>}
                                </Button>
                                <Button style={{...secondaryButtonStyle, ...{color: props.dark ? 'white' : '#777777'}}}>{props.lang.help}</Button>
                                <Button style={{...secondaryButtonStyle, ...{color: props.dark ? 'white' : '#777777'}}}>{props.lang.about}</Button>
                                <ThemeProvider theme={props.theme}>
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
                                        onChange={event => props.changeLang(event)}
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
                )}
            </AuthLayout>
        )
    }
}
