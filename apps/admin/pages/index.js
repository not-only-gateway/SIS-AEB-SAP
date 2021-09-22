import React, {useState} from 'react'
import {useRouter} from "next/router";
import PeopleList from "../components/management/PeopleList";
import ManagementPT from "../packages/locales/management/ManagementPT";
import Head from "next/head";


export default function management() {

    const router = useRouter()
    const lang = ManagementPT
    // const [accessProfile, setAccessProfile] = useState(null)
    //
    // useEffect(() => {
    //
    //     if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null) {
    //         const accessProfileSession = JSON.parse(sessionStorage.getItem('accessProfile'))
    //         if (accessProfileSession.can_manage_person) {
    //             setAccessProfile(accessProfileSession)
    //         } else
    //             router.push('/structure', '/structure', {locale: router.locale})
    //     }
    // }, [])


    return (
        <>
            <Head>
                <title>{lang.title}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>


                <PeopleList
                    redirect={id => router.push('/project/?id=' + id, undefined, {shallow: true})}
                />

        </>


    )

}
