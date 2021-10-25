import {useRouter} from "next/router";
import React from "react";
import getSapPages from "../../components/apps/sap/getSapPages";
import DynamicRoutes from "../../components/core/navigation/routing/DynamicRoutes";
import "@fontsource/roboto";
import Button from "../../components/core/inputs/button/Button";

export default function index() {
    const router = useRouter()
    const query = router.query

    return (
        <DynamicRoutes
            routes={getSapPages()}
            ready={router.isReady}
            path={query.page}
            componentProps={{
                redirect: (url, asUrl, params) => router.push(url, asUrl, params),
                query: router.query,
                refresh: () => router.reload()
            }}/>
    )
}