import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import mainStyles from '../styles/shared/Main.module.css'
import BaseForm from "../components/templates/forms/BaseForm";

import HeaderLayout from "../components/layout/HeaderLayout";
import Authenticate from "../components/modules/Authenticate";
import TabContent from "../components/templates/TabContent";
import MembershipForm from "../components/templates/forms/MembershipForm";
import submitPerson from "../utils/submit/SubmitPerson";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import fetchMember from "../utils/fetch/FetchMember";
import {func} from "prop-types";

export default function create() {

    const router = useRouter()
    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [id, setID] = useState(undefined)
    const [person, setPerson] = useState({})
    const [member, setMember] = useState({})

    const [valid, setValid] = useState(false)
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
        if (accessProfile === null)
            readAccessProfile().then(res => {
                if (res === null)
                    router.push('/', '/', {locale: router.locale})
                else
                    setAccessProfile(res)
            })
        if (lang === null)
            setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale, router.isReady, router.query])


    function getStepInfo() {
        let response = null
        switch (step) {
            case 0: {
                response = lang.baseInfo
                break
            }
            case 1: {
                response = lang.memberInfo
                break
            }
            case 2: {
                response = lang.documentsInfo
                break
            }
            case 3: {
                response = lang.contactInfo
                break
            }
            default:
                break
        }
        return response
    }

    if (lang !== null && accessProfile !== null)
        return (
            <>
                <Authenticate valid={valid || (new Cookies()).get('authorization_token') !== undefined}
                              setValid={setValid}
                              redirect={() => router.push('/', '/', {locale: router.locale})} locale={router.locale}/>
                <HeaderLayout
                    availableTabs={undefined}
                    activeFiltersComponent={undefined}

                    stepper={{
                        tabs: [
                            {
                                disabled: false,
                                key: 0,
                                value: 'Person',
                                status: status.base,
                            }, {
                                disabled: step === 0,
                                key: 1,
                                value: 'Membership',
                                status: status.member,
                            },
                            {
                                disabled: step < 2,
                                key: 2,
                                value: 'Documents',
                                status: status.documents,
                            },
                            {
                                disabled: step < 3,
                                key: 3,
                                value: 'Contacts',
                                status: status.contact,
                            },
                            step === 4 ? {
                                disabled: true,
                                key: 4,
                                value: 'Finished',
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
                <div className={mainStyles.displayInlineCenter} style={{width: '100%'}}>
                    <div style={{width: '75%'}}>
                        <div style={{padding: '20px  0 5px 0 '}}>
                            <p>{getStepInfo()}</p>
                        </div>
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
                                            handleSubmit={submitPerson}
                                            editable={accessProfile.canUpdateMembership}
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
                            ]}/>

                    </div>
                </div>
            </>


        )
    else
        return <></>
}
