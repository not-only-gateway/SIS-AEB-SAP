import '../styles/globals.css'
import "@fontsource/roboto";
import Router from 'next/router';
import React, {useEffect} from "react";
import ProfileContext from "../components/apps/profile/ProfileContext";
import ProfilePage from "../components/apps/profile/Profile";
import useWrapper from "../components/useWrapper";
import styles from "../styles/Wrapper.module.css";
import Authenticator from "../components/Authenticator";
import Profile from "../components/addons/profile/Profile";
import RailActionButton from "../components/core/navigation/rail/RailActionButton";
import {Button, Modal, ToolTip, MfcWrapper} from "mfc-core";
import RailActionWrapper from "../components/core/navigation/rail/RailActionWrapper";
import NavigationRail from "../components/core/navigation/rail/NavigationRail";
import Apps from "../components/addons/apps/Apps";
import apps from "../packages/apps";
import {Brightness3Rounded, BrightnessHighRounded, NotificationsRounded} from "@material-ui/icons";
import Loader from "../components/core/navigation/loader/Loader";
import Notification from "../components/addons/notifications/Notification";
import Host from "../utils/Host";

export default function SisAeb({Component, pageProps}) {

    const {
        loading, setLoading,
        profile, setProfile,
         requiresAuth,
        openAuthentication,
        setOpenAuthentication,
        cookies, darkTheme,
        router,
        setDarkTheme,
        setManager,  sidebar
    } = useWrapper()

    useEffect(() => {
        Router.events.on('routeChangeStart', () => {
            setLoading(true)
        })
        Router.events.on('routeChangeComplete', () => setLoading(false))
    })

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
                    className={styles.modal}
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

                        {profile && Object.keys(profile).length > 0 && router.pathname.includes('sap')?
                            <RailActionWrapper place={'end'}>
                                <Notification host={Host('api')}/>
                            </RailActionWrapper>
                        :
                        null}
                        <RailActionWrapper place={'end'}>
                            <Button onClick={() => setDarkTheme(!darkTheme)}>
                                {darkTheme ? <Brightness3Rounded/> : <BrightnessHighRounded/>}
                                <ToolTip content={'Tema'} align={'middle'} justify={'end'}/>
                            </Button>
                        </RailActionWrapper>
                        <RailActionWrapper place={"end"}>
                            <Apps
                                buttons={apps.map(e => {
                                    return {...e, onClick: () => router.push(e.path, e.path)}
                                })}
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
                    {router.query.page === 'profile' ? <ProfilePage/> : <Component {...pageProps}/>}
                </div>
            </MfcWrapper>
        </ProfileContext.Provider>
    )
}