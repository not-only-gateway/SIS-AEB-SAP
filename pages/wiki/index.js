import {useRouter} from "next/router";
import React from "react";
import getSapPages from "../../components/apps/sap/getSapPages";
import {DynamicRoutes} from "mfc-core";
import "@fontsource/roboto";
import getWikiPages from "../../components/apps/wiki/getWikiPages";

export default function index() {
    const router = useRouter()
    const query = router.query

    return (
        <DynamicRoutes
            routes={getWikiPages()}
            ready={router.isReady}
            path={query.page}
            componentProps={{
                redirect: (url, asUrl, params) => {
                    router.push(url, asUrl, params)
                },
                query: router.query,
                refresh: () => router.reload(),
                pathname: router.pathname
            }}/>
    )
}