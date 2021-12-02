import {useRouter} from "next/router";

import React from "react";
import getManagementPages from "../../components/apps/management/getManagementPages";
import {DynamicRoutes} from "mfc-core";

export default function index() {
    const router = useRouter()
    const query = router.query

    return (
        <DynamicRoutes routes={getManagementPages()} ready={router.isReady} path={query.page} componentProps={{
            redirect: (url, asUrl, params) => router.push(url, asUrl, params), query: router.query
        }}/>
    )
}