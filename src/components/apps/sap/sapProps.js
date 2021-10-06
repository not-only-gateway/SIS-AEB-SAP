import {LinkRounded, WorkRounded} from "@material-ui/icons";
import React from "react";

export default function sapProps (redirect, path, query) {

    return {
        appName: 'Gestão de portfólio',
        sideBarButtons: [
            {
                label: "Projetos",
                icon: <WorkRounded/>,
                onClick: () => redirect('/sap/?page=index'),
                highlight: (path === '/sap' && !query.page)||  query.page === 'index'
            },
            {
                label: "Entidades associativas",
                icon: <LinkRounded/>,
                onClick: () => redirect('/sap/?page=associative'),
                highlight: query.page === 'associative'
            }
        ],
        requireAuth: true
    }
}