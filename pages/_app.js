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
import Apps from "../components/addons/apps/Apps";
import apps from "../packages/apps";
import {
    ArrowForwardRounded,
    Brightness3Rounded,
    BrightnessHighRounded,
    BugReportRounded,
    ListRounded
} from "@material-ui/icons";
import {
    Button,
    Dropdown,
    MfcWrapper,
    Modal,
    NavigationRail,
    RailActionButton,
    RailActionWrapper,
    ToolTip
} from 'mfc-core'
import Notification from "../components/addons/notifications/Notification";
import Host from "../utils/Host";
import Loader from "../components/addons/loader/Loader";

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
        setManager, sidebar
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
                    {router.pathname === '/' ?
                        null
                        :
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
                            <RailActionWrapper place={'end'}>
                                <Dropdown
                                    align={"top"} justify={'start'}
                                    options={[
                                        {
                                            label: 'Reportar problema',
                                            icon: <ArrowForwardRounded/>,
                                            onClick: () => window.open('https://newgit.aeb.gov.br/sis-aeb/sis-aeb-backend/issues/new')
                                        },
                                        {
                                            label: 'Visualizar problemas',
                                            icon: <ListRounded/>,
                                            onClick: () => window.open('https://newgit.aeb.gov.br/sis-aeb/sis-aeb-backend/issues')
                                        }
                                    ]}
                                >
                                    <BugReportRounded/>
                                    <ToolTip content={'Reportar erro'} align={'middle'} justify={'end'}/>
                                </Dropdown>
                            </RailActionWrapper>
                            {profile && Object.keys(profile).length > 0 && router.pathname.includes('sap') ?
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
                    }

                    {router.query.page === 'profile' ? <ProfilePage/> : <Component {...pageProps} theme={darkTheme} setTheme={setDarkTheme}/>}
                </div>
            </MfcWrapper>
        </ProfileContext.Provider>
    )
}