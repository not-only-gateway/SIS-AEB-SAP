import Layout from "../components/layout/Layout";
import React, {useState} from "react";
import {useRouter} from "next/router";
import shared from "../styles/Shared.module.css";
import style from '../styles/Settings.module.css'
import {Button, createMuiTheme, MenuItem, Select, Snackbar} from "@material-ui/core";
import {buttonStyle, iconStyle} from "../styles/bar/BarMaterialStyles";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness3RoundedIcon from "@material-ui/icons/Brightness3Rounded";
import {ThemeProvider} from "@material-ui/styles";
import setCookiesLanguage from "../config/Language";
import {setTheme} from "../config/Theme";
import {InfoRounded} from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import Head from "next/head";

export default function Settings() {
    const router = useRouter()
    const { locale } = router

    const changeLang = (event) => {
        const locale = event.target.value
        setCookiesLanguage(locale)
        router.push('/settings', '/settings', {locale}).catch(r => console.log(r))
    }

    return (
        <Layout>
            {props => (
                <div className={shared.content_container} style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
                    <div style={{margin: 'auto', width: '45vw'}}>
                        <p style={{fontSize:'1.7rem', fontWeight:'550', textAlign: 'left'}}>Settings</p>
                        <p style={{fontSize:'.9rem', textAlign: 'left'}}>Info about settings</p>
                    </div>

                        <div className={style.settings_container} >

                            <div className={style.setting_row_container} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                                <p>Theme</p>
                                <ThemeProvider theme={createMuiTheme({
                                    palette: {
                                        type: props.dark ? "dark" : 'light'
                                    }
                                })}>
                                    <Button style={{...{color: props.dark ? 'white' : '#111111'}}} onClick={() => props.changeTheme()} >
                                        {!props.dark ? <Brightness7RoundedIcon  style={{...iconStyle, ...{color: !props.dark ? '#777777' : '#ededed'}}}/> : <Brightness3RoundedIcon style={{...iconStyle, ...{color: !props.dark ? '#777777' : '#ededed'}}}/>}
                                    </Button>
                                </ThemeProvider>
                            </div>
                            <div className={style.setting_row_container} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                                <p>Language</p>

                                <ThemeProvider theme={createMuiTheme({
                                    palette: {
                                        type: props.dark ? "dark" : 'light'
                                    }
                                })}>
                                    <Select
                                        labelId="select-id"
                                        disableUnderline
                                        style={{
                                            textTransform: 'none',
                                            fontSize: '.8rem',
                                            color: props.dark ? 'white' : '#777777',
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
            )
            }

        </Layout>
    )
}
