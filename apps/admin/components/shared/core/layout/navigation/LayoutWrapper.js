import React, {useCallback, useContext, useState} from 'react';
import styles from './styles/Navigation.module.css'
import PropTypes from 'prop-types'
import Profile from '../profile/Profile'
import NavigationPT from './locales/NavigationPT'
import Apps from '../apps/Apps'
import {MenuRounded, SettingsRounded} from "@material-ui/icons";
import SideBar from "./modules/SideBar";
import Loading from "./templates/Loading";
import ThemeProvider from "../../theme/ThemeProvider";
import ThemeContext from "../../theme/ThemeContext";
import Modal from "../../misc/modal/Modal";
import Checkbox from "../../shared/Checkbox";


export default function LayoutWrapper(props) {
    const lang = NavigationPT
    const [openSideBar, setOpenSideBar] = useState(false)
    const [onDark, setOnDark] = useState(false)
    const context = useContext(ThemeContext)
    const [openSettings, setOpenSettings] = useState(false)

    return (
        <ThemeProvider onDark={onDark}>
            <Modal open={openSettings} blurIntensity={.4} handleClose={() => setOpenSettings(false)} animationStyle={'fade'} wrapperClassName={styles.modalContainer}>
                <div>
                    <Checkbox handleCheck={() => setOnDark(true)}/>
                    <Checkbox handleCheck={() => setOnDark(false)}/>
                </div>
            </Modal>
            <div className={[styles.wrapper, context.dark ? context.styles.dark : context.styles.light].join(' ')}>
                <div className={styles.header}>
                    <Loading loading={props.loading}/>
                    <div className={styles.content}>
                        <button
                            className={styles.appsButtonContainer}
                            onClick={() => setOpenSideBar(!openSideBar)}
                        >
                            <MenuRounded/>
                        </button>
                        <img
                            style={{height: '35px'}}
                            src={props.logo}
                            alt={'logo'}
                        />
                        {props.appName}
                    </div>
                    <div className={styles.content} style={{justifyContent: 'flex-end', gap: '8px'}}>
                        <Apps
                            lang={lang}
                            redirect={props.redirect}
                            buttons={props.appButtons}
                        />

                        <Profile
                            buttons={props.profileButtons}
                            redirect={props.redirect}
                            profile={props.profile}
                            lang={lang}
                        />
                    </div>

                </div>

                <div className={styles.contentWrapper}>
                    <SideBar
                        open={openSideBar}
                        setOpen={setOpenSideBar}
                        buttons={[
                            ...props.sideBarButtons,
                            ...[{
                                label: 'Configurações',
                                icon: <SettingsRounded/>,
                                onClick: () => setOpenSettings(true)
                            }]
                        ]}
                        logo={props.logo}
                    />

                    <div className={styles.children}
                         style={{width: openSideBar ? 'calc(100% - 270px)' : 'calc(100% - 60px)'}}>
                        {props.children}
                    </div>
                </div>

            </div>
        </ThemeProvider>
    )

}

LayoutWrapper.propTypes = {
    children: PropTypes.element,
    appName: PropTypes.string,
    logo: PropTypes.any,
    profile: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        image: PropTypes.string
    }),

    redirect: PropTypes.func,
    loading: PropTypes.bool,
    sideBarButtons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            onClick: PropTypes.func,
            highlight: PropTypes.bool
        }),
    ),
    appButtons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            link: PropTypes.string
        })
    ),
    profileButtons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            link: PropTypes.string,
            linkProps: PropTypes.any
        })
    )
}
