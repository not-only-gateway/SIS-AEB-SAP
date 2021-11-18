import {AccountTreeRounded, ApartmentRounded, EventRounded, HomeRounded, InfoRounded} from "@material-ui/icons";
import React from "react";

export default function intranetProps(redirect, path, query = {}) {

    return {
        appName: 'Intranet',
        sideBarButtons: [
            {
                label: "Inicio",
                icon: <HomeRounded/>,
                onClick: () => redirect('/?page=index'),
                highlight: (path === '/' && !query.page) || query.page === 'index'
            },
            {
                label: "Estrutura organizacional",
                icon: <AccountTreeRounded/>,
                onClick: () => redirect('/?page=structure'),
                highlight: query.page === 'structure'
            },
            {
                label: "Institucional",
                icon: <ApartmentRounded/>,
                onClick: () => redirect('/?page=institutional'),
                highlight: query.page === 'institutional'
            },
            {
                label: "Eventos",
                icon: <EventRounded/>,
                onClick: () => redirect('/?page=events'),
                highlight: query.page === 'events'
            },
            {
                label: "Comissão de Ética",
                icon: <InfoRounded/>,
                onClick: () => redirect('/?page=commission'),
                highlight:  query.page === 'commission'
            }
        ],
        requireAuth: false
    }
}