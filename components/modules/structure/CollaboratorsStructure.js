import Canvas from "../../layout/Canvas";
import React, {useEffect, useState} from "react";
import fetchTopCollaborators from "../../../utils/fetch/FetchTopCollaborators";
import Cookies from "universal-cookie/lib";

export default function CollaboratorsStructure() {
    const [topCollaborators, setTopCollaborators] = useState([])
    const [accessProfile, setAccessProfile] = useState(null)
    useEffect(() => {
        fetchTopCollaborators().then(res => {

            setTopCollaborators(res)
        })
        if (accessProfile === null && sessionStorage.getItem('accessProfile') !== null)
            setAccessProfile(JSON.parse(sessionStorage.getItem('accessProfile')))
    }, [])


    return (
        <div>
            <Canvas dark={false} type={'collaborator'} subjects={topCollaborators}
                    disabled={!(new Cookies()).get('jwt') || accessProfile === null || (!accessProfile.can_update_person && !accessProfile.can_manage_membership)}/>
        </div>
    )

}
