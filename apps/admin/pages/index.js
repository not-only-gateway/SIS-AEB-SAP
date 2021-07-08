import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import PeopleList from "../components/management/PeopleList";
import ManagementPT from "../packages/locales/management/ManagementPT";
import Head from "next/head";
import {Header} from "sis-aeb-misc";


export default function management(props) {

    const router = useRouter()
    const lang = ManagementPT
    const [accessProfile, setAccessProfile] = useState(null)

    useEffect(() => {

        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null) {
            const accessProfileSession = JSON.parse(sessionStorage.getItem('accessProfile'))
            if (accessProfileSession.can_manage_person) {
                setAccessProfile(accessProfileSession)
            } else
                router.push('/structure', '/structure', {locale: router.locale})
        }
    }, [])


    return (
        <>
            <Head>
                <title>{lang.title}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <div style={{width: '65%', margin: 'auto', overflowY: 'hidden', marginTop: '32px'}}>
                <Header title={lang.title}/>
                <PeopleList
                    notSearched={props.notSearched} setNotSearched={props.setNotSearched}
                    searchInput={props.searchInput}
                    redirect={id => router.push('/person/?id=' + id, undefined, {shallow: true})}
                />
            </div>
        </>


    )

}
