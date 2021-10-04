import {useRouter} from "next/router";
import useDynamicRoute from "../../components/core/shared/hooks/useDynamicRoute";
import {useMemo} from "react";
import getSapPages from "../../components/apps/sap/getSapPages";

export default function index(){
    const router = useRouter()
    const pages = useMemo(() => {
        if(router.isReady)
            return getSapPages({
                redirect: (url, asUrl, params) => router.push(url, asUrl, params),
                query: router.query
            })
        else
            return []
    }, [router.isReady])
    const {page} = router.query
    const content = useDynamicRoute({
        routes: pages,
        ready: router.isReady,
        path: page
    })

    return (content)
}