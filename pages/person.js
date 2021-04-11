import React, {useEffect, useState} from 'react'
import Cookies from "universal-cookie/lib";
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

const cookies = new Cookies()

export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)
    const [dark, setDark] = useState(false)
    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

    useEffect(() => {
        if (cookies.get('theme') === '0' && dark === false)
            setDark(cookies.get('theme') === '0')

        if (id === undefined)
            setId(router.query.id)
        if ((new Cookies()).get('lang') !== undefined && (new Cookies()).get('lang') !== router.locale) {
            router.push('/person', '/person', {locale: (new Cookies()).get('lang')}).catch(r => console.log(r))
            setLang(getLanguage(router.locale, router.pathname))
        } else
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

    if (lang !== null && router.isReady)
        return (
            <Layout>
                {props =>
                    <ThemeProvider theme={createMuiTheme({
                        palette: {
                            type: dark ? "dark" : "light"
                        }
                    })}>
                        <props.getTitle pageName={lang.main.profile} pageTitle={lang.main.profile}
                                        pageInfo={lang.main.information}/>
                        {id !== undefined ?
                            <div className={styles.content_container}>

                                <TabLayout
                                    dark={dark}
                                    width={45}
                                    height={60}
                                    tabs={[
                                        {
                                            buttonKey: 1,
                                            value: (
                                                <BaseForm
                                                    id={id}
                                                    getTitle={getTitle}
                                                    dark={dark}
                                                    visible={accessProfile !== null ? accessProfile.canUpdatePerson : false}
                                                    editable={accessProfile !== null ? accessProfile.canUpdatePerson : false}
                                                    lang={lang.basic}
                                                />
                                            )
                                        },
                                        {
                                            buttonKey: 2,
                                            value: (
                                                <DocumentsForm
                                                    id={id}
                                                    getTitle={getTitle}
                                                    dark={dark}
                                                    visible={accessProfile !== null ? accessProfile.canViewDocuments : false}
                                                    editable={accessProfile !== null ? accessProfile.canUpdateDocuments : false}
                                                    // locale={lang.documents}
                                                />
                                            )
                                        },
                                        {
                                            buttonKey: 3,
                                            value: (
                                                <ContactForm
                                                    id={id}
                                                    getTitle={getTitle}
                                                    dark={dark}
                                                    visible={accessProfile !== null ? accessProfile.canViewContact : false}
                                                    editable={accessProfile !== null ? accessProfile.canUpdateContact : false}
                                                    // locale={lang.contact}
                                                />
                                            )
                                        },
                                        {
                                            buttonKey: 4,
                                            value: (
                                                <AddressForm
                                                    id={id}
                                                    getTitle={getTitle}
                                                    dark={dark}
                                                    visible={accessProfile !== null ? accessProfile.canViewLocation : false}
                                                    editable={accessProfile !== null ? accessProfile.canUpdateLocation : false}
                                                    // locale={lang.basic}
                                                />
                                            )
                                        },
                                        {
                                            buttonKey: 5,
                                            value: (
                                                <Collaborations
                                                    id={id}
                                                    getTitle={getTitle}
                                                    dark={dark}
                                                    visible={accessProfile !== null ? accessProfile.canViewCollaboration : false}
                                                    editable={accessProfile !== null ? accessProfile.canUpdateCollaboration : false}
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
                                            disabled: accessProfile !== null ? !accessProfile.canViewDocuments : true,
                                            key: 2,
                                            value: 'documents'
                                        },
                                        {
                                            disabled: accessProfile !== null ? !accessProfile.canViewContact : true,
                                            key: 3,
                                            value: 'contact'
                                        },
                                        {
                                            disabled: accessProfile !== null ? !accessProfile.canViewLocation : true,
                                            key: 4,
                                            value: 'address'
                                        },
                                        {
                                            disabled: accessProfile !== null ? !accessProfile.canViewCollaboration : true,
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