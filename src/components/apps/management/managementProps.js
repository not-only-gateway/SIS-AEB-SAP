import {ListRounded, PublicRounded, SettingsRounded, SupervisorAccountRounded} from "@material-ui/icons";
import React from "react";

export default function managementProps (redirect, path) {
    return {
        appName: 'Gerênciamento',
        sideBarButtons: [
            {
                label: "Overview",
                icon: <PublicRounded/>,
                onClick: () => redirect('/management'),
                highlight: path === '/management/index'
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