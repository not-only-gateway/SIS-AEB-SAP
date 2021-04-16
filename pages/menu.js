import React, {useEffect, useState} from 'react'
import {Button, createMuiTheme} from "@material-ui/core";
import Layout from "../components/shared/layout/Layout";
import {useRouter} from "next/router";
import {ThemeProvider} from "@material-ui/styles";
import mainStyles from '../styles/shared/Main.module.css'
import Link from "next/link";

import {
    AssignmentIndRounded,
    CheckRounded,
    HistoryRounded,
    ListRounded,
    PersonRounded,
    ViewModuleRounded
} from "@material-ui/icons";
import AccordionLayout from "../components/shared/layout/AccordionLayout";
import {getLanguage} from "../utils/shared/Language";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import shared from "../styles/shared/Shared.module.css";
import {getIconStyle, getPrimaryColor, getSecondaryColor} from "../styles/shared/MainStyles";

export default function menu() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

    useEffect(() => {
        setLang(getLanguage(router.locale, router.pathname))

        if (accessProfile === null)
            readAccessProfile().then(res => setAccessProfile(res))
    }, [router.locale, router.isReady])

    if (lang !== null && router.isReady)
        return (
            <Layout>
                {props =>
                    <ThemeProvider theme={createMuiTheme({
                        palette: {
                            type: props.dark ? "dark" : "light"
                        }
                    })}>
                        {props.getTitle({
                            pageName: lang.title,
                            pageTitle: lang.title,
                            pageInfo: lang.info
                        })}

                        <div className={[mainStyles.baseWidth, mainStyles.displayWarp, mainStyles.smallMargin].join(' ')}>

                            {accessProfile !== null && accessProfile.canViewActivityLog ?
                                <div style={{
                                    backgroundColor: props.dark ? '#3b424c' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    width: '22.05vw'
                                }}>
                                    <Link href={{pathname: '/activity', locale: props.locale}}>
                                        <Button style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            textTransform: 'none'
                                        }}>

                                            <HistoryRounded  style={getIconStyle({dark: props.dark})}/>
                                            <p className={mainStyles.secondaryParagraph} style={getSecondaryColor({dark: props.dark})}>{lang.activity}</p>
                                        </Button>
                                    </Link>
                                </div> :
                                null
                            }
                            {accessProfile !== null && accessProfile.canCreatePerson ?
                                <div style={{
                                    backgroundColor: props.dark ? '#3b424c' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    width: '22.05vw'
                                }}>
                                    <Link href={{pathname: '/person', locale: props.locale, query: {create: true}}}>
                                        <Button style={{
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            textTransform: 'none'
                                        }}>
                                            <PersonRounded style={getIconStyle({dark: props.dark})}/>
                                            <p className={mainStyles.secondaryParagraph} style={getSecondaryColor({dark: props.dark})}>{lang.user}</p>

                                        </Button>
                                    </Link>
                                </div>
                                :
                                null
                            }
                            {accessProfile !== null && accessProfile.canUpdateRole ?
                                <div style={{
                                    backgroundColor: props.dark ? '#3b424c' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    width: '22.05vw'
                                }}>
                                    <Link href={{pathname: '/roles', locale: props.locale}}>
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
                                    backgroundColor: props.dark ? '#3b424c' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    width: '22.05vw'
                                }}>
                                    <Link href={{pathname: '/roles', locale: props.locale}}>
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
                                    backgroundColor: props.dark ? '#3b424c' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    width: '22.05vw'
                                }}>
                                    <Link href={{pathname: '/roles', locale: props.locale}}>
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
                                    backgroundColor: props.dark ? '#3b424c' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    width: '22.05vw'
                                }}>
                                    <Link href={{pathname: '/roles', locale: props.locale}}>
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
                }
            </Layout>
        )
    else
        return <></>
}