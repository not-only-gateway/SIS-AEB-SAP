import {HomeRounded, LinkRounded, ShowChartRounded} from "@material-ui/icons";
import React from "react";

export default function sapProps(redirect, path, query) {

    return {
        appName: 'Gestão de portfólio',
        sideBarButtons: [
            {
                label: "Início",
                icon: <HomeRounded/>,
                onClick: () => redirect('/?page=index'),
                highlight: (path === '/' && !query.page) || query.page === 'index'
            },
            {
                label: "Entidades associativas",
                icon: <LinkRounded/>,
                onClick: () => redirect('/?page=associative'),
                highlight: query.page === 'associative'
            },
            {
                label: "Acompanhamento",
                icon: <ShowChartRounded/>,
                onClick: () => redirect('/?page=dashboard'),
                highlight: query.page === 'dashboard'
            }
        ],
        requireAuth: true
    }
}