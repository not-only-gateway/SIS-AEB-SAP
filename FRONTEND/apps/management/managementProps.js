import {HelpRounded, ListRounded, PublicRounded, SettingsRounded, SupervisorAccountRounded} from "@material-ui/icons";
import React from "react";

export default function managementProps (redirect, path, query={}) {

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
                label: "Privilégios",
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
            },
            {
                label: "Ajuda",
                icon: <HelpRounded/>,
                onClick: () => redirect('/management/?page=help'),
                highlight: query.page === 'help',
                position: 'bottom'
            }
        ],
        requireAuth: true
    }
}