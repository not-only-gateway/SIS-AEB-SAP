import React, {useEffect, useState} from 'react'
import {Button, createMuiTheme, Divider} from "@material-ui/core";
import Layout from "../components/shared/layout/Layout";
import {useRouter} from "next/router";
import {ThemeProvider} from "@material-ui/styles";

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
import CollaboratorComponent from "../components/management/Collaborator";
import {buttonStyle, iconStyle} from "../styles/components/navigation/BarMaterialStyles";
import {getLanguage} from "../utils/shared/Language";
import styles from '../styles/pages/management/Management.module.css'
import {readAccessProfile} from "../utils/shared/IndexedDB";
import BaseForm from "../components/person/BaseForm";
import shared from "../styles/shared/Shared.module.css";

export default function management() {

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

                        <div className={styles.options_container}>
                            {accessProfile !== null && accessProfile.canCreateRole ?
                                <AccordionLayout
                                    content={
                                        null
                                    }
                                    summary={
                                        <div className={shared.accordionTitle}>
                                            <AssignmentIndRounded style={{fontSize: '1.7rem'}}/>
                                            <p style={{marginLeft: '20px'}}>{lang.role}</p>
                                        </div>
                                    }
                                    closedSize={22}
                                    openSize={45}
                                    dark={props.dark}
                                    disabled={false}
                                    border={null}
                                />
                                :
                                null
                            }
                            {accessProfile !== null && accessProfile.canViewActivityLog ?
                                <div style={{
                                    backgroundColor: props.dark ? '#3b424c' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    width: '22vw'
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
                                            <HistoryRounded style={{fontSize: '1.7rem'}}/>
                                            <p style={{marginLeft: '20px'}}>{lang.activity}</p>
                                        </Button>
                                    </Link>
                                </div> :
                                null
                            }
                            {accessProfile !== null && accessProfile.canCreateUnit ?
                                <AccordionLayout
                                    content={
                                        null
                                    }
                                    summary={
                                        <div className={shared.accordionTitle}>
                                            <ViewModuleRounded style={{fontSize: '1.7rem'}}/>
                                            <p style={{marginLeft: '20px'}}>{lang.unit}</p>
                                        </div>
                                    }
                                    closedSize={22}
                                    openSize={45}
                                    dark={props.dark}
                                    disabled={false}
                                    border={null}
                                />
                                :
                                null
                            }
                            {accessProfile !== null && accessProfile.canUpdateRole ?
                                <div style={{
                                    backgroundColor: props.dark ? '#3b424c' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    width: '22vw'
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


                            {accessProfile !== null && accessProfile.canCreatePerson ?
                                <div style={{
                                    backgroundColor: props.dark ? '#3b424c' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    width: '22vw'
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

                                            <PersonRounded style={{fontSize: '1.7rem'}}/>
                                            <p style={{marginLeft: '20px'}}>{lang.user}</p>

                                        </Button>
                                    </Link>
                                </div>
                                :
                                null
                            }
                            {accessProfile !== null && accessProfile.canUpdateAccessProfile ?
                                <div style={{
                                    backgroundColor: props.dark ? '#3b424c' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px',
                                    width: '22vw'
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
                            {accessProfile !== null && accessProfile.canCreateAccessProfile ?
                                <AccordionLayout
                                    content={
                                        null
                                    }
                                    summary={
                                        <div className={shared.accordionTitle}>
                                            <CheckRounded style={{fontSize: '1.7rem'}}/>
                                            <p style={{marginLeft: '20px'}}>{lang.access}</p>
                                        </div>
                                    }
                                    closedSize={22}
                                    openSize={45}
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