import styles from '../../styles/Layout.module.css'
import Cookies from 'universal-cookie/lib'

import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"
import PropTypes from "prop-types";
import {
    AssignmentRounded,
    ExitToApp,
    ExtensionRounded,
    GroupRounded,
    ListRounded,
    TimelineRounded,
    WorkRounded
} from "@material-ui/icons";

import CollaboratorRequests from "../../utils/requests/CollaboratorRequests";
import {Modal} from "sis-aeb-core";

import Authenticator from "./Authenticator";
import Navigation from "./core/navigation/Navigation";


const cookies = new Cookies()

export default function PageLayout(props) {
    const router = useRouter()
    const [profile, setProfile] = useState(null)
    const lang = {}
    const [openModal, setOpenModal] = useState(false)
    // useEffect(() => {
    //     let interval
    //     let timeout
    //     timeout = setTimeout(() => {
    //         interval = setInterval(() => {
    //             if (cookies.get('jwt') !== undefined) {
    //                 if (openModal)
    //                     setOpenModal(false)
    //                 if (profile === null)
    //                     CollaboratorRequests.fetchCollaborator().then(collaborator => {
    //                         if (collaborator !== null)
    //                             CollaboratorRequests.fetchPerson(collaborator.person).then(person => setProfile({
    //                                 ...person,
    //                                 corporate_email: collaborator.corporate_email
    //                             }))
    //                     })
    //                 else setProfile(JSON.parse(sessionStorage.getItem('profile')))
    //             } else
    //                 setOpenModal(true)
    //         }, 1000)
    //     }, 2000)
    //
    //     return () => {
    //         clearTimeout(timeout)
    //         clearInterval(interval)
    //     }
    // }, [props.loading])

    return (
        <>


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
                    buttons={[
                        {
                            label: lang.projects,
                            icon: <WorkRounded/>,
                            link: '/'
                        },
                        {
                            label: lang.entities,
                            icon: <AssignmentRounded/>,
                            link: '/entities',

                        },
                        {
                            label: lang.overview,
                            icon: <ListRounded/>,
                            link: '/overview',
                            disabled: true
                        },

                    ]}
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
                        {props.children}
                </Navigation>

        </>
    )
}
PageLayout.propTypes = {
    loading: PropTypes.bool
}
