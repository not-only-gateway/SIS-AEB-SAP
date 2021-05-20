import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import mainStyles from '../styles/shared/Main.module.css'
import BaseForm from "../components/templates/forms/BaseForm";

import HeaderLayout from "../components/layout/HeaderLayout";
import Authenticate from "../components/modules/Authenticate";
import TabContent from "../components/templates/TabContent";
import MembershipForm from "../components/templates/forms/MembershipForm";
import submitPerson from "../utils/submit/SubmitPerson";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import submitMember from "../utils/submit/SubmitMember";
import DocumentsForm from "../components/templates/forms/DocumentsForm";
import submitDocuments from "../utils/submit/SubmitDocuments";
import ContactForm from "../components/templates/forms/ContactForm";
import submitContacts from "../utils/submit/SubmitContacts";
import AddressForm from "../components/templates/forms/AddressForm";
import submitAddress from "../utils/submit/SubmitAddress";
import Cookies from "universal-cookie/lib";

export default function create() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [id, setID] = useState(undefined)
    const [person, setPerson] = useState({})
    const [member, setMember] = useState({})
    const [contact, setContact] = useState({})
    const [documents, setDocuments] = useState({})
    const [address, setAddress] = useState({})
    const [notAuthenticated, setNotAuthenticated] = useState(true)
    const [openTab, setOpenTab] = useState(0)
    const [step, setStep] = useState(0)
    const [status, setStatus] = useState({
        base: undefined,
        member: null,
        documents: null,
        address: null,
        contact: null,
    })


    useEffect(() => {
        setNotAuthenticated((new Cookies()).get('authorization_token') === undefined)
        if (accessProfile === null)
            readAccessProfile().then(res => {
                if (res === null || !res.canCreatePerson || !res.canManageMembership)
                    router.push('/', '/', {locale: router.locale})
                else
                    setAccessProfile(res)
            })
        if (lang === null)
            setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale, router.isReady, router.query])


    if (lang !== null && accessProfile !== null)
        return (
            <>
                <Authenticate
                    render={notAuthenticated}
                    handleClose={valid => {
                        if (valid)
                            setNotAuthenticated(false)
                        else
                            router.push('/', '/', {locale: router.locale})
                    }}
                    locale={router.locale}
                    forceClose={() => router.push('/', '/', {locale: router.locale})}
                />
                <HeaderLayout
                    width={'65%'}
                    availableTabs={undefined}
                    activeFiltersComponent={undefined}
                    stepper={{
                        tabs: [
                            {
                                disabled: status.base === true,
                                key: 0,
                                value: lang.person,
                                status: status.base,
                            }, {
                                disabled: step === 0,
                                key: 1,
                                value: lang.membership,
                                status: status.member,
                            },
                            {
                                disabled: step < 2,
                                key: 2,
                                value: lang.documents,
                                status: status.documents,
                            },
                            {
                                disabled: step < 3,
                                key: 3,
                                value: lang.contacts,
                                status: status.contact,
                            },
                            {
                                disabled: step < 4,
                                key: 4,
                                value: lang.address,
                                status: status.address,
                            },
                            step === 5 ? {
                                disabled: true,
                                key: 5,
                                value: lang.end,
                                status: true,
                            } : null
                        ],
                        setOpenTab: setOpenTab,
                        openTab: openTab
                    }}
                    filterComponent={undefined}
                    title={
                        lang.title
                    }
                    pageTitle={lang.title}
                    information={lang.information}
                    searchComponent={undefined}
                />
                <div style={{
                    width: '65%', margin: '16px auto auto ', marginBottom: '100px',
                    position: 'relative',
                    zIndex: 0
                }}>

                        <TabContent
                            openTab={openTab}
                            tabs={[
                                {
                                    buttonKey: 0,
                                    value: (
                                        <BaseForm
                                            id={undefined}
                                            setID={setID}
                                            person={person}
                                            handleChange={event => handleObjectChange({
                                                event: event,
                                                setData: setPerson
                                            })}
                                            handleSubmit={submitPerson}
                                            editable={accessProfile.canUpdatePerson}
                                            locale={router.locale}
                                            create={true}
                                            setAccepted={event => {

                                                handleObjectChange({
                                                    event: {name: 'base', value: event},
                                                    setData: setStatus
                                                })
                                                setStep(step + 1)
                                                setOpenTab(openTab + 1)
                                            }}
                                        />
                                    )
                                },
                                {
                                    buttonKey: 1,
                                    value: (
                                        <MembershipForm
                                            id={id}
                                            member={member}
                                            handleChange={event => handleObjectChange({
                                                event: event,
                                                setData: setMember
                                            })}
                                            handleSubmit={submitMember}
                                            editable={accessProfile.canManageMembership}
                                            locale={router.locale}
                                            create={true}
                                            setAccepted={event => {
                                                handleObjectChange({
                                                    event: {name: 'member', value: event},
                                                    setData: setStatus
                                                })
                                                setStep(step + 1)
                                                setOpenTab(openTab + 1)
                                            }}
                                        />
                                    )
                                },
                                {
                                    buttonKey: 2,
                                    value: (
                                        <DocumentsForm
                                            id={id}
                                            documents={documents}
                                            handleChange={event => handleObjectChange({
                                                event: event,
                                                setData: setDocuments
                                            })}
                                            handleSubmit={submitDocuments}
                                            editable={accessProfile.canUpdatePerson}
                                            locale={router.locale}
                                            create={true}
                                            setAccepted={event => {
                                                handleObjectChange({
                                                    event: {name: 'documents', value: event},
                                                    setData: setStatus
                                                })
                                                setStep(step + 1)
                                                setOpenTab(openTab + 1)
                                            }}
                                        />
                                    )
                                },
                                {
                                    buttonKey: 3,
                                    value: (
                                        <ContactForm
                                            id={id}
                                            contact={contact}
                                            locale={router.locale}
                                            handleChange={event => handleObjectChange({
                                                event: event,
                                                setData: setContact
                                            })}
                                            handleSubmit={submitContacts}
                                            editable={accessProfile.canUpdatePerson}
                                            create={true}
                                            setAccepted={event => {
                                                handleObjectChange({
                                                    event: {name: 'contact', value: event},
                                                    setData: setStatus
                                                })
                                                setStep(step + 1)
                                                setOpenTab(openTab + 1)
                                            }}
                                        />
                                    )
                                },
                                {
                                    buttonKey: 4,
                                    value: (
                                        <AddressForm
                                            id={id}
                                            address={address}
                                            handleChange={event => handleObjectChange({
                                                event: event,
                                                setData: setAddress
                                            })}
                                            handleSubmit={() => submitAddress({personID: id, data: address})}
                                            locale={router.locale}
                                            create={true}
                                            editable={accessProfile.canUpdatePerson}
                                            setAccepted={event => {
                                                handleObjectChange({
                                                    event: {name: 'address', value: event},
                                                    setData: setStatus
                                                })

                                            }}
                                        />
                                    )
                                },
                            ]}/>
                    </div>
            </>


        )
    else
        return <></>
}
