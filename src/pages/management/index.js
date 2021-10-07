import {useRouter} from "next/router";

import React, {useEffect} from "react";
import styles from '../../styles/Wrapper.module.css'
import useDynamicRoute from "../../components/core/shared/hooks/useDynamicRoute";
import getManagementPages from "../../components/apps/management/getManagementPages";


export default function index() {
    const router = useRouter()
    const query= router.query
    console.log(query)
    const Content = useDynamicRoute({
        routes: getManagementPages(),
        ready: router.isReady,
        path: query.page,
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