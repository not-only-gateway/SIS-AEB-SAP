import styles from '../../styles/Layout.module.css'
import Cookies from 'universal-cookie/lib'
import Navigation from "./Navigation";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"
import PropTypes from "prop-types";

const cookies = new Cookies()

export default function PageLayout(props) {
    const router = useRouter()
    const [profile, setProfile] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)


    //
    // useEffect(() => {
    //
    //     if (cookies.get('jwt') === undefined)
    //         router.push('/authenticate')
    //     if (cookies.get('jwt') !== undefined && sessionStorage.getItem('profile') === null) {
    //         PersonfetchMemberByToken().then(res => {
    //
    //             if (res !== null) {
    //                 res.person.corporate_email = res.member.corporate_email
    //                 res.person.member_id = res.member.id
    //                 sessionStorage.setItem('profile', JSON.stringify({
    //                     id: res.person.id,
    //                     corporate_email: res.person.corporate_email,
    //                     member_id: res.person.member_id,
    //                     image: res.person.image,
    //                     name: res.person.name
    //                 }))
    //                 setProfile(res.person)
    //
    //                 sessionStorage.setItem('collaboration', JSON.stringify({
    //                     id: res.active_collaboration.id,
    //                     tag: res.active_collaboration.tag
    //                 }))
    //
    //                 sessionStorage.setItem('accessProfile', JSON.stringify(res.access_profile))
    //                 setAccessProfile(res.access_profile)
    //
    //             }
    //         })
    //     } else
    //         setProfile(JSON.parse(sessionStorage.getItem('profile')))
    // }, [router.isReady, router.pathname])

    if (router.pathname !== '/authenticate')
        return (
            <div style={{fontFamily: 'Roboto !important', backgroundColor: 'white', overflow: 'hidden', height: '100vh'}}>
                <Navigation dark={false} path={router.pathname}
                             query={router.query} profile={profile}
                            accessProfile={accessProfile} loading={props.loading}/>

                <div className={styles.pageContentContainer}
                     id={'scrollableDiv'} style={{
                    transition: '250ms ease-in-out', height: 'calc(100% - 60px)', transform: 'translateY(60px)'
                }}>
                    {props.children}
                </div>
            </div>
        )
    else
        return (
            <>
                {props.children}
            </>
        )
}
PageLayout.propTypes={
    loading: PropTypes.bool,
    children: PropTypes.object
}
