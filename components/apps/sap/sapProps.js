import {HomeRounded, LinkRounded, ShowChartRounded} from "@material-ui/icons";
import React from "react";

export default function sapProps(redirect, path, query) {

    return {
        appName: 'Gestão de portfólio',
        sideBarButtons: [
            {
                label: "Início",
                icon: <HomeRounded/>,
                onClick: () => redirect('/sap/?page=index'),
                highlight: (path === '/sap' && !query.page) || query.page === 'index'
            },
            {
                label: "Entidades associativas",
                icon: <LinkRounded/>,
                onClick: () => redirect('/sap/?page=associative'),
                highlight: query.page === 'associative'
            },
            {
                label: "Acompanhamento",
                icon: <ShowChartRounded/>,
                onClick: () => redirect('/sap/?page=dashboard'),
                highlight: query.page === 'dashboard'
            }
        ],
        requireAuth: true
    }
}