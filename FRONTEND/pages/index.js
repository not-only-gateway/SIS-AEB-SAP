import {useRouter} from "next/router";
import React from "react";
import {DynamicRoutes} from "mfc-core";
import getSapPages from "../apps/sap/getSapPages";

export default function index() {
    const router = useRouter()
    const query = router.query

    return (
        <DynamicRoutes
            routes={getSapPages()}
            ready={router.isReady}
            path={query.page}
            componentProps={{
                redirect: router.push,
                query: router.query,
                refresh: () => router.reload(),
                pathname: router.pathname
            }}
        />
    )
}