import styles from '../../styles/shared/Layout.module.css'
import Cookies from 'universal-cookie/lib'
import Navigation from "../modules/Navigation";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"
import fetchMemberByToken from "../../utils/fetch/FetchMemberByToken";

const cookies = new Cookies()

export default function PageLayout({children}) {


    const router = useRouter()

    const [reduced, setReduced] = useState(true)
    const [profile, setProfile] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

    useEffect(() => {

        if (cookies.get('jwt') === undefined)
            router.push('/authenticate')
        if (cookies.get('jwt') !== undefined && sessionStorage.getItem('profile') === null) {
            fetchMemberByToken().then(res => {

                if (res !== null) {
                    res.person.corporate_email = res.member.corporate_email
                    res.person.member_id = res.member.id
                    sessionStorage.setItem('profile', JSON.stringify({
                        id: res.person.id,
                        corporate_email: res.person.corporate_email,
                        member_id: res.person.member_id,
                        image: res.person.image,
                        name: res.person.name
                    }))
                    setProfile(res.person)

                    sessionStorage.setItem('collaboration', JSON.stringify({
                        id: res.active_collaboration.id,
                        tag: res.active_collaboration.tag
                    }))

                    sessionStorage.setItem('accessProfile', JSON.stringify(res.access_profile))
                    setAccessProfile(res.access_profile)

                }
            })
        } else
            setProfile(JSON.parse(sessionStorage.getItem('profile')))
    }, [router.isReady, router.pathname])

    if (router.pathname !== '/authenticate')
        return (
            <div style={{fontFamily: 'Roboto !important', backgroundColor: 'white'}}>
                <div className={styles.pageContentContainer}
                     id={'scrollableDiv'} style={{
                    width: reduced ? 'calc(100% - 75px)' : 'calc(100% - 250px)',
                    marginLeft: 'auto',
                    transition: '250ms ease-in-out',
                }}>

                    {children}
                </div>
                <Navigation dark={false} path={router.pathname} reduced={reduced}
                            setReduced={setReduced} query={router.query} profile={profile}
                            accessProfile={accessProfile}/>

            </div>
        )
    else
        return (
            <div style={{fontFamily: 'Roboto'}}>
                {children}
            </div>
        )
}