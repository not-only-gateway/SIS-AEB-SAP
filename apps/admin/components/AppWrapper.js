import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"
import PropTypes from "prop-types";
import LayoutWrapper from "./shared/core/layout/navigation/LayoutWrapper";

export default function AppWrapper(props) {
    const router = useRouter()
    const [profile, setProfile] = useState(null)

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
        <LayoutWrapper
            redirect={url => router.push(url, url)}
            loading={props.loading} profile={profile}
            logo={'./light.png'}
            profileButtons={[]}
            appButtons={[]}
            appName={'Placeholder'}
            sideBarButtons={[]}
        >
            {props.children}
        </LayoutWrapper>
    )
}
AppWrapper.propTypes = {
    loading: PropTypes.bool
}
