import {
    HelpRounded,
    ListRounded,
    PeopleRounded,
    PublicRounded,
    SettingsRounded,
    SupervisorAccountRounded
} from "@material-ui/icons";
import React from "react";

export default function hrProps (redirect, path, query={}) {
    console.log(path)
    return {
        appName: 'Recursos humanos',
        sideBarButtons: [
            {
                label: "Colaboradores",
                icon: <PeopleRounded/>,
                onClick: () => redirect('/hr/?page=index'),
                highlight:(path === '/hr' && !query.page)||  query.page === 'index'
            }
        ],
        requireAuth: true
    }
}