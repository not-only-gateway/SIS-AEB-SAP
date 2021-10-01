import {LinkRounded, WorkRounded} from "@material-ui/icons";
import React from "react";

export default function sapProps (redirect, path) {
    return {
        appName: 'Gestão de portfólio',
        sideBarButtons: [
            {
                label: "Projetos",
                icon: <WorkRounded/>,
                onClick: () => redirect('/sap/home'),
                highlight: path === '/sap/home'
            },
            {
                label: "Entidades associativas",
                icon: <LinkRounded/>,
                onClick: () => redirect('/sap/entities'),
                highlight: path === '/sap/entities'
            }
        ],
        requireAuth: true
    }
}