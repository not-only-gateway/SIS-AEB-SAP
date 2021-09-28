import ProjectPage from "../../components/apps/sap/pages/ProjectPage";
import ProjectRequests from "../../../sap/packages/utils/requests/ProjectRequests";
import {useMemo} from "react";
import {useRouter} from "next/router";

export default function project(){
    const router = useRouter()
    const id = useMemo(() =>{
        return router.query.id
    }, [router.isReady])


    return (
        id ? <ProjectPage id={id}/> : null
    )
}