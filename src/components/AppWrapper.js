import React from "react";
import "@fontsource/roboto"
import PropTypes from "prop-types";
import Navigation from "./core/navigation/layout/Navigation";
import apps from "../packages/apps";
import Modal from "./core/misc/modal/Modal";
import Authenticator from "./Authenticator";
import styles from '../styles/Wrapper.module.css'
import useWrapper from "./useWrapper";
import ProfileContext from "./apps/profile/ProfileContext";
import {Brightness3Rounded, BrightnessHighRounded, ExitToAppRounded, PersonRounded} from "@material-ui/icons";
import Profile from "./apps/profile/Profile";
import ThemeProvider from "./core/theme/ThemeProvider";

export default function AppWrapper(props) {

    const {
        profile, setProfile,
        layoutParams,
        openAuthentication,
        setOpenAuthentication,
        cookies, darkTheme, setDarkTheme,
        router, isManager, setIsManager
    } = useWrapper()
    const setManager = (value) => {
        setIsManager(true)
        setProfile(value)
        sessionStorage.setItem('profile', JSON.stringify(value))
        sessionStorage.setItem('isManager', JSON.stringify(true))
    }
    if (router.pathname.includes('authentication'))
        return props.children({
            setManager: setManager
        })
    else
        return (
            <ProfileContext.Provider value={profile}>
                <ThemeProvider onDark={darkTheme}>
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
                        <Authenticator setManager={setManager} redirect={() => setOpenAuthentication(false)} />
                    </Modal>
                    <Navigation
                        redirect={url => router.push(url, url)}
                        loading={props.loading} profile={profile}
                        logo={darkTheme ? '../dark.png' : '../light.png'} theme={'dark'}
                        {...layoutParams}
                        sideBarButtons={[
                            ...layoutParams.sideBarButtons,
                            ...[profile && !isManager && cookies.get('jwt') ? {
                                label: 'Perfil',
                                icon: <PersonRounded/>,
                                onClick: () => router.push(router.pathname + '?page=profile'),
                                highlight: router.query.page === 'profile',
                                position: 'bottom'
                            } : undefined,
                                {
                                    label: darkTheme ? 'Escuro' : 'Claro',
                                    icon: darkTheme ? <Brightness3Rounded/> : <BrightnessHighRounded/>,
                                    onClick: () => setDarkTheme(!darkTheme),
                                    position: 'bottom'
                                }
                            ]]}
                        profileButtons={[
                            profile && !isManager ? {
                                label: 'Perfil',
                                icon: <PersonRounded/>,
                                onClick: () => router.push(router.pathname + '?page=profile')
                            } : undefined,
                            {
                                label: 'Sair',
                                icon: <ExitToAppRounded/>,
                                onClick: () => router.push('/authentication')
                            }]}
                        fallbackProfileButton={{
                            label: 'Entrar',
                            icon: <ExitToAppRounded/>,
                            onClick: () => router.push('/authentication')
                        }}
                        appButtons={apps}
                    >
                        {router.query.page === 'profile' ? <Profile/> : props.children()}
                    </Navigation>
                </ThemeProvider>
            </ProfileContext.Provider>
        )
}
AppWrapper.propTypes = {
    loading: PropTypes.bool,
}
