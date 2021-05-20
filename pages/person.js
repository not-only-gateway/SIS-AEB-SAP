import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import styles from '../styles/Person.module.css'
import Profile from "../components/templates/Profile";
import TabContent from "../components/templates/TabContent";
import Authenticate from "../components/modules/Authenticate";
import fetchMember from "../utils/fetch/FetchMember";
import PersonalForms from "../components/elements/PersonalForms";
import CorporateForms from "../components/elements/CorporateForms";
import Alert from "../components/layout/Alert";
import Head from 'next/head'
import ExpandableTabs from "../components/layout/navigation/ExpandableTabs";
import {Divider} from "@material-ui/core";

export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [notAuthenticated, setNotAuthenticated] = useState(true)
    const [loading, setLoading] = useState(true)

    const [person, setPerson] = useState({})
    const [member, setMember] = useState({})

    const [openTab, setOpenTab] = useState({
        mainTab: 0,
        subTab: 0
    })
    const [status, setStatus] = useState({
        error: false,
        message: undefined
    })
    useEffect(() => {
            if (router.isReady && router.query.id !== id && !notAuthenticated) {
                setId(router.query.id)
                fetchMember({memberID: router.query.id, setStatus: setStatus}).then(res => {
                    if (res !== null) {
                        setMember(res.member)
                        setLoading(false)
                        setPerson(res.person)
                    }
                })
            }
            if (accessProfile === null)
                readAccessProfile().then(profile => {
                    setAccessProfile(profile)
                })
            if (lang === null)
                setLang(getLanguage(router.locale, router.pathname))
            setNotAuthenticated(!(new Cookies()).get('authorization_token'))
        },
        [router.locale, router.isReady, router.query, notAuthenticated]
    )


    if (lang !== null && id !== undefined && !notAuthenticated)
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
                            <Profile person={person} member={member}/>

                            <ExpandableTabs
                                buttons={[
                                    {
                                        mainButton: {
                                            key: 0,
                                            value:  lang.personal
                                        },
                                        subButtons: [
                                            {
                                                key: 0,
                                                value: lang.general
                                            },
                                            {
                                                key: 1,
                                                value: lang.documents
                                            },
                                            {
                                                key: 2,
                                                value: lang.contacts
                                            },
                                            {
                                                key: 3,
                                                value: lang.address
                                            },
                                        ]
                                    },
                                    {
                                        mainButton: {
                                            key: 1,
                                            value: lang.corporate
                                        },
                                        subButtons: [
                                            {
                                                key: 0,
                                                value: lang.membership
                                            },
                                            {
                                                key: 1,
                                                value: lang.collaborations
                                            },
                                        ]
                                    }
                                ]}
                                openTab={openTab}
                                setOpenTab={setOpenTab}
                            />
                            <Divider orientation={'horizontal'} style={{backgroundColor: '#ecedf2', width: '100%', marginTop: '5px'}}/>
                        </div>
                        <div className={styles.profileContentContainer}>

                            <TabContent
                                openTab={openTab.mainTab}
                                key={'person'}
                                tabs={[
                                    {
                                        buttonKey: 0,
                                        value: (
                                            <PersonalForms
                                                lang={lang}
                                                accessProfile={accessProfile}
                                                id={id}
                                                openTab={openTab.subTab}
                                                locale={router.locale}
                                                personID={member.person}
                                            />
                                        )
                                    },
                                    {
                                        buttonKey: 1,
                                        value: (
                                            <CorporateForms
                                                lang={lang}
                                                locale={router.locale}
                                                id={id}
                                                openTab={openTab.subTab}
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
        return <>
            <Authenticate
                handleClose={valid => {
                    if (valid && accessProfile !== null && (accessProfile.canUpdatePerson || accessProfile.canManageMembership)) {
                        setNotAuthenticated(false)
                    } else
                        router.push('/', '/', {locale: router.locale})
                }}
                forceClose={() => router.push('/', '/', {locale: router.locale})}
                render={notAuthenticated}
                locale={router.locale}
            />
        </>
}
