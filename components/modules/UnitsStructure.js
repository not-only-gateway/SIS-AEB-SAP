import Canvas from "../layout/Canvas";
import React, {useEffect, useState} from "react";
import fetchTopCollaborators from "../../utils/fetch/FetchTopCollaborators";
import fetchTopUnits from "../../utils/fetch/FetchTopUnits";

export default function UnitsStructure() {
    const [topUnits, setTopUnits] = useState([])
    useEffect(() => {
        fetchTopUnits().then(res => {
            console.log(res)
            setTopUnits(res)
        })
    }, [])
    return topUnits.map((unit, index) => (
        <>
            {index === 0 ?
                <Canvas dark={false} type={'unit'} subject={unit}/> : null}
        </>
    ))
}
