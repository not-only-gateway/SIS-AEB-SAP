import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import styles from '../styles/Person.module.css'
import Profile from "../components/person/Profile";

import PersonalForms from "../components/person/PersonalForms";
import CorporateForms from "../components/person/CorporateForms";
import Alert from "../../../packages/alert/src/components/Alert";
import Head from 'next/head'
import {RenderTabs, Tabs} from "sis-aeb-navigation";

import PersonPT from "../packages/locales/person/PersonPT";

export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)

    const lang = PersonPT
    const [accessProfile, setAccessProfile] = useState(null)

    const [loading, setLoading] = useState(true)

    const [person, setPerson] = useState({})
    const [member, setMember] = useState({})

    const [openTab, setOpenTab] = useState(0)
    const [status, setStatus] = useState({
        error: false,
        message: undefined
    })
    useEffect(() => {
        if (router.isReady && router.query.id !== id) {
            setId(router.query.id)
            fetchPerson({memberID: null, personID: router.query.id, setStatus: setStatus}).then(res => {
                if (res !== null) {
                    fetchMemberByPerson({personID: res.id}).then(response => {
                        if (response !== null) {
                            setMember(response.member)

                        }
                    })
                    setPerson(res)
                    setLoading(false)
                }
            })

        }
        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null) {
            const accessProfileSession = JSON.parse(sessionStorage.getItem('accessProfile'))
            if (accessProfileSession.can_manage_structure || accessProfileSession.can_update_person)
                setAccessProfile(accessProfileSession)
            else
                router.push('/', '/', {locale: router.locale})
        }
    })


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
                    type={'error'} message={status.message}
                    handleClose={() => setStatus({
                        error: false,
                        message: undefined
                    })} render={status.error}
                />

                {!loading ?
                    <div className={styles.pageContainer}>
                        <div className={styles.profileHeader}>
                            <Profile person={person} member={member} padding={true}/>

                            <Tabs
                                buttons={[
                                    {
                                        key: 0,
                                        value: lang.personal,
                                        disabled: accessProfile === null || !accessProfile.can_update_person
                                    },
                                    {
                                        key: 1,
                                        value: lang.corporate,
                                        disabled: accessProfile === null || !accessProfile.can_manage_membership
                                    }
                                ]}
                                openTab={openTab}
                                setOpenTab={setOpenTab}
                            />
                        </div>
                        <div className={styles.profileContentContainer}>

                            <RenderTabs
                                openTab={openTab}
                                key={'person'}
                                maintainTab={true}
                                tabs={[
                                    {
                                        buttonKey: 0,
                                        value: accessProfile === null || !accessProfile.can_update_person ? null : (
                                            <PersonalForms
                                                lang={lang}
                                                accessProfile={accessProfile}
                                                memberID={member !== null && member ? member.id : null}
                                                locale={router.locale}
                                                personID={person.id}
                                            />
                                        )
                                    },
                                    {
                                        buttonKey: 1,
                                        value: accessProfile === null || !accessProfile.can_manage_membership ? null : (
                                            <CorporateForms
                                                lang={lang}
                                                fetchMembership={() =>
                                                    fetchMemberByPerson({personID: person.id}).then(response => {
                                                        if (response !== null) {
                                                            setMember(response.member)

                                                        }
                                                    })
                                                }
                                                locale={router.locale}
                                                personID={person.id}
                                                id={member !== null && member ? member.id : null}
                                                accessProfile={accessProfile}
                                            />
                                        )
                                    }
                                ]}/>
                        </div>
                    </div>
                    :
                    null
                }
            </>


        )
    else
        return null
}
