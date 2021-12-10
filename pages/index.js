import {useRouter} from "next/router";
import React, {useEffect} from "react";
import getIntranetPages from "../components/apps/intranet/getIntranetPages";
import {DynamicRoutes} from "mfc-core";

export default function index() {
    const router = useRouter()
    const query = router.query
    useEffect(() => {
        router.push('/sap', '/sap')
    }, [])
    return (
        <></>
        // <DynamicRoutes routes={getIntranetPages()} ready={router.isReady} path={query.page} componentProps={{
        //     redirect: (url, asUrl, params) => router.push(url, asUrl, params), query: router.query
        // }}/>
    )
}