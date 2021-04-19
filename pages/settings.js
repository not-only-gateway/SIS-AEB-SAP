import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import style from '../styles/settings/Settings.module.css'
import {Button, createMuiTheme, Divider, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness3RoundedIcon from "@material-ui/icons/Brightness3Rounded";
import {ThemeProvider} from "@material-ui/styles";
import {getLanguage, setCookiesLanguage} from "../utils/shared/Language";
import Cookies from "universal-cookie/lib";
import AccordionLayout from "../components/shared/layout/AccordionLayout";
import fetchSettingsData from "../utils/settings/FetchData";
import {readAccessProfile, readCollaboration} from "../utils/shared/IndexedDB";
import shared from '../styles/shared/Shared.module.css'
import {
    getBorder,
    getIconStyle,
    getSecondaryBackground, getPrimaryColor,
    getPrimaryBackground,
    getSecondaryColor,
    getTertiaryColor
} from "../styles/shared/MainStyles";
import mainStyles from '../styles/shared/Main.module.css'
import Link from "next/link";
import {HistoryRounded} from "@material-ui/icons";
import GetPageTitle from "../utils/shared/GetPageTitle";
import getPageInfo from "../utils/index/GetPageInfo";
import IndexComponent from "../components/index/IndexComponent";

export default function Settings() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [collaborations, setCollaborations] = useState([])
    const [currentCollaboration, setCurrentCollaboration] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [dark, setDark] = useState(false)
    useEffect(() => {
        setDark((new Cookies()).get('theme') === 0)
        if (collaborations.length === 0) {
            readCollaboration().then(res => {
                if (res !== null) {
                    setCurrentCollaboration(res)
                    fetchSettingsData().then(res => setCollaborations(res))
                }
            })
        }
        if (accessProfile === null)
            readAccessProfile().then(res => setAccessProfile(res))
        setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale, router.isReady])


    function changeLanguage(event) {
        const newLocale = event.target.value
        const newLang = getLanguage(newLocale, '/settings')
        setCookiesLanguage(newLocale)

        router.push('/settings', '/settings', {locale: newLocale})

        setLang(newLang)
    }

    if (lang !== null)
        return (
            <ThemeProvider theme={createMuiTheme({
                palette: {
                    type: dark ? "dark" : "light"
                }
            })}>
                <GetPageTitle pageName={lang.settings} pageTitle={lang.settings} pageInfo={lang.information}
                              dark={dark}/>


                <div className={[mainStyles.normalBorder, mainStyles.displayWarp, mainStyles.baseWidth].join(' ')}
                     style={{
                         ...getSecondaryBackground({dark: dark}), ...{
                             justifyContent: 'center'
                         }
                     }}>
                    <div className={[mainStyles.normalBorder, mainStyles.displayWarp].join(' ')}
                         style={{marginTop: '2vh', marginBottom: '2vh', width: '60vw'}}>

                        <AccordionLayout
                            content={
                                <FormControl component="fieldset"
                                             style={{...{paddingLeft: '10px'}, ...getSecondaryColor({dark: dark})}}>
                                    <RadioGroup onChange={changeLanguage}
                                                value={router.locale}>
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
                                    <p className={mainStyles.secondaryParagraph}>{lang.language}</p>
                                    <Divider style={{width: '10px', marginLeft: '10px', marginRight: '10px'}}
                                             orientation={'horizontal'}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark: dark})}>{router.locale === 'pt' ? 'Português' : router.locale === 'es' ? 'Español' : 'English'}</p>
                                </div>
                            }
                            key={'language - settings'}
                            closedSize={29.6}
                            openSize={29.6}
                            dark={dark}
                            disabled={false}
                            border={null}
                        />


                        <AccordionLayout
                            content={
                                <FormControl component="fieldset"
                                             style={{...{paddingLeft: '10px'}, ...getSecondaryColor({dark: dark})}}>
                                    <RadioGroup onChange={() => props.changeTheme()} value={dark}>
                                        <FormControlLabel value={false} control={<Radio/>} label={
                                            <div className={style.theme_container}>
                                                <p>Light</p>
                                                <Brightness7RoundedIcon style={getIconStyle({dark: dark})}/>
                                            </div>
                                        }/>
                                        <FormControlLabel value={true} control={<Radio/>} label={
                                            <div className={style.theme_container}>
                                                <p>Dark</p>
                                                <Brightness3RoundedIcon style={getIconStyle({dark: dark})}/>
                                            </div>
                                        }/>
                                    </RadioGroup>
                                </FormControl>
                            }
                            summary={
                                <div className={shared.accordionTitle}>
                                    <p className={mainStyles.secondaryParagraph}>{lang.theme}</p>
                                    <Divider style={{width: '10px', marginLeft: '10px', marginRight: '10px'}}
                                             orientation={'horizontal'}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark: dark})}>{dark ? 'Dark' : 'Light'}</p>
                                </div>
                            }
                            key={'theme - settings'}
                            closedSize={29.6}
                            openSize={29.6}
                            dark={dark}
                            disabled={true}
                            border={null}
                        />

                        {(new Cookies()).get('jwt') !== undefined && currentCollaboration !== null ?
                            <AccordionLayout
                                content={
                                    <FormControl component="fieldset"
                                                 style={{...{paddingLeft: '10px'}, ...getSecondaryColor({dark: dark})}}>
                                        <RadioGroup value={currentCollaboration.id}>
                                            {collaborations.map(collaboration => {
                                                console.log(collaboration)
                                                return <FormControlLabel value={collaboration.collaboration.id}
                                                                         control={<Radio/>}
                                                                         label={collaboration.unit.acronym}/>
                                            })}
                                        </RadioGroup>
                                    </FormControl>
                                }
                                summary={
                                    <div className={shared.accordionTitle}>
                                        <p className={mainStyles.secondaryParagraph}>{lang.collaboration}</p>
                                        <Divider style={{width: '10px', marginLeft: '10px', marginRight: '10px'}}
                                                 orientation={'horizontal'}/>
                                        <p className={mainStyles.tertiaryParagraph}
                                           style={getTertiaryColor({dark: dark})}>{currentCollaboration.unitAcronym}</p>
                                    </div>
                                }
                                key={'collaborations - settings'}
                                closedSize={29.6}
                                openSize={29.6}
                                dark={dark}
                                disabled={false}
                                border={null}
                            />
                            :
                            null
                        }
                        {accessProfile !== null && accessProfile.canViewActivityLog ?
                            <div style={{
                                width: '29.6vw',
                                border: !dark ? '#e5e6e8 1px solid' : 'initial',
                                borderRadius: '8px'
                            }}>
                                <Link href={{pathname: '/activity', locale: router.locale}}>
                                    <Button style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        textTransform: 'none'
                                    }}>

                                        <HistoryRounded style={{...getIconStyle({dark: dark}), ...getPrimaryColor({dark: dark})}}/>
                                        <p className={mainStyles.secondaryParagraph}
                                           style={getSecondaryColor({dark: dark})}>{lang.activity}</p>
                                    </Button>
                                </Link>
                            </div> :
                            null
                        }
                    </div>
                </div>

            </ThemeProvider>

        )
    else
        return <></>
}
