import React, {useContext, useState} from 'react';
import styles from './styles/Navigation.module.css'
import PropTypes from 'prop-types'
import Profile from '../profile/Profile'
import Apps from '../apps/Apps'
import {MenuRounded} from "@material-ui/icons";
import SideBar from "../sidebar/SideBar";
import Loading from "./templates/Loading";
import ThemeProvider from "../../theme/ThemeProvider";
import ThemeContext from "../../theme/ThemeContext";


export default function LayoutWrapper(props) {
    const [openSideBar, setOpenSideBar] = useState(false)
    const [onDark, setOnDark] = useState(false)
    const context = useContext(ThemeContext)


    return (
        <ThemeProvider onDark={onDark}>
            <div className={[styles.wrapper, onDark ? context.styles.dark : context.styles.light].join(' ')}>
                <div className={styles.header}>
                    <Loading loading={props.loading}/>
                    <div className={styles.content}>
                        <div style={{width: '50px'}}>
                            <button
                                className={styles.buttonContainer}
                                style={{
                                    margin: 'auto',
                                    color: openSideBar ? 'white' : undefined,
                                    background: openSideBar ? '#0095ff' : undefined,
                                }}
                                onClick={() => setOpenSideBar(!openSideBar)}
                            >
                                <MenuRounded/>
                            </button>
                        </div>
                        <img
                            style={{height: '35px'}}
                            src={onDark ? props.darkLogo : props.lightLogo}
                            alt={'logo'}
                        />
                        {props.appName}
                    </div>
                    <div className={styles.content} style={{justifyContent: 'flex-end', gap: '8px'}}>
                        <Apps

                            redirect={props.redirect}
                            buttons={props.appButtons}
                        />

                        <Profile
                            buttons={props.profileButtons}
                            redirect={props.redirect}
                            redirectToLogin={props.redirectToLogin}
                            profile={props.profile}
                        />
                    </div>

                </div>

                <div className={styles.contentWrapper}>
                    <SideBar
                        setOnDark={setOnDark}
                        onDark={onDark}
                        open={openSideBar}
                        setOpen={setOpenSideBar}
                        buttons={props.sideBarButtons}
                        logo={props.logo}
                    />

                    <div className={styles.children}
                         style={{width: openSideBar ? 'calc(100% - 225px)' : 'calc(100% - 60px)', transition: '150ms linear', marginLeft: 'auto'}}>
                        {props.children}
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )

}

LayoutWrapper.propTypes = {
    redirectToLogin: PropTypes.func,
    children: PropTypes.element,
    appName: PropTypes.string,
    lightLogo: PropTypes.any,
    darkLogo: PropTypes.any,
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