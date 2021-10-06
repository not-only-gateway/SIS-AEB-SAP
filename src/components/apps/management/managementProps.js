import {ListRounded, PublicRounded, SettingsRounded, SupervisorAccountRounded} from "@material-ui/icons";
import React from "react";

export default function managementProps (redirect, path, query={}) {
    console.log(path)
    return {
        appName: 'Gerênciamento',
        sideBarButtons: [
            {
                label: "Overview",
                icon: <PublicRounded/>,
                onClick: () => redirect('/management/?page=index'),
                highlight:(path === '/management' && !query.page)||  query.page === 'index'
            },
            {
                label: "Permissões",
                icon: <SupervisorAccountRounded/>,
                onClick: () => redirect('/management/?page=permissions'),
                highlight: query.page === 'permissions'
            },
            {
                label: "Serviços",
                icon: <SettingsRounded/>,
                onClick: () => redirect('/management/?page=services'),
                highlight: query.page === 'services'
            },

            {
                label: "Registros",
                icon: <ListRounded/>,
                onClick: () => redirect('/management/?page=logs'),
                highlight: query.page === 'logs'
            }
        ],
        requireAuth: true
    }
}