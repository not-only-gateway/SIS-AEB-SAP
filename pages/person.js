import React, {useEffect, useState} from 'react'
import Cookies from "universal-cookie/lib";
import {createMuiTheme} from "@material-ui/core";
import Layout from "../components/shared/Layout";
import {useRouter} from "next/router";
import Collaborations from "../components/person/Collaborations";
import {ThemeProvider} from "@material-ui/styles";
import axios from "axios";
import Host from "../utils/Host";
import BasicForm from "../components/person/BasicForm";
import ContactForm from "../components/person/ContactForm";
import AddressForm from "../components/shared/form/AddressForm";
import DocumentsForm from "../components/person/DocumentsForm";
import {getLanguage} from "../utils/Language";
import AccordionLayout from "../components/shared/AccordionLayout";
import styles from '../styles/Profile.module.css'

const cookies = new Cookies()

export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)
    const disabled = (new Cookies()).get('adm_token') !== undefined
    const [dark, setDark] = useState(false)
    const [lang, setLang] = useState(null)

    useEffect(() => {
        if(cookies.get('theme') === '0' && dark === false){
            setDark(cookies.get('theme') === '0')
            fetchData().catch(error => console.log(error))
        }
        if(id === undefined)
            setId(router.query.id)
        if((new Cookies()).get('lang') !== undefined && (new Cookies()).get('lang') !== router.locale){
            router.push('/settings', '/settings', {locale: (new Cookies()).get('lang')}).catch(r => console.log(r))
            setLang(getLanguage(router.locale, router.pathname))
        }
        else
            setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale, router.isReady])

    async function fetchData(path, params) {
        let response = null
        await axios({
            method: 'get',
            url: Host() + path,
            headers: {'authorization': cookies.get('jwt')},
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

    if(lang !== null && router.isReady)
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

                                <BasicForm
                                    id={id}
                                    saveChanges={saveChanges}
                                    fetchData={fetchData}
                                    dark={dark}
                                    disabled={disabled}
                                    lang={lang.basic}
                                />
                                <AccordionLayout
                                    content={
                                        <Collaborations
                                            id={id}
                                            saveChanges={saveChanges}
                                            fetchData={fetchData}
                                            dark={dark}
                                            disabled={disabled}
                                            locale={lang.collaborations}
                                        />
                                    }
                                    summary={

                                        <p>Collaborations</p>
                                    }
                                    disabled={disabled}
                                    closedSize={45}
                                    openSize={45}
                                    border={null}
                                />

                                <AccordionLayout
                                    content={
                                        <ContactForm
                                            id={id}
                                            saveChanges={saveChanges}
                                            fetchData={fetchData}
                                            dark={dark}
                                            disabled={disabled}
                                            // locale={lang.contact}
                                        />
                                    }
                                    summary={

                                        <p>Contact</p>
                                    }
                                    closedSize={45}
                                    openSize={45}
                                    disabled={disabled}
                                    border={null}
                                />
                                <AccordionLayout
                                    content={
                                        <AddressForm
                                            id={id}
                                            saveChanges={saveChanges}
                                            fetchData={fetchData}
                                            dark={dark}
                                            disabled={disabled}
                                            // locale={lang.basic}
                                        />
                                    }
                                    summary={

                                        <p>Address</p>
                                    }
                                    closedSize={45}
                                    openSize={45}
                                    disabled={disabled}
                                    border={null}
                                />
                                <AccordionLayout
                                    content={
                                        <DocumentsForm
                                            id={id}
                                            saveChanges={saveChanges}
                                            fetchData={fetchData}
                                            dark={dark}
                                            disabled={disabled}
                                            // locale={lang.documents}
                                        />
                                    }
                                    summary={
                                        <p>Documents</p>
                                    }
                                    closedSize={45}
                                    openSize={45}
                                    disabled={disabled}
                                    border={null}
                                    // disabled={}
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