import React, {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"
import PropTypes from "prop-types";
import LayoutWrapper from "./core/layout/navigation/LayoutWrapper";
import sapProps from "./apps/sap/sapProps";
import managementProps from "./apps/management/managementProps";
import apps from "../packages/apps";
import useCookies from "./core/shared/hooks/useCookies";
import Modal from "./core/misc/modal/Modal";
import Authenticator from "./Authenticator";
import styles from '../styles/Wrapper.module.css'
import {fetchProfile} from "../utils/fetch";

export default function AppWrapper(props) {
    const router = useRouter()

    const cookies = useCookies()
    const [profile, setProfile] = useState({})
    const [openAuthentication, setOpenAuthentication] = useState(false)
    const layoutParams = useMemo(() => {
        switch (true) {
            case router.pathname.includes('/sap'):
                return sapProps((url) => router.push(url, url), router.pathname, router.query)
            case router.pathname.includes('/management'):
                return managementProps((url) => router.push(url, url), router.pathname, router.query)
            default:
                return {}
        }
    }, [router.pathname, router.query])

    useEffect(() => {
        console.log()
        if (layoutParams.requireAuth)
            cookies.watch({
                name: 'jwt', callback: (cookie) => {
                    // if(!cookie)
                    //     setOpenAuthentication(true)
                }
            })

        if (sessionStorage.getItem('profile') === null && cookies.get('jwt'))
            fetchProfile().then(profile => {
                if (profile.person !== null) {
                    sessionStorage.setItem('profile', JSON.stringify(profile))
                    setProfile({
                        email: profile.collaborator?.corporate_email,
                        name: profile.person.name,
                        image: null
                    })
                }

            })
    }, [layoutParams])

    if (router.pathname.includes('authentication'))
        return props.children
    else
        return (
            <>
                <Modal
                    open={openAuthentication}
                    handleClose={() => {
                        if (cookies.get('jwt'))
                            setOpenAuthentication(false)
                    }}
                    defaultBackground={true}
                    wrapperClassName={styles.modal}
                    blurIntensity={.1}
                    animationStyle={"fade"}
                >
                    <Authenticator redirect={() => null}/>
                </Modal>
                <LayoutWrapper
                    redirect={url => router.push(url, url)}
                    loading={props.loading} profile={profile}
                    lightLogo={'../light.png'}
                    darkLogo={'../dark.png'}
                    redirectToLogin={() => router.push('authentication', 'authentication')}
                    {...layoutParams}
                    profileButtons={[]}
                    appButtons={apps}
                >
                    {props.children}
                </LayoutWrapper>
            </>
        )
}
AppWrapper.propTypes = {
    loading: PropTypes.bool,
}
