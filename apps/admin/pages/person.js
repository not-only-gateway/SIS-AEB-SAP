import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import styles from '../styles/Person.module.css'
import Profile from "../components/person/Profile";

import PersonalForms from "../components/person/PersonalForms";
import CorporateForms from "../components/person/CorporateForms";
import Head from 'next/head'
import {RenderTabs, Tabs} from "sis-aeb-misc";

import PersonPT from "../packages/locales/person/PersonPT";
import {Alert} from "sis-aeb-misc";
import PersonRequests from "../utils/fetch/PersonRequests";
import MemberRequests from "../utils/fetch/MemberRequests";

export default function person() {
    const router = useRouter()
    const [id, setId] = useState(undefined)
    const lang = PersonPT
    const [accessProfile, setAccessProfile] = useState(null)
    const [person, setPerson] = useState({})
    const [member, setMember] = useState({})
    const [status, setStatus] = useState({
        error: false,
        message: undefined
    })
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        if (router.isReady && router.query.id !== id) {
            setId(router.query.id)
            PersonRequests.fetchPerson({personID: router.query.id, setStatus: setStatus}).then(res => {
                if (res !== null) {
                    MemberRequests.fetchCollaborator({id: res.id, setStatus: () => null}).then(response => {
                        if (response !== null)
                            setMember(response.collaborator)
                    })
                    setPerson(res)
                }
            })

        }
        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null) {
            const accessProfileSession = JSON.parse(sessionStorage.getItem('accessProfile'))
            if (accessProfileSession.can_manage_structure || accessProfileSession.can_manage_person)
                setAccessProfile(accessProfileSession)
            else
                router.push('/', '/', {locale: router.locale})
        }
    }, [router.query])


    if (id !== undefined)
        return (
            <>
                <Head>
                    <title>
                        {person.name}
                    </title>
                    <link rel="icon" href={"/LOGO.png"} type="image/x-icon"/>
                </Head>

                <Alert
                    rootElementID={'root'}
                    type={'error'}
                    message={status.message}
                    handleClose={() => setStatus({
                        error: false,
                        message: undefined
                    })} render={status.error}
                />

                <div className={styles.pageContainer}>
                    <div className={styles.profileHeader}>
                        <Profile person={person} member={member} padding={true}/>
                        <Tabs
                            buttons={[
                                {
                                    key: 0,
                                    value: lang.personal
                                },
                                {
                                    key: 1,
                                    value: lang.corporate
                                }
                            ]}
                            openTab={openTab}
                            setOpenTab={setOpenTab}
                        />
                    </div>

                    <div className={styles.profileContentContainer}>
                        <RenderTabs

                            tabs={[
                                {
                                    buttonKey: 0,
                                    value: accessProfile === null || !accessProfile.can_manage_person ? null :
                                        <PersonalForms
                                            lang={lang}
                                            accessProfile={accessProfile}
                                            locale={router.locale}
                                            id={person.id}
                                        />
                                },
                                {
                                    buttonKey: 1,
                                    value: accessProfile === null || !accessProfile.can_manage_membership ? null :
                                        <CorporateForms
                                            lang={lang}
                                            fetchMembership={() =>
                                                MemberRequests.fetchMember({
                                                    id: person.id,
                                                    setStatus: () => null
                                                }).then(response => {
                                                    if (response !== null) {
                                                        setMember(response.member)

                                                    }
                                                })
                                            }
                                            locale={router.locale}
                                            id={person.id}
                                            accessProfile={accessProfile}
                                        />
                                }
                            ]} openTab={openTab} tabsKey={0}
                        />

                    </div>
                </div>
            </>


        )
    else
        return null
}

