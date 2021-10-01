import React, {useMemo, useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"
import PropTypes from "prop-types";
import LayoutWrapper from "./core/layout/navigation/LayoutWrapper";
import sapProps from "./apps/sap/sapProps";
import managementProps from "./apps/management/managementProps";
import apps from "../packages/apps";

export default function AppWrapper(props) {
    const router = useRouter()
    const [profile, setProfile] = useState({})
    const layoutParams = useMemo(() => {

        switch (true){
            case router.pathname.includes('/sap'):
                return sapProps((url) => router.push(url, url), router.pathname)
            case router.pathname.includes('/management'):
                return managementProps((url) => router.push(url, url), router.pathname)
            default:
                return {}
        }

    }, [router.pathname])

    return (
        <LayoutWrapper
            redirect={url => router.push(url, url)}
            loading={props.loading} profile={profile}
            lightLogo={'../light.png'}
            darkLogo={'../dark.png'}
            redirectToLogin={() => router.push('authentication', 'authentication')}
            {...layoutParams}

            profileButtons={[]}
            appButtons={apps}
        >
            {props.children}
        </LayoutWrapper>

    )
}
AppWrapper.propTypes = {
    loading: PropTypes.bool,
}
