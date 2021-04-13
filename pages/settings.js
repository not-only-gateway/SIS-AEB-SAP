import Layout from "../components/shared/layout/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import style from '../styles/pages/settings/Settings.module.css'
import {createMuiTheme, Divider, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {iconStyle} from "../styles/components/navigation/BarMaterialStyles";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness3RoundedIcon from "@material-ui/icons/Brightness3Rounded";
import {ThemeProvider} from "@material-ui/styles";
import {getLanguage, setCookiesLanguage} from "../utils/shared/Language";
import Cookies from "universal-cookie/lib";
import AccordionLayout from "../components/shared/layout/AccordionLayout";
import fetchSettingsData from "../utils/settings/FetchData";
import {readCollaboration} from "../utils/shared/IndexedDB";
import shared from '../styles/shared/Shared.module.css'

export default function Settings() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [collaborations, setCollaborations] = useState([])
    const [currentCollaboration, setCurrentCollaboration] = useState(null)

    useEffect(() => {
        console.log(location.pathname)
        readCollaboration().then(res => setCurrentCollaboration(res))
        if ((new Cookies()).get('jwt') !== undefined)
            fetchSettingsData().then(res => setCollaborations(res))
        setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale, router.isReady])


    function changeLanguage(event){
        console.log(event.target.value)
        const newLocale = event.target.value
        const newLang = getLanguage(newLocale, '/settings')
        setCookiesLanguage(newLocale)

        router.push('/settings', '/settings', {locale: newLocale})

        setLang(newLang)
    }

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
                                        <RadioGroup onChange={changeLanguage}
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
                                    <div className={shared.accordionTitle}>
                                        <p >{lang.language}</p>
                                        <Divider style={{width: '10px', marginLeft: '10px', marginRight: '10px'}} orientation={'horizontal'}/>
                                        <p>{props.locale === 'pt' ? 'Português' : props.locale === 'es' ? 'Español' : 'English'}</p>
                                    </div>
                                }
                                key={'language - settings'}
                                closedSize={22}
                                openSize={22}
                                dark={props.dark}
                                disabled={false}
                                border={null}
                            />


                            <AccordionLayout
                                content={
                                    <FormControl component="fieldset" style={{paddingLeft: '10px'}}>
                                        <RadioGroup onChange={() => props.changeTheme()} value={props.dark}>
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
                                    <div className={shared.accordionTitle}>
                                        <p >{lang.theme}</p>
                                        <Divider style={{width: '10px', marginLeft: '10px', marginRight: '10px'}} orientation={'horizontal'}/>
                                        <p>{props.dark ? 'Dark' : 'Light'}</p>
                                    </div>
                                }
                                key={'theme - settings'}
                                closedSize={22}
                                openSize={22}
                                dark={props.dark}
                                disabled={false}
                                border={null}
                            />

                            {(new Cookies()).get('jwt') !== undefined && currentCollaboration !== null?
                                <AccordionLayout
                                    content={
                                        <FormControl component="fieldset" style={{paddingLeft: '10px'}}>
                                            <RadioGroup value={currentCollaboration.id}>
                                                {collaborations.map(collaboration => {
                                                    console.log(collaboration)
                                                    return <FormControlLabel value={collaboration.collaboration.id} control={<Radio/>} label={collaboration.unit.acronym}/>
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    }
                                    summary={
                                        <div className={shared.accordionTitle}>
                                            <p >Collaboration</p>
                                            <Divider style={{width: '10px', marginLeft: '10px', marginRight: '10px'}} orientation={'horizontal'}/>
                                            <p>{currentCollaboration.unitAcronym}</p>
                                        </div>
                                    }
                                    key={'collaboration - settings'}
                                    closedSize={22}
                                    openSize={22}
                                    dark={props.dark}
                                    disabled={false}
                                    border={null}
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
