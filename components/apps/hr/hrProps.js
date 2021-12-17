import {PeopleRounded, WorkRounded} from "@material-ui/icons";
import React from "react";

export default function hrProps(redirect, path, query = {}) {

    return {
        appName: 'Recursos humanos',
        sideBarButtons: [
            {
                label: "Colaboradores",
                icon: <PeopleRounded/>,
                onClick: () => redirect('/hr/?page=index'),
                highlight: (path === '/hr' && !query.page) || query.page === 'index'
            },
            {
                label: "Vagas",
                icon: <WorkRounded/>,
                onClick: () => redirect('/hr/?page=vacancy'),
                highlight: (path === '/hr') && query.page === 'vacancy'
            }
        ],
        requireAuth: false
    }
}