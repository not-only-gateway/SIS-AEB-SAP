import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {getLanguage} from "../utils/shared/PageLanguage";
import {readAccessProfile} from "../utils/shared/IndexedDB";
import Cookies from "universal-cookie/lib";
import styles from '../styles/Person.module.css'
import Profile from "../components/templates/Profile";
import HeaderLayout from "../components/layout/HeaderLayout";
import TabContent from "../components/templates/TabContent";
import Authenticate from "../components/modules/Authenticate";
import OverviewComponent from "../components/templates/ProfileOverview";
import fetchMember from "../utils/fetch/FetchMember";

import handleObjectChange from "../utils/shared/HandleObjectChange";
import fetchDocuments from "../utils/fetch/FetchDocuments";
import fetchContacts from "../utils/fetch/FetchContacts";
import fetchAddress from "../utils/fetch/FetchAddress";
import PersonalForms from "../components/elements/PersonalForms";
import CorporateForms from "../components/elements/CorporateForms";
import Alert from "../components/layout/Alert";
import TextField from "../components/modules/inputs/TextField";
import HorizontalTabs from "../components/layout/navigation/HorizontalTabs";
import Head from 'next/head'
import DateField from "../components/modules/inputs/DateField";
import VerticalTabs from "../components/layout/navigation/VerticalTabs";

export default function person() {

    const router = useRouter()
    const [id, setId] = useState(undefined)

    const [lang, setLang] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const [notAuthenticated, setNotAuthenticated] = useState(true)
    const [loading, setLoading] = useState(true)

    const [person, setPerson] = useState({})
    const [member, setMember] = useState({})

    const [openTab, setOpenTab] = useState(0)
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
                            <HorizontalTabs
                                noMargin={true}
                                buttons={[
                                    accessProfile !== null ? {
                                        disabled: false,
                                        key: 0,
                                        value: lang.personal
                                    } : null,
                                    accessProfile !== null ? {
                                        disabled: !accessProfile.canManageMembership,
                                        key: 1,
                                        value: lang.corporate
                                    } : null,

                                ]} openTab={openTab} setOpenTab={setOpenTab}
                            />
                        </div>
                        <div className={styles.profileContentContainer}>
                            <TabContent
                                openTab={openTab}
                                key={'person'}
                                tabs={[
                                    {
                                        buttonKey: 0,
                                        value: (
                                            <PersonalForms
                                                lang={lang}
                                                accessProfile={accessProfile}
                                                id={id}
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
