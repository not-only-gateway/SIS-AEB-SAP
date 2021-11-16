import '../styles/globals.css'
import "@fontsource/roboto";
import Router from 'next/router';
import React, {useEffect} from "react";
import ProfileContext from "../components/apps/profile/ProfileContext";
import useWrapper from "../components/useWrapper";
import styles from "../styles/Wrapper.module.css";
import Authenticator from "../components/Authenticator";
import Profile from "../components/addons/profile/Profile";
import RailActionButton from "../components/core/navigation/rail/RailActionButton";
import {Modal, ThemeProvider} from "mfc-core";
import RailActionWrapper from "../components/core/navigation/rail/RailActionWrapper";
import NavigationRail from "../components/core/navigation/rail/NavigationRail";

export default function SisAeb({Component, pageProps}) {

    const {
        loading, setLoading,
        profile, setProfile,
        layoutParams, requiresAuth,
        openAuthentication,
        setOpenAuthentication,
        cookies, darkTheme,
        router, isManager,
        setManager, profiles, sidebar
    } = useWrapper()

    useEffect(() => {
        Router.events.on('routeChangeStart', () => {
            setLoading(true)
        })
        Router.events.on('routeChangeComplete', () => setLoading(false))
    })
    return (
        <ProfileContext.Provider value={profile}>
            <ThemeProvider onDark={darkTheme} className={styles.wrapper}>
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

                <div className={styles.contentWrapper}>
                    <NavigationRail>
                        {/*<RailActionWrapper className={styles.logoWrapper}>*/}
                        {/*    <img className={styles.logo} src={darkTheme ? '../dark.png' : '../light.png'} alt={'logo'}/>*/}
                        {/*</RailActionWrapper>*/}
                        {/*<RailActionWrapper className={styles.appName}>*/}
                        {/*    {layoutParams.appName}*/}
                        {/*</RailActionWrapper>*/}
                        {/*<RailActionWrapper place={"end"}>*/}
                        {/*    <Apps buttons={apps.map(e => {*/}
                        {/*        return {...e, onClick: () => router.push(e.path, e.path)}*/}
                        {/*    })}/>*/}
                        {/*</RailActionWrapper>*/}
                        {sidebar.filter(e => e.position !== 'bottom').map((b, i) => (
                            <React.Fragment key={'top-' + i}>
                                <RailActionWrapper place={"start"}>
                                    {/*<Button variant={'minimal-horizontal'} className={styles.button}>*/}
                                    {/*    {darkTheme ? <Brightness3Rounded/> : <BrightnessHighRounded/>}*/}
                                    {/*</Button>*/}
                                    <RailActionButton {...b}/>
                                </RailActionWrapper>
                            </React.Fragment>
                        ))}
                        {sidebar.filter(e => e.position === 'bottom').map((b, i) => (
                            <RailActionWrapper place={"end"}>
                                <RailActionButton {...b}/>
                            </RailActionWrapper>
                        ))}


                        <RailActionWrapper place={"end"}>
                            <Profile
                                profile={profile}
                                redirect={o => {
                                    if (o === 0)
                                        router.push(router.pathname + '?page=profile')
                                    else {
                                        if (router.query.page === 'profile')
                                            router.push(router.pathname, router.pathname)
                                        setOpenAuthentication(true)

                                        cookies.remove('jwt')
                                        sessionStorage.removeItem('profile')
                                        setProfile({})
                                    }
                                }}
                            />
                        </RailActionWrapper>

                    </NavigationRail>
                    {router.query.page === 'profile' ? <Profile/> : <Component {...pageProps}/>}
                </div>
            </ThemeProvider>
        </ProfileContext.Provider>
    )
}