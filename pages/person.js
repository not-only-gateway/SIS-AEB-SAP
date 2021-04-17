import React, {useEffect, useState} from 'react'
import {createMuiTheme} from "@material-ui/core";
import {useRouter} from "next/router";
import Collaborations from "../components/person/Collaborations";
import {ThemeProvider} from "@material-ui/styles";
import BaseForm from "../components/person/BaseForm";
import ContactForm from "../components/person/ContactForm";
import AddressForm from "../components/shared/form/AddressForm";
import DocumentsForm from "../components/person/DocumentsForm";
import {getLanguage} from "../utils/shared/Language";
import TabLayout from "../components/shared/layout/TabLayout";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import shared from "../styles/shared/Shared.module.css";
import {getSecondaryBackground} from "../styles/shared/MainStyles";
import GetPageTitle from "../utils/shared/GetPageTitle";
import getPageInfo from "../utils/index/GetPageInfo";
import IndexComponent from "../components/index/IndexComponent";


export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)
    const [create, setCreate] = useState(undefined)

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [dark, setDark] = useState(false)

    useEffect(() => {
        setDark((new Cookies()).get('theme') === 0)
        if (router.isReady && router.query.id !== id) {
            setId(router.query.id)
            setCreate(router.query.create)
        }

        setLang(getLanguage(router.locale, router.pathname))

        if (accessProfile === null)
            readAccessProfile().then(res => setAccessProfile(res))

    }, [router.locale, router.isReady, router.query])

    function redirect(new_id) {
        router.push('/person', '/person', {
            locale: router.locale,
            query: {
                id: new_id
            }
        })
        setCreate(undefined)
        setId(new_id)
    }

    if (lang !== null && router.isReady && router.query.id === id)
        return (
            <ThemeProvider theme={createMuiTheme({
                palette: {
                    type: dark ? "dark" : "light"
                }
            })}>
                <GetPageTitle pageName={lang.main.title} pageTitle={lang.main.title}
                              pageInfo={lang.main.info} dark={dark}/>
                {id !== undefined || create !== undefined ?
                    <div>
                        {/*<div className={shared.header_container}*/}
                        {/*     style={getSecondaryBackground({dark: dark})}>*/}



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
                                            dark={dark}
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
                                            dark={dark}
                                            locale={router.locale}
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
                                            dark={dark}
                                            locale={router.locale}
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
                                            dark={dark}
                                            locale={router.locale}
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
                                            dark={dark}
                                            visible={id !== undefined && accessProfile !== null ? accessProfile.canViewCollaboration : false}
                                            editable={id !== undefined && accessProfile !== null ? accessProfile.canUpdateCollaboration : false}
                                            locale={router.locale}
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
        )
    else
        return <></>
}