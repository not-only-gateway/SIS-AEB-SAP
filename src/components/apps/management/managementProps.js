import {
    LinkRounded,
    ListRounded,
    LockRounded,
    PublicRounded,
    SettingsRounded,
    VpnKeyRounded,
    SupervisorAccountRounded
} from "@material-ui/icons";
import React, {useCallback} from "react";

export default function managementProps (redirect, path) {
    return {
        appName: 'Gerênciamento',
        sideBarButtons: [
            {
                label: "Overview",
                icon: <PublicRounded/>,
                onClick: () => redirect('/management/home'),
                highlight: path === '/management/home'
            },
            {
                label: "Permissões",
                icon: <SupervisorAccountRounded/>,
                onClick: () => redirect('/management/permissions'),
                highlight: path === '/management/permissions'
            },
            {
                label: "Serviços",
                icon: <SettingsRounded/>,
                onClick: () => redirect('/management/services'),
                highlight: path === '/management/services'
            },

            {
                label: "Registros",
                icon: <ListRounded/>,
                onClick: () => redirect('/management/logs'),
                highlight: path === '/management/logs'
            }
        ],
        requireAuth: true
    }
}