import React, {useEffect, useState} from 'react'
import {Button, createMuiTheme} from "@material-ui/core";
import {useRouter} from "next/router";
import {ThemeProvider} from "@material-ui/styles";
import mainStyles from '../styles/shared/Main.module.css'
import Link from "next/link";

import {ListRounded, PersonRounded} from "@material-ui/icons";
import {getLanguage} from "../utils/shared/Language";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import {getIconStyle, getSecondaryColor} from "../styles/shared/MainStyles";
import GetPageTitle from "../utils/shared/GetPageTitle";
import Cookies from "universal-cookie/lib";

export default function menu() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [option, setOption] = useState(null)
    const [dark, setDark] = useState(false)

    useEffect(() => {
        setDark((new Cookies()).get('theme') === 0)
        setLang(getLanguage(router.locale, router.pathname))

        if (accessProfile === null)
            readAccessProfile().then(res => setAccessProfile(res))
    }, [router.locale, router.isReady])

    if (lang !== null && router.isReady)
        return (

            <ThemeProvider theme={createMuiTheme({
                palette: {
                    type: dark ? "dark" : "light"
                }
            })}>

                <GetPageTitle pageName={lang.title} pageTitle={lang.title}
                              pageInfo={lang.info} dark={dark}/>


                <div className={[mainStyles.baseWidth, mainStyles.displayWarp, mainStyles.smallMargin].join(' ')}>

                    {accessProfile !== null && accessProfile.canCreatePerson ?
                        <div style={{
                            backgroundColor: dark ? '#3b424c' : null,
                            border: dark ? null : '#e2e2e2 1px solid',
                            borderRadius: '8px',
                            width: '22.05vw'
                        }}>
                            <Link href={{pathname: '/person', locale: router.locale, query: {create: true}}}>
                                <Button style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    textTransform: 'none'
                                }}>
                                    <PersonRounded style={getIconStyle({dark: dark})}/>
                                    <p className={mainStyles.secondaryParagraph}
                                       style={getSecondaryColor({dark: dark})}>{lang.user}</p>

                                </Button>
                            </Link>
                        </div>
                        :
                        null
                    }
                    {accessProfile !== null && accessProfile.canUpdateRole ?
                        <div style={{
                            backgroundColor: dark ? '#3b424c' : null,
                            border: dark ? null : '#e2e2e2 1px solid',
                            borderRadius: '8px',
                            width: '22.05vw'
                        }}>
                            <Link href={{pathname: '/roles', locale: router.locale}}>
                                <Button style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    textTransform: 'none'
                                }}>
                                    <ListRounded style={{fontSize: '1.7rem'}}/>
                                    <p style={{marginLeft: '20px'}}>List Roles</p>
                                </Button>
                            </Link>
                        </div> :
                        null
                    }


                    {accessProfile !== null && accessProfile.canUpdateAccessProfile ?
                        <div style={{
                            backgroundColor: dark ? '#3b424c' : null,
                            border: dark ? null : '#e2e2e2 1px solid',
                            borderRadius: '8px',
                            width: '22.05vw'
                        }}>
                            <Link href={{pathname: '/roles', locale: router.locale}}>
                                <Button style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    textTransform: 'none'
                                }}>
                                    <ListRounded style={{fontSize: '1.7rem'}}/>
                                    <p style={{marginLeft: '20px'}}>List Access Profiles</p>
                                </Button>
                            </Link>
                        </div> :
                        null
                    }
                    {accessProfile !== null && accessProfile.canUpdateAccessProfile ?
                        <div style={{
                            backgroundColor: dark ? '#3b424c' : null,
                            border: dark ? null : '#e2e2e2 1px solid',
                            borderRadius: '8px',
                            width: '22.05vw'
                        }}>
                            <Link href={{pathname: '/roles', locale: router.locale}}>
                                <Button style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    textTransform: 'none'
                                }}>
                                    <ListRounded style={{fontSize: '1.7rem'}}/>
                                    <p style={{marginLeft: '20px'}}>List Units</p>
                                </Button>
                            </Link>
                        </div> :
                        null
                    }
                    {accessProfile !== null && accessProfile.canUpdateAccessProfile ?
                        <div style={{
                            backgroundColor: dark ? '#3b424c' : null,
                            border: dark ? null : '#e2e2e2 1px solid',
                            borderRadius: '8px',
                            width: '22.05vw'
                        }}>
                            <Link href={{pathname: '/roles', locale: router.locale}}>
                                <Button style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    textTransform: 'none'
                                }}>
                                    <ListRounded style={{fontSize: '1.7rem'}}/>
                                    <p style={{marginLeft: '20px'}}>List Linkages</p>
                                </Button>
                            </Link>
                        </div> :
                        null
                    }
                </div>
            </ThemeProvider>
        )
    else
        return <></>
}