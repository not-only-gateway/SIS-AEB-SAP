import {
    HelpRounded,
    ListRounded,
    PersonRounded,
    PublicRounded,
    SettingsRounded,
    SupervisorAccountRounded
} from "@material-ui/icons";
import React from "react";

export default function profileProps (redirect, path, query={}) {

    return {
        appName: 'Gerênciamento',
        sideBarButtons: [
            {
                label: "Perfil",
                icon: <PersonRounded/>,
                onClick: () => redirect('/profile/?page=index'),
                highlight:(path === '/profile' && !query.page)||  query.page === 'index'
            }
        ],
        requireAuth: true
    }
}