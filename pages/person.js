import React, {useEffect, useState} from 'react'
import {createMuiTheme} from "@material-ui/core";
import Layout from "../components/shared/layout/Layout";
import {useRouter} from "next/router";
import Collaborations from "../components/person/Collaborations";
import {ThemeProvider} from "@material-ui/styles";
import BaseForm from "../components/person/BaseForm";
import ContactForm from "../components/person/ContactForm";
import AddressForm from "../components/shared/form/AddressForm";
import DocumentsForm from "../components/person/DocumentsForm";
import {getLanguage} from "../utils/shared/Language";
import styles from '../styles/pages/person/Person.module.css'
import TabLayout from "../components/shared/layout/TabLayout";
import {readAccessProfile} from "../utils/shared/IndexedDB";


export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)
    const [create, setCreate] = useState(undefined)

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [currentTab, setCurrentTab] = useState(null)

    useEffect(() => {
        if (router.isReady) {
            console.log(router.query)
            setId(router.query.id)
            setCreate(router.query.create)
        }

        setLang(getLanguage(router.locale, router.pathname))

        if (accessProfile === null)
            readAccessProfile().then(res => setAccessProfile(res))

    }, [router.locale, router.isReady])


    const getTitle = (props) => {
        return (
            <div style={{marginBottom: '2vh'}}>
                <div style={{margin: 'auto', width: '45vw'}}>
                    <p style={{fontSize: '1.3rem', fontWeight: '550', textAlign: 'left'}}>{props.pageTitle}</p>
                    <p style={{fontSize: '.75rem', textAlign: 'left'}}>{props.pageInfo}</p>
                </div>
            </div>
        )
    }

    function redirect(new_id) {
        console.log("new_id -> ")
        console.log(new_id)
        router.push('/person', '/person', {
            locale: router.locale,
            query: {
                id: new_id
            }
        })
        setCreate(undefined)
        setId(new_id)
    }

    if (lang !== null && router.isReady)
        return (
            <Layout>
                {props =>
                    <ThemeProvider theme={createMuiTheme({
                        palette: {
                            type: props.dark ? "dark" : "light"
                        }
                    })}>
                        <props.getTitle pageName={lang.main.profile} pageTitle={lang.main.profile}
                                        pageInfo={lang.main.information}/>
                        {id !== undefined || create !== undefined ?
                            <div className={styles.content_container}>

                                <TabLayout
                                    dark={props.dark}
                                    width={45}
                                    height={60}

                                    tabs={[
                                        {
                                            buttonKey: 1,
                                            value: (
                                                <BaseForm
                                                    id={id}
                                                    getTitle={getTitle}
                                                    dark={props.dark}
                                                    visible={accessProfile !== null ? accessProfile.canUpdatePerson : false}
                                                    editable={accessProfile !== null ? accessProfile.canUpdatePerson : false}
                                                    locale={router.locale}
                                                    redirect={redirect}
                                                    create={accessProfile !== null ? accessProfile.canCreatePerson && create !== undefined : false}
                                                />
                                            )
                                        },
                                        {
                                            buttonKey: 2,
                                            value: (
                                                <DocumentsForm
                                                    id={id}
                                                    getTitle={getTitle}
                                                    dark={props.dark}
                                                    visible={id !== undefined && accessProfile !== null ? accessProfile.canViewDocuments : false}
                                                    editable={id !== undefined && accessProfile !== null ? accessProfile.canUpdateDocuments : false}
                                                />
                                            )
                                        },
                                        {
                                            buttonKey: 3,
                                            value: (
                                                <ContactForm
                                                    id={id}
                                                    getTitle={getTitle}
                                                    dark={props.dark}
                                                    visible={id !== undefined && accessProfile !== null ? accessProfile.canViewContact : false}
                                                    editable={id !== undefined && accessProfile !== null ? accessProfile.canUpdateContact : false}
                                                />
                                            )
                                        },
                                        {
                                            buttonKey: 4,
                                            value: (
                                                <AddressForm
                                                    id={id}
                                                    getTitle={getTitle}
                                                    dark={props.dark}
                                                    visible={id !== undefined && accessProfile !== null ? accessProfile.canViewLocation : false}
                                                    editable={id !== undefined && accessProfile !== null ? accessProfile.canUpdateLocation : false}
                                                />

                                            )
                                        },
                                        {
                                            buttonKey: 5,
                                            value: (
                                                <Collaborations
                                                    id={id}
                                                    getTitle={getTitle}
                                                    dark={props.dark}
                                                    visible={id !== undefined && accessProfile !== null ? accessProfile.canViewCollaboration : false}
                                                    editable={id !== undefined && accessProfile !== null ? accessProfile.canUpdateCollaboration : false}
                                                    locale={lang.collaborations}
                                                />
                                            )

                                        }
                                    ]}
                                    buttons={[
                                        {
                                            disabled: false,
                                            key: 1,
                                            value: 'Basic'
                                        },
                                        {
                                            disabled: id !== undefined && accessProfile !== null ? !accessProfile.canViewDocuments : true,
                                            key: 2,
                                            value: 'documents'
                                        },
                                        {
                                            disabled: id !== undefined && accessProfile !== null ? !accessProfile.canViewContact : true,
                                            key: 3,
                                            value: 'contact'
                                        },
                                        {
                                            disabled: id !== undefined && accessProfile !== null ? !accessProfile.canViewLocation : true,
                                            key: 4,
                                            value: 'address'
                                        },
                                        {
                                            disabled: id !== undefined && accessProfile !== null ? !accessProfile.canViewCollaboration : true,
                                            key: 5,
                                            value: 'collaborations'
                                        }
                                    ]}
                                />
                            </div>
                            :
                            null
                        }
                    </ThemeProvider>
                }
            </Layout>
        )
    else
        return <></>
}