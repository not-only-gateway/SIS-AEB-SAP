import React, {useEffect, useMemo, useState} from "react";
import "@fontsource/roboto"
import PropTypes from "prop-types";
import Layout from "./core/navigation/layout/Layout";
import apps from "../packages/apps";
import Modal from "./core/navigation/modal/Modal";
import Authenticator from "./Authenticator";
import styles from '../styles/Wrapper.module.css'
import useWrapper from "./useWrapper";
import ProfileContext from "./apps/profile/ProfileContext";
import {
    Brightness3Rounded,
    BrightnessHighRounded,
    ExitToAppRounded,
    PersonAddRounded,
    PersonRounded
} from "@material-ui/icons";
import Profile from "./core/navigation/profile/Profile"
import ThemeProvider from "./core/misc/theme/ThemeProvider";
import SideBar from "./core/navigation/sidebar/SideBar";
import Apps from "./core/navigation/apps/Apps";


export default function AppWrapper(props) {
    const [openSideBar, setOpenSideBar] = useState(false)
    const {
        profile, setProfile,
        layoutParams, requiresAuth,
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
    const sidebar = useMemo(() => {
        let res = [...layoutParams.sideBarButtons]
        if (router.query.page === 'profile' && profile && Object.keys(profile).length > 0 && !isManager && cookies.get('jwt'))
            res.push({
                label: 'Perfil',
                icon: <PersonRounded/>,
                onClick: () => router.push(router.pathname + '?page=profile'),
                highlight: router.query.page === 'profile',
                position: 'bottom'
            })
        res.push({
            label: darkTheme ? 'Escuro' : 'Claro',
            icon: darkTheme ? <Brightness3Rounded/> : <BrightnessHighRounded/>,
            onClick: () => setDarkTheme(!darkTheme),
            position: 'bottom'
        })
        return res
    }, [darkTheme, isManager, profile, layoutParams, router.query])
    const [profiles, setProfiles] = useState([])
    useEffect(() => {
        setProfiles(sessionStorage.getItem('profiles') ? JSON.parse(sessionStorage.getItem('profiles')) : [])
    }, [])

    return (
        <ProfileContext.Provider value={profile}>
            <ThemeProvider onDark={darkTheme}>
                <Modal
                    open={openAuthentication}
                    handleClose={() => {
                        if (cookies.get('jwt') && requiresAuth)
                            setOpenAuthentication(false)
                        else if (!requiresAuth)
                            setOpenAuthentication(false)
                    }}
                    defaultBackground={true}
                    className={styles.modal}
                    blurIntensity={.25}
                    animationStyle={"fade"}
                >
                    <Authenticator
                        setManager={setManager} setProfile={setProfile}
                        redirect={() => setOpenAuthentication(false)} open={openAuthentication}
                    />
                </Modal>
                <Layout
                    loading={props.loading}
                    logo={darkTheme ? '../dark.png' : '../light.png'}
                    appName={layoutParams.appName}
                    openSideBar={openSideBar}
                    setOpenSideBar={setOpenSideBar}
                >
                    <Apps buttons={apps.map(e => {
                        return {...e, onClick: () => router.push(e.path, e.path)}
                    })}/>
                    <SideBar
                        open={openSideBar}
                        buttons={sidebar}
                        logo={darkTheme ? '../dark.png' : '../light.png'}
                    />

                    <Profile
                        profile={profile} disabledProfile={isManager}
                        registeredProfiles={profiles}
                        onProfileClick={() => router.push(router.pathname + '?page=profile')}
                        buttons={[
                            {
                                label: 'Adicionar conta',
                                icon: <PersonAddRounded/>,
                                onClick: () => {

                                },
                                disabled: true
                            },
                            {
                                label: 'Sair',
                                icon: <ExitToAppRounded/>,
                                onClick: () => {
                                    if (router.query.page === 'profile')
                                        router.push(router.pathname, router.pathname)
                                    setOpenAuthentication(true)

                                    cookies.remove('jwt')
                                    sessionStorage.removeItem('profile')
                                    setProfile({})
                                }
                            }
                        ]}
                        fallbackProfileButton={{
                            label: 'Entrar',
                            icon: <ExitToAppRounded/>,
                            onClick: () => setOpenAuthentication(true)
                        }}
                    />
                    {router.query.page === 'profile' ? <Profile/> : props.children()}
                </Layout>
            </ThemeProvider>
        </ProfileContext.Provider>
    )
}
AppWrapper.propTypes = {
    loading: PropTypes.bool,
}

