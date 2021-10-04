import {LinkRounded, WorkRounded} from "@material-ui/icons";
import React from "react";

export default function sapProps (redirect, path) {
    return {
        appName: 'Gestão de portfólio',
        sideBarButtons: [
            {
                label: "Projetos",
                icon: <WorkRounded/>,
                onClick: () => redirect('/sap/?page=index'),
                highlight: path.includes('index')
            },
            {
                label: "Entidades associativas",
                icon: <LinkRounded/>,
                onClick: () => redirect('/sap/?page=associative'),
                highlight: path.includes('associative')
            }
        ],
        requireAuth: true
    }
}