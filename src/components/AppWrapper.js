import React from "react";
import "@fontsource/roboto"
import PropTypes from "prop-types";
import LayoutWrapper from "./core/layout/navigation/LayoutWrapper";
import apps from "../packages/apps";
import Modal from "./core/misc/modal/Modal";
import Authenticator from "./Authenticator";
import styles from '../styles/Wrapper.module.css'
import useWrapper from "./useWrapper";
import ProfileContext from "./ProfileContext";

export default function AppWrapper(props) {

    const {

        profile,
        layoutParams,
        openAuthentication,
        setOpenAuthentication,
        cookies,
        router
    } = useWrapper()

    if (router.pathname.includes('authentication'))
        return props.children
    else
        return (
            <ProfileContext value={profile}>
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
            </ProfileContext>
        )
}
AppWrapper.propTypes = {
    loading: PropTypes.bool,
}
