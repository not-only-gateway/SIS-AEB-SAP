import {useRouter} from "next/router";
import React from "react";
import getProfilePages from "../../components/apps/profile/getProfilePages";
import {DynamicRoutes} from "mfc-core";

export default function index() {
    const router = useRouter()
    const query = router.query

    return (
        <DynamicRoutes routes={getProfilePages()} ready={router.isReady} path={query.page} componentProps={{
            redirect: (url, asUrl, params) => router.push(url, asUrl, params), query: router.query
        }}/>
    )
}