import styles from '../../styles/Layout.module.css'
import Cookies from 'universal-cookie/lib'

import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"
import PropTypes from "prop-types";
import LayoutPT from "../../packages/locales/others/LayoutPT";
import {
    AccountBalanceRounded,
    AccountTreeRounded,
    AssignmentIndRounded,
    BusinessRounded,
    ExitToApp,
    ExtensionRounded, PersonRounded,
    TimelineRounded
} from "@material-ui/icons";

import CollaboratorRequests from "../../utils/fetch/CollaboratorRequests";
import {Navigation} from "sis-aeb-navigation";
import PersonRequests from "../../utils/fetch/PersonRequests";
// import Alert from "./components/Alert";
// import Navigation from "./components/Navigation";


const cookies = new Cookies()

export default function PageLayout(props) {
    const router = useRouter()
    const [profile, setProfile] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    const lang = LayoutPT
    const [searchInput, setSearchInput] = useState('')
    const [notSearched, setNotSearched] = useState(false)

    useEffect(() => {

        if (cookies.get('jwt') === undefined)
            router.push('/authenticate')
        if (cookies.get('jwt') !== undefined && sessionStorage.getItem('profile') === null) {
            CollaboratorRequests.fetchMemberByToken().then(res => {
                if (res !== null) {
                    PersonRequests.FetchImage(res.person.image).then(imageRes => {
                        res.person.image = imageRes
                        sessionStorage.setItem('profile', JSON.stringify({
                            id: res.person.id,
                            corporate_email: res.collaborator.corporate_email,
                            member_id: res.collaborator.id,
                            image: imageRes,
                            name: res.person.name
                        }))
                        setProfile(res.person)
                        sessionStorage.setItem('accessProfile', JSON.stringify(res.access))
                        setAccessProfile(res.access)
                    })
                }
            })
        } else setProfile(JSON.parse(sessionStorage.getItem('profile')))

        if (accessProfile === null || accessProfile === undefined) {
            const access = sessionStorage.getItem('accessProfile')
            setAccessProfile(access !== null ? JSON.parse(access) : null)
        }
    }, [router.isReady, router.pathname])

    return (
        <div style={{
            fontFamily: 'Roboto !important',
            backgroundColor: 'white',
            overflow: 'hidden',
            height: '100vh',
            position: 'relative'
        }}>
            {router.pathname !== '/authenticate' ?
                <Navigation
                    searchBar={true}
                    searchInput={searchInput}
                    applySearch={() => {
                        setNotSearched(true)

                    }}
                    setSearchInput={event => {
                        setSearchInput(event)
                    }}
                    loading={props.loading}
                    redirect={event => {
                        router.push(event.pathname, event.pathname, event.options)
                    }}
                    profileButtons={[{
                        label: lang.signout,
                        link: '/authenticate',
                        icon: <ExitToApp style={{transform: 'rotate(180deg)'}}/>
                    }]}
                    buttons={[
                        {label: lang.structure, icon: <AccountTreeRounded/>, link: '/structure'},
                        accessProfile === null || !accessProfile.can_manage_person ? null : {
                            label: lang.collaborator,
                            icon: <PersonRounded/>,
                            link: '/'
                        },
                        accessProfile === null || !accessProfile.can_manage_structure ? null : {
                            label: lang.organizational,
                            icon: <BusinessRounded/>,
                            link: '/organizational'
                        },
                        accessProfile === null || !accessProfile.can_manage_structure ? null : {
                            label: lang.structural,
                            icon: <AccountBalanceRounded/>,
                            link: '/structural'
                        },
                    ]}
                    accessProfile={accessProfile} profile={profile} appName={lang.title}
                    path={router.pathname}
                    apps={[{label: lang.statistics, link: 'https://google.com', icon: <TimelineRounded/>}, {
                        label: lang.extensions,
                        link: 'https://google.com',
                        icon: <ExtensionRounded/>
                    }]} logo={'./light.png'}
                />
                :
                null
            }
            <div className={styles.pageContentContainer}
                 id={'scrollableDiv'} style={{
                transition: '250ms ease-in-out',
                height: router.pathname !== '/authenticate' ? 'calc(100% - 60px)' : '100vh',
                marginTop: router.pathname !== '/authenticate' ? '60px' : undefined,
                overflowX: router.pathname === '/structure' ? 'auto' : 'hidden'
            }}>
                {props.children({searchInput, notSearched, setNotSearched})}
            </div>
            <div id={'root'}/>
        </div>
    )
}
PageLayout.propTypes = {
    loading: PropTypes.bool
}
