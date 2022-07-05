import '../styles/globals.css'
import Router from 'next/router';
import React, {useEffect} from "react";
import ProfileContext from "../apps/profile/ProfileContext";
import ProfilePage from "../apps/profile/Profile";
import useWrapper from "../hooks/useWrapper";
import styles from "../styles/Wrapper.module.css";
import Authenticator from "../components/auth/Authenticator";
import Profile from "../components/profile/Profile";
import Apps from "../components/apps/Apps";
import {Brightness3Rounded, BrightnessHighRounded, SettingsRounded, WorkRounded} from "@material-ui/icons";
import {Button, MfcWrapper, Modal, NavigationRail, RailActionButton, RailActionWrapper, ToolTip} from 'mfc-core'
import Loader from "../components/loader/Loader";
// import {Fabric} from "@f-ui/core";

export default function SisAeb({Component, pageProps}) {
    const {
        loading, setLoading,
        profile, setProfile,
        requiresAuth,
        openAuthentication,
        setOpenAuthentication,
        cookies, darkTheme,
        router, setDarkTheme,
        setManager, sidebar
    } = useWrapper()

    useEffect(() => {
        Router.events.on('routeChangeStart', () => {
            setLoading(true)
        })
        Router.events.on('routeChangeComplete', () => setLoading(false))
    }, [])

    return (
        <ProfileContext.Provider value={profile}>
            <MfcWrapper onDark={darkTheme} className={styles.wrapper} language={'pt'}>
                <Loader loading={loading}/>
                <Modal
                    open={openAuthentication}
                    handleClose={() => {
                        if (cookies.get('jwt') && requiresAuth)
                            setOpenAuthentication(false)
                        else if (!requiresAuth)
                            setOpenAuthentication(false)
                    }}
                    defaultBackground={true}
                    className={styles.modalWr}
                    blurIntensity={.25}
                    animationStyle={"fade"}
                >
                    <Authenticator
                        setManager={setManager} setProfile={setProfile}
                        redirect={() => {
                            setOpenAuthentication(false)
                            router.reload()
                        }} open={openAuthentication}
                    />
                </Modal>

                <div className={styles.contentWrapper}>

                    <NavigationRail>
                        <RailActionWrapper styles={{display: 'flex', justifyContent: 'center'}}>
                            {(extended) => (
                                <img style={{width: extended ? '50%' : '85%'}}
                                     src={extended ? (darkTheme ? './dark.png' : './light.png') : darkTheme ? './dark-small.png' : './light-small.png'}
                                     alt={'AEB'}/>
                            )}
                        </RailActionWrapper>

                        {sidebar.filter(e => e.position !== 'bottom').map((b, i) => (
                            <React.Fragment key={'top-' + i}>
                                <RailActionWrapper place={"start"}>
                                    <RailActionButton {...b}/>
                                </RailActionWrapper>
                            </React.Fragment>
                        ))}
                        {sidebar.filter(e => e.position === 'bottom').map((b, i) => (
                            <React.Fragment key={"end-option-" + i}>
                                <RailActionWrapper place={"end"}>
                                    <RailActionButton {...b}/>
                                </RailActionWrapper>
                            </React.Fragment>
                        ))}


                        <RailActionWrapper place={'end'}>
                            <Button onClick={() => setDarkTheme(!darkTheme)}>
                                {darkTheme ? <Brightness3Rounded/> : <BrightnessHighRounded/>}
                                <ToolTip content={'Tema'} align={'middle'} justify={'end'}/>
                            </Button>
                        </RailActionWrapper>
                        <RailActionWrapper place={"end"}>
                            <Apps
                                buttons={[
                                    {
                                        label: 'Acompanhamento de portfolios',
                                        path: '/',
                                        icon: <WorkRounded/>,
                                        onClick: () => router.push("/")
                                    },
                                    {
                                        label: 'Gerência',
                                        path: '/management',
                                        icon: <SettingsRounded/>,
                                        onClick: () => router.push("/management")
                                    }
                                ]}
                            />
                        </RailActionWrapper>

                        <RailActionWrapper place={"end"} styles={{maxWidth: '100%', overflow: 'hidden'}}>
                            <Profile
                                highlight={router.query.page === 'profile'}
                                openAuth={() => setOpenAuthentication(true)}
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
                    {router.query.page === 'profile' ? <ProfilePage/> :
                        <Component {...pageProps} theme={darkTheme} setTheme={setDarkTheme}/>}
                </div>
            </MfcWrapper>

        </ProfileContext.Provider>
    )
}