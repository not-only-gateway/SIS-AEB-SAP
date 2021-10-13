import {useRouter} from "next/router";
import React from "react";
import useDynamicRoute from "../components/core/shared/hooks/useDynamicRoute";
import getIntranetPages from "../components/apps/intranet/getIntranetPages";


export default function index() {
    const router = useRouter()
    const {page} = router.query

    const Content = useDynamicRoute({
        routes: getIntranetPages(),
        ready: router.isReady,
        path: page,
    })

    if (Content !== null)
        return (
            <Content
                redirect={(url, asUrl, params) => router.push(url, asUrl, params)} query={router.query}
            />
        )
    else
        return null
}