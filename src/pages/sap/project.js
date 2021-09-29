import ProjectPage from "../../components/apps/sap/pages/ProjectPage";
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