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
        <div>
            <Button>
                Default
            </Button>
            <Button disabled={true}>
                Default disabled
            </Button>
            <Button color={"secondary"} highlight={true}>
                Default secondary
            </Button>
            <Button variant={'minimal'}>
                Minimal
            </Button>
            <Button variant={'minimal'} disabled={true}>
                Minimal disabled
            </Button>
            <Button variant={'minimal'} color={"secondary"} highlight={true}>
                Minimal secondary
            </Button>
            <Button variant={'filled'}>
                Filled
            </Button>
            <Button variant={'filled'} disabled={true}>
                Filled disabled
            </Button>
            <Button variant={'filled'} color={"secondary"} highlight={true}>
                Filled secondary
            </Button>
        </div>
        // <DynamicRoutes
        //     routes={getSapPages()}
        //     ready={router.isReady}
        //     path={query.page}
        //     componentProps={{
        //         redirect: (url, asUrl, params) => router.push(url, asUrl, params),
        //         query: router.query,
        //         refresh: () => router.reload()
        //     }}/>
    )
}