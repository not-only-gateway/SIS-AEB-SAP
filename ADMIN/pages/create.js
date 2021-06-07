import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import BaseForm from "../components/person/forms/BaseForm";

import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";
import MembershipForm from "../components/person/forms/MembershipForm";
import submitPerson from "../utils/submit/SubmitPerson";
import handleObjectChange from "../utils/shared/HandleObjectChange";
import submitMember from "../utils/submit/SubmitMember";
import Stepper from "../components/layout/navigation/Stepper";
import CreatePT from "../packages/locales/create/CreatePT";

export default function create() {

    const router = useRouter()
    const lang = CreatePT
    const [accessProfile, setAccessProfile] = useState(null)
    const [id, setID] = useState(undefined)
    const [person, setPerson] = useState({})
    const [member, setMember] = useState({})

    const [openTab, setOpenTab] = useState(0)
    const [step, setStep] = useState(0)
    const [status, setStatus] = useState({
        base: undefined,
        member: null
    })


    useEffect(() => {


            if (accessProfile === null){
                let accessProfileSession = sessionStorage.getItem('accessProfile')
                if(accessProfileSession !== null) {
                    accessProfileSession = JSON.parse(accessProfileSession)
                    if (!accessProfileSession.can_create_person || !accessProfileSession.can_manage_membership)
                        router.push('/', '/', {locale: router.locale})
                    else
                        setAccessProfile(accessProfileSession)
                }
                else
                    router.push('/', '/', {locale: router.locale})
            }

    }, [router.locale, router.isReady, router.query])


    if (lang !== null && accessProfile !== null)
        return (
            <>
                <HeaderLayout
                    width={'75%'}
                    availableTabs={undefined}
                    activeFiltersComponent={undefined}
                    tabs={
                        <Stepper buttons={[
                            {
                                disabled: status.base === true,
                                key: 0,
                                value: lang.person,
                                status: status.base,
                                required: true
                            },
                            {
                                disabled: step === 0,
                                key: 1,
                                value: lang.membership,
                                status: status.member,
                                required: true
                            }
                        ]} setOpenTab={setOpenTab}
                                 openTab={openTab}/>
                    }
                    filterComponent={undefined}
                    title={
                        lang.title
                    }
                    pageTitle={lang.title}
                    information={lang.information}
                    searchComponent={undefined}
                />
                <div style={{
                    width: '75%', margin: '16px auto auto ', marginBottom: '100px',
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
                                        editable={accessProfile.can_update_person}
                                        locale={router.locale}
                                        create={true}
                                        setAccepted={event => {
                                            console.log(event)

                                            handleObjectChange({
                                                event: {name: 'base', value: event.status},
                                                setData: setStatus
                                            })
                                            if (event.status) {
                                                setID(event.id)
                                                setStep(step + 1)
                                                setOpenTab(openTab + 1)
                                            }
                                        }}
                                    />
                                )
                            },
                            {
                                buttonKey: 1,
                                value: (
                                    <MembershipForm
                                        personID={id}
                                        member={member}
                                        handleChange={event => handleObjectChange({
                                            event: event,
                                            setData: setMember
                                        })}
                                        handleSubmit={submitMember}
                                        editable={accessProfile.can_manage_membership}
                                        locale={router.locale}
                                        create={true}
                                        setAccepted={event => {

                                            handleObjectChange({
                                                event: {name: 'member', value: event.status},
                                                setData: setStatus
                                            })
                                            if (event.status)
                                                router.push({pathname: '/person', query: {id: event.id}})
                                        }}
                                    />
                                )
                            }
                        ]}/>
                </div>
            </>


        )
    else
        return null
}
