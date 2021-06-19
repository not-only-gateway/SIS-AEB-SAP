import styles from '../../../styles/shared/Layout.module.css'
import Cookies from 'universal-cookie/lib'
// import Navigation from "./test/Navigation";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"
import PropTypes from "prop-types";
import NavigationPT from "../../../packages/locales/others/NavigationPT";
import {
    AccountTreeRounded,
    BusinessRounded,
    ExitToApp,
    ExtensionRounded,
    HomeRounded,
    PersonRounded,
    TimelineRounded,
    WorkRounded
} from "@material-ui/icons";
import Navigation from "./test/Navigation";
import PersonRequests from "../../../utils/fetch/PersonRequests";
import MemberRequests from "../../../utils/fetch/MemberRequests";

const cookies = new Cookies()

export default function PageLayout(props) {
    const router = useRouter()
    const [profile, setProfile] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const lang = NavigationPT


    useEffect(() => {

        if (cookies.get('jwt') === undefined)
            router.push('/authenticate')
        if (cookies.get('jwt') !== undefined && sessionStorage.getItem('profile') === null) {
            MemberRequests.fetchMemberByToken().then(res => {
                if (res !== null) {
                    sessionStorage.setItem('profile', JSON.stringify({
                        id: res.person.id,
                        corporate_email: res.collaborator.corporate_email,
                        member_id: res.collaborator.id,
                        image: res.person.image,
                        name: res.person.name
                    }))
                    setProfile(res.person)
                    sessionStorage.setItem('accessProfile', JSON.stringify(res.access))
                    setAccessProfile(res.access)
                }
            })
        } else
            setProfile(JSON.parse(sessionStorage.getItem('profile')))
    }, [router.isReady, router.pathname])

    if (router.pathname !== '/authenticate')
        return (
            <div style={{
                fontFamily: 'Roboto !important',
                backgroundColor: 'white',
                overflow: 'hidden',
                height: '100vh'
            }}>
                <Navigation
                    redirect={event => {
                        router.push(event.pathname, event.pathname, event.options)
                    }}
                    profileButtons={[{
                        label: lang.signout,
                        path: '/authenticate',
                        icon: <ExitToApp style={{transform: 'rotate(180deg)'}}/>
                    }]}
                    buttons={[
                        {label: lang.collaborator, icon: <PersonRounded/>, link: '/'},
                        {label: lang.organizational, icon: <BusinessRounded/>, link: '/organizational'},
                        {label: lang.structural, icon: <AccountTreeRounded/>, link: '/structural'},
                    ]}
                    accessProfile={accessProfile} profile={profile} appName={lang.title}
                    path={router.pathname}
                    apps={[{label: lang.statistics, link: 'https://google.com', icon: <TimelineRounded/>}, {
                        label: lang.extensions,
                        link: 'https://google.com',
                        icon: <ExtensionRounded/>
                    }]} logo={'./light.png'}
                />

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
PageLayout.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.object
}
