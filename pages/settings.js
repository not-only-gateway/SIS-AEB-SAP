import Layout from "../components/shared/layout/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import style from '../styles/pages/settings/Settings.module.css'
import {createMuiTheme, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {iconStyle} from "../styles/components/navigation/BarMaterialStyles";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness3RoundedIcon from "@material-ui/icons/Brightness3Rounded";
import {ThemeProvider} from "@material-ui/styles";
import {getLanguage} from "../utils/shared/Language";
import Cookies from "universal-cookie/lib";
import AccordionLayout from "../components/shared/layout/AccordionLayout";
import changeTheme from "../utils/shared/ChangeTheme";
import changeLanguage from "../utils/shared/ChangeLanguage";

export default function Settings() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
        const currentLocale = (new Cookies()).get('lang')

        if (currentLocale !== undefined && currentLocale !== router.locale) {
            router.push('/settings', '/settings', {locale: currentLocale}).catch(r => console.log(r))
            setLang(getLanguage(router.locale, router.pathname))
        } else
            setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale])

    if (lang !== null)
        return (
            <Layout>
                {props =>
                    <ThemeProvider theme={createMuiTheme({
                        palette: {
                            type: props.dark ? "dark" : "light"
                        }
                    })}>
                        <props.getTitle pageName={lang.settings} pageTitle={lang.settings} pageInfo={lang.information}/>
                        <div className={style.settings_components_container}>
                            <AccordionLayout
                                content={
                                    <FormControl component="fieldset" style={{paddingLeft: '10px'}}>
                                        <RadioGroup onChange={event => changeLanguage({
                                            event: event,
                                            router: router,
                                            path: '/settings',
                                            setLang: setLang
                                        })}
                                                    value={props.locale}>
                                            {[{value: 'Português', key: 'pt'}, {
                                                value: 'English',
                                                key: 'en'
                                            }, {value: 'Español', key: 'es'}].map(choice => {
                                                return <FormControlLabel value={choice.key} control={<Radio/>}
                                                                         label={choice.value}/>
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                }
                                summary={
                                    <legend>{lang.language}</legend>
                                }
                                closedSize={22}
                                openSize={22}
                            />


                            <AccordionLayout
                                content={
                                    <FormControl component="fieldset" style={{paddingLeft: '10px'}}>
                                        <RadioGroup onChange={() => changeTheme({
                                            changeTheme: props.setDark,
                                            currentTheme: props.dark
                                        })} value={props.dark}>
                                           <FormControlLabel value={false} control={<Radio/>} label={
                                             <div className={style.theme_container}>
                                                 <p>Light</p>
                                                 <Brightness7RoundedIcon style={{...iconStyle, ...{color: !props.dark ? '#777777' : '#ededed'}}}/>
                                             </div>
                                           }/>
                                            <FormControlLabel value={true} control={<Radio/>} label={
                                                <div className={style.theme_container}>
                                                    <p>Dark</p>
                                                    <Brightness3RoundedIcon style={{...iconStyle, ...{color: !props.dark ? '#777777' : '#ededed'}}}/>
                                                </div>
                                            }/>
                                        </RadioGroup>
                                    </FormControl>
                                    }
                                summary={
                                    <legend>{lang.theme}</legend>
                                }
                                closedSize={22}
                                openSize={22}
                            />

                            {(new Cookies()).get('jwt') !== undefined ?
                                <AccordionLayout
                                    content={
                                        null
                                    }
                                    summary={
                                        <legend>Role</legend>
                                    }
                                    closedSize={22}
                                    openSize={22}
                                />
                                :
                                null
                            }
                        </div>

                    </ThemeProvider>
                }
            </Layout>
        )
    else
        return <></>
}
