import React, {useEffect, useState} from 'react'
import Cookies from "universal-cookie/lib";
import {createMuiTheme} from "@material-ui/core";
import Layout from "../components/shared/layout/Layout";
import {useRouter} from "next/router";
import Collaborations from "../components/person/Collaborations";
import {ThemeProvider} from "@material-ui/styles";
import axios from "axios";
import Host from "../utils/Host";
import BaseForm from "../components/person/BaseForm";
import ContactForm from "../components/person/ContactForm";
import AddressForm from "../components/shared/form/AddressForm";
import DocumentsForm from "../components/person/DocumentsForm";
import {getLanguage} from "../utils/Language";
import AccordionLayout from "../components/shared/layout/AccordionLayout";
import styles from '../styles/Profile.module.css'
import TabLayout from "../components/shared/layout/TabLayout";
import Head from "next/head";

const cookies = new Cookies()

export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)
    const disabled = (new Cookies()).get('adm_token') !== undefined
    const [dark, setDark] = useState(false)
    const [lang, setLang] = useState(null)

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
    }, [router.locale, router.isReady])

    async function fetchData(path, params) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + path,
            headers: cookies.get('jwt') !== undefined ? {'authorization': cookies.get('jwt')} : null,
            params: params
        }).then(res => {
            response = res.data
        }).catch(error => {
            console.log(error)
        })

        return response
    }

    async function saveChanges(path, params, method) {
        let response = false

        await axios({
            method: method,
            url: Host() + path,
            headers: {'authorization': cookies.get('jwt')},
            data: params
        }).then(() => {
            response = true
        }).catch(error => {
            console.log(error)
        })
        return response
    }
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
                        <props.getTitle pageName={lang.main.profile} pageTitle={lang.main.profile} pageInfo={lang.main.information}/>
                        {id !== undefined ?
                            <div className={styles.accordion_container}>

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
                                                    saveChanges={saveChanges}
                                                    fetchData={fetchData}
                                                    dark={dark}
                                                    disabled={disabled}
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
                                                    saveChanges={saveChanges}
                                                    fetchData={fetchData}
                                                    dark={dark}
                                                    disabled={disabled}
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
                                                    saveChanges={saveChanges}
                                                    fetchData={fetchData}
                                                    dark={dark}
                                                    disabled={disabled}
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
                                                    saveChanges={saveChanges}
                                                    fetchData={fetchData}
                                                    dark={dark}
                                                    disabled={disabled}
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
                                                    saveChanges={saveChanges}
                                                    fetchData={fetchData}
                                                    dark={dark}
                                                    disabled={disabled}
                                                    locale={lang.collaborations}
                                                />
                                            )

                                        }
                                    ]}
                                    buttons={[
                                        {
                                            key: 1,
                                            value: 'Basic'
                                        },
                                        {
                                            key: 2,
                                            value: 'documents'
                                        },
                                        {
                                            key: 3,
                                            value: 'contact'
                                        },
                                        {
                                            key: 4,
                                            value: 'address'
                                        },
                                        {
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