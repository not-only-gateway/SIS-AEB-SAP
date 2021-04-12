import React, {useEffect, useState} from 'react'
import Cookies from "universal-cookie/lib";
import {Button, createMuiTheme} from "@material-ui/core";
import Layout from "../components/shared/layout/Layout";
import {useRouter} from "next/router";
import {ThemeProvider} from "@material-ui/styles";

import Link from "next/link";

import {AssignmentIndRounded, CheckRounded, HistoryRounded, PersonRounded, ViewModuleRounded} from "@material-ui/icons";
import AccordionLayout from "../components/shared/layout/AccordionLayout";
import CollaboratorComponent from "../components/management/Collaborator";
import {buttonStyle, iconStyle} from "../styles/components/navigation/BarMaterialStyles";
import {getLanguage} from "../utils/shared/Language";
import styles from '../styles/pages/management/Management.module.css'
import {readAccessProfile} from "../utils/shared/IndexedDB";

export default function management() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

    useEffect(() => {
        if ((new Cookies()).get('lang') !== undefined && (new Cookies()).get('lang') !== router.locale) {
            router.push('/management', '/management', {locale: (new Cookies()).get('lang')}).catch(r => console.log(r))
            setLang(getLanguage(router.locale, router.pathname))
        } else
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
                            {accessProfile !== null && accessProfile.canViewActivityLog ?
                                <div style={{
                                    backgroundColor: props.dark ? '#303741' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px'
                                }}>
                                    <Link href={{pathname: '/activity', locale: props.locale}}>
                                        <Button style={buttonStyle}>
                                            <HistoryRounded style={iconStyle}/>
                                            {lang.activity}
                                        </Button>
                                    </Link>
                                </div>:
                                null
                            }
                            {accessProfile !== null && accessProfile.canCreateRole ?
                                <div style={{
                                    backgroundColor: props.dark ? '#303741' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px'
                                }}>
                                    <Button style={buttonStyle}>
                                        <AssignmentIndRounded style={{fontSize: '1.5rem'}}/>
                                        {lang.role}
                                    </Button>
                                </div>
                                :
                                null
                            }
                            {accessProfile !== null && accessProfile.canCreateUnit ?
                                <div style={{
                                    backgroundColor: props.dark ? '#303741' : null,
                                    border: props.dark ? null : '#e2e2e2 1px solid',
                                    borderRadius: '8px'
                                }}>
                                    <Button style={buttonStyle}>
                                        <ViewModuleRounded style={{fontSize: '1.5rem'}}/>
                                        {lang.unit}
                                    </Button>
                                </div>
                                :
                                null
                            }


                            {accessProfile !== null && accessProfile.canCreatePerson ?
                                <AccordionLayout
                                    content={
                                        <CollaboratorComponent dark={props.dark}/>
                                    }
                                    summary={
                                        <>
                                            <PersonRounded style={{fontSize: '1.5rem'}}/>
                                            {lang.user}
                                        </>
                                    }
                                    closedSize={22}
                                    openSize={45}
                                />
                                :
                                null
                            }
                            {accessProfile !== null && accessProfile.canCreateAccessProfile ?
                                <AccordionLayout
                                    content={
                                        null
                                    }
                                    summary={
                                        <>
                                            <CheckRounded style={{fontSize: '1.5rem'}}/>
                                            {lang.access}
                                        </>
                                    }
                                    closedSize={22.09}
                                    openSize={45}
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