import styles from '../../styles/shared/Layout.module.css'
import Cookies from 'universal-cookie/lib'
import Navigation from "../modules/navigation/Navigation";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"
import fetchMemberByToken from "../../utils/fetch/FetchMemberByToken";

const cookies = new Cookies()

export default function PageLayout({children}) {


    const router = useRouter()
    const {locale} = router
    const [reduced, setReduced] = useState(true)
    const [profile, setProfile] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

    useEffect(() => {

        if (cookies.get('jwt') !== undefined && sessionStorage.getItem('profile') === null ) {
            fetchMemberByToken().then(res => {
                if (res !== null) {
                    res.person.corporate_email = res.member.corporate_email
                    res.person.member_id = res.member.id
                    sessionStorage.setItem('profile', JSON.stringify(res.person))
                    setProfile(res.person)
                    if(sessionStorage.getItem('collaboration') === null && res.main_collaboration !== null) {
                        sessionStorage.setItem('collaboration', JSON.stringify(res.main_collaboration))
                        sessionStorage.setItem('accessProfile', JSON.stringify(res.main_collaboration.access_profile))
                        setAccessProfile(res.main_collaboration.access_profile)
                    }
                }
            })
        }
        else{
            setProfile(JSON.parse(sessionStorage.getItem('profile')))
            if(sessionStorage.getItem('accessProfile') !== null)
                setAccessProfile(JSON.parse(sessionStorage.getItem('accessProfile')))
        }


        if (locale !== cookies.get('lang') && cookies.get('lang') !== undefined)
            router.push(router.pathname, router.pathname, {locale: cookies.get('lang')}).catch(error => console.log(error))
    }, [router.isReady, router.locale])

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
                <Navigation dark={false} locale={router.locale} path={router.pathname} reduced={reduced}
                            setReduced={setReduced} query={router.query} profile={profile} accessProfile={accessProfile}/>

            </div>
        )
    else
        return (
            <div style={{fontFamily: 'Roboto'}}>
                {children}
            </div>
        )
}