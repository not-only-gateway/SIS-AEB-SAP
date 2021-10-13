import React from "react";
import "@fontsource/roboto"
import PropTypes from "prop-types";
import Navigation from "./core/navigation/layout/Navigation";
import apps from "../packages/apps";
import Modal from "./core/misc/modal/Modal";
import Authenticator from "./Authenticator";
import styles from '../styles/Wrapper.module.css'
import useWrapper from "./useWrapper";
import ProfileContext from "./ProfileContext";
import {ExitToAppRounded} from "@material-ui/icons";

export default function AppWrapper(props) {

    const {
        profile, setProfile,
        layoutParams,
        openAuthentication,
        setOpenAuthentication,
        cookies,
        router
    } = useWrapper()

    if (router.pathname.includes('authentication'))
        return props.children({
            setManager: value => {
                setProfile(value)
                sessionStorage.setItem('profile', JSON.stringify(value))
            }
        })
    else
        return (
            <ProfileContext.Provider value={profile}>
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
                    <Authenticator setManager={value => {
                        setProfile(value)
                        sessionStorage.setItem('profile', JSON.stringify(value))
                    }} redirect={() => router.push('/', '/')}/>
                </Modal>
                <Navigation
                    redirect={url => router.push(url, url)}
                    loading={props.loading} profile={profile}
                    lightLogo={'../light.png'}
                    darkLogo={'../dark.png'}
                    redirectToLogin={() => router.push('/authentication', '/authentication')}
                    {...layoutParams}
                    profileButtons={[{
                        label: 'Sair',
                        icon: <ExitToAppRounded/>,
                        path: '/authentication'
                    }]}
                    fallbackProfileButton={{
                        label: 'Entrar',
                        icon: <ExitToAppRounded/>,
                        path: '/authentication'
                    }}
                    appButtons={apps}
                >
                    {props.children()}
                </Navigation>
            </ProfileContext.Provider>
        )
}
AppWrapper.propTypes = {
    loading: PropTypes.bool,
}
