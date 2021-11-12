import '../styles/globals.css'
import Router from 'next/router';
import React, {useEffect} from "react";
import ThemeProvider from "../components/core/misc/theme/ThemeProvider";
import ProfileContext from "../components/apps/profile/ProfileContext";
import useWrapper from "../components/useWrapper";
import Modal from "../components/core/navigation/modal/Modal";
import styles from "../styles/Wrapper.module.css";
import Authenticator from "../components/Authenticator";
import Bar from '../components/core/navigation/bar/Bar'
import BarAction from "../components/core/navigation/bar/BarAction";
import Apps from "../components/core/navigation/apps/Apps";
import apps from "../packages/apps";
import Profile from "../components/core/navigation/profile/Profile";
import {Brightness3Rounded, BrightnessHighRounded, ExitToAppRounded, PersonAddRounded} from "@material-ui/icons";
import {Button} from "mfc-core";
import ResizableButton from "../components/core/navigation/bar/ResizableButton";

export default function _app({Component, pageProps}) {

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
                <div className={styles.bars}>
                    <Bar orientation={'horizontal'}>
                        <BarAction className={styles.logoWrapper}>
                            <img className={styles.logo} src={darkTheme ? '../dark.png' : '../light.png'} alt={'logo'}/>
                        </BarAction>
                        <BarAction className={styles.appName}>
                            {layoutParams.appName}
                        </BarAction>
                        <BarAction place={"end"}>
                            <Apps buttons={apps.map(e => {
                                return {...e, onClick: () => router.push(e.path, e.path)}
                            })}/>
                        </BarAction>
                        <BarAction place={"end"}>
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
                        </BarAction>
                    </Bar>
                    <div className={styles.contentWrapper}>
                        <Bar>
                            {sidebar.filter(e => e.position !== 'bottom').map((b, i) => (
                                <React.Fragment key={'top-' + i}>
                                    <BarAction place={"start"}>
                                        {/*<Button variant={'minimal-horizontal'} className={styles.button}>*/}
                                        {/*    {darkTheme ? <Brightness3Rounded/> : <BrightnessHighRounded/>}*/}
                                        {/*</Button>*/}
                                        <ResizableButton {...b}/>
                                    </BarAction>
                                </React.Fragment>
                            ))}
                            {sidebar.filter(e => e.position === 'bottom').map((b, i) => (
                                // <React.Fragment key={'bottom-' + i}>
                                    <BarAction place={"end"}>
                                        <ResizableButton {...b}/>
                                    </BarAction>
                                // </React.Fragment>
                            ))}

                        </Bar>
                        {router.query.page === 'profile' ? <Profile/> : <Component {...pageProps}/>}
                    </div>

                </div>

            </ThemeProvider>
        </ProfileContext.Provider>
    )
}