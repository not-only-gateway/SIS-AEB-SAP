import styles from '../../styles/Layout.module.css'
import Cookies from 'universal-cookie/lib'

import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"
import PropTypes from "prop-types";
import LayoutPT from "../../packages/locales/LayoutPT";
import {ExitToApp, ExtensionRounded, GroupRounded, ListRounded, TimelineRounded, WorkRounded} from "@material-ui/icons";

import CollaboratorRequests from "../../utils/fetch/CollaboratorRequests";
import PersonRequests from "../../utils/fetch/PersonRequests";
import Navigation from "./nav/Navigation";


const cookies = new Cookies()

export default function PageLayout(props) {
    const router = useRouter()
    const [profile, setProfile] = useState(null)
    const lang = LayoutPT

    useEffect(() => {
        if (cookies.get('jwt') !== undefined) {
            if (sessionStorage.getItem('profile') === null) {
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
                        })
                    }
                })
            } else setProfile(JSON.parse(sessionStorage.getItem('profile')))
        }
        else
            router.push('/authenticate', '/authenticate')


    }, [])

    return (
        <div className={styles.container}>
            {router.pathname !== '/authenticate' ?
                <Navigation
                    loading={props.loading}
                    redirect={event => {
                        router.push(event.pathname, event.pathname, event.options)
                    }}
                    profileButtons={[{
                        label: lang.signout,
                        link: '/authenticate',
                        icon: <ExitToApp/>
                    }]}
                    buttons={[]}
                    // buttons={[
                    //     {
                    //         label: lang.projects,
                    //         icon: <WorkRounded/>,
                    //         link: '/'
                    //     },
                    //     {
                    //         label: lang.overview,
                    //         icon: <ListRounded/>,
                    //         link: '/overview'
                    //     }
                    // ]}
                    profile={profile} appName={lang.title}
                    path={router.pathname}
                    apps={[
                        {
                            label: lang.administration,
                            link: 'https://google.com',
                            icon: <GroupRounded/>
                        },
                        {
                            label: lang.statistics,
                            link: 'https://google.com',
                            icon: <TimelineRounded/>
                        },
                        {
                            label: lang.extensions,
                            link: 'https://google.com',
                            icon: <ExtensionRounded/>
                        }
                    ]} logo={'./light.png'}
                >
                    <div id={'scrollableDiv'} style={{width: '100%', overflowX: 'hidden', overflowY: 'auto'}}>
                        {props.children}
                    </div>

                </Navigation>
                :
                <div className={styles.pageContentContainer}
                     id={'scrollableDiv'} style={{
                    transition: '250ms ease-in-out',
                    height: '100vh',
                    overflowX: 'hidden'
                }}>
                    {props.children}
                </div>
            }

            <div id={'root'}/>
        </div>
    )
}
PageLayout.propTypes = {
    loading: PropTypes.bool
}
