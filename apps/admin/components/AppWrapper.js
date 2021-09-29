import React, {useState} from "react";
import {useRouter} from "next/router";
import "@fontsource/roboto"
import PropTypes from "prop-types";
import {LayoutWrapper} from "sis-aeb-core";
import {WorkRounded} from "@material-ui/icons";

export default function AppWrapper(props) {
    const router = useRouter()
    const [profile, setProfile] = useState(null)
    return (
        <LayoutWrapper
            redirect={url => router.push(url, url)}
            loading={props.loading} profile={profile}
            lightLogo={'./light.png'}
            darkLogo={'./dark.png'}

            profileButtons={[]}
            appButtons={[]}
            redirectToLogin={() => router.push('authentication', 'authentication')}
            appName={'Placeholder'}
            sideBarButtons={[ {
                label: "TESTE",
                icon: <WorkRounded/>,
                onClick: () => null,
                highlight: false
            }]}
        >
            {props.children}
        </LayoutWrapper>
    )
}
AppWrapper.propTypes = {
    loading: PropTypes.bool,
}
