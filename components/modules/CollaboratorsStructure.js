import Canvas from "../layout/Canvas";
import React, {useEffect, useState} from "react";
import fetchTopCollaborators from "../../utils/fetch/FetchTopCollaborators";

export default function CollaboratorsStructure() {
    const [topCollaborators, setTopCollaborators] = useState([])
    useEffect(() => {
        fetchTopCollaborators().then(res => setTopCollaborators(res))
    }, [])
    return topCollaborators.map((collaborator, index) => (
        <>
                <Canvas dark={false} type={'collaborator'} subject={collaborator}/>
        </>
    ))
}
