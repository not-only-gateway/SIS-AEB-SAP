import {HomeRounded, LinkRounded, ShowChartRounded} from "@material-ui/icons";
import React from "react";

export default function wikiProps(redirect, path, query) {

    return {
        appName: 'Wiki',
        sideBarButtons: [
            {
                label: "Início",
                icon: <HomeRounded/>,
                onClick: () => redirect('/sap/?page=index'),
                highlight: (path === '/sap' && !query.page) || query.page === 'index'
            }
        ],
        requireAuth: true
    }
}