import {useRouter} from "next/router";
import React from "react";
import getHRPages from "../../components/apps/hr/getHRPages";
import {DynamicRoutes} from "mfc-core";


export default function index() {
    const router = useRouter()
    const query = router.query

    return (
        <DynamicRoutes routes={getHRPages()} ready={router.isReady} path={query.page} componentProps={{
            redirect: (url, asUrl, params) => router.push(url, asUrl, params), query: router.query
        }}/>
    )
}