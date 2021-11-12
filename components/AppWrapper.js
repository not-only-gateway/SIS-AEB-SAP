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




    return (
        <ProfileContext.Provider value={profile}>
            <ThemeProvider onDark={darkTheme}>

                <Layout
                    loading={props.loading}
                    logo={darkTheme ? '../dark.png' : '../light.png'}
                    appName={layoutParams.appName}
                    openSideBar={openSideBar}
                    setOpenSideBar={setOpenSideBar}
                >

                    <SideBar
                        open={openSideBar}
                        buttons={sidebar}
                        logo={darkTheme ? '../dark.png' : '../light.png'}
                    />



                </Layout>
            </ThemeProvider>
        </ProfileContext.Provider>
    )
}
AppWrapper.propTypes = {
    loading: PropTypes.bool,
}

