import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import style from '../styles/settings/Settings.module.css'
import {Button, createMuiTheme, Divider, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import Brightness7RoundedIcon from "@material-ui/icons/Brightness7Rounded";
import Brightness3RoundedIcon from "@material-ui/icons/Brightness3Rounded";
import {ThemeProvider} from "@material-ui/styles";
import {getLanguage, setCookiesLanguage} from "../utils/shared/PageLanguage";
import Cookies from "universal-cookie/lib";
import Accordion from "../components/layout/Accordion";
import fetchSettingsData from "../utils/settings/FetchData";
import {readAccessProfile, readCollaboration} from "../utils/shared/IndexedDB";
import shared from '../styles/shared/Shared.module.css'
import {getIconStyle, getPrimaryColor, getSecondaryColor, getTertiaryColor} from "../styles/shared/MainStyles";
import mainStyles from '../styles/shared/Main.module.css'
import Link from "next/link";
import {HistoryRounded} from "@material-ui/icons";
import GetPageTitle from "../utils/shared/GetPageTitle";
import animations from "../styles/shared/Animations.module.css";
import HeaderLayout from "../components/layout/HeaderLayout";
import ExtensionsFilters from "../components/modules/filters/ExtensionsFilters";
import ExtensionsSearch from "../components/elements/ExtensionsSearch";

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
            <>
                <HeaderLayout
                    tab={undefined}
                    filterComponent={undefined}
                    pageTitle={lang.extensions}
                    title={lang.settings}
                    information={lang.information}
                    searchComponent={undefined}
                />
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
                    <div className={mainStyles.displayWarp} style={{marginTop: '50px', width: '75%'}}>
                        <Accordion
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
                            closedSize={31}
                            openSize={31}
                            animationDelay={100}
                            dark={dark}
                        />


                        <Accordion
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
                            closedSize={31}
                            openSize={31}
                            disabled={true}
                            animationDelay={200}
                            dark={dark}
                        />

                        {(new Cookies()).get('jwt') !== undefined && currentCollaboration !== null ?
                            <Accordion
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
                                closedSize={31}
                                openSize={31}
                                dark={dark}
                                animationDelay={300}
                            />
                            :
                            null
                        }
                        {accessProfile !== null && accessProfile.canViewActivityLog ?

                            <Link href={{pathname: '/activity', locale: router.locale}}>
                                <Button style={{
                                    height: '65px',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    textTransform: 'none', width: '31%',
                                    border: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
                                    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                                    borderRadius: '8px',
                                    opacity: 0,
                                    animationDelay: '400ms'
                                }} className={animations.slideUpAnimation}>

                                    <HistoryRounded
                                        style={{...getIconStyle({dark: dark}), ...getPrimaryColor({dark: dark})}}/>
                                    <p className={mainStyles.secondaryParagraph}
                                       style={getSecondaryColor({dark: dark})}>{lang.activity}</p>
                                </Button>
                            </Link>
                            :
                            null
                        }
                    </div>
                </div>
            </>

        )
    else
        return <></>
}
